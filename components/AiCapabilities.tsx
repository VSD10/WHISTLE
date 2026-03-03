import React from 'react';

const AiCapabilities: React.FC = () => {
    return (
        <section className="py-20 md:py-40 relative border-t border-white/10 overflow-hidden bg-deep-black">
            {/* Background Aesthetics */}
            <div className="absolute inset-0 circuit-bg opacity-30 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-neon-green/5 to-transparent pointer-events-none opacity-50 blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24 animate-slide-up relative z-20">
                    <div className="inline-block mb-4">
                        <span className="glitch-bar">SYSTEM UPGRADE DETECTED</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-header font-black uppercase tracking-tighter text-white mb-6">
                        Advanced <span className="text-neon-magenta text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-neon-green">AI Capabilities</span>
                    </h2>
                    <p className="font-mono text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Experience next-level processing with our cutting-edge AI architecture. Designed for speed, precision, and absolute privacy.
                    </p>
                </div>

                {/* The "Diamond Core" Pipeline Layout */}
                <div className="relative max-w-5xl mx-auto">

                    {/* Glowing Center Spine (Connects everything) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2 hidden md:block">
                        {/* Moving Pulse on Spine */}
                        <div className="w-[3px] h-32 bg-neon-green shadow-[0_0_20px_#39ff14] absolute top-1/4 -left-[1px] rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
                        <div className="w-[3px] h-16 bg-neon-magenta shadow-[0_0_20px_#ff00ff] absolute top-3/4 -left-[1px] rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                    </div>

                    {/* Section 1: Parallel Workflow */}
                    <div className="relative mb-40 md:mb-60 group">
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
                            {/* Visual Side (Left) */}
                            <div className="w-full md:w-1/2 relative h-72 md:h-80 flex items-center justify-center">
                                {/* SVG Connection Lines - drawn behind everything */}
                                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid meet">
                                    {/* Dashed lines from each model to the verdict core */}
                                    <line x1="95" y1="50" x2="280" y2="160" stroke="#39ff14" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
                                    <line x1="95" y1="130" x2="280" y2="160" stroke="#39ff14" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
                                    <line x1="95" y1="210" x2="280" y2="160" stroke="#39ff14" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
                                    <line x1="95" y1="280" x2="280" y2="160" stroke="#39ff14" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />

                                    {/* Animated flowing dots along each line */}
                                    {[
                                        { x1: 95, y1: 50, dur: "2s", delay: "0s" },
                                        { x1: 95, y1: 130, dur: "2.3s", delay: "0.4s" },
                                        { x1: 95, y1: 210, dur: "2.1s", delay: "0.8s" },
                                        { x1: 95, y1: 280, dur: "2.5s", delay: "1.2s" },
                                    ].map((line, i) => (
                                        <circle key={i} r="3" fill="#39ff14" filter="url(#glow)">
                                            <animate attributeName="cx" values={`${line.x1};280`} dur={line.dur} begin={line.delay} repeatCount="indefinite" />
                                            <animate attributeName="cy" values={`${line.y1};160`} dur={line.dur} begin={line.delay} repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="1;1;0" dur={line.dur} begin={line.delay} repeatCount="indefinite" />
                                        </circle>
                                    ))}

                                    {/* Glow filter */}
                                    <defs>
                                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="2" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                </svg>

                                {/* Left Column: 4 Models */}
                                <div className="absolute left-4 md:left-8 top-0 bottom-0 flex flex-col justify-between py-3 z-10">
                                    {[1, 2, 3, 4].map((num) => (
                                        <div key={num} className="flex items-center gap-3">
                                            <span className="text-[9px] font-mono text-neon-green/60 w-5">M{num}</span>
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-black border border-neon-green/80 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(57,255,20,0.4)] backdrop-blur-md">
                                                <span className="material-symbols-outlined text-neon-green text-lg">smart_toy</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side: Final Verdict Agent */}
                                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10">
                                    <div className="w-28 h-28 md:w-32 md:h-32 bg-black border-2 border-neon-green rounded-lg flex flex-col items-center justify-center gap-2 shadow-[0_0_40px_rgba(57,255,20,0.3)] relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-transparent"></div>
                                        <div className="absolute inset-0 scanlines opacity-30"></div>
                                        <div className="relative z-10 flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 border-2 border-neon-green rounded-full flex items-center justify-center shadow-[0_0_20px_#39ff14] bg-black">
                                                <span className="material-symbols-outlined text-neon-green text-2xl">verified</span>
                                            </div>
                                            <span className="text-[10px] font-mono font-black tracking-widest text-neon-green">FINAL VERDICT</span>
                                            <span className="text-[7px] font-mono tracking-widest text-white/50">CONSENSUS CORE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Text Side (Right) */}
                            <div className="w-full md:w-1/2 text-center md:text-left relative z-20">
                                <div className="absolute -left-4 top-0 w-1 h-full bg-neon-green/30 hidden md:block"></div>
                                <h3 className="text-3xl md:text-5xl font-header uppercase tracking-wider text-white mb-6 font-black group-hover:text-neon-green transition-colors duration-500">
                                    Parallel Workflow
                                </h3>
                                <p className="font-mono text-white/70 leading-loose text-sm md:text-base border border-white/5 bg-black/40 p-6 backdrop-blur-md relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-neon-green/10 blur-xl"></div>
                                    Each AI model <span className="text-neon-green font-bold px-1 bg-neon-green/10">thinks independently</span>. Their individual findings are mapped concurrently and sent to a central consensus engine. The engine cross-references the isolated data arrays and delivers the definitive, most mathematically robust final answer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Series Workflow */}
                    <div className="relative mb-20 md:mb-32 group">
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
                            {/* Visual Side (Right) */}
                            <div className="w-full md:w-1/2 relative h-72 md:h-80 flex items-center justify-center">
                                {/* Horizontal Pipeline Chain: A1 → A2 → A3 → Output */}
                                <div className="relative w-full flex items-center justify-center px-2 md:px-6">

                                    {/* Agent Chain */}
                                    <div className="flex items-center gap-0">
                                        {/* Agent 1: RECEIVE */}
                                        <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-11 h-11 md:w-14 md:h-14 bg-black border-2 border-neon-magenta/70 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.3)] group-hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] transition-shadow duration-500 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-b from-neon-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <span className="material-symbols-outlined text-neon-magenta text-xl relative z-10">download</span>
                                            </div>
                                            <span className="text-[7px] md:text-[8px] font-mono text-neon-magenta/70 tracking-widest">RECEIVE</span>
                                            <span className="text-[6px] font-mono text-white/30">A1</span>
                                        </div>

                                        {/* Connector 1→2 */}
                                        <div className="relative w-6 md:w-10 h-[2px] bg-neon-magenta/30 mx-0.5">
                                            <div className="absolute inset-y-0 left-0 w-3 h-[2px] bg-neon-magenta shadow-[0_0_8px_#ff00ff] animate-series-flow" style={{ animationDelay: '0s' }}></div>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-neon-magenta/60"></div>
                                        </div>

                                        {/* Agent 2: ANALYZE */}
                                        <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-11 h-11 md:w-14 md:h-14 bg-black border-2 border-neon-magenta rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.4)] group-hover:shadow-[0_0_35px_rgba(255,0,255,0.6)] transition-shadow duration-500 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-b from-neon-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <span className="material-symbols-outlined text-neon-magenta text-xl relative z-10">psychology</span>
                                            </div>
                                            <span className="text-[7px] md:text-[8px] font-mono text-neon-magenta/70 tracking-widest">ANALYZE</span>
                                            <span className="text-[6px] font-mono text-white/30">A2</span>
                                        </div>

                                        {/* Connector 2→3 */}
                                        <div className="relative w-6 md:w-10 h-[2px] bg-neon-magenta/30 mx-0.5">
                                            <div className="absolute inset-y-0 left-0 w-3 h-[2px] bg-neon-magenta shadow-[0_0_8px_#ff00ff] animate-series-flow" style={{ animationDelay: '0.3s' }}></div>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-neon-magenta/60"></div>
                                        </div>

                                        {/* Agent 3: REFINE */}
                                        <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-11 h-11 md:w-14 md:h-14 bg-black border-2 border-neon-magenta rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.4)] group-hover:shadow-[0_0_35px_rgba(255,0,255,0.6)] transition-shadow duration-500 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-b from-neon-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <span className="material-symbols-outlined text-neon-magenta text-xl relative z-10">tune</span>
                                            </div>
                                            <span className="text-[7px] md:text-[8px] font-mono text-neon-magenta/70 tracking-widest">REFINE</span>
                                            <span className="text-[6px] font-mono text-white/30">A3</span>
                                        </div>

                                        {/* Connector 3→4 */}
                                        <div className="relative w-6 md:w-10 h-[2px] bg-neon-magenta/30 mx-0.5">
                                            <div className="absolute inset-y-0 left-0 w-3 h-[2px] bg-neon-magenta shadow-[0_0_8px_#ff00ff] animate-series-flow" style={{ animationDelay: '0.6s' }}></div>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-neon-magenta/60"></div>
                                        </div>

                                        {/* Agent 4: VALIDATE */}
                                        <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-11 h-11 md:w-14 md:h-14 bg-black border-2 border-neon-magenta rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.4)] group-hover:shadow-[0_0_35px_rgba(255,0,255,0.6)] transition-shadow duration-500 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-b from-neon-magenta/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <span className="material-symbols-outlined text-neon-magenta text-xl relative z-10">check_circle</span>
                                            </div>
                                            <span className="text-[7px] md:text-[8px] font-mono text-neon-magenta/70 tracking-widest">VALIDATE</span>
                                            <span className="text-[6px] font-mono text-white/30">A4</span>
                                        </div>

                                        {/* Connector 4→Output */}
                                        <div className="relative w-6 md:w-10 h-[2px] bg-neon-magenta/30 mx-0.5">
                                            <div className="absolute inset-y-0 left-0 w-3 h-[2px] bg-neon-magenta shadow-[0_0_8px_#ff00ff] animate-series-flow" style={{ animationDelay: '0.9s' }}></div>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-neon-magenta/60"></div>
                                        </div>

                                        {/* Final Output Node */}
                                        <div className="flex flex-col items-center gap-1 relative z-10">
                                            <div className="w-14 h-14 md:w-16 md:h-16 bg-black border-2 border-white/50 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,0,255,0.4),0_0_60px_rgba(255,0,255,0.1)] relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                                <div className="absolute inset-0 bg-gradient-to-br from-neon-magenta/30 via-transparent to-neon-magenta/10"></div>
                                                <div className="absolute inset-0 scanlines opacity-30"></div>
                                                <span className="material-symbols-outlined text-white text-2xl relative z-10">auto_awesome</span>
                                            </div>
                                            <span className="text-[7px] md:text-[8px] font-mono text-white/80 tracking-widest font-bold">OUTPUT</span>
                                        </div>
                                    </div>

                                    {/* Background glow behind the pipeline */}
                                    <div className="absolute inset-0 bg-neon-magenta/3 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Text Side (Left) */}
                            <div className="w-full md:w-1/2 text-center md:text-right relative z-20">
                                <div className="absolute -right-4 top-0 w-1 h-full bg-neon-magenta/30 hidden md:block"></div>
                                <h3 className="text-3xl md:text-5xl font-header uppercase tracking-wider text-white mb-6 font-black group-hover:text-neon-magenta transition-colors duration-500">
                                    Series Workflow
                                </h3>
                                <p className="font-mono text-white/70 leading-loose text-sm md:text-base border border-white/5 bg-black/40 p-6 backdrop-blur-md relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-16 h-16 bg-neon-magenta/10 blur-xl"></div>
                                    AI agents work in a <span className="text-neon-magenta font-bold px-1 bg-neon-magenta/10">sequential chain</span>. One by one, the AI receives, analyzes, and initializes the answer before passing it to the next specialized agent down the line for deep refinement, extensive error-checking, and contextual enhancement.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Personal AI RAG System */}
                    <div className="relative group pt-20">
                        <div className="flex flex-col items-center justify-center text-center">

                            {/* Visual (Top/Center) - Data Vault */}
                            <div className="w-80 h-80 md:w-96 md:h-96 relative flex items-center justify-center mb-12">

                                {/* Animated Background Hex Grid */}
                                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000 pointer-events-none"
                                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0 L60 15 L60 45 L30 60 L0 45 L0 15Z\' fill=\'none\' stroke=\'white\' stroke-width=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '60px 60px' }}>
                                </div>

                                {/* Outer pulse ring */}
                                <div className="absolute w-72 h-72 md:w-80 md:h-80 border border-white/5 rounded-full animate-pulse" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute w-60 h-60 md:w-68 md:h-68 border border-dashed border-white/8 rounded-full animate-spin-slow"></div>

                                {/* Animated encrypted data streams */}
                                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                                    {/* Stream 1: top-left flowing into center */}
                                    <line x1="60" y1="60" x2="200" y2="200" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
                                    <circle r="2" fill="white">
                                        <animate attributeName="cx" values="60;200" dur="3s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values="60;200" dur="3s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
                                    </circle>

                                    {/* Stream 2: top-right */}
                                    <line x1="340" y1="80" x2="200" y2="200" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
                                    <circle r="2" fill="white">
                                        <animate attributeName="cx" values="340;200" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values="80;200" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                                    </circle>

                                    {/* Stream 3: bottom-left */}
                                    <line x1="70" y1="330" x2="200" y2="200" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
                                    <circle r="2" fill="white">
                                        <animate attributeName="cx" values="70;200" dur="2.8s" begin="1s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values="330;200" dur="2.8s" begin="1s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" begin="1s" repeatCount="indefinite" />
                                    </circle>

                                    {/* Stream 4: bottom-right */}
                                    <line x1="330" y1="320" x2="200" y2="200" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
                                    <circle r="2" fill="white">
                                        <animate attributeName="cx" values="330;200" dur="3.2s" begin="0.3s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values="320;200" dur="3.2s" begin="0.3s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" begin="0.3s" repeatCount="indefinite" />
                                    </circle>

                                    {/* Stream 5: left center */}
                                    <line x1="30" y1="200" x2="200" y2="200" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
                                    <circle r="2" fill="white">
                                        <animate attributeName="cx" values="30;200" dur="2.6s" begin="1.5s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values="200;200" dur="2.6s" begin="1.5s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" begin="1.5s" repeatCount="indefinite" />
                                    </circle>

                                    {/* Stream 6: right center */}
                                    <line x1="370" y1="200" x2="200" y2="200" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.3" />
                                    <circle r="2" fill="white">
                                        <animate attributeName="cx" values="370;200" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                                        <animate attributeName="cy" values="200;200" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                                    </circle>
                                </svg>

                                {/* Central Vault - the main visual element */}
                                <div className="relative z-10 flex flex-col items-center gap-4">
                                    {/* Shield container with animated border */}
                                    <div className="relative">
                                        <div className="w-28 h-28 md:w-36 md:h-36 bg-black border-2 border-white/30 rounded-2xl flex items-center justify-center shadow-[0_0_60px_rgba(255,255,255,0.08)] group-hover:shadow-[0_0_80px_rgba(255,255,255,0.15)] transition-all duration-700 relative overflow-hidden group-hover:border-white/50">
                                            <div className="absolute inset-0 scanlines opacity-20"></div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                            <span className="material-symbols-outlined text-white text-5xl md:text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-500 relative z-10">shield_lock</span>
                                        </div>

                                        {/* Animated corner brackets */}
                                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white/40 animate-pulse"></div>
                                        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white/40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-white/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white/40 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                                    </div>

                                    {/* Storage blocks row */}
                                    <div className="flex items-center gap-2 mt-2">
                                        {['MEMORY', 'CONTEXT', 'HISTORY'].map((label, i) => (
                                            <div key={label} className="flex flex-col items-center gap-1 animate-rag-float" style={{ animationDelay: `${i * 0.4}s` }}>
                                                <div className="w-16 md:w-20 h-8 bg-white/5 border border-white/15 rounded flex items-center justify-center backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/25 transition-all duration-500">
                                                    <span className="material-symbols-outlined text-white/60 text-sm group-hover:text-white/80 transition-colors">{i === 0 ? 'memory' : i === 1 ? 'hub' : 'history'}</span>
                                                </div>
                                                <span className="text-[6px] md:text-[7px] font-mono text-white/30 tracking-widest">{label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Status bar */}
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mt-1">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                        <span className="text-[8px] font-mono text-white/50 tracking-widest">ENCRYPTED • LOCAL • PRIVATE</span>
                                    </div>
                                </div>

                                {/* Background ambient glow */}
                                <div className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-full group-hover:bg-white/[0.04] transition-colors duration-1000 pointer-events-none"></div>
                            </div>

                            {/* Text (Bottom/Center) */}
                            <div className="max-w-3xl relative z-20">
                                <h3 className="text-4xl md:text-6xl font-header uppercase tracking-wider text-white mb-6 font-black group-hover:text-white/90 transition-colors duration-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    Personal AI RAG
                                </h3>
                                <p className="font-mono text-white/70 leading-loose text-base md:text-lg border-t border-b border-white/10 py-8 relative">
                                    Experience the power of a Personal AI matrix where all relevant context vectors and history logs are stored <span className="text-white font-black px-2 py-1 bg-white/10 tracking-widest border border-white/20 ml-1">STRICTLY IN LOCAL STORAGE</span>. This cryptographically isolated storage prevents exposure to general RAG systems, guaranteeing your absolute, undeniable privacy. No cloud. No leaks.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Custom utility animations extending tailwind */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
                .animate-series-flow {
                    animation: series-flow 1.5s ease-in-out infinite;
                }
                @keyframes series-flow {
                    0% { left: 0; opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { left: calc(100% - 12px); opacity: 0; }
                }
                .animate-rag-float {
                    animation: rag-float 3s ease-in-out infinite;
                }
                @keyframes rag-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
            `}} />
        </section>
    );
};

export default AiCapabilities;
