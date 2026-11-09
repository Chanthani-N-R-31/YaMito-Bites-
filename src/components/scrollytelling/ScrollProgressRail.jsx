import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { BOBA_CONFIG } from '../../config/bobaExperience.config';

/**
 * ScrollProgressRail
 * A high-end vertical scrollytelling indicator pinned to the right viewport margin.
 * Displays milestone tick marks and a smoothed caramel pill.
 */
export default function ScrollProgressRail({ smoothProgress }) {
  const heightPercent = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const milestoneTicks = [
    { label: '01', percent: 0 },
    { label: '02', percent: 25 },
    { label: '03', percent: 55 },
    { label: '04', percent: 80 },
    { label: '05', percent: 98 },
  ];

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center pointer-events-none select-none">
      {/* Background track line */}
      <div className="relative h-48 sm:h-64 w-[2px] bg-[#F9EFE3]/15 rounded-full overflow-hidden">
        {/* Active luminous fill */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#D49A5B] via-[#F9EFE3] to-[#82B29A]"
          style={{ height: heightPercent }}
        />
      </div>

      {/* Floating tick dots */}
      <div className="absolute inset-y-0 flex flex-col justify-between py-1">
        {milestoneTicks.map((tick, i) => (
          <div key={i} className="flex items-center gap-2 -mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F9EFE3]/30 border border-[#1C0C08]" />
            <span className="text-[9px] font-mono text-[#F9EFE3]/40 tracking-wider">
              {tick.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

