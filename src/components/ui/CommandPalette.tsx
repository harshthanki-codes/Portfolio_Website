'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, X, ArrowRight, FileText, Code2, Mail, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA } from '@/data/projects';

interface CommandItem {
  id: string;
  title: string;
  category: 'Projects' | 'Navigation' | 'Actions';
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Overview (Home)',
      category: 'Navigation',
      shortcut: 'GH',
      icon: <ArrowRight className="w-4 h-4 text-[var(--accent)]" />,
      action: () => router.push('/'),
    },
    {
      id: 'nav-design',
      title: 'Design System & Token Catalog',
      category: 'Navigation',
      shortcut: 'GD',
      icon: <Code2 className="w-4 h-4 text-[var(--accent)]" />,
      action: () => router.push('/design'),
    },
    {
      id: 'nav-eval',
      title: 'Model Evaluation Dashboard (/eval)',
      category: 'Navigation',
      shortcut: 'GE',
      icon: <Code2 className="w-4 h-4 text-[var(--accent)]" />,
      action: () => router.push('/eval'),
    },
    {
      id: 'action-resume',
      title: 'View Engineering Resume (PDF)',
      category: 'Actions',
      shortcut: 'VR',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => window.open('/Harsh_Thanki_Resume.pdf', '_blank'),
    },
    {
      id: 'action-email',
      title: 'Copy Email Address to Clipboard',
      category: 'Actions',
      shortcut: 'CE',
      icon: <Mail className="w-4 h-4 text-amber-400" />,
      action: () => {
        navigator.clipboard.writeText('harsh.h.thanki@gmail.com');
        alert('Email copied to clipboard: harsh.h.thanki@gmail.com');
      },
    },
    // Projects
    ...PROJECTS_DATA.map((project) => ({
      id: `proj-${project.slug}`,
      title: `Case Study: ${project.title}`,
      category: 'Projects' as const,
      shortcut: project.status,
      icon: <ExternalLink className="w-4 h-4 text-[var(--text-tertiary)]" />,
      action: () => router.push(`/work/${project.slug}`),
    })),
  ];

  const filteredItems = commandItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl bg-[var(--surface)] border border-[var(--border-strong)] rounded-[var(--radius-sm)] shadow-[var(--shadow-lg)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        <div className="flex items-center px-4 py-3 border-b border-[var(--border)] gap-2">
          <Search className="w-4 h-4 text-[var(--accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search case studies..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none font-mono"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-[var(--text-tertiary)] bg-[var(--surface-raised)] border border-[var(--border)] rounded-[var(--radius-xs)]">
            ESC
          </kbd>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-sm text-[var(--text-tertiary)] font-mono">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-[var(--radius-xs)] text-sm font-mono transition-colors ${
                  idx === selectedIndex
                    ? 'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-border)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-raised)]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {item.icon}
                  <span className="truncate">{item.title}</span>
                </div>
                {item.shortcut && (
                  <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)] font-mono shrink-0 ml-2">
                    {item.shortcut}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--surface-raised)] flex items-center justify-between text-[11px] font-mono text-[var(--text-tertiary)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Engineering Systems Palette</span>
        </div>
      </div>
    </div>
  );
};
