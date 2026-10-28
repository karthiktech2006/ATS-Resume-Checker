import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  format?: 'leaderboard' | 'rectangle' | 'in-feed';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'ats-content-unit',
  format = 'leaderboard',
  className = ''
}) => {
  return (
    <div
      className={`my-8 mx-auto border border-dashed border-[#e5e5e5] bg-[#fafafa] rounded-md flex flex-col items-center justify-center text-center p-4 select-none ${className}`}
      data-ad-slot={slotId}
      aria-label="Advertisement placeholder"
    >
      <span className="text-[11px] font-medium tracking-wider text-[#909090] uppercase mb-1">
        Advertisement
      </span>
      <p className="text-xs text-[#606060] max-w-sm">
        Prepared Google AdSense display placeholder (Slot: {slotId}). Live ads load only after publisher verification.
      </p>
    </div>
  );
};
