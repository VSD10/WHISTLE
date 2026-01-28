import React from 'react';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-40 bg-deep-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 z-20">
            <div className="data-packet border-t-4 border-t-neon-green h-full">
              <span className="text-[10px] text-neon-green mb-4 block tracking-widest">[CONTEXT_FEED]</span>
              <h3 className="text-3xl font-header uppercase mb-4">AI is everywhere...</h3>
              <p className="text-white/60 font-mono leading-relaxed">
              From learning and research to business and daily decision-making, AI tools are now part of everyday life. As AI adoption increases, so does the need to understand how reliable these answers truly are.</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-5 mt-8 lg:-mt-20 z-30">
            <div className="data-packet border-t-4 border-t-neon-magenta bg-data-gray/90 shadow-[20px_20px_0px_0px_rgba(255,0,255,0.1)]">
              <span className="text-[10px] text-neon-magenta mb-4 block tracking-widest">[SYSTEM_WARNING]</span>
              <h3 className="text-4xl md:text-5xl font-header uppercase mb-6">The problem with today’s AI</h3>
              <div className="space-y-4 font-mono">
                <div className="flex items-start gap-4 bg-white/5 p-3 border-l-2 border-neon-magenta">
                  <span className="material-symbols-outlined text-neon-magenta">error</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase">Unverified Outputs</span>
                    <span className="text-xs text-white/60">AI models can generate responses that sound correct even when they are incomplete or inaccurate.</span>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-3 border-l-2 border-neon-magenta">
                  <span className="material-symbols-outlined text-neon-magenta">visibility_off</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase">Over-Reliance</span>
                    <span className="text-xs text-white/60">Users often trust a single AI answer without cross-checking.</span>
                  </div>
                </div>
                                     <div className="flex items-start gap-4 bg-white/5 p-3 border-l-2 border-neon-magenta">
                  <span className="material-symbols-outlined text-neon-magenta">fact_check</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase">No Internal Cross-Validation</span>
                    <span className="text-xs text-white/60">Most AI systems rely on one model’s perspective instead of comparing multiple viewpoints.</span>
                  </div>
                </div>
         
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;