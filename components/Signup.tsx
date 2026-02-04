import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import LoadingScreen from './LoadingScreen';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showTerms, setShowTerms] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [pendingGoogleSignIn, setPendingGoogleSignIn] = useState(false);
    const [pendingGithubSignIn, setPendingGithubSignIn] = useState(false);
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);

    const navigate = useNavigate();
    const { signUp, signInWithGoogle, signInWithGithub } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if terms are accepted
        if (!acceptedTerms) {
            setShowTerms(true);
            return;
        }

        setError('');
        setLoading(true);

        try {
            const { error } = await signUp(email, password, name);

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                setLoading(false);
                setShowLoadingScreen(true);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Signup error:', err);
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        // Check if terms are accepted
        if (!acceptedTerms) {
            setPendingGoogleSignIn(true);
            setShowTerms(true);
            return;
        }

        setError('');
        try {
            const { error } = await signInWithGoogle();
            if (error) {
                setError(error.message);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Google sign-in error:', err);
        }
    };

    const handleGithubSignIn = async () => {
        // Check if terms are accepted
        if (!acceptedTerms) {
            setPendingGithubSignIn(true);
            setShowTerms(true);
            return;
        }

        setError('');
        try {
            const { error } = await signInWithGithub();
            if (error) {
                setError(error.message);
            } else {
                setShowLoadingScreen(true);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('GitHub sign-in error:', err);
        }
    };

    return (
        <>
            {/* Terms and Conditions Modal */}
            {showTerms && (
                <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="w-full max-w-2xl bg-deep-black border border-neon-magenta/30 shadow-[0_0_50px_rgba(255,0,255,0.2)] max-h-[80vh] flex flex-col">
                        <div className="p-6 border-b border-white/10 bg-neon-magenta/5">
                            <h2 className="text-xl font-header font-black uppercase tracking-tighter text-white">Terms & Conditions</h2>
                            <p className="text-[10px] font-mono text-white/40 mt-2 tracking-widest">WHISTLE_SYSTEM_AGREEMENT</p>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-sm text-white/80 font-mono">
                            <p className="text-neon-magenta font-bold">1. ACCEPTANCE OF TERMS</p>
                            <p>By accessing and using WHISTLE, you accept and agree to be bound by the terms and provision of this agreement.</p>

                            <p className="text-neon-magenta font-bold mt-4">2. USE LICENSE</p>
                            <p>Permission is granted to temporarily use WHISTLE for personal, non-commercial transitory viewing only.</p>

                            <p className="text-neon-magenta font-bold mt-4">3. DATA COLLECTION</p>
                            <p>We collect and process your email, name, and usage data to provide our services. Your data is encrypted and stored securely.</p>

                            <p className="text-neon-magenta font-bold mt-4">4. USER RESPONSIBILITIES</p>
                            <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

                            <p className="text-neon-magenta font-bold mt-4">5. PROHIBITED USES</p>
                            <p>You may not use WHISTLE for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.</p>

                            <p className="text-neon-magenta font-bold mt-4">6. DISCLAIMER</p>
                            <p>The service is provided "as is" without any warranties, expressed or implied. We do not warrant that the service will be uninterrupted or error-free.</p>
                        </div>

                        <div className="p-6 border-t border-white/10 bg-white/5">
                            <label className="flex items-start gap-3 cursor-pointer group mb-4">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 accent-neon-magenta"
                                />
                                <span className="text-xs font-mono text-white/60 group-hover:text-white transition-colors">
                                    I have read and agree to the Terms and Conditions
                                </span>
                            </label>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowTerms(false)}
                                    className="flex-1 border border-white/20 text-white px-6 py-3 text-xs font-bold tracking-widest hover:bg-white/5 transition-all uppercase"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        if (acceptedTerms) {
                                            setShowTerms(false);
                                            if (pendingGoogleSignIn) {
                                                // Handle Google sign-in
                                                setPendingGoogleSignIn(false);
                                                setError('');
                                                try {
                                                    const { error } = await signInWithGoogle();
                                                    if (error) {
                                                        setError(error.message);
                                                    } else {
                                                        setShowLoadingScreen(true);
                                                    }
                                                } catch (err) {
                                                    setError('An unexpected error occurred');
                                                    console.error('Google sign-in error:', err);
                                                }
                                            } else if (pendingGithubSignIn) {
                                                // Handle GitHub sign-in
                                                setPendingGithubSignIn(false);
                                                setError('');
                                                try {
                                                    const { error } = await signInWithGithub();
                                                    if (error) {
                                                        setError(error.message);
                                                    } else {
                                                        setShowLoadingScreen(true);
                                                    }
                                                } catch (err) {
                                                    setError('An unexpected error occurred');
                                                    console.error('GitHub sign-in error:', err);
                                                }
                                            } else {
                                                // Trigger form submission for email signup
                                                document.getElementById('signup-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                                            }
                                        }
                                    }}
                                    disabled={!acceptedTerms}
                                    className="flex-1 bg-neon-magenta text-black px-6 py-3 text-xs font-bold tracking-widest hover:bg-white transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Accept & Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showLoadingScreen ? (
                <LoadingScreen onComplete={() => navigate('/chat')} />
            ) : (
                <div className="min-h-screen flex items-center justify-center pt-24 px-6 relative overflow-hidden animate-fade-in">
                    {/* Background elements */}
                    <div className="absolute inset-0 circuit-bg z-0 opacity-50"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/90 to-deep-black z-[1]"></div>

                    <div className="relative z-10 w-full max-w-lg">
                        <div className="data-packet border-neon-magenta/30 bg-black/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,255,0.1)]">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-magenta"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-magenta"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-magenta"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-magenta"></div>

                            {/* Back Button */}
                            <button
                                onClick={() => navigate('/')}
                                className="absolute top-4 left-4 text-white/50 hover:text-neon-magenta transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                <span className="hidden sm:inline">Home</span>
                            </button>

                            <div className="text-center mb-10">
                                <span className="material-symbols-outlined text-neon-magenta text-5xl mb-4">dns</span>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-header font-black uppercase tracking-tighter text-white mb-2 whitespace-nowrap">NODE_REGISTRATION</h2>
                                <div className="flex justify-center items-center gap-2">
                                    <span className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse"></span>
                                    <span className="text-[10px] font-mono text-neon-magenta tracking-widest">JOIN_PROTOCOL</span>
                                </div>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono">
                                    <span className="uppercase tracking-widest">ERROR: {error}</span>
                                </div>
                            )}

                            {/* Social Login Buttons */}
                            <div className="flex gap-3 mb-8">
                                {/* Google Sign In */}
                                <button
                                    type="button"
                                    onClick={handleGoogleSignIn}
                                    className="flex-1 bg-white text-black py-3 px-2 flex items-center justify-center gap-2 hover:bg-white/90 transition-all group relative overflow-hidden"
                                    title="Continue with Google"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden sm:inline">Google</span>
                                </button>

                                {/* GitHub Sign In */}
                                <button
                                    type="button"
                                    onClick={handleGithubSignIn}
                                    className="flex-1 bg-[#24292e] text-white py-3 px-2 flex items-center justify-center gap-2 hover:bg-[#2f363d] transition-all group relative overflow-hidden border border-white/10"
                                    title="Continue with GitHub"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden sm:inline">GitHub</span>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-4 bg-black/80 text-white/40 font-mono uppercase tracking-widest">Or Continue With Email</span>
                                </div>
                            </div>

                            <form id="signup-form" onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">Operator_ID [Name]</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-magenta focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                        placeholder="ENTER_ID"
                                        required
                                        disabled={loading}
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
                                        disabled={loading}
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
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full border border-neon-magenta text-neon-magenta font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-neon-magenta hover:text-black transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'ESTABLISHING...' : 'Establish_Uplink'}
                                </button>
                            </form>

                            <div className="mt-8 text-center border-t border-white/10 pt-6">
                                <p className="text-xs font-mono text-white/40 mb-4">Already in the system?</p>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-neon-magenta text-xs font-mono uppercase tracking-widest border-b border-neon-magenta/30 hover:border-neon-magenta hover:text-white transition-all pb-1"
                                >
                                    Access_Terminal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup;