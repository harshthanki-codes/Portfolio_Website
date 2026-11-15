import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ProofStrip } from '@/components/home/ProofStrip';
import { SelectedWork } from '@/components/home/SelectedWork';
import { AboutSection } from '@/components/home/AboutSection';
import { WritingSection } from '@/components/home/WritingSection';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <SelectedWork />
      <AboutSection />
      <WritingSection />
      <ContactSection />
    </>
  );
}
