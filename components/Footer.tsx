import React from 'react';
import { Twitter, Github, Linkedin, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#0551a2] rounded flex items-center justify-center text-white">
              <Cpu size={14} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">Raynaters</span>
          </div>

          <p className="text-slate-500 text-sm">© 2024 Raynaters Inc. All rights reserved.</p>

          <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-[#0551a2] transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-[#0551a2] transition-colors"><Github size={18} /></a>
            <a href="#" className="hover:text-[#0551a2] transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;