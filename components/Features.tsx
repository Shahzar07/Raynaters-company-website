import React, { useState } from 'react';
import { Cpu, Database, Code, Bot, Terminal, Layers } from 'lucide-react';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: 'Business Automation',
    description: 'We architect self-healing workflows that integrate your entire tech stack—CRM, Email, Slack, and ERP—eliminating repetitive manual data entry and freeing your team to focus on high-leverage strategic work. Our systems are designed to handle thousands of operations per minute with zero downtime.',
    icon: Cpu,
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 2,
    title: 'Data Intelligence',
    description: 'Transform unstructured chaos into structured assets. Our pipelines automatically extract, clean, and organize data from PDFs, emails, and web sources, feeding real-time dashboards for confident decision-making. We leverage vector databases to make your company\'s knowledge instantly accessible and actionable.',
    icon: Database,
    gradient: 'from-indigo-600 to-purple-600'
  },
  {
    id: 3,
    title: 'App Development',
    description: 'End-to-end full-stack development for scalable, AI-native applications. From robust backend infrastructure to sleek, responsive frontends, we build products that dominate markets. We utilize modern frameworks like Next.js and React to ensure your application is fast, SEO-optimized, and ready for global scale.',
    icon: Code,
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 4,
    title: 'AI Automation Services',
    description: 'Beyond just advice, we build the rails. We deploy autonomous agents that handle customer support, lead qualification, and internal ops 24/7 with human-like precision and infinite scalability. We help you identify high-impact opportunities where AI can drive immediate ROI and implement them in weeks, not months.',
    icon: Bot,
    gradient: 'from-pink-600 to-rose-600'
  },
  {
    id: 5,
    title: 'Custom Software Development',
    description: 'Tailor-made software solutions designed for your unique operational bottlenecks. If an off-the-shelf tool doesn\'t exist, we engineer it from the ground up using modern frameworks and cloud-native architecture. We build secure, compliant, and highly performant systems specific to your industry needs.',
    icon: Terminal,
    gradient: 'from-rose-600 to-orange-600'
  },
];

const Features: React.FC = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-40 -z-10"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-100 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0551a2] to-blue-500">Intelligence</span> <br />
              Stack
            </h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed max-w-2xl">
              Comprehensive AI solutions designed to modernize your infrastructure and accelerate growth. We don't just build software; we build autonomous systems.
            </p>
          </div>
        </div>

        {/* Desktop Layout - Premium Boxy Accordion */}
        <div className="hidden lg:flex h-[700px] gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveId(service.id)}
              className={`
                relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${activeId === service.id ? 'flex-[4] shadow-2xl shadow-blue-900/10' : 'flex-[1] hover:flex-[1.5] grayscale-[0.8] hover:grayscale-0'}
                group border border-black/5 bg-white
              `}
            >
              {/* Active State Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-700 ${activeId === service.id ? 'opacity-100' : ''}`}></div>
              
              {/* Active State Overlay */}
              <div className={`absolute inset-0 bg-[#0551a2] mix-blend-multiply opacity-0 transition-opacity duration-700 ${activeId === service.id ? 'opacity-90' : ''}`}></div>
              
              {/* Inactive State Background */}
              <div className={`absolute inset-0 bg-white transition-opacity duration-700 ${activeId === service.id ? 'opacity-0' : 'opacity-100'}`}></div>
              
              {/* Content Container */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                
                {/* Header: Icon & Number */}
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-xl backdrop-blur-md border transition-all duration-500 ${activeId === service.id ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-50 border-slate-100 text-[#0551a2] group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                    <service.icon size={28} />
                  </div>
                  <span className={`text-7xl font-bold font-mono tracking-tighter transition-all duration-700 ${activeId === service.id ? 'text-white/20 scale-100' : 'text-slate-100 scale-75 group-hover:text-slate-200'}`}>
                    0{service.id}
                  </span>
                </div>

                {/* Bottom Text Content */}
                <div className="relative h-64">
                   {/* Vertical Text for Inactive State */}
                   <h3 
                    className={`
                      text-lg font-bold text-slate-400 whitespace-nowrap absolute bottom-0 left-0 origin-bottom-left -rotate-90 transition-all duration-500 uppercase tracking-widest
                      ${activeId === service.id ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0 group-hover:text-slate-600'}
                    `}
                   >
                     {service.title}
                   </h3>

                   {/* Expanded Text for Active State */}
                   <div className={`transition-all duration-700 transform absolute bottom-0 left-0 w-full ${activeId === service.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-none">{service.title}</h3>
                      <p className="text-blue-50 text-lg md:text-xl leading-relaxed font-light opacity-90 max-w-xl">
                        {service.description}
                      </p>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6 lg:hidden">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-slate-100 rounded-3xl p-8 relative overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all">
               
               <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-[#0551a2]">
                    <service.icon size={28} />
                  </div>
                  <span className="text-6xl font-bold font-mono text-slate-100">0{service.id}</span>
               </div>
               
               <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
               <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;