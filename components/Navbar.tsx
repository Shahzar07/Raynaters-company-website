import React from 'react';
import { Cpu, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onBookCall: () => void;
  onContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookCall }) => {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-8 h-8 bg-[#0551a2] rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-900/20">
              <Cpu size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Raynaters</span>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={onBookCall}
               className="bg-[#0551a2] hover:bg-blue-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30"
             >
               Book Strategy Call <ChevronRight size={16} />
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;