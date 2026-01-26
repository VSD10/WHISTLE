import React from 'react';

const ProblemSection: React.FC = () => {
  return (
    <section className="py-40 bg-deep-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 z-20">
            <div className="data-packet border-t-4 border-t-neon-green h-full">
              <span className="text-[10px] text-neon-green mb-4 block tracking-widest">[CONTEXT_FEED]</span>
              <h3 className="text-3xl font-header uppercase mb-4">AI is everywhere...</h3>
              <p className="text-white/60 font-mono leading-relaxed">
                From generating code to diagnosing health, AI has integrated into every facet of our digital lives. But as adoption grows, so does the risk of unchecked errors.
              </p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-5 mt-12 lg:-mt-20 z-30">
            <div className="data-packet border-t-4 border-t-neon-magenta bg-data-gray/90 shadow-[20px_20px_0px_0px_rgba(255,0,255,0.1)]">
              <span className="text-[10px] text-neon-magenta mb-4 block tracking-widest">[SYSTEM_WARNING]</span>
              <h3 className="text-4xl md:text-5xl font-header uppercase mb-6">The problem with today’s AI</h3>
              <div className="space-y-4 font-mono">
                <div className="flex items-center gap-4 bg-white/5 p-3 border-l-2 border-neon-magenta">
                  <span className="material-symbols-outlined text-neon-magenta">error</span>
                  <span className="text-sm">HALLUCINATIONS: Models confidently present false data.</span>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-3 border-l-2 border-neon-magenta">
                  <span className="material-symbols-outlined text-neon-magenta">visibility_off</span>
                  <span className="text-sm"><span className="magenta-highlight">Blind trust</span> leads to catastrophic logic failures.</span>
                </div>
                <p className="text-[10px] text-white/40 pt-4 uppercase tracking-tighter">
                  CRITICAL: Single-source models lack internal verification protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;