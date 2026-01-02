import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Zap, Minimize2, Aperture } from 'lucide-react';
import { chatWithCompanion } from '../services/geminiService.ts';

const SECTIONS_CONFIG: Record<string, { top: string; right?: string; left?: string; message: string }> = {
  'hero': { 
    top: '15%', 
    right: '8%', 
    message: "Welcome to Raynaters. I am your navigator." 
  },
  'features': { 
    top: '35%', 
    right: '5%', 
    message: "Scanning intelligence stack... Which module interests you?" 
  },
  'testimonials': { 
    top: '75%', 
    left: '5%', 
    message: "Analysis: 99.9% positive sentiment from current partners." 
  },
  'automation': { 
    top: '40%', 
    right: '10%', 
    message: "I can architect a custom solution for you right now." 
  },
  'contact': { 
    top: '80%', 
    right: '8%', 
    message: "Ready to deploy? Let's get you connected." 
  },
  'default': { 
    top: '85%', 
    right: '5%', 
    message: "Systems operational." 
  }
};

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiCompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Greetings. I am Raynaters Unit-01, your autonomous guide. How can I assist your scaling operations today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [targetMessage, setTargetMessage] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showBubble || !targetMessage) return;
    let currentIndex = 0;
    setDisplayedMessage('');
    const intervalId = setInterval(() => {
      if (currentIndex < targetMessage.length) {
        setDisplayedMessage(targetMessage.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 30);
    return () => clearInterval(intervalId);
  }, [targetMessage, showBubble]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setCurrentSection(sectionId);
            triggerNewMessage(sectionId);
          }
        });
      },
      { threshold: 0.3 }
    );
    const sections = ['hero', 'features', 'testimonials', 'automation', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const triggerNewMessage = (sectionId: string) => {
    if (isOpen) return;
    setShowBubble(false);
    setTimeout(() => {
      if (isOpen) return;
      const msg = SECTIONS_CONFIG[sectionId]?.message || SECTIONS_CONFIG['default'].message;
      setTargetMessage(msg);
      setShowBubble(true);
    }, 800); 
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setShowBubble(false);
      setIsSpinning(true);
      setTimeout(() => {
        setIsSpinning(false);
        setIsOpen(true);
      }, 800); 
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);
    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await chatWithCompanion(history, userText);
      setMessages(prev => [...prev, { role: 'model', text: response || "I didn't catch that." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection interference. Re-aligning satellite..." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const config = SECTIONS_CONFIG[currentSection] || SECTIONS_CONFIG['default'];
  const positionStyle = { 
    top: config.top, 
    right: config.right || 'auto', 
    left: config.left || 'auto',
    bottom: 'auto'
  };

  return (
    <>
      <div className="fixed z-50 transition-all duration-[1500ms] cubic-bezier(0.22, 1, 0.36, 1) pointer-events-none" style={positionStyle}>
        <div className="relative pointer-events-auto">
          {showBubble && !isOpen && (
            <div className={`absolute top-1/2 -translate-y-1/2 ${config.left ? 'left-24' : 'right-24'} bg-white/95 backdrop-blur-md border border-blue-200 text-slate-800 px-5 py-4 rounded-2xl rounded-tr-sm shadow-xl min-w-[220px] max-w-[280px]`}>
              <div className="flex items-start gap-3">
                 <Bot size={18} className="text-[#0551a2] mt-1 shrink-0 animate-pulse" />
                 <p className="text-sm font-medium leading-relaxed">{displayedMessage}</p>
              </div>
            </div>
          )}
          <button onClick={handleToggle} className={`relative group flex items-center justify-center transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="absolute inset-0 bg-[#0551a2]/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-500"></div>
            <div className={`animate-[float_6s_ease-in-out_infinite] ${isSpinning ? 'animate-[spin_0.8s_ease-in-out]' : ''}`}>
              <div className="w-16 h-16 bg-white rounded-full border border-blue-200 shadow-2xl flex items-center justify-center relative z-10 overflow-hidden ring-1 ring-blue-50 group-hover:border-[#0551a2] transition-colors">
                 <div className="relative z-20 w-8 h-8 bg-[#0551a2] rounded-full flex items-center justify-center border border-blue-800">
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse"></div>
                 </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className={`fixed bottom-8 right-4 md:right-8 w-[95vw] md:w-[400px] h-[600px] z-50 transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-20 pointer-events-none'}`}>
        <div className="w-full h-full bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
           <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 z-50 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 border border-slate-200"><Minimize2 size={16} /></button>
           <div className="relative h-24 bg-gradient-to-b from-blue-50 to-white p-6 flex items-end border-b border-slate-100">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-md"><Aperture className="text-[#0551a2] animate-[spin_10s_linear_infinite]" size={24} /></div>
                 <div><h3 className="text-slate-900 font-bold text-lg">Raynaters Unit-01</h3><div className="flex items-center gap-2 text-xs text-blue-600 font-mono"><Zap size={10} /><span>Connected</span></div></div>
              </div>
           </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'model' ? 'flex gap-3' : ''}`}>
                   {msg.role === 'model' && (<div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-1"><Bot size={14} className="text-[#0551a2]" /></div>)}
                   <div className={`rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#0551a2] text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>{msg.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (<div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-1"><Bot size={14} className="text-[#0551a2]" /></div><div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex gap-1"><span className="w-1.5 h-1.5 bg-[#0551a2] rounded-full animate-bounce"></span></div></div>)}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center bg-slate-50 rounded-xl overflow-hidden border border-slate-200 focus-within:border-[#0551a2]">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Execute command..." className="w-full bg-transparent text-slate-900 px-4 py-4 focus:outline-none text-sm" />
              <button type="submit" disabled={!inputValue.trim() || isTyping} className="absolute right-2 p-2 bg-[#0551a2] text-white rounded-lg"><Send size={16} /></button>
            </div>
          </form>
        </div>
      </div>
      <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
    </>
  );
};

export default AiCompanion;