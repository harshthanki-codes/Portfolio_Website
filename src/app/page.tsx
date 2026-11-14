import React from 'react';
import { Hero } from '@/components/home/Hero';
import { SelectedWork } from '@/components/home/SelectedWork';
import { AboutSection } from '@/components/home/AboutSection';
import { WritingSection } from '@/components/home/WritingSection';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutSection />
      <WritingSection />
      <ContactSection />
    </>
  );
}
