import React from 'react';
import { Hero } from '@/components/home/Hero';
import { SelectedWork } from '@/components/home/SelectedWork';
import { ExperienceTimeline } from '@/components/home/ExperienceTimeline';
import { SkillsSection } from '@/components/home/SkillsSection';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ExperienceTimeline />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
