import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Terminal } from 'lucide-react';

interface NavLink {
  num: string;
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { num: '01', label: 'Client Solutions', href: '#solutions' },
  { num: '02', label: 'Systems & Case Studies', href: '#projects' },
  { num: '03', label: 'Telemetry Proof', href: '#telemetry' },
  { num: '04', label: 'Technical Stack', href: '#skills' },
  { num: '05', label: 'Track Record', href: '#experience' },
  { num: '06', label: 'Engineering Philosophy', href: '#about' },
  { num: '07', label: 'Scope Project', href: '#scoper' },
  { num: '08', label: 'Direct Dispatch', href: '#contact' }
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
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="touch-target p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] rounded-[var(--radius-sm)] transition-colors focus-visible:outline-none"
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop & Drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        >
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--bg-app)] border-l border-[var(--border-subtle)] p-6 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Mobile Navigation"
          >
            <div>
              {/* Header with Circle Avatar */}
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--accent-border)] ring-1 ring-[var(--accent)]/30 shrink-0">
                    <img 
                      src="/Portfolio_Website/images/harsh-thanki.png" 
                      alt="Harsh Thanki" 
                      className="w-full h-full object-cover object-top" 
                      width="32" 
                      height="32" 
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/Portfolio_Website/images/harsh-thanki.webp'; }}
                    />
                  </div>
                  <div className="font-mono text-[var(--text-xs)] uppercase tracking-wider text-[var(--text-primary)] font-bold">
                    Harsh Thanki
                  </div>
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

              {/* Links */}
              <nav className="space-y-1.5 font-mono text-[var(--text-sm)] mt-6" aria-label="Mobile Menu Links">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="touch-target flex items-center justify-between p-3 rounded-[var(--radius-sm)] border border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
                  >
                    <span className="text-[var(--accent)] font-semibold">{item.num} //</span>
                    <span className="font-medium">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Meta */}
            <div className="pt-6 border-t border-[var(--border-subtle)] space-y-3 font-mono text-[var(--text-xs)]">
              <div className="text-[var(--text-tertiary)]">
                Harsh Thanki · AI Architect &amp; Solutions Engineer
              </div>
              <a
                href="#scoper"
                onClick={handleLinkClick}
                className="touch-target w-full py-2.5 px-4 bg-[var(--accent)] text-[var(--accent-text)] text-center font-bold hover:bg-[var(--accent-hover)] transition-colors block shadow-sm"
              >
                Scope Project &rarr;
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
