import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

interface ForgotPasswordProps {
    // onNavigate: (view: 'login' | 'home') => void; // Removed as per instruction
}

const ForgotPassword: React.FC = () => { // Removed onNavigate prop
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate(); // Added useNavigate hook
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setLoading(true);

        try {
            const { error } = await resetPassword(email);

            if (error) {
                setError(error.message);
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Password reset error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-24 px-6 relative overflow-hidden animate-fade-in">
            {/* Background elements */}
            <div className="absolute inset-0 circuit-bg z-0 opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/90 to-deep-black z-[1]"></div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="data-packet border-neon-green/30 bg-black/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(57,255,20,0.1)]">
                    {/* Decorative corner markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-green"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-green"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-green"></div>

                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/login')}
                        className="absolute top-4 left-4 text-white/50 hover:text-neon-green transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        <span className="hidden sm:inline">Login</span>
                    </button>

                    <div className="text-center mb-10">
                        <span className="material-symbols-outlined text-neon-green text-5xl mb-4">lock_reset</span>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-header font-black uppercase tracking-tighter text-white mb-2 whitespace-nowrap">PASSWORD_RECOVERY</h2>
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                            <span className="text-[10px] font-mono text-neon-green tracking-widest">RESET_PROTOCOL</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono">
                            <span className="uppercase tracking-widest">ERROR: {error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs font-mono">
                            <span className="uppercase tracking-widest">✓ RESET EMAIL SENT</span>
                            <p className="mt-2 text-white/70">Check your inbox for password reset instructions.</p>
                        </div>
                    )}

                    {!success ? (
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
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-neon-green text-black font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'SENDING...' : 'Send_Reset_Link'}
                            </button>
                        </form>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-neon-green text-black font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
                        >
                            Return_To_Login
                        </button>
                    )}

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-xs font-mono text-white/40 mb-4">Remember your credentials?</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-neon-green text-xs font-mono uppercase tracking-widest border-b border-neon-green/30 hover:border-neon-green hover:text-white transition-all pb-1"
                        >
                            Back_To_Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
