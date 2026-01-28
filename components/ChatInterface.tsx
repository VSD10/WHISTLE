import React, { useState } from 'react';

const ChatInterface: React.FC = () => {
    interface Message {
        role: 'user' | 'ai';
        content: string;
        timestamp: string;
    }
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'account' | 'model' | 'plan'>('account');

    const handleExecute = () => {
        if (inputValue.trim()) {
            const newUserMsg: Message = {
                role: 'user',
                content: inputValue,
                timestamp: new Date().toLocaleTimeString()
            };
            const newAiMsg: Message = {
                role: 'ai',
                content: "NEURAL_LINK_OFFLINE // UNABLE_TO_PROCESS_QUERY. ESTABLISH_UPLINK_TO_CORE_SYSTEMS.",
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, newUserMsg, newAiMsg]);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleExecute();
        }
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-deep-black text-white font-mono selection:bg-neon-green selection:text-black uppercase relative">
            <div className="absolute inset-0 scanlines z-[200] pointer-events-none opacity-40"></div>

            {/* Scroll Indicator */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 z-[250] hidden md:flex flex-col items-center gap-2 pointer-events-none mix-blend-screen">
                <div className="h-32 w-0.5 bg-white/10 relative">
                    <div
                        className="absolute top-0 left-0 w-full bg-neon-green shadow-[0_0_10px_#39ff14] transition-all duration-100"
                        style={{ height: `${scrollProgress}%` }}
                    ></div>
                </div>
                <div className="text-[8px] text-neon-green font-bold tracking-widest rotate-90 origin-center whitespace-nowrap mt-8">
                    SCROLL_POS // {Math.round(scrollProgress)}%
                </div>
            </div>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <div className="absolute inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-4xl bg-deep-black border border-neon-green/30 shadow-[0_0_50px_rgba(57,255,20,0.1)] flex flex-col md:flex-row h-[600px] relative overflow-hidden">
                        <button
                            onClick={toggleSettings}
                            className="absolute top-4 right-4 z-50 text-white/50 hover:text-neon-green transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        {/* Sidebar */}
                        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 p-6 flex flex-col gap-2">
                            <h2 className="text-xl font-header font-black tracking-tighter text-white mb-6">SETTINGS</h2>

                            <button
                                onClick={() => setActiveTab('account')}
                                className={`text-left px-4 py-3 text-xs font-bold tracking-widest transition-all border-l-2 ${activeTab === 'account' ? 'border-neon-green bg-neon-green/10 text-neon-green' : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'}`}
                            >
                                ACCOUNT
                            </button>
                            <button
                                onClick={() => setActiveTab('model')}
                                className={`text-left px-4 py-3 text-xs font-bold tracking-widest transition-all border-l-2 ${activeTab === 'model' ? 'border-neon-green bg-neon-green/10 text-neon-green' : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'}`}
                            >
                                MODEL_CONFIG
                            </button>
                            <button
                                onClick={() => setActiveTab('plan')}
                                className={`text-left px-4 py-3 text-xs font-bold tracking-widest transition-all border-l-2 ${activeTab === 'plan' ? 'border-neon-green bg-neon-green/10 text-neon-green' : 'border-transparent text-white/50 hover:text-white hover:bg-white/5'}`}
                            >
                                PLAN_DETAILS
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-8 overflow-y-auto bg-deep-black relative">
                            <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none"></div>

                            {activeTab === 'account' && (
                                <div className="space-y-8 animate-slide-up">
                                    <div>
                                        <h3 className="text-neon-green text-sm font-bold tracking-widest mb-4 border-b border-white/10 pb-2">USER_PROFILE</h3>
                                        <div className="grid gap-4">
                                            <div className="bg-white/5 p-4 border border-white/10">
                                                <label className="block text-[10px] text-white/40 mb-1">OPERATOR_ID</label>
                                                <div className="font-mono text-white">OP_882A_X</div>
                                            </div>
                                            <div className="bg-white/5 p-4 border border-white/10">
                                                <label className="block text-[10px] text-white/40 mb-1">EMAIL_UPLINK</label>
                                                <div className="font-mono text-white">OPERATOR@WHISTLE.SYS</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-neon-green text-sm font-bold tracking-widest mb-4 border-b border-white/10 pb-2">SECURITY</h3>
                                        <button className="border border-red-500/50 text-red-500 px-6 py-2 text-xs font-bold tracking-widest hover:bg-red-500/10 transition-all">
                                            TERMINATE_SESSION
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'model' && (
                                <div className="space-y-8 animate-slide-up">
                                    <div>
                                        <h3 className="text-neon-green text-sm font-bold tracking-widest mb-4 border-b border-white/10 pb-2">ACTIVE_MODELS</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between bg-white/5 p-4 border border-neon-green/30">
                                                <div>
                                                    <div className="text-neon-green font-bold text-sm">GPT-4_TURBO</div>
                                                    <div className="text-[10px] text-white/40">LATENCY: 12ms // CONTEXT: 128K</div>
                                                </div>
                                                <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_10px_#39ff14]"></div>
                                            </div>
                                            <div className="flex items-center justify-between bg-white/5 p-4 border border-white/10 opacity-50">
                                                <div>
                                                    <div className="text-white font-bold text-sm">CLAUDE_3_OPUS</div>
                                                    <div className="text-[10px] text-white/40">STANDBY // VERIFICATION_ONLY</div>
                                                </div>
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-neon-green text-sm font-bold tracking-widest mb-4 border-b border-white/10 pb-2">PARAMETERS</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-[10px] mb-2">
                                                    <span>TEMPERATURE</span>
                                                    <span className="text-neon-green">0.7</span>
                                                </div>
                                                <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-green w-[70%]"></div></div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-[10px] mb-2">
                                                    <span>TOP_P</span>
                                                    <span className="text-neon-green">0.9</span>
                                                </div>
                                                <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-green w-[90%]"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'plan' && (
                                <div className="space-y-8 animate-slide-up">
                                    <div className="bg-gradient-to-br from-neon-green/20 to-transparent p-6 border border-neon-green/30 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-2">
                                            <span className="material-symbols-outlined text-neon-green opacity-20 text-6xl">verified</span>
                                        </div>
                                        <h3 className="text-xl font-header font-black text-white mb-2">ENTERPRISE_TIER</h3>
                                        <p className="text-[10px] font-mono text-neon-green mb-6 tracking-widest">UNLIMITED_VERIFICATION_NODES</p>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-xs text-white/80">
                                                <span className="material-symbols-outlined text-[14px] text-neon-green">check_circle</span>
                                                <span>Real-time Consensus Engine</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-white/80">
                                                <span className="material-symbols-outlined text-[14px] text-neon-green">check_circle</span>
                                                <span>Cryptographic Proof Generation</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-white/80">
                                                <span className="material-symbols-outlined text-[14px] text-neon-green">check_circle</span>
                                                <span>API Access (Unlimited)</span>
                                            </div>
                                        </div>

                                        <button className="bg-neon-green text-black px-6 py-2 text-xs font-bold tracking-widest hover:bg-white transition-colors">
                                            MANAGE_SUBSCRIPTION
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <header className="z-[130] flex flex-col shrink-0">
                <div className="glitch-bar flex justify-between items-center border-b border-neon-green/20">
                    <span>LIVE_NODE: 0x882A // DATA_STREAM_STABLE // v2.0.4</span>
                    <div className="hidden md:flex gap-4">
                        <span>ENCRYPTION: AES_256_GCM</span>
                        <span>LATENCY: 12MS</span>
                    </div>
                </div>
                <div className="flex items-center justify-between px-4 py-1.5 bg-data-gray/90 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-[12px] font-header font-black tracking-tighter text-neon-green leading-none">WHISTLE</h1>
                            <span className="text-[8px] tracking-[0.2em] text-white/40 border-l border-white/10 pl-2">SYSTEM_CONSOLE</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="group relative">
                                <div className="status-indicator">
                                    <span className="material-symbols-outlined text-[10px]">history</span>
                                    <span className="hidden sm:inline">HISTORY</span>
                                    <span className="text-neon-green">05</span>
                                </div>
                                <div className="nav-overlay w-80 left-0">
                                    <h3 className="text-[11px] font-bold tracking-widest mb-4 border-b border-white/10 pb-2">PAST_NODES</h3>
                                    <div className="space-y-1">
                                        <div className="p-3 bg-neon-green/10 border-l-2 border-neon-green flex flex-col mb-2">
                                            <span className="text-[8px] opacity-40 font-mono">2024.05.21 // 14:22:09</span>
                                            <span className="text-[10px] font-bold">RAW_INTELLIGENCE_INIT</span>
                                        </div>
                                        <div className="p-3 hover:bg-white/5 border-l-2 border-transparent flex flex-col transition-all">
                                            <span className="text-[8px] opacity-40 font-mono">2024.05.20 // 09:15:44</span>
                                            <span className="text-[10px]">CONSENSUS_LOGIC_TEST</span>
                                        </div>
                                        <div className="p-3 hover:bg-white/5 border-l-2 border-transparent flex flex-col transition-all">
                                            <span className="text-[8px] opacity-40 font-mono">2024.05.18 // 23:44:12</span>
                                            <span className="text-[10px]">AGENT_CROSS_REF_01</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="status-indicator">
                                    <span className="material-symbols-outlined text-[10px]">analytics</span>
                                    <span className="hidden sm:inline">METRICS</span>
                                    <span className="text-neon-magenta">82%</span>
                                </div>
                                <div className="nav-overlay w-96 left-0">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-[11px] font-bold tracking-widest mb-4 border-b border-white/10 pb-2 uppercase text-neon-green">Confidence</h3>
                                            <div className="text-2xl font-header text-white mb-2 tracking-tighter">99.8%</div>
                                            <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-green w-[99.8%]"></div></div>
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-bold tracking-widest mb-4 border-b border-white/10 pb-2 uppercase text-neon-magenta">Agreement</h3>
                                            <div className="text-2xl font-header text-white mb-2 tracking-tighter">82.1%</div>
                                            <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-magenta w-[82.1%]"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-3">
                            <span className="text-[8px] font-bold text-white/40 tracking-widest">CONSENSUS</span>
                            <div className="consensus-bar h-2 w-16"><div className="consensus-fill"></div></div>
                            <span className="text-[8px] text-neon-green font-black">89%</span>
                        </div>
                        <button
                            onClick={toggleSettings}
                            className="w-6 h-6 border border-white/10 flex items-center justify-center hover:border-neon-green transition-all relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 circuit-gear opacity-20"></div>
                            <span className="material-symbols-outlined text-xs z-10">settings</span>
                        </button>
                    </div>
                </div>
            </header>
            <main
                className="flex-1 overflow-y-auto relative scroll-smooth bg-deep-black"
                ref={scrollRef}
                onScroll={handleScroll}
            >
                <div className="max-w-7xl mx-auto w-full px-6 pt-10 pb-20 space-y-6">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full opacity-50 mt-20">
                            <span className="material-symbols-outlined text-6xl text-neon-green mb-4 animate-pulse">terminal</span>
                            <p className="text-sm font-mono text-neon-green tracking-widest">SYSTEM_READY // AWAITING_INPUT</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg, idx) => (
                                <React.Fragment key={idx}>
                                    {msg.role === 'user' ? (
                                        <div className="flex justify-start border-l-2 border-white/10 pl-6 py-4 animate-slide-up">
                                            <div className="max-w-4xl bg-white text-black p-6 relative shadow-[8px_8px_0_rgba(255,255,255,0.1)] w-full">
                                                <div className="absolute -top-3 left-4 bg-neon-magenta text-[10px] text-white px-3 py-1 font-bold tracking-widest">USER_UPLINK</div>
                                                <p className="text-lg md:text-xl font-bold tracking-tight leading-tight uppercase">{msg.content}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="data-block border-l-2 border-l-white/20 animate-slide-up delay-100">
                                            <div className="agent-label text-white/60">SYSTEM_CORE</div>
                                            <p className="text-base text-white/80 leading-relaxed font-mono tracking-tight">
                                                {msg.content}
                                            </p>
                                            <div className="mt-4 flex gap-4 opacity-20 border-t border-white/5 pt-2">
                                                <span className="text-[8px]">STATUS: OFFLINE</span>
                                                <span className="text-[8px]">ERR_CODE: 0x503</span>
                                                <span className="text-[8px]">TIMESTAMP: {msg.timestamp}</span>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                    <div className="h-20"></div>
                </div>
            </main>
            <footer className="z-[130] p-4 bg-data-gray/98 backdrop-blur-2xl border-t border-neon-green/30 shadow-[0_-20px_60px_rgba(0,0,0,0.9)] shrink-0">
                <div className="max-w-7xl mx-auto flex flex-col gap-3">
                    <div className="flex items-center gap-4 border border-white/10 p-1 bg-black focus-within:border-neon-green focus-within:shadow-[0_0_15px_rgba(57,255,20,0.1)] transition-all">
                        <div className="flex items-center justify-center w-12 h-12 border-r border-white/10 text-neon-green">
                            <span className="material-symbols-outlined">terminal</span>
                        </div>
                        <input
                            className="terminal-input py-4 px-2"
                            placeholder="ENTER_QUERY_FOR_MULTI_AGENT_ANALYSIS..."
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="glitch-button flex items-center gap-3 shrink-0 py-4"
                            onClick={handleExecute}
                        >
                            <span className="hidden md:inline">EXECUTE_QUERY</span>
                            <span className="material-symbols-outlined text-sm">bolt</span>
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between text-[9px] text-white/30 font-bold tracking-[0.2em] px-2">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#39ff14]"></div>
                                STATUS: READY_TO_PROCESS
                            </div>
                            <span className="hidden sm:inline border-l border-white/10 pl-6 uppercase">Buffer: 100%_Stable</span>
                            <span className="hidden lg:inline border-l border-white/10 pl-6 uppercase">Node_Loc: [40.7128° N, 74.0060° W]</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-neon-green/60">Uplink: 99.42%</span>
                            <span className="text-white/20">© WHISTLE_SYSTEMS_2024</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatInterface;
