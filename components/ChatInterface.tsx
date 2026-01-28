import React, { useState, useEffect } from 'react';
import { api } from '../src/services/api';
import { HistoryItem, SystemMetrics } from '../src/types/api';

const ChatInterface: React.FC = () => {
    interface Message {
        role: 'user' | 'ai';
        content: string;
        timestamp: string;
    }
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'account' | 'model' | 'plan'>('account');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [metrics, setMetrics] = useState<SystemMetrics | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [historyData, metricsData] = await Promise.all([
                    api.verification.getHistory(),
                    api.system.getMetrics()
                ]);
                setHistory(historyData);
                setMetrics(metricsData);
            } catch (error) {
                console.error("Failed to load data", error);
            }
        };
        loadData();
    }, []);

    const handleExecute = async () => {
        if (inputValue.trim()) {
            const newUserMsg: Message = {
                role: 'user',
                content: inputValue,
                timestamp: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, newUserMsg]);
            setInputValue('');

            try {
                await api.verification.submitQuery(inputValue);
            } catch (error: any) {
                const newAiMsg: Message = {
                    role: 'ai',
                    content: error.message || "SYSTEM_ERROR",
                    timestamp: new Date().toLocaleTimeString()
                };
                setMessages(prev => [...prev, newAiMsg]);
            }
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

    const toggleHistory = () => {
        setIsHistoryOpen(!isHistoryOpen);
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

    // Auto-scroll to bottom when messages change
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleNewChat = () => {
        setMessages([]);
        setInputValue('');
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

            {/* History Sidebar */}
            {isHistoryOpen && (
                <div className="absolute inset-0 z-[300] bg-black/80 backdrop-blur-sm flex justify-start animate-fade-in">
                    <div className="w-full max-w-sm bg-deep-black border-r border-neon-green/30 h-full relative flex flex-col shadow-[0_0_50px_rgba(57,255,20,0.1)]">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-header font-black tracking-tighter text-white">SESSION_HISTORY</h2>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleHistory}
                                    className="text-white/50 hover:text-neon-green transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {history.map((item) => (
                                <div key={item.id} className="p-4 border border-white/10 bg-transparent relative group cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all">
                                    <div className="text-[10px] text-white/40 font-mono mb-1">{item.timestamp}</div>
                                    <div className="text-xs font-bold text-white tracking-wide">{item.query}</div>
                                </div>
                            ))}


                        </div>
                    </div>
                    {/* Click outside to close */}
                    <div className="flex-1" onClick={toggleHistory}></div>
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
                                        {history.slice(0, 3).map((item) => (
                                            <div key={item.id} className="p-3 hover:bg-white/5 border-l-2 border-transparent flex flex-col transition-all">
                                                <span className="text-[8px] opacity-40 font-mono">{item.timestamp}</span>
                                                <span className="text-[10px]">{item.query}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={toggleHistory}
                                        className="w-full mt-4 border border-white/10 py-2 text-[10px] font-bold tracking-widest hover:bg-white/5 hover:text-neon-green transition-all uppercase"
                                    >
                                        View_All_Logs
                                    </button>
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
                                            <div className="text-2xl font-header text-white mb-2 tracking-tighter">{metrics ? `${(metrics.consensus_rate * 100).toFixed(1)}%` : '0%'}</div>
                                            <div className="h-1 bg-white/10 w-full"><div className="h-full bg-neon-green" style={{ width: metrics ? `${metrics.consensus_rate * 100}%` : '0%' }}></div></div>
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-bold tracking-widest mb-4 border-b border-white/10 pb-2 uppercase text-neon-magenta">Agreement</h3>
                                            <div className="text-2xl font-header text-white mb-2 tracking-tighter">{metrics ? '82.1%' : '0%'}</div>
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
                            onClick={handleNewChat}
                            className="hidden md:flex items-center gap-2 px-3 py-1 border border-neon-green/30 text-[10px] font-bold tracking-widest text-neon-green hover:bg-neon-green hover:text-black transition-all uppercase"
                        >
                            <span className="material-symbols-outlined text-[14px]">add</span>
                            New_Session
                        </button>
                        <button
                            onClick={toggleSettings}
                            className="w-6 h-6 border border-white/10 flex items-center justify-center hover:border-neon-green transition-all relative group overflow-hidden"
                            aria-label="Settings"
                        >
                            <div className="absolute inset-0 circuit-gear opacity-20"></div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 z-10">
                                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.043.044a1.875 1.875 0 00-.205 2.415l.323.452a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.06c0 .917.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.044.043a1.875 1.875 0 002.415.205l.452-.323a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.06c.917 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.043-.044a1.875 1.875 0 00.205-2.415l-.323-.452a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.092a1.875 1.875 0 001.566-1.849v-.064c0-.917-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.044-.043a1.875 1.875 0 00-2.415-.205l-.452.323a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.092-.55a1.875 1.875 0 00-1.849-1.566h-.064zM12 9a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
                            </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M2.25 4.5A2.25 2.25 0 014.5 2.25h15A2.25 2.25 0 0121.75 4.5v15a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25v-15zM8.03 8.47a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 01-1.06-1.06l2.47-2.47-2.47-2.47a.75.75 0 010-1.06zm5.22 6.78a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
                            </svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                            </svg>
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
