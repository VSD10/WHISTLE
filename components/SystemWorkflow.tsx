import React from 'react';

const SystemWorkflow: React.FC = () => {
  return (
    <section className="stream-node relative py-40 w-full overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-7xl font-header font-black uppercase mb-32 tracking-tighter text-center">
          System <span className="text-neon-green">Workflow</span>
        </h2>
        <div className="relative w-full">
          <div className="flex flex-col items-center mb-24">
            <div className="data-packet border-neon-green w-64 text-center">
              <span className="material-symbols-outlined text-4xl text-neon-green mb-2">input</span>
              <h4 className="text-xl font-condensed uppercase">User Input</h4>
              <p className="text-[10px] opacity-60 uppercase">Query Ingestion</p>
            </div>
          </div>
          <div className="absolute top-[120px] left-1/2 -translate-x-1/2 w-full max-w-6xl h-24 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path d="M500,0 C500,50 100,50 100,100" fill="transparent" opacity="0.3" stroke="#39ff14" strokeWidth="1"></path>
              <path d="M500,0 C500,50 366,50 366,100" fill="transparent" opacity="0.3" stroke="#39ff14" strokeWidth="1"></path>
              <path d="M500,0 C500,50 633,50 633,100" fill="transparent" opacity="0.3" stroke="#39ff14" strokeWidth="1"></path>
              <path d="M500,0 C500,50 900,50 900,100" fill="transparent" opacity="0.3" stroke="#39ff14" strokeWidth="1"></path>
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
            <div className="data-packet flex flex-col items-center text-center">
              <div className="text-neon-green font-mono text-[9px] mb-4 uppercase">[AGENT_01]</div>
              <span className="material-symbols-outlined text-3xl mb-4 text-white/40">smart_toy</span>
              <h4 className="text-md font-header uppercase mb-2">GPT-4 Node</h4>
              <p className="text-[9px] text-white/50 uppercase">Analysis_Stream_A</p>
            </div>
            <div className="data-packet flex flex-col items-center text-center border-neon-magenta/40">
              <div className="text-neon-magenta font-mono text-[9px] mb-4 uppercase">[AGENT_02]</div>
              <span className="material-symbols-outlined text-3xl mb-4 text-white/40">smart_toy</span>
              <h4 className="text-md font-header uppercase mb-2">Claude-3 Node</h4>
              <p className="text-[9px] text-white/50 uppercase">Analysis_Stream_B</p>
            </div>
            <div className="data-packet flex flex-col items-center text-center">
              <div className="text-neon-green font-mono text-[9px] mb-4 uppercase">[AGENT_03]</div>
              <span className="material-symbols-outlined text-3xl mb-4 text-white/40">smart_toy</span>
              <h4 className="text-md font-header uppercase mb-2">Llama-3 Node</h4>
              <p className="text-[9px] text-white/50 uppercase">Analysis_Stream_C</p>
            </div>
            <div className="data-packet flex flex-col items-center text-center">
              <div className="text-neon-green font-mono text-[9px] mb-4 uppercase">[AGENT_04]</div>
              <span className="material-symbols-outlined text-3xl mb-4 text-white/40">smart_toy</span>
              <h4 className="text-md font-header uppercase mb-2">Mistral Node</h4>
              <p className="text-[9px] text-white/50 uppercase">Analysis_Stream_D</p>
            </div>
          </div>
          <div className="absolute top-[480px] left-1/2 -translate-x-1/2 w-full max-w-6xl h-24 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path d="M100,0 C100,50 500,50 500,100" fill="transparent" opacity="0.3" stroke="#ff00ff" strokeWidth="1"></path>
              <path d="M366,0 C366,50 500,50 500,100" fill="transparent" opacity="0.3" stroke="#ff00ff" strokeWidth="1"></path>
              <path d="M633,0 C633,50 500,50 500,100" fill="transparent" opacity="0.3" stroke="#ff00ff" strokeWidth="1"></path>
              <path d="M900,0 C900,50 500,50 500,100" fill="transparent" opacity="0.3" stroke="#ff00ff" strokeWidth="1"></path>
            </svg>
          </div>
          <div className="flex flex-col items-center mt-32">
            <div className="data-packet border-neon-magenta bg-neon-magenta/10 w-80 text-center">
              <span className="material-symbols-outlined text-4xl text-neon-magenta mb-4">balance</span>
              <h4 className="text-2xl font-header uppercase mb-2">Consensus Engine</h4>
              <p className="text-[10px] text-white/60 uppercase">Weighted Hybrid Intelligence</p>
              <div className="mt-4 flex justify-center gap-1">
                <div className="w-1 h-1 bg-neon-magenta"></div>
                <div className="w-1 h-1 bg-neon-magenta"></div>
                <div className="w-1 h-1 bg-neon-magenta"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-24">
            <div className="w-px h-16 bg-gradient-to-b from-neon-magenta to-neon-green"></div>
            <div className="data-packet border-neon-green shadow-[0_0_30px_rgba(57,255,20,0.1)] w-96 text-center py-10">
              <span className="material-symbols-outlined text-5xl text-neon-green mb-4">verified</span>
              <h3 className="text-3xl font-header uppercase mb-2">Verified Truth</h3>
              <p className="text-sm font-mono text-neon-green/80 uppercase tracking-widest">Confidence Score: 99.9%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemWorkflow;
