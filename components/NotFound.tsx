import React from 'react';

interface NotFoundProps {
    onNavigate: (view: 'home') => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
    return (
        <div className="relative flex items-center justify-center h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 circuit-bg z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-deep-black via-transparent to-deep-black z-[1]"></div>
            <div className="fixed top-0 left-0 w-full z-[110] glitch-bar text-center">
                CRITICAL_ERROR: SEQUENCE_INTERRUPTED // NODE_404_NOT_FOUND
            </div>
            <div className="relative w-full h-full flex items-center justify-center z-10">
                <div className="absolute top-[15%] left-[5%] md:left-[15%] rotate-[-15deg] scatter-char text-[35vw] md:text-[25vw] text-white/10 mix-blend-overlay">4</div>
                <div className="absolute top-[20%] left-[10%] md:left-[20%] rotate-[5deg] scatter-char text-[40vw] md:text-[30vw] text-neon-green/20">4</div>
                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[12deg] scatter-char text-[45vw] md:text-[35vw] text-neon-magenta/10">0</div>
                <div className="absolute top-[45%] left-[48%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] scatter-char text-[42vw] md:text-[32vw] text-white/5">0</div>
                <div className="absolute bottom-[10%] right-[5%] md:right-[15%] rotate-[-25deg] scatter-char text-[38vw] md:text-[28vw] text-white/10">4</div>
                <div className="absolute bottom-[15%] right-[10%] md:right-[20%] rotate-[10deg] scatter-char text-[40vw] md:text-[30vw] text-neon-green/10 mix-blend-screen">4</div>
                <div className="fragment-label top-[30%] left-[25%]">DATA_FRAGMENTED</div>
                <div className="fragment-label top-[60%] right-[20%]">NODE_OFFLINE</div>
                <div className="fragment-label bottom-[25%] left-[15%]">PATH_LOST</div>
                <div className="fragment-label top-[15%] right-[35%] opacity-40">NULL_REFERENCE_EXCEPTION</div>
                <div className="fragment-label bottom-[40%] right-[10%] opacity-30">TRACE_CLEARED</div>
                <div className="relative z-50 flex flex-col items-center gap-8 px-6 text-center">
                    <div className="space-y-2">
                        <p className="text-neon-green font-mono text-sm tracking-[0.5em] mb-4">SYSTEM_RESTORE_POINT_AVAILABLE</p>
                        <h1 className="text-4xl md:text-6xl font-header font-black uppercase tracking-tighter">THE LOGIC HAS<br /><span className="text-neon-magenta">DECONSTRUCTED</span></h1>
                    </div>
                    <button
                        onClick={() => onNavigate('home')}
                        className="group neon-btn"
                    >
                        RETURN TO WHISTLE_OS
                    </button>
                    <div className="mt-8 flex gap-12 font-mono text-[9px] text-white/30 tracking-widest uppercase">
                        <div className="flex flex-col gap-1">
                            <span>ERR_CODE: 0x404</span>
                            <span>PACKET_LOSS: 100%</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span>SECTOR: UNKNOWN</span>
                            <span>SIGNAL: TERMINATED</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/20 to-transparent z-[5]"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/20 to-transparent z-[5]"></div>
            <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent z-[5]"></div>
            <div className="fixed bottom-6 right-6 z-50 text-[10px] font-mono text-white/20 uppercase text-right leading-tight hidden md:block">
                WHISTLE_v2.0 // RECOVERY_DAEMON<br />
                LISTENING ON PORT 80... TIMEOUT<br />
                SCANNING_CLUSTER... FAILURE
            </div>
        </div>
    );
};

export default NotFound;
