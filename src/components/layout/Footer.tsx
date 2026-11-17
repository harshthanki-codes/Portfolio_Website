'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { getAssetPath } from '@/lib/paths';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#6C84EE] bg-[#0C2699] py-8 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#BCC5F7]">
        <div>
          © 2026 Harsh Thanki · AI engineer · Ahmedabad, India
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#top"
            onClick={scrollToTop}
            className="hover:text-white transition-colors inline-flex items-center gap-1 min-h-[44px]"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://github.com/harshthanki-codes"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/harsh-thanki"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors min-h-[44px] flex items-center"
          >
            LinkedIn
          </a>
          <a
            href={getAssetPath('/Harsh_Thanki_Resume.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFE45C] transition-colors min-h-[44px] flex items-center"
          >
            Resume (PDF)
          </a>
        </div>
      </div>
    </footer>
  );
};
