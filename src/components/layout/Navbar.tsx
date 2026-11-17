'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { getAssetPath } from '@/lib/paths';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
    { label: 'Contact', href: '#contact', number: '03' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#2D2D38] bg-[#16161D]/95 backdrop-blur-sm transition-colors">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <NextLink
            href="/"
            className="group flex items-baseline gap-2 font-headline font-bold text-lg sm:text-xl tracking-tight text-[#F7F5F2] hover:text-[#FF5A36] transition-colors"
          >
            <span>Harsh Thanki</span>
            <span className="font-mono text-[11px] font-normal text-[#FF5A36] tracking-wider">
              / AI engineer
            </span>
          </NextLink>

          {/* Desktop Navigation: Work, About, Contact, Resume */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body text-[#A3A1B0] hover:text-[#F7F5F2] transition-colors"
              >
                <span className="font-mono text-[10px] text-[#A3A1B0]/70 mr-1.5">{link.number}</span>
                <span>{link.label}</span>
              </a>
            ))}

            <a
              href={getAssetPath('/Harsh_Thanki_Resume.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#353542] hover:border-[#FF5A36] hover:text-[#FF5A36] font-mono text-xs text-[#F7F5F2] transition-colors"
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              className="w-10 h-10 border border-[#353542] flex items-center justify-center text-[#F7F5F2] hover:border-[#FF5A36] hover:text-[#FF5A36] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#16161D] p-6 flex flex-col justify-between md:hidden bg-ink-grid">
          <div className="flex items-center justify-between pb-6 border-b border-[#2D2D38]">
            <span className="font-headline font-bold text-xl text-[#F7F5F2]">Harsh Thanki</span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close Navigation"
              className="w-11 h-11 border border-[#353542] flex items-center justify-center text-[#F7F5F2]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 py-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-headline font-bold text-4xl text-[#F7F5F2] hover:text-[#FF5A36] transition-colors flex items-baseline gap-4"
              >
                <span className="font-mono text-xs text-[#FF5A36]">{link.number}</span>
                <span>{link.label}</span>
              </a>
            ))}

            <a
              href={getAssetPath('/Harsh_Thanki_Resume.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 border border-[#FF5A36] text-[#FF5A36] font-mono text-sm font-semibold mt-4"
            >
              <span>Download Resume (PDF)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-6 border-t border-[#2D2D38] font-mono text-xs text-[#A3A1B0]">
            <div className="text-[#F7F5F2]">HARSH THANKI // AI ENGINEER</div>
            <div className="text-[10px] text-[#A3A1B0]/70 mt-1">AHMEDABAD, INDIA · LOCAL INFERENCE ARCHITECTURES</div>
          </div>
        </div>
      )}
    </>
  );
};
