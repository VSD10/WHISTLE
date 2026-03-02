import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const ChatInterface: React.FC = () => {
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDownload = () => {
        if (downloading) return;
        setDownloading(true);
        // Simulate download progress
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 5;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => setDownloading(false), 2000);
            }
            setProgress(p);
        }, 150);

        // Trigger actual download (mocked for now, or you can link to an actual MSI if available)
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'WhistleAI-Setup-v2.0.4.msi';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLiveDemo = async () => {
        try {
            // Check if demo is reachable (ignoring CORS for a simple fetch, or rely on actual window open handling if preferable)
            // Note: A simpler approach for an external link is just to open it, as the browser handles external 404s.
            // But if we want to catch it *before* opening or handle it internally:
            const demoUrl = "https://whistle-back-store-1.onrender.com/";
            const res = await fetch(demoUrl, { mode: 'no-cors' }); 
            // no-cors will always return an opaque response we can't fully read an error code from
            // A safer real-world approach is to just window.open, but for the requirement to lead to an internal 404 page:
            // Since we can't reliably ping an external render URL via pure frontend without CORS issues, 
            // we will simulate the check or assume if you requested it we just try to open it and if it fails 
            // (e.g., fetch throws entirely due to network), go to 404.
            
            // In a real app we'd ping our own backend proxy. Here we just open it.
            window.open(demoUrl, "_blank", "noopener,noreferrer");
        } catch (error) {
            navigate('/404');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-deep-black text-white font-mono selection:bg-neon-green selection:text-black uppercase relative overflow-x-hidden">
            {/* Custom injected styles for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                @keyframes pulse-glow {
                    0% { box-shadow: 0 0 20px rgba(57,255,20,0.2), inset 0 0 20px rgba(57,255,20,0.1); }
                    50% { box-shadow: 0 0 50px rgba(57,255,20,0.5), inset 0 0 30px rgba(57,255,20,0.2); }
                    100% { box-shadow: 0 0 20px rgba(57,255,20,0.2), inset 0 0 20px rgba(57,255,20,0.1); }
                }
                @keyframes text-glitch {
                    0% { text-shadow: 2px 0 0 #ff00ff, -2px 0 0 #00ffff; }
                    25% { text-shadow: -2px 0 0 #ff00ff, 2px 0 0 #00ffff; }
                    50% { text-shadow: 2px 0 0 #ff00ff, -2px 0 0 #00ffff; }
                    75% { text-shadow: -2px 0 0 #ff00ff, 2px 0 0 #00ffff; }
                    100% { text-shadow: 2px 0 0 #ff00ff, -2px 0 0 #00ffff; }
                }
                @keyframes neon-sweep {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .btn-glow {
                    animation: pulse-glow 2s infinite;
                }
                .btn-neon-sweep {
                    background: linear-gradient(90deg, #000 0%, rgba(57,255,20,0.1) 25%, #000 50%, rgba(57,255,20,0.3) 75%, #000 100%);
                    background-size: 200% auto;
                    animation: neon-sweep 3s linear infinite;
                }
                .hover-glitch:hover {
                    animation: text-glitch 0.3s infinite;
                }
                .bg-grid {
                    background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                .glass-panel {
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(57,255,20,0.2);
                }
            `}} />

            {/* Background Effects */}
            <div className="absolute inset-0 scanlines z-[200] pointer-events-none opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-grid opacity-30 fixed"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <header className="z-[130] flex flex-col shrink-0 relative">
                <div className="glitch-bar flex justify-between items-center border-b border-neon-green/20 px-4">
                    <span className="text-[10px] sm:text-xs">SYSTEM_STATUS: SECURE_UPLINK_ESTABLISHED // DOWNLOAD_NODE_ACTIVE</span>
                    <div className="hidden md:flex gap-4 text-[10px] sm:text-xs">
                        <span className="text-neon-green">VERSION: 2.0.4.RELEASE</span>
                        <span>TARGET: WINDOWS_X64</span>
                    </div>
                </div>
                <div className="flex items-center justify-between px-6 py-4 glass-panel border-b-0 border-r-0 border-l-0">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer group"
                    >
                        <h1 className="text-xl sm:text-2xl font-header font-black tracking-tighter text-neon-green leading-none group-hover:animate-pulse">WHISTLE</h1>
                        <span className="text-[10px] sm:text-xs tracking-[0.2em] text-white/40 border-l border-white/10 pl-2">DESKTOP_CLIENT</span>
                    </button>
                    <div className="flex gap-4">
                        {/* Removed OPERATOR LOGIN */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center relative z-[100] px-4 py-20 lg:py-0">

                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Column: Copy & CTA */}
                    <div className="flex flex-col gap-8 animate-slide-up order-2 lg:order-1">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel text-[10px] text-neon-green border-neon-green/50 font-bold mb-6 tracking-widest">
                                <span className="w-2 h-2 bg-neon-green rounded-full animate-ping"></span>
                                NEW_RELEASE_v2.0.4
                            </div>
                            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-header font-black leading-[0.9] tracking-tighter mb-6">
                                UNLEASH <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-white hover-glitch transition-all">THE TRUE POWER</span> <br />
                                OF LOCAL AI
                            </h2>
                            <p className="text-sm sm:text-base text-white/60 font-mono max-w-lg leading-relaxed border-l-2 border-neon-green/30 pl-4">
                                Download the WHISTLE Desktop Client to run autonomous verification nodes directly on your hardware. Experience zero latency, absolute privacy, and total system integration.
                            </p>
                        </div>

                        {/* Download CTA */}
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                onClick={handleDownload}
                                disabled={downloading}
                                className={`group relative flex items-center justify-between w-full sm:w-[400px] p-1 border ${downloading ? 'border-white/20 bg-white/5' : 'border-neon-green/50 btn-neon-sweep hover:border-neon-green btn-glow'} transition-all duration-300 overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(57,255,20,0.1)] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]`}
                            >
                                {downloading && (
                                    <div className="absolute left-0 top-0 bottom-0 bg-neon-green/20 transition-all duration-150" style={{ width: `${progress}%` }}></div>
                                )}

                        <div className="flex border-r border-neon-green/20 p-4 shrink-0 bg-neon-green/5">
                            {downloading ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white/50 animate-bounce">
                                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12" y1="18" y2="18"/><polyline points="9 10 12 13 15 10"/><line x1="12" x2="12" y1="13" y2="6"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-neon-green group-hover:scale-110 transition-transform">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
                                </svg>
                            )}
                        </div>
                        <div className="flex-1 px-6 text-left relative z-10">
                            <div className={`font-header font-black tracking-wider text-xl ${downloading ? 'text-white/70' : 'text-neon-green group-hover:text-white transition-colors'}`}>
                                {downloading ? 'DOWNLOADING...' : 'DOWNLOAD FOR WINDOWS'}
                            </div>
                            <div className="text-[10px] font-mono text-white/40 tracking-widest mt-1 flex justify-between">
                                <span>{downloading ? `PROGRESS: ${Math.round(progress)}%` : 'INSTALLER (.MSI) // 142MB'}</span>
                                {downloading && <span className="text-neon-green">{Math.round(progress)}%</span>}
                            </div>
                        </div>
                        {!downloading && (
                            <div className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-neon-green">
                                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                </svg>
                            </div>
                        )}
                    </button>
                    <button 
                        onClick={handleLiveDemo}
                        className="group relative flex items-center justify-center w-full sm:w-[200px] p-4 border border-neon-magenta/50 bg-black hover:bg-neon-magenta/10 transition-all duration-300 overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(255,0,255,0.1)] hover:shadow-[0_0_30px_rgba(255,0,255,0.4)]"
                    >
                        <div className="flex-1 text-center relative z-10">
                            <div className="font-header font-black tracking-wider text-xl text-neon-magenta group-hover:text-white transition-colors flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
                                </svg>
                                LIVE DEMO
                            </div>
                            <div className="text-[10px] font-mono text-white/40 tracking-widest mt-1">
                                LAUNCH_WEB_CLIENT
                            </div>
                        </div>
                    </button>
                </div>
                <p className="text-[10px] text-white/30 font-mono tracking-widest pl-2">
                        REQUIREMENT: WINDOWS 10/11 64-BIT // 8GB RAM MINIMUM
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-4 border-t border-white/10">
                    <div>
                        <div className="text-2xl font-header font-black text-white group cursor-default">
                            <span className="text-neon-green">0</span> MS
                        </div>
                        <div className="text-[9px] text-white/40 tracking-widest">NETWORK_LATENCY</div>
                    </div>
                    <div>
                        <div className="text-2xl font-header font-black text-white group cursor-default">
                            AES<span className="text-neon-green">-256</span>
                        </div>
                        <div className="text-[9px] text-white/40 tracking-widest">LOCAL_ENCRYPTION</div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-2xl font-header font-black text-white group cursor-default">
                            OFF<span className="text-neon-green">LINE</span>
                        </div>
                        <div className="text-[9px] text-white/40 tracking-widest">100%_CAPABLE</div>
                    </div>
                </div>
        </div>

                    {/* Right Column: Visual Product */ }
    <div className="relative animate-float order-1 lg:order-2 perspective-[1000px]">
        {/* Glowing backdrop for the "software box" */}
        <div className="absolute inset-x-10 inset-y-10 bg-neon-green/20 blur-[80px] rounded-full z-0"></div>

        {/* 3D App Representation */}
        <div className="relative z-10 glass-panel border border-neon-green/40 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_0_1px_rgba(57,255,20,0.2)] transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-[0deg] hover:rotate-x-[0deg]">

            {/* App Header */}
            <div className="bg-black/80 px-4 py-2 flex items-center justify-between border-b border-white/10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-neon-green/50 shadow-[0_0_5px_#39ff14]"></div>
                </div>
                <div className="text-[10px] text-white/40 tracking-widest">WHISTLE_TERMINAL_NODE</div>
                <div></div> {/* Spacer */}
            </div>

            {/* App Content Fake */}
            <div className="p-6 bg-deep-black h-[400px] flex flex-col font-mono text-sm relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20"></div>
                <div className="text-neon-green mb-4">&gt; INITIALIZING LOCAL ENVIRONMENT... [OK]</div>
                <div className="text-white/70 mb-2">&gt; LOADING MODELS INTO VRAM...</div>
                <div className="w-full h-1 bg-white/10 mb-4 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-green w-[85%] rounded-full shadow-[0_0_10px_#39ff14]"></div>
                </div>
                <div className="text-white/70 mb-4">&gt; SECURE UPLINK ESTABLISHED.</div>

                <div className="mt-auto border border-white/10 bg-white/5 p-4 rounded mt-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-neon-green/20 flex items-center justify-center border border-neon-green/50">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-neon-green">
                                <polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-white font-bold text-xs mb-1">LOCAL_CONSENSUS_ENGINE</div>
                            <div className="text-[10px] text-white/50">PROCESSING 4,021 TOKENS/SEC</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
                </div >

    {/* Features Row */ }
    < div className = "w-full max-w-6xl mt-24 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style = {{ animationDelay: '0.2s' }}>
                    <div className="glass-panel p-6 border-t-2 border-t-neon-green/50 hover:bg-white/5 transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-neon-green mb-4 group-hover:scale-110 transition-transform">
                            <path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>
                        </svg>
                        <h3 className="text-lg font-bold text-white mb-2">RAW PERFORMANCE</h3>
                        <p className="text-xs text-white/50 tracking-wide leading-relaxed">
                            Bypass API throttling and network bottlenecks. Execute complex consensus models directly on your local GPU with unparalleled speed.
                        </p>
                    </div>
                    <div className="glass-panel p-6 border-t-2 border-t-neon-magenta/50 hover:bg-white/5 transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-neon-magenta mb-4 group-hover:scale-110 transition-transform">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2.5 0 4.5 1 6.5 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>
                        </svg>
                        <h3 className="text-lg font-bold text-white mb-2">ABSOLUTE PRIVACY</h3>
                        <p className="text-xs text-white/50 tracking-wide leading-relaxed">
                            Zero data leaves your machine. Perfect for analyzing sensitive corporate documents, legal contracts, or classified intellectual property.
                        </p>
                    </div>
                    <div className="glass-panel p-6 border-t-2 border-t-white/50 hover:bg-white/5 transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform">
                            <path d="M19 11v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/><path d="m14 2 2 2"/><path d="M12 12 22 2"/>
                        </svg>
                        <h3 className="text-lg font-bold text-white mb-2">NATIVE INTEGRATION</h3>
                        <p className="text-xs text-white/50 tracking-wide leading-relaxed">
                            Seamlessly integrates with your OS file system. Drag and drop local datasets instantly. Background processing optimized for minimal footprint.
                        </p>
                    </div>
                </div >

            </main >

            <Footer />
        </div >
    );
};

export default ChatInterface;
