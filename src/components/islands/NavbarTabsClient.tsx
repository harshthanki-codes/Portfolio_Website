import React, { useState, useEffect } from 'react';
import { AnimatedTabs } from './AnimatedTab';

export function NavbarTabsClient() {
  const [activeTab, setActiveTab] = useState('');

  const tabs = [
    { id: '#solutions', label: '01 // Solutions' },
    { id: '#projects', label: '02 // Systems' },
    { id: '#telemetry', label: '03 // Telemetry' },
    { id: '#skills', label: '04 // Stack' },
    { id: '#experience', label: '05 // Timeline' },
    { id: '#about', label: '06 // Philosophy' }
  ];

  useEffect(() => {
    const onHashChange = () => setActiveTab(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <AnimatedTabs 
      tabs={tabs} 
      activeTab={activeTab} 
      onChange={(id) => { 
        setActiveTab(id); 
        window.location.hash = id; 
      }} 
    />
  );
}