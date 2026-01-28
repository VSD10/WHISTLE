import React, { useState } from 'react';
import { api } from '../src/services/api';

interface LoginProps {
    onNavigate: (view: 'signup' | 'home' | 'login' | 'chat') => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.auth.login(email, password);
            onNavigate('chat');
        } catch (error) {
            console.error("Login failed", error);
            // In a real app, we'd show an error message to the user
            alert("Login failed: " + (error as Error).message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 px-6 relative overflow-hidden animate-fade-in">
            {/* Background elements */}
            <div className="absolute inset-0 circuit-bg z-0 opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/90 to-deep-black z-[1]"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="data-packet border-neon-green/30 bg-black/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(57,255,20,0.1)]">
                    {/* Decorative corner markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-green"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-green"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-green"></div>

                    <div className="text-center mb-10">
                        <span className="material-symbols-outlined text-neon-green text-5xl mb-4 animate-pulse">fingerprint</span>
                        <h2 className="text-3xl font-header font-black uppercase tracking-tighter text-white mb-2">System_Access</h2>
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                            <span className="text-[10px] font-mono text-neon-green tracking-widest">SECURE_GATEWAY</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">Signal_Frequency [Email]</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-green focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                placeholder="OPERATOR@WHISTLE.SYS"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">Access_Key [Password]</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-green focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-neon-green text-black font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all mt-4"
                        >
                            Initiate_Session
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-xs font-mono text-white/40 mb-4">Unidentified Signal?</p>
                        <button
                            onClick={() => onNavigate('signup')}
                            className="text-neon-green text-xs font-mono uppercase tracking-widest border-b border-neon-green/30 hover:border-neon-green hover:text-white transition-all pb-1"
                        >
                            Initialize_New_Node
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;