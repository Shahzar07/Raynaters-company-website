import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, PlayCircle, Activity, ChevronRight, Terminal, Wifi, Lock, Cpu, Globe, Users, TrendingUp, BarChart3, MessageSquare, Database } from 'lucide-react';

interface HeroProps {
  onBookCall: () => void;
}

const portfolioItems = [
  {
    id: 1,
    title: "Sentient Sales_OS",
    category: "Revenue Automation",
    statValue: 340,
    statSuffix: "%",
    statLabel: "Lead Velocity",
    icon: BarChart3,
    video: "https://cdn.coverr.co/videos/coverr-analyzing-financial-data-4627/1080p.mp4",
    desc: "Autonomous prospect engagement, qualification, and CRM synchronization without human intervention.",
    stack: ["OpenAI", "HubSpot", "Make.com"],
    logs: [
      "> Initializing Sales_OS kernel...",
      "> Connecting to LinkedIn Sales Nav API...",
      "> Analyzing 500+ prospect profiles...",
      "> Identifying decision makers...",
      "> SUCCESS: 42 qualified leads queued."
    ]
  },
  {
    id: 2,
    title: "Nexus Support_Bot",
    category: "CX Intelligence",
    statValue: 0.2,
    statSuffix: "s",
    statLabel: "Response Time",
    icon: MessageSquare,
    video: "https://cdn.coverr.co/videos/coverr-typing-on-computer-keyboard-4680/1080p.mp4",
    desc: "Context-aware resolution agents handling tier-1 tickets 24/7 with human-like empathy.",
    stack: ["Intercom", "Pinecone", "GPT-4o"],
    logs: [
      "> Monitoring support inbox (IMAP)...",
      "> Ticket #4092 detected: 'Login Issue'",
      "> RAG Retrieval: Knowledge_Base_v2...",
      "> Generating empathy-aligned response...",
      "> Draft sent to human for review."
    ]
  },
  {
    id: 3,
    title: "Data Core_Link",
    category: "Infrastructure",
    statValue: 99.9,
    statSuffix: "%",
    statLabel: "Data Accuracy",
    icon: Database,
    video: "https://cdn.coverr.co/videos/coverr-server-room-4796/1080p.mp4",
    desc: "Self-healing data pipelines that extract, transform, and load enterprise data instantly.",
    stack: ["Snowflake", "Python", "Airflow"],
    logs: [
      "> Pipeline trigger: DAILY_SYNC...",
      "> Extracting 2TB from Legacy_DB...",
      "> Transforming schema to JSON...",
      "> Anomaly detection: 0 errors found.",
      "> Loading to Data Warehouse... DONE."
    ]
  },
  {
    id: 4,
    title: "Talent Scout_AI",
    category: "HR Automation",
    statValue: 45,
    statSuffix: "hrs",
    statLabel: "Time Saved / Hire",
    icon: Users,
    video: "https://cdn.coverr.co/videos/coverr-people-working-in-office-4632/1080p.mp4",
    desc: "Automated candidate sourcing, resume screening, and initial interview scheduling to find top talent faster.",
    stack: ["LinkedIn API", "Greenhouse", "LangChain"],
    logs: [
      "> Scanned 200 resumes...",
      "> Keyword match: 'React', 'Node.js'...",
      "> Scheduling intro calls for Top 5...",
      "> Syncing calendar invites...",
      "> Candidates notified."
    ]
  },
  {
    id: 5,
    title: "Market Watch_Pro",
    category: "Strategic Intel",
    statValue: 12,
    statSuffix: "mkts",
    statLabel: "Competitors Tracked",
    icon: TrendingUp,
    video: "https://cdn.coverr.co/videos/coverr-stock-market-data-4623/1080p.mp4",
    desc: "Real-time competitor analysis, pricing alerts, and trend forecasting delivered to your dashboard.",
    stack: ["BrowsingAgent", "Sentiment Analysis", "Slack"],
    logs: [
      "> Scanning competitor pricing pages...",
      "> Change detected: Competitor B -10%...",
      "> Analyzing sentiment trends...",
      "> Generating strategy report...",
      "> Alert sent to #strategy channel."
    ]
  }
];

