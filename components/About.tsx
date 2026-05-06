import React, { useState } from 'react';
import PageTransition from './PageTransition';
import certDharshan    from '../src/certificates/dharshan.jpg';
import certPriyadharshan from '../src/certificates/priyadhaeshan.jpg';
import certBathrinath  from '../src/certificates/bathri.jpg';
import certVasudevan   from '../src/certificates/vasu.jpg';

const certificates = [
  { id: 'CERT_01', name: 'DHARSHAN V S',       role: 'LEAD DEVELOPER',     color: 'neon-magenta', img: certDharshan },
  { id: 'CERT_02', name: 'PRIYADHARSHAN D S',  role: 'LOGIC ARCHITECT',    color: 'neon-green',   img: certPriyadharshan },
  { id: 'CERT_03', name: 'BATHRINATH K',        role: 'DATA ENGINEER',      color: 'neon-magenta', img: certBathrinath },
  { id: 'CERT_04', name: 'VASUDEVAN M',         role: 'INTERFACE DESIGNER', color: 'neon-green',   img: certVasudevan },
];

const About: React.FC = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);
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
                      <span className="text-sm text-white/90 uppercase mb-4 block font-header text-2xl">VASUDEVAN M</span>
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
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* RESEARCH CREDENTIALS — Journal Publication Certs   */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="py-32 bg-deep-black relative overflow-hidden">
          {/* top glow divider */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/60 to-transparent" />
          <div className="obstructed-text bottom-0 -right-10 z-0 select-none opacity-10 pointer-events-none">CERT</div>

          {/* per-section animations */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes cert-spin     { to { transform: rotate(360deg);  } }
            @keyframes cert-spin-rev { to { transform: rotate(-360deg); } }
            @keyframes cert-scan {
              0%   { top: -10%; opacity: 0.5; }
              100% { top: 110%; opacity: 0;   }
            }
            .cert-ring-cw  { animation: cert-spin      12s linear infinite; }
            .cert-ring-ccw { animation: cert-spin-rev   8s linear infinite; }
            .cert-scan-bar { position: absolute; left:0; right:0; height: 40px;
              background: linear-gradient(to bottom,transparent,rgba(57,255,20,0.07),transparent);
              animation: cert-scan 3s ease-in-out infinite; pointer-events:none; }
          `}} />

          <div className="container mx-auto px-6 relative z-10">

            {/* ── Section header ── */}
            <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-[10px] text-neon-green tracking-[0.35em] font-bold font-mono block mb-2">PUBLICATION_ARCHIVE // IJSREAT 2025</span>
                <h2 className="text-3xl md:text-5xl font-header font-black uppercase tracking-tighter text-white">
                  RESEARCH_<span className="text-neon-green">CREDENTIALS</span>
                </h2>
                <p className="text-xs text-white/35 uppercase tracking-widest font-mono mt-1">PEER REVIEWED &amp; CERTIFIED // ALL 4 AUTHORS</p>
              </div>
              <p className="text-xs text-neon-green uppercase tracking-widest font-mono animate-pulse shrink-0">● CERT_STATUS: VERIFIED</p>
            </div>

            {/* ── Certificate cards grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {certificates.map((cert) => {
                const accent = cert.color === 'neon-green' ? '#39ff14' : '#ff00ff';
                const accentClass = cert.color === 'neon-green'
                  ? 'border-neon-green/40 hover:border-neon-green shadow-[0_0_30px_rgba(57,255,20,0.06)] hover:shadow-[0_0_50px_rgba(57,255,20,0.2)]'
                  : 'border-neon-magenta/40 hover:border-neon-magenta shadow-[0_0_30px_rgba(255,0,255,0.06)] hover:shadow-[0_0_50px_rgba(255,0,255,0.2)]';
                const badgeClass = cert.color === 'neon-green' ? 'bg-neon-green text-black' : 'bg-neon-magenta text-black';
                const dotClass   = cert.color === 'neon-green' ? 'bg-neon-green shadow-[0_0_6px_#39ff14]' : 'bg-neon-magenta shadow-[0_0_6px_#ff00ff]';
                return (
                  <div
                    key={cert.id}
                    className={`group relative bg-[#080808] border ${accentClass} rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:z-10`}
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.012) 0,rgba(255,255,255,0.012) 1px,transparent 1px,transparent 4px)' }}
                    onClick={() => setLightbox(cert.img)}
                  >
                    {/* top stripe */}
                    <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg,${accent},transparent,${accent})` }} />

                    {/* card header */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/8">
                      <span className={`text-[9px] font-bold px-2 py-0.5 tracking-widest ${badgeClass}`}>{cert.id}</span>
                      <div className={`w-1.5 h-1.5 rounded-full ${dotClass} animate-pulse`} />
                    </div>

                    {/* certificate image */}
                    <div className="relative overflow-hidden">
                      <div className="cert-scan-bar" />
                      <img
                        src={cert.img}
                        alt={`${cert.name} — Journal Certificate`}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ maxHeight: '260px', objectPosition: 'top' }}
                      />
                      {/* click overlay hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                        <div className="flex flex-col items-center gap-2">
                          <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                          <span className="text-[9px] text-white/80 font-mono tracking-widest">VIEW CERTIFICATE</span>
                        </div>
                      </div>
                    </div>

                    {/* card footer */}
                    <div className="p-4 flex flex-col gap-1">
                      <span className="text-[9px] text-white/30 font-mono tracking-widest">REGISTERED AUTHOR</span>
                      <span className="font-header font-black text-white uppercase tracking-tight">{cert.name}</span>
                      <span className="text-[10px] font-mono tracking-widest" style={{ color: accent }}>{cert.role}</span>
                      <div className="mt-3 pt-3 border-t border-white/5 text-[8px] text-white/20 font-mono tracking-widest">
                        IJSREAT // VOL.13 IS.02 // 2025
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Publication metadata strip ── */}
            <div className="mt-12 border border-white/8 bg-white/[0.02] rounded-lg p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { label: 'JOURNAL',  value: 'IJSREAT' },
                { label: 'VOLUME',   value: 'VOL.13 / ISSUE 02' },
                { label: 'YEAR',     value: '2025' },
                { label: 'ISSN',     value: '2347-6982' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-[8px] text-white/25 font-mono tracking-widest mb-1">{m.label}</div>
                  <div className="text-sm font-header font-black text-white tracking-wide">{m.value}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Summary of Operations */}
        <section className="py-20 bg-deep-black relative">
          <div className="container mx-auto px-6">
            <div className="text-center">
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

        {/* ── Lightbox modal ── */}
        {lightbox && (
          <div
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          >
            {/* ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(57,255,20,0.06) 0%, transparent 60%)' }} />
            {/* certificate image */}
            <div
              className="relative max-w-4xl w-full mx-4 border border-neon-green/30 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(57,255,20,0.15)]"
              onClick={(e) => e.stopPropagation()}
              style={{ animation: 'modal-rise 0.4s cubic-bezier(0.16,1,0.3,1) forwards' }}
            >
              <div className="h-[3px] bg-gradient-to-r from-neon-green via-neon-magenta to-neon-green" />
              <div className="flex items-center justify-between px-4 py-2 bg-[#080808] border-b border-white/10">
                <span className="text-[10px] text-neon-green font-mono tracking-widest font-bold">CERTIFICATE_VIEW // FULL_RESOLUTION</span>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-white/40 hover:text-white transition-colors text-xs font-mono tracking-widest px-3 py-1 border border-white/10 hover:border-white/30 rounded"
                >
                  [CLOSE ✕]
                </button>
              </div>
              <img src={lightbox} alt="Certificate" className="w-full object-contain bg-[#050505]" style={{ maxHeight: '80vh' }} />
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
};

export default About;