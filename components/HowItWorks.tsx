import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 md:py-32 border-y border-white/5 bg-data-gray/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-7xl font-header font-black uppercase mb-12 md:mb-20 tracking-tighter">
          How <span className="text-neon-green">WHISTLE</span> Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5">
          {/* Step 01 */}
          <div className="bg-deep-black p-8 border-r border-white/5 group hover:bg-neon-green/5 transition-colors">
            <div className="text-neon-green font-mono text-xs mb-8">[ STEP_01 ]</div>
            <span className="material-symbols-outlined text-4xl text-neon-green mb-6">input</span>
            <h4 className="text-xl font-condensed uppercase mb-4">Ingestion</h4>
            <p className="text-[10px] text-white/50 font-mono uppercase leading-relaxed">
              User query is captured and tokenized for parallel processing.
            </p>
          </div>

          {/* Step 02 */}
          <div className="bg-deep-black p-8 border-r border-white/5 group hover:bg-neon-green/5 transition-colors">
            <div className="text-neon-green font-mono text-xs mb-8">[ STEP_02 ]</div>
            <span className="material-symbols-outlined text-4xl text-neon-green mb-6">hub</span>
            <h4 className="text-xl font-condensed uppercase mb-4">Multi-Agent Split</h4>
            <p className="text-[10px] text-white/50 font-mono uppercase leading-relaxed">
              Query is dispatched to a cluster of independent LLM agents.
            </p>
          </div>

          {/* Step 03 */}
          <div className="bg-deep-black p-8 border-r border-white/5 group hover:bg-neon-green/5 transition-colors">
            <div className="text-neon-green font-mono text-xs mb-8">[ STEP_03 ]</div>
            <span className="material-symbols-outlined text-4xl text-neon-green mb-6">balance</span>
            <h4 className="text-xl font-condensed uppercase mb-4">Consensus Analysis</h4>
            <p className="text-[10px] text-white/50 font-mono uppercase leading-relaxed">
              Agent outputs are compared using weighted consensus logic.
            </p>
          </div>

          {/* Step 04 */}
          <div className="bg-deep-black p-8 group hover:bg-neon-magenta/5 transition-colors border-l-2 border-neon-magenta">
            <div className="text-neon-magenta font-mono text-xs mb-8">[ STEP_04 ]</div>
            <span className="material-symbols-outlined text-4xl text-neon-magenta mb-6">verified</span>
            <h4 className="text-xl font-condensed uppercase mb-4 text-neon-magenta">Final Output</h4>
            <p className="text-[10px] text-white/50 font-mono uppercase leading-relaxed">
              Verified truth is delivered with a confidence score.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;