import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ProofStrip } from '@/components/home/ProofStrip';
import { BreakATierDemo } from '@/components/home/BreakATierDemo';
import { SelectedWork } from '@/components/home/SelectedWork';
import { AboutSection } from '@/components/home/AboutSection';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <BreakATierDemo />
      <SelectedWork />
      <AboutSection />
      <ContactSection />
    </>
  );
}
