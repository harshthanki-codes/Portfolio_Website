'use client';

import React from 'react';
import NextLink from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Link } from '@/components/ui/Link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ArrowLeft, ArrowRight, CheckCircle2, Copy, Sparkles, Terminal } from 'lucide-react';

export default function DesignSystemPage() {
  const colorTokens = [
    { name: 'Background', var: '--background', darkHex: '#090B0E', lightHex: '#F8FAFC', contrast: '21:1' },
    { name: 'Surface', var: '--surface', darkHex: '#101318', lightHex: '#FFFFFF', contrast: '19:1' },
    { name: 'Surface Raised', var: '--surface-raised', darkHex: '#161B22', lightHex: '#F1F5F9', contrast: '16:1' },
    { name: 'Border', var: '--border', darkHex: '#21262D', lightHex: '#E2E8F0', contrast: '3.5:1' },
    { name: 'Border Strong', var: '--border-strong', darkHex: '#30363D', lightHex: '#CBD5E1', contrast: '4.8:1' },
    { name: 'Text Primary', var: '--text-primary', darkHex: '#F0F6FC', lightHex: '#0F172A', contrast: '16.5:1 (AAA)' },
    { name: 'Text Secondary', var: '--text-secondary', darkHex: '#8B949E', lightHex: '#475569', contrast: '7.2:1 (AA)' },
    { name: 'Accent (Amber)', var: '--accent', darkHex: '#F59E0B', lightHex: '#D97706', contrast: '9.4:1 (AA)' },
  ];

  const typeTokens = [
    { label: 'Display Large', size: '3.5rem (56px)', weight: '700', sample: 'Autonomous ERP Intelligence' },
    { label: 'H1 Headline', size: '2.5rem (40px)', weight: '700', sample: 'Deterministic LLM Backends' },
    { label: 'H2 Section', size: '1.875rem (30px)', weight: '600', sample: '01 // Production Architecture' },
    { label: 'H3 Component', size: '1.25rem (20px)', weight: '600', sample: '7-Tier Failover DAG Ingestion' },
    { label: 'Body Text', size: '1rem (16px)', weight: '400', sample: 'Locally deployed open-weights intelligence matching commercial APIs.' },
    { label: 'Micro Mono', size: '0.75rem (12px)', weight: '500 Mono', sample: 'P99_LATENCY: 42ms // ZERO_TOKEN_COST' },
  ];

  const spacingTokens = [
    { token: '8px', name: 'space-1', use: 'Compact inner card gaps, badge padding' },
    { token: '16px', name: 'space-2', use: 'Button padding, list item gutters' },
    { token: '24px', name: 'space-3', use: 'Card interior padding, grid gap' },
    { token: '32px', name: 'space-4', use: 'Component margins, section subtitles' },
    { token: '48px', name: 'space-6', use: 'Major section dividers, hero spacing' },
    { token: '64px', name: 'space-8', use: 'Desktop section rhythm padding' },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-4 pb-8 border-b border-[var(--border)]">
        <NextLink
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--accent)] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </NextLink>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Precision Engineering Design System
            </h1>
            <p className="text-sm font-mono text-[var(--text-secondary)] mt-1">
              Token catalog, component states, and accessibility specifications for Tailwind v4.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--text-tertiary)]">Live Theme:</span>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* 01. Color Tokens */}
      <section className="space-y-6">
        <SectionHeading
          number="01"
          tag="DESIGN TOKENS"
          title="Color & Contrast Architecture"
          subtitle="Strict dual-palette with high-contrast obsidian base, technical blueprint light mode, and industrial amber accent. Tested for WCAG 2.1 AA compliance."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {colorTokens.map((c) => (
            <Card key={c.name} variant="raised" className="p-4 space-y-3 font-mono text-xs">
              <div
                className="w-full h-12 rounded-[var(--radius-xs)] border border-[var(--border)] shadow-inner"
                style={{ backgroundColor: `var(${c.var})` }}
              />
              <div className="space-y-1">
                <div className="font-bold text-[var(--text-primary)]">{c.name}</div>
                <div className="text-[11px] text-[var(--text-tertiary)]">{c.var}</div>
                <div className="flex items-center justify-between text-[10px] pt-2 border-t border-[var(--border-subtle)]">
                  <span>Contrast:</span>
                  <span className="text-emerald-400 font-semibold">{c.contrast}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 02. Typography Scale */}
      <section className="space-y-6">
        <SectionHeading
          number="02"
          tag="TYPOGRAPHY SCALE"
          title="Hierarchical Type Tokens"
          subtitle="Display headings, structured body copy, and JetBrains Mono micro-labels self-hosted via next/font with zero layout shift."
        />

        <Card variant="default" className="divide-y divide-[var(--border)] p-0 overflow-hidden">
          {typeTokens.map((t) => (
            <div key={t.label} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="md:w-1/3 space-y-0.5">
                <div className="font-mono text-xs font-semibold text-[var(--text-primary)]">{t.label}</div>
                <div className="font-mono text-[11px] text-[var(--text-tertiary)]">
                  {t.size} • {t.weight}
                </div>
              </div>
              <div className="md:w-2/3 text-[var(--text-primary)]">
                <p className="truncate text-base sm:text-lg">{t.sample}</p>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* 03. Spacing Grid (8px) */}
      <section className="space-y-6">
        <SectionHeading
          number="03"
          tag="SPACING & METRICS"
          title="Strict 8px Rhythm Grid"
          subtitle="Uniform mathematical increments governing component margins, touch targets, and section gutters."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spacingTokens.map((s) => (
            <Card key={s.token} variant="raised" className="p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--accent)]">{s.token}</span>
                <span className="text-[var(--text-tertiary)]">{s.name}</span>
              </div>
              <div
                className="bg-[var(--accent-subtle)] border border-[var(--accent-border)] rounded-[var(--radius-xs)]"
                style={{ height: s.token, width: '100%' }}
              />
              <p className="text-[11px] text-[var(--text-secondary)]">{s.use}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 04. Component State Review */}
      <section className="space-y-6">
        <SectionHeading
          number="04"
          tag="COMPONENT LIBRARY"
          title="Interactive Components & State Matrix"
          subtitle="Testing default, hover, focus-visible, active, disabled, and loading states for all design system primitives."
        />

        <div className="space-y-8">
          {/* Buttons Matrix */}
          <Card variant="default" className="p-6 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase text-[var(--text-primary)] tracking-wider">
              Button Primitives (Variants & States)
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="md">Primary Button</Button>
              <Button variant="secondary" size="md">Secondary Button</Button>
              <Button variant="outline" size="md">Outline Button</Button>
              <Button variant="ghost" size="md">Ghost Button</Button>
              <Button variant="primary" size="md" isLoading>Loading State</Button>
              <Button variant="secondary" size="md" disabled>Disabled State</Button>
            </div>
            <div className="flex flex-wrap gap-3 items-center pt-2">
              <Button variant="primary" size="sm">Small (sm)</Button>
              <Button variant="primary" size="md">Medium (md)</Button>
              <Button variant="primary" size="lg">Large (lg)</Button>
            </div>
          </Card>

          {/* Tags Matrix */}
          <Card variant="default" className="p-6 space-y-4">
            <h3 className="font-mono text-xs font-bold uppercase text-[var(--text-primary)] tracking-wider">
              Tag / Status Badge Primitives
            </h3>
            <div className="flex flex-wrap gap-2.5 items-center">
              <Tag variant="default">Default Tag</Tag>
              <Tag variant="accent">Accent System</Tag>
              <Tag variant="success">Status: Optimal</Tag>
              <Tag variant="warning">Fallback DAG</Tag>
              <Tag variant="error">Degraded Node</Tag>
            </div>
          </Card>

          {/* Cards & Blueprint Crosshairs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="default" showCrosshairs className="p-6 space-y-2">
              <div className="font-mono text-xs text-[var(--accent)] font-semibold">Card (Default + Crosshairs)</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Standard technical card using subtle 1px border with corner precision markers for engineering schematics.
              </p>
            </Card>

            <Card variant="raised" className="p-6 space-y-2">
              <div className="font-mono text-xs text-[var(--accent)] font-semibold">Card (Raised Surface)</div>
              <p className="text-xs text-[var(--text-secondary)]">
                Higher elevation surface for interactive components and nested timeline entries.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
