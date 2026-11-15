'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { getAssetPath } from '@/lib/paths';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Work', href: '#work', number: '01' },
    { label: 'About', href: '#about', number: '02' },
    { label: 'Notes', href: '#notes', number: '03' },
    { label: 'Contact', href: '#contact', number: '04' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[var(--hairline)] bg-[var(--background)]/90 backdrop-blur-md transition-colors">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <NextLink
            href="/"
            className="group flex items-baseline gap-2 font-serif text-xl tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <span className="font-normal">Harsh Thanki</span>
            <span className="mono-label text-[11px] font-normal text-[var(--text-muted)] tracking-wider">
              / AI engineer
            </span>
          </NextLink>

          {/* Desktop 4-Item Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-sans text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Secondary Controls: Resume + Theme + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={getAssetPath('/Harsh_Thanki_Resume.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors py-1.5 px-2.5 rounded-[var(--radius)] border border-[var(--hairline)] hover:border-[var(--accent)]"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <ThemeToggle />

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden p-2 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors rounded-[var(--radius)] focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer with Large Serif Links */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 top-16 z-50 bg-[var(--background)] flex flex-col justify-between px-6 py-10 md:hidden overflow-y-auto animate-fadeIn"
        >
          <div className="space-y-6">
            <div className="mono-label text-xs text-[var(--accent)] tracking-widest uppercase pb-4 border-b border-[var(--hairline)]">
              Menu // Navigation
            </div>

            <nav className="flex flex-col space-y-4 pt-2">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-baseline justify-between py-2 border-b border-[var(--hairline)] hover:border-[var(--accent)] transition-colors"
                  style={{ animationDelay: `${idx * 60}ms` }}
                >
                  <span className="font-serif text-3xl sm:text-4xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                    {link.label}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                    {link.number}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Mobile Drawer Bottom Colophon & Resume */}
          <div className="pt-8 space-y-4 border-t border-[var(--hairline)]">
            <a
              href={getAssetPath('/Harsh_Thanki_Resume.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-between p-3.5 bg-[var(--surface)] border border-[var(--hairline)] rounded-[var(--radius)] text-sm font-mono text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <span>Download Resume (PDF)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-2">
              <span>Ahmedabad, India</span>
              <span>harsh.h.thanki@gmail.com</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
