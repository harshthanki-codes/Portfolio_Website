import React from 'react';
import NextLink from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6">
      <Card variant="default" showCrosshairs className="max-w-md w-full p-8 text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-[var(--radius-xs)] bg-[var(--surface-raised)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)]">
          <Terminal className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--accent)] font-semibold">
            ERROR 404 // ROUTE NOT FOUND
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Missing Invariant Boundary
          </h1>
          <p className="text-xs font-mono text-[var(--text-secondary)] leading-relaxed">
            The requested URI does not match any route handler, static case study, or design document in this deployment.
          </p>
        </div>

        <div className="pt-2">
          <NextLink href="/">
            <Button size="md" variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Overview
            </Button>
          </NextLink>
        </div>
      </Card>
    </div>
  );
}
