import React, { useState } from 'react';
import { api } from '../src/services/api';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.waitlist.join(name, email);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Waitlist join failed", error);
            // In a real app, show error
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="relative w-full max-w-md bg-deep-black border border-neon-green p-8 shadow-[0_0_50px_rgba(57,255,20,0.15)] modal-enter">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-neon-green" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-neon-green" />
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-neon-green" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-neon-green" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/30 hover:text-neon-green transition-colors font-mono text-xs"
                >
                    [CLOSE_TERMINAL]
                </button>

                {!isSubmitted ? (
                    <div>
                        <div className="mb-8 border-b border-white/10 pb-6">
                            <span className="text-[10px] text-neon-green tracking-widest uppercase font-mono mb-2 block">// ACCESS_REQUEST</span>
                            <h2 className="text-3xl font-header font-black uppercase tracking-tighter text-white">Join Waitlist</h2>
                            <p className="text-white/50 font-mono text-xs mt-2">
                                Initialize your sequence. Early nodes receive priority verification access upon system launch.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-mono text-white/70 mb-2 uppercase tracking-wider">Operator Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="ENTER_ID"
                                    className="w-full bg-white/5 border border-white/10 p-3 text-sm font-mono text-white placeholder:text-white/20 focus:border-neon-green focus:bg-white/10 focus:outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono text-white/70 mb-2 uppercase tracking-wider">Signal Frequency (Email)</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ENTER_EMAIL"
                                    className="w-full bg-white/5 border border-white/10 p-3 text-sm font-mono text-white placeholder:text-white/20 focus:border-neon-green focus:bg-white/10 focus:outline-none transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-neon-green text-black font-condensed font-bold uppercase text-sm py-4 tracking-widest hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all mt-2"
                            >
                                Confirm_Uplink
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-neon-green text-neon-green mb-6 bg-neon-green/10">
                            <span className="material-symbols-outlined text-3xl">mark_email_read</span>
                        </div>
                        <h3 className="text-2xl font-header uppercase font-black mb-4">Uplink Established</h3>
                        <p className="text-white/60 font-mono text-sm leading-relaxed mb-8">
                            Mail has been sent successfully. We will notify you once launched.
                        </p>
                        <div className="p-3 bg-white/5 border border-white/10 inline-block">
                            <span className="text-[10px] font-mono text-neon-magenta tracking-[0.2em] uppercase">STATUS: PENDING_LAUNCH</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WaitlistModal;