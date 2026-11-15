'use client';

import React, { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  label: string;
  number: string;
}

const items: TocItem[] = [
  { id: 'problem', number: '01', label: 'Problem & Constraints' },
  { id: 'topology', number: '02', label: 'System Topology' },
  { id: 'decisions', number: '03', label: 'Key Decisions' },
  { id: 'evaluation', number: '04', label: 'Evaluation Matrix' },
  { id: 'economics', number: '05', label: 'Cost & Latency' },
  { id: 'failures', number: '06', label: 'Production Lessons' },
  { id: 'roadmap', number: '07', label: 'Next Steps' },
];

export const CaseStudyToc: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('problem');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(items[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav aria-label="Table of contents" className="space-y-4">
      <div className="font-mono text-[11px] text-[var(--accent)] tracking-[0.15em] uppercase font-medium">
        CONTENTS
      </div>
      <ul className="space-y-2.5 font-mono text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1 transition-colors ${
                  isActive
                    ? 'text-[var(--text-primary)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-transform ${
                    isActive ? 'bg-[var(--accent)] scale-125' : 'bg-[var(--hairline)]'
                  }`}
                />
                <span className="text-[10px] text-[var(--accent)]">{item.number}</span>
                <span className="truncate">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
