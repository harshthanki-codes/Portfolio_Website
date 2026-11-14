'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Menu, X, Command, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Work', href: '/#work' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Skills', href: '/#skills' },
    { label: 'Design System', href: '/design' },
    { label: 'Evaluation', href: '/eval' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface-overlay)] backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Monogram */}
        <NextLink
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <span className="w-2.5 h-2.5 bg-[var(--accent)] rounded-[var(--radius-xs)] inline-block" />
          <span>HARSH THANKI</span>
          <span className="text-[var(--text-tertiary)] font-normal text-xs">// AI.SYS</span>
        </NextLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <NextLink
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-mono text-xs tracking-wider transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
                  isActive ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-secondary)]'
                )}
              >
                {link.label}
              </NextLink>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Cmd+K Palette Trigger */}
          <button
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true })
              );
            }}
            aria-label="Open Command Palette (Cmd+K)"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[var(--text-secondary)] bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-xs)] hover:border-[var(--accent)] transition-colors"
          >
            <Command className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="text-[11px]">Cmd+K</span>
          </button>

          <ThemeToggle />

          <a
            href="/Harsh_Thanki_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block"
          >
            <Button size="sm" variant="outline" rightIcon={<FileText className="w-3.5 h-3.5" />}>
              Resume
            </Button>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] rounded-[var(--radius-xs)]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 space-y-3 font-mono text-sm">
          {navLinks.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[var(--text-secondary)] hover:text-[var(--accent)] border-b border-[var(--border-subtle)]"
            >
              {link.label}
            </NextLink>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="/Harsh_Thanki_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button size="sm" variant="outline" className="w-full justify-center">
                Download Resume (PDF)
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
