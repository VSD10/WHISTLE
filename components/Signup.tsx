import React, { useState } from 'react';
import { api } from '../src/services/api';

interface SignupProps {
    onNavigate: (view: 'login' | 'home' | 'signup' | 'chat') => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.auth.signup(name, email, password);
            onNavigate('chat');
        } catch (error) {
            console.error("Signup failed", error);
            alert("Signup failed: " + (error as Error).message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 px-6 relative overflow-hidden animate-fade-in">
            {/* Background elements */}
            <div className="absolute inset-0 circuit-bg z-0 opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/90 to-deep-black z-[1]"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="data-packet border-neon-magenta/30 bg-black/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,255,0.1)]">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-magenta"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-magenta"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-magenta"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-magenta"></div>

                    <div className="text-center mb-10">
                        <span className="material-symbols-outlined text-neon-magenta text-5xl mb-4">dns</span>
                        <h2 className="text-3xl font-header font-black uppercase tracking-tighter text-white mb-2">Node_Registration</h2>
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-mono text-neon-magenta tracking-widest">JOIN_PROTOCOL</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">Operator_ID [Name]</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-magenta focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                placeholder="ENTER_ID"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">Signal_Frequency [Email]</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-magenta focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                placeholder="OPERATOR@WHISTLE.SYS"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">Encryption_Key [Password]</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-magenta focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full border border-neon-magenta text-neon-magenta font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-neon-magenta hover:text-black transition-all mt-4"
                        >
                            Establish_Uplink
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-xs font-mono text-white/40 mb-4">Already in the system?</p>
                        <button
                            onClick={() => onNavigate('login')}
                            className="text-neon-magenta text-xs font-mono uppercase tracking-widest border-b border-neon-magenta/30 hover:border-neon-magenta hover:text-white transition-all pb-1"
                        >
                            Access_Terminal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;