import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import LoadingScreen from './LoadingScreen';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);

    const navigate = useNavigate();
    const { signIn, signInWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await signIn(email, password);

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                setLoading(false);
                setShowLoadingScreen(true);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Login error:', err);
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        try {
            const { error } = await signInWithGoogle();
            if (error) {
                setError(error.message);
            } else {
                setShowLoadingScreen(true);
            }
            // User will be redirected to Google OAuth, then back to /chat
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Google sign-in error:', err);
        }
    };

    if (showLoadingScreen) {
        return <LoadingScreen onComplete={() => navigate('/chat')} />;
    }

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
                        onClick={() => navigate('/')}
                        className="absolute top-4 left-4 text-white/50 hover:text-neon-green transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        <span className="hidden sm:inline">Home</span>
                    </button>

                    <div className="text-center mb-10">
                        <span className="material-symbols-outlined text-neon-green text-5xl mb-4 animate-pulse">fingerprint</span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-header font-black uppercase tracking-tighter text-white mb-2 whitespace-nowrap">SYSTEM_ACCESS</h2>
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                            <span className="text-[10px] font-mono text-neon-green tracking-widest">SECURE_GATEWAY</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono">
                            <span className="uppercase tracking-widest">ERROR: {error}</span>
                        </div>
                    )}

                    {/* Google Sign-In Button */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-white text-black font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue_With_Google
                    </button>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-black/80 text-white/40 font-mono uppercase tracking-widest">Or Continue With Email</span>
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
                                disabled={loading}
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
                                disabled={loading}
                            />
                            <div className="mt-2 text-right">
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className="text-neon-green/70 text-[10px] font-mono uppercase tracking-widest hover:text-neon-green transition-all"
                                >
                                    Forgot_Password?
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-neon-green text-black font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'AUTHENTICATING...' : 'Initiate_Session'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/10 pt-6">
                        <p className="text-xs font-mono text-white/40 mb-4">Unidentified Signal?</p>
                        <button
                            onClick={() => navigate('/signup')}
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