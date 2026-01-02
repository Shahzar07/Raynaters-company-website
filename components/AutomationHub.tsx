import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  CheckCircle2, 
  TrendingUp, 
  LayoutTemplate,
  MessageSquare,
  Bot as BotIcon
} from 'lucide-react';
import { generateBusinessAutomation } from '../services/geminiService.ts';
import { AppStatus, AutomationResult } from '../types.ts';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface AutomationHubProps {
  onBookCall: () => void;
  onAutomationComplete: (result: AutomationResult) => void;
}

const AutomationHub: React.FC<AutomationHubProps> = ({ onBookCall, onAutomationComplete }) => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [result, setResult] = useState<AutomationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setStatus(AppStatus.GENERATING);
    try {
      const data = await generateBusinessAutomation(prompt);
      setResult(data);
      onAutomationComplete(data);
      setStatus(AppStatus.COMPLETE);
    } catch (error) {
      console.error(error);
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Get a Free <span className="text-[#0551a2]">Automation Strategy</span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 font-light">
              Describe a manual process that slows down your team. Our AI Solutions Architect will instantly generate a technical proposal and ROI projection.
            </p>

            <form onSubmit={handleSubmit} className="bg-white p-2 rounded-2xl border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] focus-within:border-[#0551a2] transition-colors relative z-20">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., My sales team spends 10 hours a week manually copying leads from LinkedIn Sales Navigator into our HubSpot CRM and then sending a welcome email..."
                  className="w-full bg-transparent text-slate-800 placeholder-slate-400 p-4 min-h-[140px] resize-none outline-none text-lg"
                  disabled={status === AppStatus.GENERATING}
                />
                <div className="flex justify-between items-center px-4 pb-4">
                  <div className="text-xs text-slate-500 flex items-center gap-1 font-medium bg-slate-50 px-2 py-1 rounded-md">
                    <Sparkles size={12} className="text-[#0551a2]"/> Powered by Gemini 2.5 Flash
                  </div>
                  <button
                    type="submit"
                    disabled={status === AppStatus.GENERATING || !prompt.trim()}
                    className={`
                      px-6 py-2.5 rounded-xl font-semibold text-white flex items-center gap-2 transition-all
                      ${status === AppStatus.GENERATING 
                        ? 'bg-slate-300 cursor-not-allowed text-slate-500' 
                        : 'bg-[#0551a2] hover:bg-blue-800 shadow-lg shadow-blue-900/10'}
                    `}
                  >
                    {status === AppStatus.GENERATING ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Designing...
                      </>
                    ) : (
                      <>
                        Generate Proposal <Send size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 flex gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> Instant Audit
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> No Email Required
              </div>
            </div>
          </div>

          <div className="relative">
            {status === AppStatus.IDLE && (
              <div className="bg-slate-50/50 backdrop-blur-md rounded-2xl border border-slate-200/60 p-8 h-[500px] flex flex-col items-center justify-center text-center shadow-sm">
                 <LayoutTemplate size={48} className="text-slate-300 mb-4" />
                 <h3 className="text-xl font-semibold text-slate-800">Ready to Scale?</h3>
                 <p className="text-slate-500 mt-2 max-w-xs">Tell us your pain point on the left. We'll show you how we can fix it.</p>
              </div>
            )}

            {status === AppStatus.GENERATING && (
              <div className="bg-slate-50/50 backdrop-blur-md rounded-2xl border border-slate-200/60 p-8 h-[500px] flex flex-col items-center justify-center text-center shadow-sm">
                 <div className="relative w-24 h-24 mb-6">
                   <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                   <div className="absolute inset-0 border-4 border-t-[#0551a2] rounded-full animate-spin"></div>
                   <BotIcon className="absolute inset-0 m-auto text-[#0551a2]" size={32} />
                 </div>
                 <h3 className="text-xl font-semibold text-slate-800 animate-pulse">Architecting Solution...</h3>
                 <div className="space-y-2 mt-4 text-sm text-slate-500">
                    <p>Identifying Bottlenecks...</p>
                    <p>Selecting Tools (Zapier, Make, OpenAI)...</p>
                    <p>Estimating ROI...</p>
                 </div>
              </div>
            )}

            {status === AppStatus.COMPLETE && result && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-slate-200/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-[#0551a2]">
                        <LayoutTemplate size={20} />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900">Proposed Architecture</h4>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {result.strategy}
                  </p>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-slate-200/40">
                   <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                      <MessageSquare size={20} />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">Sample Automation Output</h4>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg text-xs text-slate-600 font-mono border border-slate-200 whitespace-pre-wrap">
                    {result.emailDraft}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xl shadow-slate-200/40">
                   <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                      <TrendingUp size={20} />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">Projected Efficiency Gain</h4>
                  </div>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.marketData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0551a2" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0551a2" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#0551a2" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                    <button 
                      onClick={onBookCall}
                      className="group text-[#0551a2] hover:text-blue-700 font-semibold text-sm flex items-center justify-center gap-2 mx-auto bg-blue-50 px-6 py-3 rounded-full hover:bg-blue-100 transition-all border border-blue-100"
                    >
                        Book a call to build this <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationHub;