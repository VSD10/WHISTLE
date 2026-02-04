import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

interface ResetPasswordProps {
    // onNavigate: (view: 'login' | 'home') => void; // Removed as per instruction
}

const ResetPassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const { updatePassword, session } = useAuth();

    useEffect(() => {
        // Check if user has a valid session (from password reset link)
        if (!session) {
            setError('Invalid or expired reset link. Please request a new one.');
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const { error } = await updatePassword(newPassword);

            if (error) {
                setError(error.message);
            } else {
                setSuccess(true);
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error('Password update error:', err);
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
                <div className="data-packet border-neon-magenta/30 bg-black/80 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(255,0,255,0.1)]">
                    {/* Decorative corner markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-magenta"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-magenta"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-magenta"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-magenta"></div>

                    <div className="text-center mb-10">
                        <span className="material-symbols-outlined text-neon-magenta text-5xl mb-4">shield_lock</span>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-header font-black uppercase tracking-tighter text-white mb-2 whitespace-nowrap">RESET_PASSWORD</h2>
                        <div className="flex justify-center items-center gap-2">
                            <span className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-mono text-neon-magenta tracking-widest">SECURITY_UPDATE</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono">
                            <span className="uppercase tracking-widest">ERROR: {error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs font-mono">
                            <span className="uppercase tracking-widest">✓ PASSWORD UPDATED</span>
                            <p className="mt-2 text-white/70">Redirecting to login...</p>
                        </div>
                    )}

                    {!success && session && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">New_Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-magenta focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                    placeholder="••••••••••••"
                                    required
                                    disabled={loading}
                                    minLength={6}
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-mono text-white/50 mb-2 uppercase tracking-widest">Confirm_Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 p-4 text-sm font-mono text-white focus:border-neon-magenta focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20"
                                    placeholder="••••••••••••"
                                    required
                                    disabled={loading}
                                    minLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full border border-neon-magenta text-neon-magenta font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-neon-magenta hover:text-black transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'UPDATING...' : 'Update_Password'}
                            </button>
                        </form>
                    )}

                    {!session && (
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full border border-neon-magenta text-neon-magenta font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-neon-magenta hover:text-black transition-all"
                        >
                            Return_To_Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
