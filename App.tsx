import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import AutomationHub from './components/AutomationHub';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import AiCompanion from './components/AiCompanion';
import { AutomationResult } from './types';

const App: React.FC = () => {
  const [automationContext, setAutomationContext] = useState<AutomationResult | null>(null);

  const handleBookCall = () => {
    window.open('https://calendly.com/shahzarrayyan123/15-minutes-blueprint-automate-amplify-your-business', '_blank');
  };

  const handleAutomationComplete = (result: AutomationResult) => {
    setAutomationContext(result);
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 font-sans">
      <Navbar onBookCall={handleBookCall} onContact={scrollToContact} />
      
      <main>
        {/* We wrap components or add IDs to them directly for the AI Companion's IntersectionObserver */}
        
        <div id="hero">
          <Hero onBookCall={handleBookCall} />
        </div>
        
        <div id="features">
          <Features />
        </div>
        
        <div id="testimonials">
          <Testimonials />
        </div>
        
        <div id="automation">
          <AutomationHub 
            onBookCall={handleBookCall} 
            onAutomationComplete={handleAutomationComplete} 
          />
        </div>
        
        {/* ContactSection already accepts an ID prop */}
        <ContactSection 
          id="contact" 
          automationContext={automationContext} 
        />
      </main>

      <Footer />
      
      {/* The Sentient Orb Companion */}
      <AiCompanion />
    </div>
  );
};

export default App;