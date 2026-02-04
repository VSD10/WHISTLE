import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete?.(), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 50); // 50ms * 100 = 5000ms = 5 seconds

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-deep-black">
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-30"></div>
                <div className="absolute inset-0 circuit-bg opacity-40"></div>

                {/* Grid lines */}
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-green/40 to-transparent"></div>
                <div className="absolute bottom-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-magenta/30 to-transparent"></div>
                <div className="absolute left-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-green/20 to-transparent"></div>
                <div className="absolute right-1/4 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-green/20 to-transparent"></div>

                {/* Data nodes */}
                <div className="absolute w-1 h-1 bg-neon-green shadow-[0_0_8px_#39ff14] top-20 left-[15%]"></div>
                <div className="absolute w-1 h-1 bg-neon-green shadow-[0_0_8px_#39ff14] top-40 left-[45%]"></div>
                <div className="absolute w-1 h-1 bg-neon-green shadow-[0_0_8px_#39ff14] bottom-60 right-[20%]"></div>
                <div className="absolute w-1 h-1 bg-neon-green shadow-[0_0_8px_#39ff14] top-[70%] left-[8%]"></div>
                <div className="absolute w-1 h-1 bg-neon-green shadow-[0_0_8px_#39ff14] bottom-[10%] right-[40%]"></div>
            </div>

            {/* Main content */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl px-6">
                {/* Top left label */}
                <div className="absolute top-12 left-12 flex flex-col gap-4">
                    <div className="border border-neon-green/30 bg-deep-black/80 px-4 py-2 text-[10px] tracking-[0.2em] font-bold uppercase border-l-4 border-l-neon-magenta">
                        Node_ID: 0x992_WHISTLE_OS
                    </div>
                    <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">
                        Sub-routine: consensus_handshake
                    </div>
                </div>

                {/* Top right warning */}
                <div className="absolute top-12 right-12 text-right">
                    <div className="border border-neon-magenta text-neon-magenta bg-neon-magenta/10 px-6 py-3 text-sm font-black tracking-tighter uppercase skew-x-[-12deg]">
                        POWER_SURGE_DETECTED
                    </div>
                    <div className="mt-4 text-[9px] font-mono text-neon-magenta/60 uppercase">
                        Voltage: 1.28v // Peak_Threshold: Critical
                    </div>
                </div>

                {/* Center loading circle */}
                <div className="flex flex-col items-center">
                    <div className="relative mb-8">
                        <div className="w-64 h-64 border-4 border-dotted border-neon-green/20 rounded-full flex items-center justify-center relative animate-spin-slow">
                            <div className="w-56 h-56 border border-white/10 rounded-full flex items-center justify-center">
                                <div className="w-48 h-48 border-[12px] border-neon-green/10 border-t-neon-green rounded-full animate-spin"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="material-symbols-outlined text-neon-green text-5xl opacity-50">settings_input_component</span>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <h2 className="text-6xl md:text-8xl font-header font-black tracking-tighter uppercase">
                                INIT: <span className="text-neon-green">[{progress}%]</span>
                            </h2>
                        </div>
                    </div>

                    {/* Agent status */}
                    <div className="mt-20 flex flex-col items-center gap-6">
                        <div className="flex gap-4 items-center">
                            <div className="h-px w-24 bg-white/10"></div>
                            <div className="text-lg font-condensed tracking-[0.4em] uppercase">AGENTS_SYNCHRONIZING</div>
                            <div className="h-px w-24 bg-white/10"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                            <div className="border border-white/5 bg-white/5 p-4 text-center">
                                <div className="text-[8px] text-white/30 mb-1">AGENT_01</div>
                                <div className="text-[10px] text-neon-green">ACTIVE</div>
                            </div>
                            <div className="border border-white/5 bg-white/5 p-4 text-center">
                                <div className="text-[8px] text-white/30 mb-1">AGENT_02</div>
                                <div className="text-[10px] text-neon-green">ACTIVE</div>
                            </div>
                            <div className="border border-white/5 bg-white/5 p-4 text-center">
                                <div className="text-[8px] text-white/30 mb-1">AGENT_03</div>
                                <div className="text-[10px] text-neon-magenta">SYNCING...</div>
                            </div>
                            <div className="border border-white/5 bg-white/5 p-4 text-center opacity-30">
                                <div className="text-[8px] text-white/30 mb-1">AGENT_04</div>
                                <div className="text-[10px]">STANDBY</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-12 w-full px-12 flex justify-between items-end">
                    <div className="max-w-xs">
                        <p className="text-[9px] font-mono text-white/40 leading-relaxed uppercase">
                            Whistle_OS Ignition Sequence Alpha-6.
                            Establishing multi-agent consensus fabric.
                            Bypassing hallucination vectors...
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-right">
                            <div className="text-[10px] text-white/20 uppercase mb-2">System_Uptime</div>
                            <div className="font-header text-2xl tracking-tighter">00:00:{String(Math.floor(progress * 0.42)).padStart(2, '0')}:{String(progress).padStart(2, '0')}</div>
                        </div>
                        <div className="h-12 w-px bg-white/10"></div>
                        <div className="flex flex-col items-end">
                            <span className="material-symbols-outlined text-neon-green mb-1">radar</span>
                            <span className="text-[10px] font-black tracking-widest text-neon-green">WHISTLE</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-5 select-none overflow-hidden">
                <h1 className="text-[25vw] font-header font-black leading-none tracking-tighter uppercase whitespace-nowrap">IGNITION</h1>
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .grid-bg {
                    background-image: linear-gradient(rgba(57, 255, 20, 0.05) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(57, 255, 20, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
