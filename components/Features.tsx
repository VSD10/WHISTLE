import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="py-20 md:py-40 container mx-auto px-6">
      <h2 className="text-3xl md:text-5xl font-header font-black uppercase mb-12 tracking-tighter">
        AS Built for Reliable AI Decisions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border border-neon-green p-6 md:p-10 relative overflow-hidden group hover:bg-neon-green/5 transition-colors">
          <div className="absolute top-0 right-0 w-8 h-8 bg-neon-green/10 flex items-center justify-center font-mono text-neon-green text-[10px]">01</div>
          <h3 className="text-2xl font-header uppercase mb-4">Multi-AI Verification</h3>
          <p className="text-xs font-mono text-white/60">
            Parallel processing across GPT-4, Claude 3, and Llama 3 to cross-reference every claim.
          </p>
        </div>

        <div className="border border-white/20 p-6 md:p-10 relative overflow-hidden hover:border-neon-magenta transition-colors group">
          <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 flex items-center justify-center font-mono text-white/20 text-[10px]">02</div>
          <h3 className="text-2xl font-header uppercase mb-4">Consensus Logic</h3>
          <p className="text-xs font-mono text-white/60">
            Mathematical models to determine truth based on majority agreement and model reliability.
          </p>
        </div>

        <div className="border border-white/20 p-6 md:p-10 relative overflow-hidden hover:border-neon-green transition-colors group">
          <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 flex items-center justify-center font-mono text-white/20 text-[10px]">03</div>
          <h3 className="text-2xl font-header uppercase mb-4">Hallucination Shield</h3>
          <p className="text-xs font-mono text-white/60">
            Instantly flag conflicting data segments before they reach the end user.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;