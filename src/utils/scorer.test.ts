import test from 'node:test';
import assert from 'node:assert/strict';
import {
  scoreResume,
  detectContactInfo,
  matchJobDescription,
  STRONG_ACTION_VERBS,
  getSampleDemoReport
} from './scorer';

test('detectContactInfo extracts email, phone, and links', () => {
  const sample = 'John Doe\njohn.doe@example.com\n(555) 123-4567\nlinkedin.com/in/johndoe\ngithub.com/johndoe';
  const info = detectContactInfo(sample);
  assert.equal(info.email, 'john.doe@example.com');
  assert.equal(info.phone, '(555) 123-4567');
  assert.equal(info.linkedIn, 'linkedin.com/in/johndoe');
  assert.equal(info.gitHub, 'github.com/johndoe');
});

test('matchJobDescription detects matched and missing keywords', () => {
  const resume = 'Experienced software engineer skilled in TypeScript, React, PostgreSQL, Docker, and Git.';
  const jobDesc = 'Looking for an engineer proficient in TypeScript, React, Kubernetes, and GraphQL with Docker.';

  const match = matchJobDescription(resume, jobDesc);
  assert.equal(match.jobDescriptionProvided, true);
  assert.ok(match.matchedKeywords.includes('typescript'));
  assert.ok(match.matchedKeywords.includes('react'));
  assert.ok(match.matchedKeywords.includes('docker'));
  assert.ok(match.missingKeywords.critical.includes('kubernetes') || match.missingKeywords.recommended.includes('kubernetes'));
  assert.ok(match.matchPercentage > 40);
});

test('scoreResume calculates explainable 0-100 score and detects passive phrases', () => {
  const text = `
Jane Smith
jane@company.com | 555-987-6543 | linkedin.com/in/janesmith

PROFESSIONAL SUMMARY
Senior Engineer with 6 years building cloud products.

WORK EXPERIENCE
Senior Developer | Acme Corp | 2021 - Present
• Spearheaded migration to AWS, reducing downtime by 35% and cutting server costs by $12,000 annually.
• Responsible for managing junior engineers and organizing meetings.

EDUCATION
B.S. in Computer Science | State University

TECHNICAL SKILLS
TypeScript, React, Node.js, AWS, PostgreSQL, Docker
  `;

  const report = scoreResume(text, 'Jane_Smith_Resume.pdf', 54200);
  assert.ok(report.overallScore >= 50 && report.overallScore <= 100);
  assert.equal(report.subscores.length, 5);
  
  // Check that the passive phrase "Responsible for" was flagged
  const passiveIssue = report.issues.find(i => i.id === 'passive-language');
  assert.ok(passiveIssue !== undefined);
  assert.ok(report.bulletRewrites.length > 0);
});

test('getSampleDemoReport returns valid demo data with isDemo flag true', () => {
  const demo = getSampleDemoReport();
  assert.equal(demo.isDemo, true);
  assert.ok(demo.overallScore > 0);
  assert.ok(demo.subscores.length === 5);
  assert.ok(demo.recommendedTemplates.length >= 2);
});