const Hero: React.FC<HeroProps> = ({ onBookCall }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [displayStat, setDisplayStat] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % portfolioItems.length);
      }, 8000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }

    const target = portfolioItems[activeTab].statValue;
    const duration = 1500;
    const startTime = performance.now();

    const animateStat = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = target * ease;
      
      if (Number.isInteger(target)) {
        setDisplayStat(Math.floor(currentVal));
      } else {
        setDisplayStat(parseFloat(currentVal.toFixed(1)));
      }

      if (progress < 1) {
        requestAnimationFrame(animateStat);
      }
    };
    requestAnimationFrame(animateStat);

  }, [activeTab]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100/50"></div>
        {/* Subtle noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-multiply"></div>
        
        {/* Color Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/60 text-[#0551a2] text-xs font-semibold mb-8 backdrop-blur-sm shadow-sm animate-[fadeIn_0.5s_ease-out]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0551a2]"></span>
          </span>
          System Operational • Accepting Q4 Clients
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          We Build Custom <br />
          <span className="gradient-text">AI Automation Systems</span>
        </h1>
        
        <p className="mt-4 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Raynaters is a premium automation agency. We deploy intelligent agents that handle your busy work so you can focus on scaling revenue.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <button 
            onClick={onBookCall}
            className="group bg-[#0551a2] text-white px-8 py-4 rounded-full text-base font-bold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 transform hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            Book a Strategy Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group px-8 py-4 rounded-full text-slate-700 font-medium border border-slate-200 bg-white hover:border-blue-200 hover:text-[#0551a2] hover:shadow-md transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
            <PlayCircle size={18} className="text-slate-400 group-hover:text-[#0551a2] transition-colors" /> View Live Demo
          </button>
        </div>

        {/* DASHBOARD CONTAINER */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto max-w-6xl animate-[fadeIn_0.8s_ease-out]"
        >
          {/* Spotlight */}
          <div 
            className="absolute -inset-px rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(5, 81, 162, 0.08), transparent 40%)`
            }}
          />
          
          {/* Dashboard Frame - Refined Borders */}
          <div className="relative bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5 transition-shadow">
            
            {/* Top Bar HUD */}
            <div className="h-12 bg-slate-50/50 backdrop-blur border-b border-slate-100 flex items-center px-6 justify-between select-none">
              <div className="flex gap-4 items-center">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                </div>
                <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>
                <div className="text-[10px] font-mono text-[#0551a2] flex items-center gap-2 tracking-wider">
                  <Wifi size={12} className="animate-pulse" /> NET_LINK: SECURE
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 flex items-center gap-3">
                 <span className="hidden sm:inline">RAM: 14%</span>
                 <span className="hidden sm:inline">CPU: 3%</span>
                 <div className="flex items-center gap-1 text-slate-400">
                    <Globe size={12} /> US-EAST-1
                 </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[600px]">
              
              {/* Left Sidebar */}
              <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/30 flex flex-col z-20">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Cpu size={14} /> Active Protocols
                  </h3>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {portfolioItems.map((item, index) => {
                    const isActive = activeTab === index;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveTab(index); setIsAutoPlaying(false); }}
                        className={`w-full text-left p-5 border-b border-slate-100 transition-all duration-300 relative group overflow-hidden ${
                          isActive ? 'bg-white shadow-[inset_3px_0_0_#0551a2]' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2 relative z-10">
                          <div className={`p-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-[#0551a2] text-white shadow-md scale-110' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}`}>
                            <item.icon size={16} />
                          </div>
                          <span className={`font-mono text-[10px] transition-colors ${isActive ? 'text-[#0551a2] font-bold' : 'text-slate-400'}`}>0{item.id}</span>
                        </div>
                        <h4 className={`font-bold text-sm mb-1 transition-colors relative z-10 ${isActive ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-800'}`}>{item.title}</h4>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase relative z-10">{item.category}</p>
                      </button>
                    );
                  })}
                </div>
                
                {/* System Log Mini-Terminal */}
                <div className="p-4 bg-[#0B1120] border-t border-slate-900 h-48 overflow-hidden font-mono text-[10px] text-slate-300 relative">
                  <div className="absolute top-2 right-2 text-xs text-slate-600"><Terminal size={12} /></div>
                  <div className="flex flex-col justify-end h-full gap-1">
                    {portfolioItems[activeTab].logs.map((log, i) => (
                      <div key={i} className="animate-[slideRight_0.3s_ease-out] flex gap-2">
                        <span className="text-slate-600">{new Date().toLocaleTimeString('en-US', {hour12: false})}</span>
                        <span className={log.includes("SUCCESS") ? "text-emerald-400" : log.includes("Error") ? "text-rose-400" : "text-blue-300"}>
                          {log}
                        </span>
                      </div>
                    ))}
                    <div className="flex gap-2 animate-pulse">
                      <span className="text-slate-600">{new Date().toLocaleTimeString('en-US', {hour12: false})}</span>
                      <span className="text-blue-400">_</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Display Area */}
              <div className="flex-1 relative bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center">
                
                {/* Video Layer */}
                <div className="absolute inset-0 z-0">
                   {/* Pixel Grid */}
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                   
                   <video
                    ref={videoRef}
                    key={portfolioItems[activeTab].video}
                    className="w-full h-full object-cover opacity-20 transition-opacity duration-1000 scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                   >
                     <source src={portfolioItems[activeTab].video} type="video/mp4" />
                   </video>
                   
                   {/* Vignette */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/80"></div>
                </div>

                {/* Content Layer - CENTERED */}
                <div className="relative z-30 w-full max-w-3xl px-8 py-12 flex flex-col items-center text-center space-y-8">
                  
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-200 text-[10px] font-mono mb-2 backdrop-blur-md">
                    <Lock size={10} /> ENCRYPTED STREAM • {portfolioItems[activeTab].category.toUpperCase()}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex gap-2 justify-center flex-wrap">
                    {portfolioItems[activeTab].stack.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Main Title & Desc */}
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
                       {portfolioItems[activeTab].title}
                    </h2>
                    <p className="text-slate-300 text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                      {portfolioItems[activeTab].desc}
                    </p>
                  </div>

                  {/* Action Area with Stats */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full pt-4">
                    
                    {/* Animated Stat Box */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl flex flex-col items-center min-w-[200px]">
                      <div className="flex items-center gap-2 mb-1 text-slate-400 text-xs font-mono uppercase tracking-wider">
                        <Activity size={12} className="text-blue-400" /> 
                        {portfolioItems[activeTab].statLabel}
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-white tracking-tight flex items-baseline gap-1">
                        {portfolioItems[activeTab].id === 1 && <span className="text-blue-400 text-2xl">+</span>}
                        {displayStat}
                        <span className="text-lg text-slate-500 font-mono font-normal">{portfolioItems[activeTab].statSuffix}</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button 
                      onClick={onBookCall}
                      className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 group h-full w-full md:w-auto justify-center"
                    >
                      Deploy Agent <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                  </div>

                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Corner Accents */}
          <div className="absolute -z-10 -bottom-8 -right-8 w-32 h-32 border-r-2 border-b-2 border-blue-500/10 rounded-br-[3rem] hidden md:block"></div>
          <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 border-l-2 border-t-2 border-blue-500/10 rounded-tl-[3rem] hidden md:block"></div>

        </div>

        {/* Clients/Technologies Strip */}
        <div className="mt-24 pt-8 border-t border-slate-200/50">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-6">Powering Intelligence For</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-all duration-500 grayscale">
            {['OpenAI', 'Anthropic', 'LangChain', 'Pinecone', 'Vercel'].map((brand, i) => (
               <div key={i} className="flex items-center gap-2 text-slate-600 font-bold text-lg">
                 <div className="w-2 h-2 bg-[#0551a2] rounded-full"></div> {brand}
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;