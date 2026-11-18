'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { EMAIL, SITE } from '@/lib/site';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const progressBar = document.getElementById('scroll-progress');
      if (!progressBar) return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      progressBar.style.transform = `scaleX(${Math.min(Math.max(currentProgress, 0), 1)})`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        data-tone="paper"
        className="sticky top-0 z-40 w-full bg-[#F7F5F2] text-[#16161D] border-b border-[#E8E3DC]"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
          {/* Wordmark (Left) */}
          <NextLink
            href="/"
            className="font-display font-extrabold text-xl tracking-tight text-[#16161D] hover:opacity-80 transition-opacity"
          >
            <span>{SITE.name}</span>
          </NextLink>

          {/* Desktop Nav (Center/Right) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-base font-medium text-[#16161D] hover:text-[#55555F] transition-colors"
              >
                {item.label}
              </a>
            ))}

            <Button
              variant="coral"
              href={`mailto:${EMAIL}`}
              className="ml-2 font-display text-sm font-bold min-h-[48px]"
            >
              Email me
            </Button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center p-3 text-[#16161D] font-mono text-sm uppercase tracking-wider"
          >
            <span className="font-bold">{menuOpen ? 'CLOSE' : 'MENU'}</span>
          </button>
        </div>

        {/* Phase 7: Thin coral scroll-progress line under header */}
        <div
          id="scroll-progress"
          className="h-[2px] bg-[#FF5A36] w-full origin-left scale-x-0"
          aria-hidden="true"
        />
      </header>

      {/* Full-Screen Mobile Ink Menu with 56px Links */}
      {menuOpen && (
        <div
          data-tone="ink"
          className="fixed inset-0 z-50 bg-[#16161D] text-[#F7F5F2] flex flex-col justify-between p-6 sm:p-10 md:hidden"
        >
          <div className="flex items-center justify-between border-b border-[#2D2D38] pb-6">
            <span className="font-display font-extrabold text-xl text-[#F7F5F2]">
              {SITE.name}
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="text-[#B9B9C4] font-mono text-xs uppercase tracking-wider p-2"
              aria-label="Close menu"
            >
              [ CLOSE ]
            </button>
          </div>

          <nav className="flex flex-col gap-4 my-auto" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-display font-extrabold text-4xl sm:text-5xl text-[#F7F5F2] hover:text-[#FF5A36] transition-colors min-h-[56px] flex items-center"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setMenuOpen(false)}
              className="font-display font-extrabold text-4xl sm:text-5xl text-[#FF5A36] transition-colors min-h-[56px] flex items-center"
            >
              Email me
            </a>
          </nav>

          <div className="border-t border-[#2D2D38] pt-6 flex items-center justify-between text-xs font-mono text-[#B9B9C4]">
            <span>AI ENGINEER · AHMEDABAD</span>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F7F5F2]"
            >
              GITHUB
            </a>
          </div>
        </div>
      )}
    </>
  );
};
