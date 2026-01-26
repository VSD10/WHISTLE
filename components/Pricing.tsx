import React from 'react';

interface PricingProps {
  onJoinWaitlist: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onJoinWaitlist }) => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-block border border-neon-green/30 bg-neon-green/5 px-4 py-1 mb-6">
           <span className="text-neon-green font-mono text-xs tracking-[0.3em] uppercase">System_Access_Levels</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-header font-black uppercase tracking-tighter mb-6">
          Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-white">Protocol</span>
        </h1>
        <p className="text-white/60 font-mono text-sm max-w-2xl mx-auto">
            Select the processing power required for your verification needs. Scale your consensus nodes based on signal complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Tier 1: Free */}
        <div className="border border-white/10 bg-white/5 p-8 relative group hover:border-white/30 transition-all duration-300 flex flex-col">
          <div className="mb-4">
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Observer Node</span>
            <h3 className="text-4xl font-header font-black text-white mt-2">Free</h3>
          </div>
          <p className="text-xs font-mono text-white/40 mb-8 border-b border-white/10 pb-8">
            Basic verification for students and casual researchers.
          </p>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-xs font-mono text-white/70">
              <span className="material-symbols-outlined text-sm text-white/50">check</span>
              10 Verifications / Day
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white/70">
              <span className="material-symbols-outlined text-sm text-white/50">check</span>
              2-Agent Consensus (Basic)
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white/70">
              <span className="material-symbols-outlined text-sm text-white/50">check</span>
              Standard Response Time
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white/30">
              <span className="material-symbols-outlined text-sm">close</span>
              No API Access
            </li>
          </ul>
          <button 
            onClick={onJoinWaitlist}
            className="w-full border border-white/20 py-3 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Initialize_Basic
          </button>
        </div>

        {/* Tier 2: 499 */}
        <div className="border border-neon-green bg-deep-black p-8 relative group transform md:-translate-y-4 shadow-[0_0_30px_rgba(57,255,20,0.1)] flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-neon-green"></div>
          <div className="absolute top-4 right-4 text-[10px] font-mono bg-neon-green text-black px-2 py-1 font-bold uppercase">
             Most Popular
          </div>
          <div className="mb-4">
            <span className="text-xs font-mono text-neon-green uppercase tracking-widest">Validator Node</span>
            <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-header font-black text-white">499</span>
                <span className="text-sm font-mono text-white/50">/mo</span>
            </div>
          </div>
          <p className="text-xs font-mono text-white/40 mb-8 border-b border-white/10 pb-8">
            Enhanced logic processing for professionals and analysts.
          </p>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-xs font-mono text-white">
              <span className="material-symbols-outlined text-sm text-neon-green">check_circle</span>
              Unlimited Verifications
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white">
              <span className="material-symbols-outlined text-sm text-neon-green">check_circle</span>
              5-Agent Consensus (Advanced)
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white">
              <span className="material-symbols-outlined text-sm text-neon-green">check_circle</span>
              Deep Logic Logs & Reasoning
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white">
              <span className="material-symbols-outlined text-sm text-neon-green">check_circle</span>
              Priority Processing Queue
            </li>
          </ul>
          <button 
            onClick={onJoinWaitlist}
            className="w-full bg-neon-green py-4 text-xs font-mono font-bold uppercase tracking-widest text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(57,255,20,0.4)]"
          >
            Deploy_Validator
          </button>
        </div>

        {/* Tier 3: 1999 */}
        <div className="border border-neon-magenta/50 bg-white/5 p-8 relative group hover:border-neon-magenta transition-all duration-300 flex flex-col">
          <div className="mb-4">
            <span className="text-xs font-mono text-neon-magenta uppercase tracking-widest">Architect Node</span>
            <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-header font-black text-white">1999</span>
                <span className="text-sm font-mono text-white/50">/mo</span>
            </div>
          </div>
          <p className="text-xs font-mono text-white/40 mb-8 border-b border-white/10 pb-8">
            Full enterprise infrastructure with dedicated resources.
          </p>
          <ul className="space-y-4 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-xs font-mono text-white/80">
              <span className="material-symbols-outlined text-sm text-neon-magenta">verified</span>
              Custom Agent Integration
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white/80">
              <span className="material-symbols-outlined text-sm text-neon-magenta">verified</span>
              Full API Access (High Rate Limit)
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white/80">
              <span className="material-symbols-outlined text-sm text-neon-magenta">verified</span>
              Dedicated Server Node
            </li>
            <li className="flex items-center gap-3 text-xs font-mono text-white/80">
              <span className="material-symbols-outlined text-sm text-neon-magenta">verified</span>
              24/7 Engineer Support
            </li>
          </ul>
          <button 
            onClick={onJoinWaitlist}
            className="w-full border border-neon-magenta text-neon-magenta py-3 text-xs font-mono uppercase tracking-widest hover:bg-neon-magenta hover:text-black transition-all"
          >
            Contact_Sales
          </button>
        </div>
      </div>

      <div className="mt-20 border-t border-white/10 pt-10 text-center">
         <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
            * All tiers are subject to regional availability and network load. Prices in Credits.
         </p>
      </div>
    </div>
  );
};

export default Pricing;