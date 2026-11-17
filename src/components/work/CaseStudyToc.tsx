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
  { id: 'failures', number: '06', label: 'What Broke' },
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
    <nav aria-label="Table of contents" className="p-4 bg-white border border-[#6C84EE] text-[#0A1450] space-y-4">
      <div className="font-mono text-[11px] text-[#1237D1] tracking-[0.15em] uppercase font-bold border-b border-[#6C84EE]/30 pb-2">
        SPECIFICATION INDEX
      </div>
      <ul className="space-y-2 font-mono text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1 px-1.5 transition-colors ${
                  isActive
                    ? 'bg-[#1237D1] text-white font-bold'
                    : 'text-[#0A1450]/80 hover:text-[#1237D1] hover:bg-[#F3F5FF]'
                }`}
              >
                <span className="text-[10px] opacity-70">{item.number}</span>
                <span className="truncate">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
