import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Terminal, 
  Zap, 
  Copy, 
  Check, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ExternalLink, 
  X,
  Compass,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'External';
  title: string;
  subtitle: string;
  shortcut?: string;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // High-Tech Web Audio Synthesizer (0 external audio assets)
  const playSound = (freq = 580, type: OscillatorType = 'sine', duration = 0.05) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  const triggerConfetti = () => {
    playSound(880, 'triangle', 0.15);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ff6600', '#ffaa00', '#ffffff', '#22c55e']
      });
    } catch {
      // Confetti fallback
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('harshthanki203@gmail.com');
    setCopied(true);
    playSound(720, 'sine', 0.08);
    setTimeout(() => setCopied(false), 2000);
  };

  const navigateTo = (hash: string) => {
    setIsOpen(false);
    playSound(520, 'sine', 0.05);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const COMMANDS: CommandItem[] = [
    {
      id: 'nav-solutions',
      category: 'Navigation',
      title: '01 // Client Solutions',
      subtitle: 'Custom LLM automation & enterprise systems',
      shortcut: 'S',
      action: () => navigateTo('#solutions')
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: '02 // Case Studies & Architectures',
      subtitle: 'Production codebases, failover DAGs & full dossiers',
      shortcut: 'P',
      action: () => navigateTo('#projects')
    },
    {
      id: 'nav-telemetry',
      category: 'Navigation',
      title: '03 // Systems Telemetry',
      subtitle: 'Live cluster health, p99 latencies & chaos lab',
      shortcut: 'T',
      action: () => navigateTo('#telemetry')
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: '04 // Technical Stack',
      subtitle: 'Python, PyTorch, FastAPI, Celery, Redis & Postgres',
      action: () => navigateTo('#skills')
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: '05 // Track Record & Metrics',
      subtitle: 'Empirical benchmarks, workstation fleet & production roles',
      action: () => navigateTo('#experience')
    },
    {
      id: 'nav-about',
      category: 'Navigation',
      title: '06 // Engineering Philosophy',
      subtitle: 'Zero marginal token cost & first-principles thinking',
      action: () => navigateTo('#about')
    },
    {
      id: 'nav-scoper',
      category: 'Navigation',
      title: '07 // Project Scoper',
      subtitle: 'Interactive architecture estimation & pilot budgeting',
      shortcut: 'C',
      action: () => navigateTo('#scoper')
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: '08 // Direct Dispatch',
      subtitle: 'Contact channels & guaranteed <24h response SLA',
      action: () => navigateTo('#contact')
    },
    {
      id: 'act-email',
      category: 'Actions',
      title: 'Copy Harsh\'s Direct Email',
      subtitle: 'harshthanki203@gmail.com',
      shortcut: 'M',
      action: copyEmail
    },
    {
      id: 'act-confetti',
      category: 'Actions',
      title: 'Launch Solar Particle Surge',
      subtitle: 'Trigger celebratory canvas particles',
      action: triggerConfetti
    },
    {
      id: 'act-sound',
      category: 'Actions',
      title: soundEnabled ? 'Mute Cyber Audio Feedback' : 'Enable Cyber Audio Feedback',
      subtitle: soundEnabled ? 'Disable Web Audio synthetic blips' : 'Enable interactive sci-fi audio cues',
      action: () => {
        setSoundEnabled(prev => !prev);
        playSound(640, 'triangle', 0.08);
      }
    },
    {
      id: 'ext-github',
      category: 'External',
      title: 'Open GitHub Repositories',
      subtitle: 'github.com/harshthanki-codes',
      action: () => window.open('https://github.com/harshthanki-codes', '_blank')
    },
    {
      id: 'ext-linkedin',
      category: 'External',
      title: 'Open LinkedIn Profile',
      subtitle: 'Connect with Harsh Thanki',
      action: () => window.open('https://www.linkedin.com/in/harsh-thanki-60ba41317/', '_blank')
    }
  ];

  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Global Key Listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        playSound(600, 'sine', 0.06);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, soundEnabled]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playSound(440, 'sine', 0.02);
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playSound(440, 'sine', 0.02);
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <>
      {/* Floating HUD Trigger Pill - Hidden on mobile (<sm) to prevent overlapping bottom content, visible on sm+ */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            playSound(600, 'sine', 0.06);
          }}
          className="touch-target group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0c0e16]/85 backdrop-blur-xl border border-white/15 hover:border-orange-500/60 text-white font-mono text-xs shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open Systems Console"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="font-semibold tracking-wide">Systems Console</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-300 font-mono border border-white/10 group-hover:border-orange-500/40">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Modal Backdrop & Command Palette */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh] transition-all"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-xl bg-[#08090d] border border-white/15 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col font-sans animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command Console"
          >
            {/* Top Accent Flare */}
            <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-4 h-4 text-orange-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                  playSound(680, 'sine', 0.02);
                }}
                onKeyDown={handleKeyDownInList}
                placeholder="Type a section or command (e.g. 'telemetry', 'email', 'scoper')..."
                className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none font-mono"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-gray-500 hover:text-white text-xs font-mono"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-gray-400 hover:text-white border border-white/10 bg-white/5"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Commands List */}
            <div className="max-h-[340px] overflow-y-auto no-scrollbar p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-gray-500">
                  No matching systems commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl font-mono text-xs flex items-center justify-between gap-3 transition-colors ${
                        isSelected 
                          ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/40 text-white' 
                          : 'text-gray-300 hover:bg-white/[0.04] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange-400 animate-pulse' : 'bg-white/20'}`} />
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate">{cmd.title}</div>
                          <div className="text-[10px] text-gray-400 truncate">{cmd.subtitle}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {cmd.id === 'act-email' && copied && (
                          <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>
                        )}
                        {cmd.shortcut && (
                          <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[9px] text-gray-400">
                            {cmd.shortcut}
                          </kbd>
                        )}
                        <span className="text-gray-500">&rarr;</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Meta Bar */}
            <div className="px-4 py-2.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <div className="flex items-center gap-3">
                <span>Navigate <kbd className="px-1 rounded bg-white/10 text-gray-300">↑↓</kbd></span>
                <span>Select <kbd className="px-1 rounded bg-white/10 text-gray-300">↵</kbd></span>
                <span>Close <kbd className="px-1 rounded bg-white/10 text-gray-300">esc</kbd></span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(prev => !prev)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3 h-3 text-orange-400" /> : <VolumeX className="w-3 h-3 text-gray-500" />}
                  <span>Audio {soundEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
export default CommandPalette;
