import React from 'react';
import { Star } from 'lucide-react';

const testimonials1 = [
  {
    text: "Raynaters completely transformed our sales process. The custom agents they built handle 80% of our initial inquiries now.",
    author: "Sarah Johnson",
    role: "VP of Sales, TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "The speed of implementation was incredible. We went from concept to deployed agent in 14 days.",
    author: "James Wilson",
    role: "CTO, FinEdge",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "Finally, an agency that speaks fluent tech and business. Our ROI is tracking at 400%.",
    author: "Anita Patel",
    role: "Founder, GrowthBox",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "The data pipeline they built is self-healing. We haven't had a breakage in 3 months.",
    author: "Mark Davis",
    role: "Lead Engineer, DataCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const testimonials2 = [
  {
    text: "The workflow automation they implemented saved us over 40 hours a week. The ROI was evident within the first month.",
    author: "Michael Chen",
    role: "COO, DataStream",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "Their support bot handles nuances that other bots miss. Our CSAT score jumped 15 points.",
    author: "Linda Kim",
    role: "Head of Support, HelpDesk",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "Best decision we made this year. Raynaters operates like an extension of our team.",
    author: "David Ross",
    role: "CEO, StartLine",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
  },
   {
    text: "Automating our HR outreach has allowed us to double our interview volume without adding staff.",
    author: "Emma White",
    role: "HR Director, PeopleFirst",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const testimonials3 = [
  {
    text: "Their team understands both the technical and business sides of AI. Best agency experience we've had in years.",
    author: "Elena Rodriguez",
    role: "Founder, ScaleUp",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "Skeptical at first, but the results speak for themselves. The AI works while we sleep.",
    author: "Tom Baker",
    role: "Director, GlobalTrade",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "We replaced 3 expensive SaaS tools with one custom Raynaters agent.",
    author: "Sophie Turner",
    role: "Operations, LeanCo",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    text: "Incredible attention to detail. The agents feel human and brand-aligned.",
    author: "Chris Paul",
    role: "Marketing Lead, BrandX",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const TestimonialCard: React.FC<{ data: typeof testimonials1[0] }> = ({ data }) => (
  <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 mb-6 break-inside-avoid">
    <div className="flex gap-1 text-[#0551a2] mb-3">
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
      <Star size={12} fill="currentColor" />
    </div>
    <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
      "{data.text}"
    </p>
    <div className="flex items-center gap-3">
      <img src={data.image} alt={data.author} className="w-10 h-10 rounded-full object-cover border border-slate-100" />
      <div>
        <h4 className="text-slate-900 font-bold text-sm">{data.author}</h4>
        <p className="text-slate-500 text-xs">{data.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#f8fafc] border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Loved by <span className="gradient-text">Innovators</span>
          </h2>
          <p className="text-slate-600 text-lg font-light">
            Join 200+ forward-thinking companies automating their growth with Raynaters.
          </p>
        </div>

        {/* Wall of Love Grid */}
        <div className="relative h-[600px] overflow-hidden mask-gradient-y">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Column 1 - Scroll Up Slow */}
            <div className="relative">
              <div className="animate-scroll-y flex flex-col">
                {[...testimonials1, ...testimonials1, ...testimonials1].map((t, i) => (
                  <TestimonialCard key={`col1-${i}`} data={t} />
                ))}
              </div>
            </div>

            {/* Column 2 - Scroll Down (Reverse) Slow */}
            <div className="relative hidden md:block">
              <div className="animate-scroll-y-reverse flex flex-col" style={{ animationDuration: '70s' }}>
                {[...testimonials2, ...testimonials2, ...testimonials2].map((t, i) => (
                  <TestimonialCard key={`col2-${i}`} data={t} />
                ))}
              </div>
            </div>

            {/* Column 3 - Scroll Up Faster */}
            <div className="relative hidden lg:block">
              <div className="animate-scroll-y flex flex-col" style={{ animationDuration: '50s' }}>
                {[...testimonials3, ...testimonials3, ...testimonials3].map((t, i) => (
                  <TestimonialCard key={`col3-${i}`} data={t} />
                ))}
              </div>
            </div>

          </div>
          
          {/* Touch Overlay for Mobile to pause */}
          <div className="absolute inset-0 pointer-events-none z-10"></div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;