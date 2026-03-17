import React from 'react';
import PageTransition from './PageTransition';

const About: React.FC = () => {
  return (
    <PageTransition label="ABOUT_PAGE">
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

        {/* Team Section - Dossier Style */}
        <section className="py-40 bg-deep-black overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-header font-black uppercase tracking-tighter text-white mb-2">PROJECT_AUTHORS</h2>
                <p className="text-xs text-white/40 uppercase tracking-widest font-mono">CORE ARCHITECTS & DEVELOPERS</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neon-green uppercase tracking-widest font-mono">ACTIVE_SQUAD: 04 // NODES_SYNCED</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* POI_01: Dharshan */}
              <div className="border-l-2 border-neon-magenta/40 bg-data-gray/30 backdrop-blur-sm mb-8 relative transition-all duration-500 hover:border-l-neon-magenta hover:scale-110 hover:z-30 group peer peer-hover:blur-sm peer-hover:opacity-50">

                <div className="flex border-b border-white/10">
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter bg-neon-magenta text-black">POI_01</div>
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter">STATUS: ACTIVE</div>
                  <div className="flex-1"></div>
                  <div className="p-2 flex items-center">
                    <span className="text-xs text-neon-green">●</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-4 border-r border-white/10 p-2">
                    <div className="w-full aspect-square bg-white/5 relative overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }}>
                      <img src="/DHARSHAN.png" alt="Dharshan" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 text-[8px] bg-black/60 px-1 font-bold text-neon-green">LIVE_FEED</div>
                      <div className="absolute top-2 right-2 flex gap-1">
                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div className="mt-2 text-[8px] text-white/30 font-mono">COORD: 34.0522 N // 118.2437 W</div>
                  </div>
                  <div className="col-span-8 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Known Aliases</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block font-header text-2xl">DHARSHAN V S</span>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Operational Focus</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block text-neon-green font-bold">LEAD DEVELOPER</span>
                    </div>
                    <div className="bg-black/40 p-3 border border-white/5">
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Intel Logs</span>
                      <p className="text-[9px] text-white/50 leading-loose">
                        &gt;&gt; SYSTEM_ORCHESTRATION_LOADED<br />
                        &gt;&gt; CONSENSUS_LOGIC_V4_COMPILED<br />
                        &gt;&gt; WEIGHTED_BIAS_TUNING_COMPLETE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* POI_02: Priyadharshan */}
              <div className="border-l-2 border-neon-green/40 bg-data-gray/30 backdrop-blur-sm mb-8 relative transition-all duration-500 hover:border-l-neon-green hover:scale-110 hover:z-30 group peer peer-hover:blur-sm peer-hover:opacity-50">

                <div className="flex border-b border-white/10">
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter bg-neon-green text-black">POI_02</div>
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter">STATUS: SYNCED</div>
                  <div className="flex-1"></div>
                  <div className="p-2 flex items-center">
                    <span className="text-xs text-neon-green">◉</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-4 border-r border-white/10 p-2">
                    <div className="w-full aspect-square bg-white/5 relative overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }}>
                      <img src="/PRIYADHARSHAN .jpg" alt="Priyadharshan" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 text-[8px] bg-black/60 px-1 font-bold text-neon-green">SECURE_LINK</div>
                    </div>
                    <div className="mt-2 text-[8px] text-white/30 font-mono">COORD: 51.5074 N // 0.1278 W</div>
                  </div>
                  <div className="col-span-8 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Known Aliases</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block font-header text-2xl">PRIYADHARSHAN D S</span>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Operational Focus</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block text-neon-green font-bold">LOGIC ARCHITECT</span>
                    </div>
                    <div className="bg-black/40 p-3 border border-white/5">
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Intel Logs</span>
                      <p className="text-[9px] text-white/50 leading-loose">
                        &gt;&gt; TRUTH_ANCHOR_PROTOCOLS_ENGAGED<br />
                        &gt;&gt; HALLUCINATION_DETECTION_ACTIVE<br />
                        &gt;&gt; SYMBOLIC_REASONING_ENGINE_STABLE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* POI_03: Bathrinath */}
              <div className="border-l-2 border-neon-magenta/40 bg-data-gray/30 backdrop-blur-sm mb-8 relative transition-all duration-500 hover:border-l-neon-magenta hover:scale-110 hover:z-30 group peer peer-hover:blur-sm peer-hover:opacity-50">

                <div className="flex border-b border-white/10">
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter bg-neon-magenta text-black">POI_03</div>
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter">STATUS: STREAMING</div>
                  <div className="flex-1"></div>
                  <div className="p-2 flex items-center">
                    <span className="text-xs text-neon-magenta animate-pulse">◈</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-4 border-r border-white/10 p-2">
                    <div className="w-full aspect-square bg-white/5 relative overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }}>
                      <img src="/BATHRINATH.jpg" alt="Bathrinath" className="w-full h-full object-cover" />
                      <div className="absolute bottom-2 left-2 text-[8px] bg-black/60 px-1 font-bold text-neon-green">BUFFERING...</div>
                    </div>
                    <div className="mt-2 text-[8px] text-white/30 font-mono">COORD: 35.6762 N // 139.6503 E</div>
                  </div>
                  <div className="col-span-8 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Known Aliases</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block font-header text-2xl">BATHRINATH K</span>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Operational Focus</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block text-neon-green font-bold">DATA ENGINEER</span>
                    </div>
                    <div className="bg-black/40 p-3 border border-white/5">
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Intel Logs</span>
                      <p className="text-[9px] text-white/50 leading-loose">
                        &gt;&gt; DATA_STREAM_VISUALS_OPTIMIZED<br />
                        &gt;&gt; REACTIVE_SCHEMATICS_RENDERED<br />
                        &gt;&gt; NEON_UI_THRESHOLD_MET
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* POI_04: Vasudevan */}
              <div className="border-l-2 border-neon-green/40 bg-data-gray/30 backdrop-blur-sm mb-8 relative transition-all duration-500 hover:border-l-neon-green hover:scale-110 hover:z-30 group peer peer-hover:blur-sm peer-hover:opacity-50">

                <div className="flex border-b border-white/10">
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter bg-neon-green text-black">POI_04</div>
                  <div className="px-4 py-2 text-[10px] font-bold border-r border-white/10 uppercase tracking-tighter">STATUS: ENCRYPTED</div>
                  <div className="flex-1"></div>
                  <div className="p-2 flex items-center">
                    <span className="text-xs text-neon-green">🔑</span>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-4 border-r border-white/10 p-2">
                    <div className="w-full aspect-square bg-white/5 relative overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)', backgroundSize: '100% 3px' }}>
                      <img src="/VASUDEVAN.jpg" alt="Vasudevan" className="w-full h-full object-cover object-[center_30%]" />
                      <div className="absolute bottom-2 left-2 text-[8px] bg-black/60 px-1 font-bold text-neon-green">DATA_LOCKED</div>
                    </div>
                    <div className="mt-2 text-[8px] text-white/30 font-mono">COORD: 40.7128 N // 74.0060 W</div>
                  </div>
                  <div className="col-span-8 p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Known Aliases</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block font-header text-2xl">VASUDEVAN V</span>
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Operational Focus</span>
                      <span className="text-sm text-white/90 uppercase mb-4 block text-neon-green font-bold">INTERFACE DESIGNER</span>
                    </div>
                    <div className="bg-black/40 p-3 border border-white/5">
                      <span className="text-[9px] text-neon-magenta/60 uppercase font-bold tracking-widest block mb-1">Intel Logs</span>
                      <p className="text-[9px] text-white/50 leading-loose">
                        &gt;&gt; WORKFLOW_ARCHITECTURE_STABLE<br />
                        &gt;&gt; VECTOR_DB_SHARDING_SYNCED<br />
                        &gt;&gt; LLM_MODEL_PIPELINE_FLOWING
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-32 text-center">
              <div className="inline-block border border-neon-magenta/30 p-8 bg-data-gray/50 max-w-2xl">
                <h3 className="font-header text-xl mb-4 text-neon-magenta uppercase">Summary of Operations</h3>
                <p className="text-xs text-white/50 font-mono uppercase leading-relaxed tracking-widest">
                  The aforementioned entities are responsible for the total deconstruction of monolithic AI frameworks. Current status of the WHISTLE_CORE remains: <span className="text-neon-green">ABSOLUTE_INTEGRITY</span>.
                </p>
                <div className="mt-6 flex justify-center gap-4">
                  <div className="w-12 h-1 bg-neon-magenta"></div>
                  <div className="w-12 h-1 bg-neon-green"></div>
                  <div className="w-12 h-1 bg-neon-magenta"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;