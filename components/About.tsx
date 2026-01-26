import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center pt-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 circuit-bg z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-transparent to-deep-black z-[1]"></div>
        <div className="obstructed-text top-1/4 -left-10 z-0">RAW</div>
        <div className="obstructed-text bottom-1/4 -right-10 z-0">ABOUT</div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-block border-l-2 border-neon-magenta pl-4 mb-6">
              <span className="text-xs text-neon-magenta tracking-[0.3em] font-bold">SYSTEM_OVERVIEW // ABOUT</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-header font-black leading-[0.85] tracking-tighter uppercase mb-8">
              Why We <br />
              Created <br />
              <span className="text-neon-green">This_System</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-mono max-w-2xl leading-tight">
              Artificial Intelligence is now the core of digital decision-making, yet it remains fundamentally prone to logic failures and hallucinations. WHISTLE was born to solve the trust gap.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 relative bg-deep-black">
        <div className="container mx-auto px-6">
          <div className="bg-neon-magenta/5 border-l-8 border-neon-magenta p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-9xl">security_update_good</span>
            </div>
            <span className="text-[10px] text-neon-magenta tracking-[0.4em] font-bold uppercase mb-4 block">MISSION_DIRECTIVE</span>
            <h2 className="text-4xl md:text-6xl font-header font-black uppercase mb-8 tracking-tighter">
              PROMOTING TRUSTWORTHY & <br />RESPONSIBLE AI
            </h2>
            <div className="grid md:grid-cols-2 gap-12 font-mono">
              <p className="text-white/60 leading-relaxed uppercase text-sm">
                In an era of generated content, the value of truth is depreciating. Our mission is to provide an immutable verification layer that filters synthetic logic through a multi-agent consensus protocol.
              </p>
              <p className="text-white/60 leading-relaxed uppercase text-sm">
                We aim to empower users with tools that don't just provide answers, but provide <span className="text-white">verified certainty</span>, ensuring that AI becomes a reliable partner rather than an unpredictable black box.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process/Logs Section */}
      <section className="py-32 bg-data-gray relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-5xl font-header font-black uppercase tracking-tighter">
              SYSTEM_LOGS // <span className="text-neon-green">HOW WE WORKED</span>
            </h2>
            <p className="text-xs text-white/30 font-mono mt-2 uppercase tracking-[0.2em]">Deployment Pipeline: FYP_Iteration_01 to Production_v2.0</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="terminal-block border-t-neon-green border-t-2">
              <div className="terminal-header">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="ml-auto text-[8px] text-white/30 tracking-widest">LOG_01</span>
              </div>
              <div className="text-neon-green mb-2 tracking-tighter">PHASE: INITIAL_RESEARCH</div>
              <p className="text-white/70 uppercase leading-tight mb-4">Studied limitations of single-agent models and the anatomy of hallucinations.</p>
              <div className="text-[9px] text-white/20">TIMESTAMP: 2023.09.12</div>
            </div>
            <div className="terminal-block">
              <div className="terminal-header">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <span className="ml-auto text-[8px] text-white/30 tracking-widest">LOG_02</span>
              </div>
              <div className="text-neon-magenta mb-2 tracking-tighter">PHASE: ARCHITECTURAL_DESIGN</div>
              <p className="text-white/70 uppercase leading-tight mb-4">Designed concept for parallel verification and consensus weighted logic.</p>
              <div className="text-[9px] text-white/20">TIMESTAMP: 2023.11.04</div>
            </div>
            <div className="terminal-block">
              <div className="terminal-header">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <span className="ml-auto text-[8px] text-white/30 tracking-widest">LOG_03</span>
              </div>
              <div className="text-neon-green mb-2 tracking-tighter">PHASE: LOGIC_CORE_DEV</div>
              <p className="text-white/70 uppercase leading-tight mb-4">Developed logic engines to handle cross-referencing between disparate agents.</p>
              <div className="text-[9px] text-white/20">TIMESTAMP: 2024.01.15</div>
            </div>
            <div className="terminal-block">
              <div className="terminal-header">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <span className="ml-auto text-[8px] text-white/30 tracking-widest">LOG_04</span>
              </div>
              <div className="text-neon-magenta mb-2 tracking-tighter">PHASE: PIPELINE_STRUCTURING</div>
              <p className="text-white/70 uppercase leading-tight mb-4">Structured workflow protocols for real-time query tokenization and dispatch.</p>
              <div className="text-[9px] text-white/20">TIMESTAMP: 2024.03.20</div>
            </div>
            <div className="terminal-block border-t-neon-green border-t-2 bg-neon-green/5">
              <div className="terminal-header">
                <div className="status-dot animate-pulse"></div>
                <span className="ml-auto text-[8px] text-white/30 tracking-widest">LOG_05</span>
              </div>
              <div className="text-neon-green mb-2 tracking-tighter">PHASE: PROTOTYPE_DEPLOY</div>
              <p className="text-white/70 uppercase leading-tight mb-4">Built prototype UI and backend integration for final verification tests.</p>
              <div className="text-[9px] text-white/20">TIMESTAMP: 2024.04.10</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-40 bg-deep-black overflow-hidden relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-5xl font-header font-black uppercase tracking-tighter">PROJECT_AUTHORS</h2>
              <p className="text-xs text-white/40 font-mono mt-2 uppercase tracking-[0.2em]">CORE ARCHITECTS & DEVELOPERS</p>
            </div>
            <div className="font-mono text-[10px] text-neon-green border border-neon-green/20 px-4 py-1">
              ACTIVE_SQUAD: 04 // NODES_SYNCED
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10">
            {/* Member 1: Bathrinath */}
            <div className="bg-data-gray p-8 group hover:bg-neon-green/5 transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/20 text-4xl group-hover:text-neon-green">person</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-neon-green/10 text-neon-green text-[8px] font-bold">
                  <span className="status-dot"></span>
                  STATUS: ACTIVE
                </div>
              </div>
              <h4 className="text-2xl font-header uppercase mb-1">Bathrinath</h4>
              <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest mb-6 underline underline-offset-4 decoration-neon-green">Lead Developer</p>
              <div className="space-y-2 text-[10px] font-mono text-white/60">
                <div className="flex justify-between"><span>UID:</span><span>#001_BATHRI</span></div>
                <div className="flex justify-between"><span>DEPT:</span><span>CORE_LOGIC</span></div>
              </div>
            </div>

            {/* Member 2: Priyadharshan */}
            <div className="bg-data-gray p-8 group hover:bg-neon-magenta/5 transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/20 text-4xl group-hover:text-neon-magenta">person</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-neon-green/10 text-neon-green text-[8px] font-bold">
                  <span className="status-dot"></span>
                  STATUS: ACTIVE
                </div>
              </div>
              <h4 className="text-2xl font-header uppercase mb-1">Priyadharshan</h4>
              <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest mb-6 underline underline-offset-4 decoration-neon-magenta">Logic Architect</p>
              <div className="space-y-2 text-[10px] font-mono text-white/60">
                <div className="flex justify-between"><span>UID:</span><span>#002_PRIYA</span></div>
                <div className="flex justify-between"><span>DEPT:</span><span>CONSENSUS_ENG</span></div>
              </div>
            </div>

            {/* Member 3: Dharshan */}
            <div className="bg-data-gray p-8 group hover:bg-neon-green/5 transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/20 text-4xl group-hover:text-neon-green">person</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-neon-green/10 text-neon-green text-[8px] font-bold">
                  <span className="status-dot"></span>
                  STATUS: ACTIVE
                </div>
              </div>
              <h4 className="text-2xl font-header uppercase mb-1">Dharshan</h4>
              <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest mb-6 underline underline-offset-4 decoration-neon-green">Data Engineer</p>
              <div className="space-y-2 text-[10px] font-mono text-white/60">
                <div className="flex justify-between"><span>UID:</span><span>#003_DHARSH</span></div>
                <div className="flex justify-between"><span>DEPT:</span><span>PIPELINE_DEV</span></div>
              </div>
            </div>

            {/* Member 4: Vasudevan */}
            <div className="bg-data-gray p-8 group hover:bg-neon-magenta/5 transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/20 text-4xl group-hover:text-neon-magenta">person</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-neon-green/10 text-neon-green text-[8px] font-bold">
                  <span className="status-dot"></span>
                  STATUS: ACTIVE
                </div>
              </div>
              <h4 className="text-2xl font-header uppercase mb-1">Vasudevan</h4>
              <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest mb-6 underline underline-offset-4 decoration-neon-magenta">Interface Designer</p>
              <div className="space-y-2 text-[10px] font-mono text-white/60">
                <div className="flex justify-between"><span>UID:</span><span>#004_VASU</span></div>
                <div className="flex justify-between"><span>DEPT:</span><span>DECON_VISUAL</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;