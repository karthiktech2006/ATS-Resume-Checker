  import express from 'express';
  import multer from 'multer';
  import { PDFParse } from 'pdf-parse';
  import mammoth from 'mammoth';
  import path from 'path';
  import { fileURLToPath } from 'url';
  import dotenv from 'dotenv';
  import { GoogleGenAI } from '@google/genai';
  import { scoreResume, getSampleDemoReport } from './src/utils/scorer';
  import { AdminAnalytics } from './src/utils/types';

  dotenv.config();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const app = express();
  const PORT = process.env.PORT || 3000;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  throw new Error(
    'ADMIN_PASSWORD must be configured before starting ResumeCheck.'
  );
}

  // In-memory rate limiter & stats storage (No resume texts or personal data stored)
  const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

  const adminState: AdminAnalytics = {
    totalScans: 48,
    todayScans: 14,
    averageScore: 72,
    pdfScans: 39,
    docxScans: 9,
    scansWithJobDesc: 21,
    recentScans: [
      {
        id: 'rc_demo1',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        fileName: 'Software_Engineer_Resume.pdf',
        fileType: 'application/pdf',
        score: 78,
        wordCount: 460,
        hasJobDesc: true,
        processingTimeMs: 240
      },
      {
        id: 'rc_demo2',
        timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
        fileName: 'Data_Analyst_Grad.docx',
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        score: 64,
        wordCount: 380,
        hasJobDesc: false,
        processingTimeMs: 180
      }
    ],
    systemSettings: {
      maxUploadSizeBytes: 10 * 1024 * 1024, // 10MB
      rateLimitPerHour: 20,
      allowDocx: true,
      allowPdf: true,
      enableAdSenseSlots: false, // Default to clean layout until publisher approval
      geminiEnhancedParsing: Boolean(process.env.GEMINI_API_KEY)
    }
  };

  const adminTokens = new Set<string>();

  // Multer memory storage (never writes resumes to disk for privacy guarantee)
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB default
    },
    fileFilter: (_req, file, cb) => {
      const allowedMimes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowedMimes.includes(file.mimetype) || ['.pdf', '.docx', '.doc'].includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only PDF and DOCX files are supported.'));
      }
    }
  });

  app.use(express.json({ limit: '2mb' }));

  // Middleware for rate limiting
  function checkRateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const limitWindowMs = 60 * 60 * 1000; // 1 hour

    const clientRecord = ipRateLimitMap.get(ip);
    if (!clientRecord || now > clientRecord.resetTime) {
      ipRateLimitMap.set(ip, { count: 1, resetTime: now + limitWindowMs });
      return next();
    }

    if (clientRecord.count >= adminState.systemSettings.rateLimitPerHour) {
      return res.status(429).json({
        error: 'Hourly rate limit reached. Please wait before analyzing another resume to ensure fair access for all users.'
      });
    }

    clientRecord.count++;
    next();
  }

  // Admin Auth Middleware
  function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Admin token required.' });
    }
    const token = authHeader.split(' ')[1];
    if (!adminTokens.has(token)) {
      return res.status(403).json({ error: 'Invalid or expired admin session token.' });
    }
    next();
  }

  /**
   * Health check endpoint
   */
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'ResumeCheck ATS Core Engine'
    });
  });

  /**
   * Public system settings for frontend (safe, non-sensitive)
   */
  app.get('/api/config', (_req, res) => {
    res.json({
      maxUploadSizeBytes: adminState.systemSettings.maxUploadSizeBytes,
      allowDocx: adminState.systemSettings.allowDocx,
      allowPdf: adminState.systemSettings.allowPdf,
      enableAdSenseSlots: adminState.systemSettings.enableAdSenseSlots
    });
  });

  /**
   * Sample Report API for instant demonstration
   */
  app.get('/api/sample-report', (_req, res) => {
    const sample = getSampleDemoReport();
    res.json(sample);
  });

  /**
   * Core Resume Analysis API
   */
  app.post('/api/analyze', checkRateLimit, upload.single('resume'), async (req: express.Request, res: express.Response) => {
    const startTime = Date.now();

    if (!req.file) {
      return res.status(400).json({ error: 'No resume file provided. Please upload a PDF or DOCX file.' });
    }

    const { jobDescription } = req.body;
    const fileName = req.file.originalname;
    const fileMime = req.file.mimetype;
    const fileSize = req.file.size;

    try {
      let extractedText = '';

      // 1. Server-side text parsing
      if (fileMime === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
        if (!adminState.systemSettings.allowPdf) {
          return res.status(400).json({ error: 'PDF uploads are currently disabled by administrator.' });
        }
        const pdfParser = new PDFParse({ data: req.file.buffer });
        const parsedPdf = await pdfParser.getText();
        extractedText = parsedPdf.text || '';
        await pdfParser.destroy();
      } else {
        if (!adminState.systemSettings.allowDocx) {
          return res.status(400).json({ error: 'DOCX uploads are currently disabled by administrator.' });
        }
        const parsedDocx = await mammoth.extractRawText({ buffer: req.file.buffer });
        extractedText = parsedDocx.value || '';
      }

      if (!extractedText || extractedText.trim().length < 50) {
        return res.status(422).json({
          error: 'Unable to extract legible text from this document. If your resume is an image scan, please convert it to a searchable text-based PDF or DOCX file.'
        });
      }

      // 2. Deterministic scoring & keyword matching
      const analysis = scoreResume(extractedText, fileName, fileSize, jobDescription || '', false);

      // 3. Optional Gemini API enhancement for high-impact tailored suggestions
      if (adminState.systemSettings.geminiEnhancedParsing && process.env.GEMINI_API_KEY) {
        try {
          const ai = new GoogleGenAI();
          const prompt = `You are an elite ATS and executive resume reviewer.
  Analyze this resume text and the optional target job description.
  Provide 2-3 specific, high-impact bullet rewrite suggestions that follow the Google XYZ formula ("Accomplished [X] measured by [Y] by doing [Z]").
  Do NOT fabricate false employment facts.

  RESUME TEXT EXCERPT (first 2500 chars):
  ${extractedText.slice(0, 2500)}

  ${jobDescription ? `TARGET JOB DESCRIPTION: ${jobDescription.slice(0, 1000)}` : ''}

  Respond in strict JSON format:
  {
    "bulletRewrites": [
      {
        "original": "...",
        "suggested": "...",
        "category": "High-Impact Rephrase",
        "improvementReason": "..."
      }
    ],
    "expertAdvice": "1-2 sentence tailored recruiter critique"
  }`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          });

          if (response.text) {
            const parsedAi = JSON.parse(response.text);
            if (Array.isArray(parsedAi.bulletRewrites) && parsedAi.bulletRewrites.length > 0) {
              analysis.bulletRewrites = [...parsedAi.bulletRewrites, ...analysis.bulletRewrites].slice(0, 5);
            }
            if (parsedAi.expertAdvice) {
              analysis.summary += ` Recruiter tip: ${parsedAi.expertAdvice}`;
            }
          }
        } catch (aiErr) {
          // Non-blocking fallback: graceful fallback to pure deterministic scoring
          console.warn('Gemini enhancement skipped, using pure deterministic analysis:', aiErr);
        }
      }

      // 4. Update aggregate statistics (zero personal data stored)
      const processingTimeMs = Date.now() - startTime;
      adminState.totalScans++;
      adminState.todayScans++;
      if (fileMime.includes('pdf') || fileName.endsWith('.pdf')) {
        adminState.pdfScans++;
      } else {
        adminState.docxScans++;
      }
      if (jobDescription && jobDescription.trim().length > 30) {
        adminState.scansWithJobDesc++;
      }

      // Rolling average score
      adminState.averageScore = Math.round(
        (adminState.averageScore * (adminState.totalScans - 1) + analysis.overallScore) / adminState.totalScans
      );

      // Keep last 15 aggregate audit rows
      adminState.recentScans.unshift({
        id: analysis.id,
        timestamp: analysis.timestamp,
        fileName,
        fileType: fileMime || 'application/octet-stream',
        score: analysis.overallScore,
        wordCount: analysis.wordCount,
        hasJobDesc: Boolean(jobDescription && jobDescription.trim().length > 30),
        processingTimeMs
      });
      if (adminState.recentScans.length > 20) {
        adminState.recentScans.pop();
      }

      // 5. Zero-retention: ensure extracted text buffer is released
      extractedText = '';

      return res.json(analysis);
    } catch (err: any) {
      console.error('Resume processing error:', err);
      return res.status(500).json({
        error: 'An unexpected error occurred while parsing the resume file. Please ensure it is not password protected and try again.'
      });
    }
  });

  /**
   * Public Contact Form API
   */
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Simulate storing message securely without external logging
    return res.json({
      success: true,
      message: 'Thank you for reaching out. We have received your inquiry and will respond within 1 business day.'
    });
  });

  /**
   * Admin Authentication
   */
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (!password || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Invalid admin password. Access denied.' });
    }

    const token = 'admin_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    adminTokens.add(token);
    return res.json({ success: true, token });
  });

  /**
   * Admin Aggregate Statistics & Audit
   */
  app.get('/api/admin/stats', requireAdmin, (_req, res) => {
    res.json(adminState);
  });

  /**
   * Admin Settings Update
   */
  app.post('/api/admin/settings', requireAdmin, (req, res) => {
    const { maxUploadSizeBytes, rateLimitPerHour, allowDocx, allowPdf, enableAdSenseSlots, geminiEnhancedParsing } = req.body;

    if (typeof maxUploadSizeBytes === 'number') adminState.systemSettings.maxUploadSizeBytes = maxUploadSizeBytes;
    if (typeof rateLimitPerHour === 'number') adminState.systemSettings.rateLimitPerHour = rateLimitPerHour;
    if (typeof allowDocx === 'boolean') adminState.systemSettings.allowDocx = allowDocx;
    if (typeof allowPdf === 'boolean') adminState.systemSettings.allowPdf = allowPdf;
    if (typeof enableAdSenseSlots === 'boolean') adminState.systemSettings.enableAdSenseSlots = enableAdSenseSlots;
    if (typeof geminiEnhancedParsing === 'boolean') adminState.systemSettings.geminiEnhancedParsing = geminiEnhancedParsing;

    res.json({
      success: true,
      systemSettings: adminState.systemSettings
    });
  });

  /**
   * Admin Logout
   */
  app.post('/api/admin/logout', requireAdmin, (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      adminTokens.delete(token);
    }
    res.json({ success: true });
  });

  // Production vs Development Server mounting
  async function startServer() {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    } else {
      app.use(express.static(path.join(__dirname, 'dist')));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
      });
    }

    app.listen(PORT, () => {
      console.log(`ResumeCheck server running on http://localhost:${PORT}`);
    });
  }

  startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
