import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
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
    const [temp, setTemp] = useState(0.7);
    const [topP, setTopP] = useState(0.9);
    const [subscription, setSubscription] = useState<any>(null);
    const [subscriptionPlan, setSubscriptionPlan] = useState<any>(null);
    const [tempSaved, setTempSaved] = useState(false);
    const [topPSaved, setTopPSaved] = useState(false);
    const [customModels, setCustomModels] = useState<any[]>([]);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);
    const [newModelProvider, setNewModelProvider] = useState<'openai' | 'anthropic' | 'google' | 'meta' | 'custom'>('openai');
    const [newModelName, setNewModelName] = useState('');
    const [newModelApiKey, setNewModelApiKey] = useState('');
    const [modelSaved, setModelSaved] = useState(false);
    const [isEditModelOpen, setIsEditModelOpen] = useState(false);
    const [editingModel, setEditingModel] = useState<any>(null);
    const [editModelName, setEditModelName] = useState('');
    const [editModelApiKey, setEditModelApiKey] = useState('');
    const [preferredModel, setPreferredModel] = useState('');

    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    const location = useLocation();

    useEffect(() => {
        if (location.state?.openSettings) {
            setIsSettingsOpen(true);
            // Optional: Clear state so it doesn't reopen on refresh, though React Router state is persistent
            // navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [historyData, metricsData, subscriptionData, settingsData, modelsData] = await Promise.all([
                    api.verification.getHistory(),
                    api.system.getMetrics(),
                    api.subscription.getCurrent(),
                    api.user.getSettings(),
                    api.models.getAll()
                ]);
                setHistory(historyData);
                setMetrics(metricsData);
                setSubscription(subscriptionData.subscription);
                setSubscriptionPlan(subscriptionData.plan);
                // Load user settings
                setTemp(settingsData.temperature);
                setTopP(settingsData.top_p);
                setPreferredModel(settingsData.preferred_model || 'gpt-4');
                setCustomModels(modelsData || []);
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

    const handleUpdateSettings = async (param: 'temp' | 'topP') => {
        try {
            await api.user.updateSettings({ temperature: temp, top_p: topP, model: 'GPT-4_TURBO' });
            // Show checkmark animation
            if (param === 'temp') {
                setTempSaved(true);
                setTimeout(() => setTempSaved(false), 2000);
            } else {
                setTopPSaved(true);
                setTimeout(() => setTopPSaved(false), 2000);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddModel = async () => {
        try {
            await api.models.save(newModelProvider, newModelName, newModelApiKey);
            // Show checkmark animation locally
            setModelSaved(true);
            setTimeout(() => setModelSaved(false), 2000);

            // Reload models
            const modelsData = await api.models.getAll();
            setCustomModels(modelsData || []);
            // Reset form
            setNewModelProvider('openai');
            setNewModelName('');
            setNewModelApiKey('');
            setIsAddModelOpen(false);
        } catch (error: any) {
            console.error('Failed to add model:', error);
            const errorMsg = error?.message || 'Unknown error';
            if (errorMsg.includes('encrypt_api_key') || errorMsg.includes('relation') || errorMsg.includes('does not exist')) {
                alert('⚠️ Database migration required!\n\nPlease run the migration:\n1. Open Supabase Dashboard → SQL Editor\n2. Paste contents of: supabase/migrations/07_user_api_keys.sql\n3. Click RUN\n\nSee MIGRATION_SETUP.md for detailed instructions.');
            } else if (errorMsg.includes('duplicate') || errorMsg.includes('unique')) {
                alert('This model already exists. Please use a different name.');
            } else {
                alert(`Failed to add model: ${errorMsg}`);
            }
        }
    };

    const handleUpdateModel = async () => {
        if (!editingModel) return;
        try {
            await api.models.update(editingModel.id, editModelName, editModelApiKey);
            // Reload models
            const modelsData = await api.models.getAll();
            setCustomModels(modelsData || []);
            // Close modal
            setIsEditModelOpen(false);
            setEditingModel(null);
            setEditModelName('');
            setEditModelApiKey('');
        } catch (error) {
            console.error('Failed to update model:', error);
            alert('Failed to update model. Please try again.');
        }
    };

    const handleDeleteModel = async (keyId: string) => {
        try {
            await api.models.delete(keyId);
            // Reload models
            const modelsData = await api.models.getAll();
            setCustomModels(modelsData || []);

            // If deleting from edit modal, close it
            if (isEditModelOpen) {
                setIsEditModelOpen(false);
                setEditingModel(null);
            }
        } catch (error) {
            console.error('Failed to delete model:', error);
        }
    };

    const handleSelectModel = async (modelName: string) => {
        try {
            await api.models.select(modelName);
            setPreferredModel(modelName);
        } catch (error) {
            console.error('Failed to select model:', error);
        }
    };

    const handleToggleModel = async (e: React.MouseEvent, keyId: string, isActive: boolean) => {
        e.stopPropagation();
        try {
            await api.models.toggle(keyId, !isActive);
            // Reload models
            const modelsData = await api.models.getAll();
            setCustomModels(modelsData || []);
        } catch (error) {
            console.error('Failed to toggle model:', error);
        }
    };

    const handleManageSubscription = async () => {
        try {
            await api.subscription.update('ENTERPRISE_TIER');
            alert("Subscription updated");
        } catch (e) {
            console.error(e);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (e) {
            console.error('Logout error:', e);
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
                                        {/* Profile Header */}
                                        <div className="flex flex-col items-center mb-8 pb-8 border-b border-white/10 relative">
                                            <div className="relative group mb-4">
                                                {user?.user_metadata?.avatar_url ? (
                                                    <img
                                                        src={user.user_metadata.avatar_url}
                                                        alt="Profile"
                                                        className="w-24 h-24 rounded-full border-2 border-neon-green/50 object-cover shadow-[0_0_20px_rgba(57,255,20,0.2)]"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + (user?.email || 'User') + '&background=random';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-24 h-24 rounded-full bg-neon-green/10 border-2 border-neon-green/50 flex items-center justify-center text-neon-green shadow-[0_0_20px_rgba(57,255,20,0.2)]">
                                                        <span className="material-symbols-outlined text-4xl">person</span>
                                                    </div>
                                                )}
                                            </div>


                                            <h2 className="text-lg font-bold text-white uppercase tracking-widest">{user?.user_metadata?.name || 'UNKNOWN_OPERATOR'}</h2>
                                            <p className="text-xs text-neon-green font-mono mt-1">ID: {user?.id?.substring(0, 8)}</p>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="bg-white/5 p-4 border border-white/10 flex items-center justify-between">
                                                <div>
                                                    <label className="block text-[10px] text-white/40 mb-1">EMAIL_UPLINK</label>
                                                    <div className="font-mono text-white text-sm">{user?.email || 'NOT_CONNECTED'}</div>
                                                </div>
                                                <span className="material-symbols-outlined text-white/20">mail</span>
                                            </div>

                                            <div className="bg-white/5 p-4 border border-white/10 flex items-center justify-between">
                                                <div>
                                                    <label className="block text-[10px] text-white/40 mb-1">AUTH_PROVIDER</label>
                                                    <div className="font-mono text-white uppercase text-sm">{user?.app_metadata?.provider || 'EMAIL'}</div>
                                                </div>
                                                <span className="material-symbols-outlined text-white/20">lock</span>
                                            </div>

                                            <div className="bg-white/5 p-4 border border-white/10 flex items-center justify-between">
                                                <div>
                                                    <label className="block text-[10px] text-white/40 mb-1">ACCOUNT_STATUS</label>
                                                    <div className="font-mono text-neon-green uppercase text-sm flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
                                                        ACTIVE_NODE
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-white/20">verified_user</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-neon-green text-sm font-bold tracking-widest mb-4 border-b border-white/10 pb-2">SECURITY</h3>
                                        <button
                                            onClick={handleLogout}
                                            className="border border-red-500/50 text-red-500 px-6 py-2 text-xs font-bold tracking-widest hover:bg-red-500/10 transition-all"
                                        >
                                            TERMINATE_SESSION
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'model' && (
                                <div className="space-y-8 animate-slide-up">
                                    <div>
                                        <div className="flex justify-between items-center mb-4 pr-12 relative z-10"> {/* Added pr-12 to avoid overlap with parent close button */}
                                            <h3 className="text-neon-green text-sm font-bold tracking-widest border-b border-white/10 pb-2 flex-1">CUSTOM_MODELS</h3>
                                            <div className="flex items-center gap-2">
                                                {modelSaved && (
                                                    <div className="w-5 h-5 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center animate-scale-in">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-neon-green">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => setIsAddModelOpen(true)}
                                                    className="border border-neon-green text-neon-green px-4 py-1 text-[10px] font-bold tracking-widest hover:bg-neon-green hover:text-black transition-all"
                                                >
                                                    + ADD_MODEL
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {customModels.length === 0 ? (
                                                <div className="text-white/40 text-xs text-center py-8 border border-white/10">
                                                    NO_CUSTOM_MODELS // ADD_YOUR_FIRST_MODEL
                                                </div>
                                            ) : (
                                                customModels.map((model) => {
                                                    const isSelected = model.model_name === preferredModel;
                                                    return (
                                                        <div
                                                            key={model.id}
                                                            onClick={(e) => {
                                                                // Prevent triggering if clicking specific controls
                                                                handleSelectModel(model.model_name);
                                                            }}
                                                            className={`flex items-center justify-between bg-white/5 p-4 border cursor-pointer hover:bg-white/10 transition-colors ${isSelected ? 'border-neon-green bg-neon-green/5' : 'border-white/10 opacity-70'}`}
                                                        >
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`font-bold text-sm ${isSelected ? 'text-neon-green' : 'text-white'}`}>
                                                                        {model.model_name.toUpperCase()}
                                                                    </div>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setEditingModel(model);
                                                                            setEditModelName(model.model_name);
                                                                            setIsEditModelOpen(true);
                                                                        }}
                                                                        className="material-symbols-outlined text-white/20 text-[12px] hover:text-white transition-colors"
                                                                    >
                                                                        edit
                                                                    </button>
                                                                </div>
                                                                <div className="text-[10px] text-white/40">
                                                                    PROVIDER: {model.provider.toUpperCase()} // ADDED: {new Date(model.created_at).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className={`w-3 h-3 rounded-full transition-all ${isSelected ? 'bg-neon-green shadow-[0_0_10px_#39ff14]' : 'bg-white/20'}`}
                                                                    title={isSelected ? 'Selected Model' : 'Click to Select'}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-neon-green text-sm font-bold tracking-widest mb-4 border-b border-white/10 pb-2">PARAMETERS</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between items-center text-[10px] mb-2">
                                                    <span>TEMPERATURE</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-neon-green">{temp}</span>
                                                        {tempSaved && (
                                                            <div className="w-5 h-5 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center animate-scale-in">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-neon-green">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={temp}
                                                    onChange={(e) => {
                                                        const newVal = parseFloat(e.target.value);
                                                        setTemp(newVal);
                                                    }}
                                                    onMouseUp={() => handleUpdateSettings('temp')}
                                                    onTouchEnd={() => handleUpdateSettings('temp')}
                                                    className="w-full accent-neon-green bg-white/10 h-1 appearance-none cursor-pointer"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex justify-between items-center text-[10px] mb-2">
                                                    <span>TOP_P</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-neon-green">{topP}</span>
                                                        {topPSaved && (
                                                            <div className="w-5 h-5 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center animate-scale-in">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-neon-green">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    step="0.1"
                                                    value={topP}
                                                    onChange={(e) => {
                                                        const newVal = parseFloat(e.target.value);
                                                        setTopP(newVal);
                                                    }}
                                                    onMouseUp={() => handleUpdateSettings('topP')}
                                                    onTouchEnd={() => handleUpdateSettings('topP')}
                                                    className="w-full accent-neon-green bg-white/10 h-1 appearance-none cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'plan' && (
                                <div className="space-y-8 animate-slide-up">
                                    {subscriptionPlan ? (
                                        <div className={`bg-gradient-to-br ${subscriptionPlan.plan_id === 'free' ? 'from-white/10' : subscriptionPlan.plan_id === 'pro' ? 'from-neon-green/20' : 'from-neon-magenta/20'} to-transparent p-6 border ${subscriptionPlan.plan_id === 'free' ? 'border-white/30' : subscriptionPlan.plan_id === 'pro' ? 'border-neon-green/30' : 'border-neon-magenta/30'} relative overflow-hidden`}>
                                            <div className="absolute top-0 right-0 p-2">
                                                <span className={`material-symbols-outlined opacity-20 text-6xl ${subscriptionPlan.plan_id === 'free' ? 'text-white' : subscriptionPlan.plan_id === 'pro' ? 'text-neon-green' : 'text-neon-magenta'}`}>verified</span>
                                            </div>
                                            <h3 className="text-xl font-header font-black text-white mb-2 uppercase">{subscriptionPlan.name}_TIER</h3>
                                            <p className="text-[10px] font-mono text-neon-green mb-2 tracking-widest">
                                                {subscriptionPlan.queries_per_month ? `${subscriptionPlan.queries_per_month} QUERIES/MONTH` : 'UNLIMITED_VERIFICATION_NODES'}
                                            </p>
                                            <p className="text-xs text-white/60 mb-6">{subscriptionPlan.description}</p>

                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2 text-xs text-white/80">
                                                    <span className={`material-symbols-outlined text-[14px] ${subscriptionPlan.plan_id === 'free' ? 'text-white' : subscriptionPlan.plan_id === 'pro' ? 'text-neon-green' : 'text-neon-magenta'}`}>check_circle</span>
                                                    <span>{subscriptionPlan.max_agents}-Agent Consensus Engine</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-white/80">
                                                    <span className={`material-symbols-outlined text-[14px] ${subscriptionPlan.plan_id === 'free' ? 'text-white' : subscriptionPlan.plan_id === 'pro' ? 'text-neon-green' : 'text-neon-magenta'}`}>{subscriptionPlan.priority_support ? 'check_circle' : 'close'}</span>
                                                    <span>{subscriptionPlan.priority_support ? 'Priority Support' : 'Standard Support'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-white/80">
                                                    <span className={`material-symbols-outlined text-[14px] ${subscriptionPlan.plan_id === 'free' ? 'text-white' : subscriptionPlan.plan_id === 'pro' ? 'text-neon-green' : 'text-neon-magenta'}`}>{subscriptionPlan.api_access ? 'check_circle' : 'close'}</span>
                                                    <span>{subscriptionPlan.api_access ? 'API Access (Unlimited)' : 'No API Access'}</span>
                                                </div>
                                            </div>

                                            <div className="bg-white/5 border border-white/10 p-4 mb-6">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Usage This Period</span>
                                                    <span className="text-xs text-neon-green font-bold">{subscription?.queries_used_this_period || 0} / {subscriptionPlan.queries_per_month || '∞'}</span>
                                                </div>
                                                {subscriptionPlan.queries_per_month && (
                                                    <div className="h-1 bg-white/10 w-full">
                                                        <div className="h-full bg-neon-green" style={{ width: `${Math.min(100, ((subscription?.queries_used_this_period || 0) / subscriptionPlan.queries_per_month) * 100)}%` }}></div>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => navigate('/pricing')}
                                                className={`${subscriptionPlan.plan_id === 'free' ? 'bg-neon-green text-black' : 'border border-neon-green text-neon-green hover:bg-neon-green hover:text-black'} px-6 py-2 text-xs font-bold tracking-widest transition-colors w-full`}
                                            >
                                                {subscriptionPlan.plan_id === 'free' ? 'UPGRADE_PLAN' : 'MANAGE_SUBSCRIPTION'}
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-10">
                                            <div className="text-neon-green font-mono text-sm">Loading subscription data...</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
            }

            {/* History Sidebar */}
            {
                isHistoryOpen && (
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
                                {history.length > 0 ? (
                                    history.map((item) => (
                                        <div key={item.id} className="p-4 border border-white/10 bg-transparent relative group cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all">
                                            <div className="text-[10px] text-white/40 font-mono mb-1">{item.timestamp}</div>
                                            <div className="text-xs font-bold text-white tracking-wide">{item.query}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center py-20">
                                        <span className="material-symbols-outlined text-6xl text-white/10 mb-4">chat_bubble_outline</span>
                                        <h3 className="text-sm font-bold text-white/40 mb-2 uppercase tracking-widest">NO_CONVERSATIONS_YET</h3>
                                        <p className="text-[10px] text-white/30 font-mono max-w-xs">
                                            Your verification history will appear here once you start using the system.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Click outside to close */}
                        <div className="flex-1" onClick={toggleHistory}></div>
                    </div>
                )
            }

            <header className="z-[130] flex flex-col shrink-0">
                <div className="glitch-bar flex justify-between items-center border-b border-neon-green/20">
                    <span>LIVE_NODE: 0x882A // DATA_STREAM_STABLE // v2.0.4</span>
                    <div className="hidden md:flex gap-4">
                        <span>ENCRYPTION: AES_256_GCM</span>
                        <span>LATENCY: 12MS</span>
                    </div>
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-data-gray/90 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                            title="Back to Home"
                        >
                            <h1 className="text-[12px] font-header font-black tracking-tighter text-neon-green leading-none">WHISTLE</h1>
                            <span className="text-[8px] tracking-[0.2em] text-white/40 border-l border-white/10 pl-2">SYSTEM_CONSOLE</span>
                        </button>
                        <div className="flex items-center gap-1">
                            <div className="group relative">
                                <div className="status-indicator">
                                    <span className="material-symbols-outlined text-[10px]">history</span>
                                    <span className="hidden sm:inline">HISTORY</span>
                                    <span className="text-neon-green">{history.length.toString().padStart(2, '0')}</span>
                                </div>
                                <div className="nav-overlay w-80 left-0">
                                    <h3 className="text-[11px] font-bold tracking-widest mb-4 border-b border-white/10 pb-2">PAST_NODES</h3>
                                    <div className="space-y-1">
                                        {history.length > 0 ? (
                                            history.slice(0, 3).map((item) => (
                                                <div key={item.id} className="p-3 hover:bg-white/5 border-l-2 border-transparent flex flex-col transition-all">
                                                    <span className="text-[8px] opacity-40 font-mono">{item.timestamp}</span>
                                                    <span className="text-[10px]">{item.query}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-6 text-center">
                                                <span className="material-symbols-outlined text-3xl text-white/20 mb-2 block">inbox</span>
                                                <p className="text-[10px] text-white/40">NO_CONVERSATIONS_YET</p>
                                            </div>
                                        )}
                                    </div>
                                    {history.length > 0 && (
                                        <button
                                            onClick={toggleHistory}
                                            className="w-full mt-4 border border-white/10 py-2 text-[10px] font-bold tracking-widest hover:bg-white/5 hover:text-neon-green transition-all uppercase"
                                        >
                                            View_All_Logs
                                        </button>
                                    )}
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
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center gap-3">
                            <span className="text-[8px] font-bold text-white/40 tracking-widest">CONSENSUS</span>
                            <div className="consensus-bar h-2 w-16"><div className="consensus-fill"></div></div>
                            <span className="text-[8px] text-neon-green font-black">89%</span>
                        </div>
                        <button
                            onClick={handleNewChat}
                            className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-neon-green/30 text-[10px] font-bold tracking-widest text-neon-green hover:bg-neon-green hover:text-black transition-all uppercase"
                        >
                            <span className="material-symbols-outlined text-[14px]">add</span>
                            New_Session
                        </button>
                        <button
                            onClick={toggleSettings}
                            className="w-7 h-7 border border-white/10 flex items-center justify-center hover:border-neon-green transition-all relative group overflow-hidden"
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

            {/* Add Model Modal */}
            {isAddModelOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[400] flex items-center justify-center p-4">
                    <div className="bg-deep-black border border-neon-green/30 max-w-md w-full p-6 modal-enter">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-neon-green text-lg font-bold tracking-widest">ADD_CUSTOM_MODEL</h2>
                            <button
                                onClick={() => setIsAddModelOpen(false)}
                                className="text-white/40 hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Provider Selection */}
                            <div>
                                <label className="block text-[10px] text-white/60 mb-2 tracking-widest">PROVIDER</label>
                                <select
                                    value={newModelProvider}
                                    onChange={(e) => setNewModelProvider(e.target.value as any)}
                                    className="w-full bg-deep-black border border-white/20 text-white px-4 py-2 text-sm focus:border-neon-green focus:outline-none appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2339ff14%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 0.7em top 50%',
                                        backgroundSize: '0.65em auto'
                                    }}
                                >
                                    <option value="openai" className="bg-deep-black text-white">OpenAI</option>
                                    <option value="anthropic" className="bg-deep-black text-white">Anthropic</option>
                                    <option value="google" className="bg-deep-black text-white">Google</option>
                                    <option value="meta" className="bg-deep-black text-white">Meta</option>
                                    <option value="custom" className="bg-deep-black text-white">Custom</option>
                                </select>
                            </div>

                            {/* Model Name */}
                            <div>
                                <label className="block text-[10px] text-white/60 mb-2 tracking-widest">MODEL_NAME</label>
                                <input
                                    type="text"
                                    value={newModelName}
                                    onChange={(e) => setNewModelName(e.target.value)}
                                    placeholder="e.g., gpt-4, claude-3-opus"
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 text-sm focus:border-neon-green focus:outline-none placeholder:text-white/20"
                                />
                            </div>

                            {/* API Key */}
                            <div>
                                <label className="block text-[10px] text-white/60 mb-2 tracking-widest">API_KEY</label>
                                <input
                                    type="password"
                                    value={newModelApiKey}
                                    onChange={(e) => setNewModelApiKey(e.target.value)}
                                    placeholder="sk-..."
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 text-sm focus:border-neon-green focus:outline-none placeholder:text-white/20 font-mono"
                                />
                                <p className="text-[9px] text-white/40 mt-1">Your API key will be encrypted and stored securely</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setIsAddModelOpen(false)}
                                    className="flex-1 border border-white/20 text-white px-4 py-2 text-xs font-bold tracking-widest hover:bg-white/5 transition-all"
                                >
                                    CANCEL
                                </button>
                                <button
                                    onClick={handleAddModel}
                                    disabled={!newModelName || !newModelApiKey}
                                    className="flex-1 border border-neon-green text-neon-green px-4 py-2 text-xs font-bold tracking-widest hover:bg-neon-green hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    ADD_MODEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Model Modal */}
            {isEditModelOpen && editingModel && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[400] flex items-center justify-center p-4">
                    <div className="bg-deep-black border border-neon-green/30 max-w-md w-full p-6 modal-enter">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-neon-green text-lg font-bold tracking-widest">EDIT_MODEL</h2>
                            <button
                                onClick={() => setIsEditModelOpen(false)}
                                className="text-white/40 hover:text-white"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="p-3 border border-white/10 bg-white/5 text-xs text-white/60">
                                <span className="block text-[9px] tracking-widest mb-1 text-neon-green">PROVIDER</span>
                                {editingModel.provider.toUpperCase()}
                            </div>

                            <div>
                                <label className="block text-[10px] text-white/60 mb-2 tracking-widest">MODEL_NAME</label>
                                <input
                                    type="text"
                                    value={editModelName}
                                    onChange={(e) => setEditModelName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 text-sm focus:border-neon-green focus:outline-none placeholder:text-white/20"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] text-white/60 mb-2 tracking-widest">UPDATE_API_KEY (OPTIONAL)</label>
                                <input
                                    type="password"
                                    value={editModelApiKey}
                                    onChange={(e) => setEditModelApiKey(e.target.value)}
                                    placeholder="Enter new key to update..."
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-2 text-sm focus:border-neon-green focus:outline-none placeholder:text-white/20 font-mono"
                                />
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/10 mt-4">
                                <button
                                    onClick={() => handleDeleteModel(editingModel.id)}
                                    className="border border-red-500/50 text-red-500 px-4 py-2 text-xs font-bold tracking-widest hover:bg-red-500/10 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                    DELETE
                                </button>
                                <div className="flex-1 flex gap-3 justify-end">
                                    <button
                                        onClick={() => setIsEditModelOpen(false)}
                                        className="border border-white/20 text-white px-4 py-2 text-xs font-bold tracking-widest hover:bg-white/5 transition-all"
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        onClick={handleUpdateModel}
                                        disabled={!editModelName}
                                        className="border border-neon-green text-neon-green px-4 py-2 text-xs font-bold tracking-widest hover:bg-neon-green hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        SAVE_CHANGES
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default ChatInterface;
