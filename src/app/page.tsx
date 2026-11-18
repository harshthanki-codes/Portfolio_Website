import React from 'react';
import { HeroProofWrapper } from '@/components/home/HeroProofWrapper';
import { Hero } from '@/components/home/Hero';
import { ProofStrip } from '@/components/home/ProofStrip';
import { BreakATierDemo } from '@/components/home/BreakATierDemo';
import { SelectedWork } from '@/components/home/SelectedWork';
import { AboutSection } from '@/components/home/AboutSection';
import { ContactSection } from '@/components/home/ContactSection';
import { RevealObserver } from '@/components/motion/RevealObserver';

export default function HomePage() {
  return (
    <>
      <RevealObserver />
      <HeroProofWrapper>
        <Hero />
        <ProofStrip />
      </HeroProofWrapper>
      <BreakATierDemo />
      <SelectedWork />
      <AboutSection />
      <ContactSection />
    </>
  );
}
