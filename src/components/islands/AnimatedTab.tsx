'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
}) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'flex flex-row flex-nowrap items-center justify-center gap-1 rounded-full p-1',
        'bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)]',
        'backdrop-blur-xl shadow-md max-w-full',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isHovered = hoveredTab === tab.id;

        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative z-10 cursor-pointer rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono font-semibold whitespace-nowrap transition-colors duration-200 outline-none sm:px-4 sm:py-2 md:px-5',
              isActive
                ? 'text-[var(--bg-app)]' // Active text (dark)
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' // Inactive text
            )}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Active Pill */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 z-[-1] rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)]"
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 32,
                  mass: 0.9,
                }}
              />
            )}

            {/* Hover Background - Subtle highlight */}
            {isHovered && !isActive && (
              <motion.div
                layoutId="hover-pill"
                className="absolute inset-0 z-[-1] rounded-full bg-[var(--bg-surface)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}

            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default AnimatedTabs;
