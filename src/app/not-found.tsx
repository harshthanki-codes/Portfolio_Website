import React from 'react';
import NextLink from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Label } from '@/components/ui/Label';
import { assetPath } from '@/lib/paths';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center bg-[#F7F5F2] py-20">
      <Container className="max-w-[720px]">
        <div className="border border-[#16161D] p-8 md:p-14 bg-white text-center space-y-6">
          <Label tone="muted">Error 404 · Missing Route</Label>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#16161D] tracking-tight leading-[0.96]"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Page not found.
          </h1>

          <p className="text-base sm:text-lg text-[#55555F] max-w-[48ch] mx-auto leading-relaxed font-body">
            The requested page does not exist or has moved. Every case study and proof metric is indexed on the main overview.
          </p>

          <div className="pt-4 flex justify-center">
            <NextLink href={assetPath('/')}>
              <Button variant="coral" className="min-w-[200px]">
                Return to Overview →
              </Button>
            </NextLink>
          </div>
        </div>
      </Container>
    </main>
  );
}
