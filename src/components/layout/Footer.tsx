import React from 'react';
import { SITE } from '@/lib/site';
import { Container } from '@/components/ui/Container';

export const Footer: React.FC = () => {
  return (
    <footer
      data-tone="ink"
      className="w-full bg-[#16161D] text-[#B9B9C4] border-t border-[#2D2D38] py-8"
    >
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div>
          © 2026 {SITE.name} · AI engineer · Ahmedabad, India
        </div>

        <div className="flex items-center gap-6">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F7F5F2] transition-colors"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F7F5F2] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#top"
            className="hover:text-[#FF5A36] transition-colors"
          >
            Top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
};
