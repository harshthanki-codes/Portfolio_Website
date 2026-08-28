import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Terminal } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Systems & Case Studies', href: '#projects' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Track Record', href: '#experience' },
  { label: 'Engineering Philosophy', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export const MobileNavDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Menu Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="touch-target p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none"
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Backdrop & Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div
            className="relative w-full max-w-xs bg-[var(--bg-app)] border-l border-[var(--border-strong)] h-full p-6 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <div className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--accent)] font-semibold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>Navigation Mesh</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="touch-target p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-[var(--radius-sm)]"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-2">
                {NAV_LINKS.map((link, idx) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="touch-target px-3 py-2.5 font-mono text-[var(--text-sm)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] border border-transparent hover:border-[var(--border-subtle)] transition-all flex items-center justify-between"
                  >
                    <span>0{idx + 1}. {link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Meta */}
            <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3 font-mono text-[var(--text-xs)]">
              <div className="text-[var(--text-tertiary)]">
                Harsh Thanki · Applied AI Systems
              </div>
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="touch-target w-full py-2.5 px-4 bg-[var(--accent)] text-[var(--accent-text)] text-center font-medium hover:bg-[var(--accent-hover)] transition-colors block"
              >
                Initiate Direct Contact →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
