import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import Testimonials from './components/Testimonials.tsx';
import AutomationHub from './components/AutomationHub.tsx';
import Footer from './components/Footer.tsx';
import ContactSection from './components/ContactSection.tsx';
import AiCompanion from './components/AiCompanion.tsx';
import { AutomationResult } from './types.ts';

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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/30 font-sans">
      <Navbar onBookCall={handleBookCall} onContact={scrollToContact} />
      
      <main>
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
        
        <ContactSection 
          id="contact" 
          automationContext={automationContext} 
        />
      </main>

      <Footer />
      <AiCompanion />
    </div>
  );
};

export default App;