import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import PageTransition from './PageTransition';


/* ══════════════════════════════════════════════════
   PROTOCOL HUB SECTIONS
══════════════════════════════════════════════════ */
const sections = [
    {
        id: 'api-config',
        code: 'SEC_01',
        icon: '🔑',
        title: 'AI API CONFIG',
        subtitle: 'Provider Setup Guide',
        desc: 'Complete setup guides for every supported AI provider. Get your API keys, configure base URLs, and go live in under 2 minutes.',
        status: 'ACTIVE' as const,
        tags: ['OpenAI', 'Groq', 'Gemini', 'Claude', '+4 more'],
        href: '/protocol/api-config',
        color: '#39ff14',
    },
    {
        id: 'workflow',
        code: 'SEC_02',
        icon: '🔀',
        title: 'WORKFLOW GUIDE',
        subtitle: 'System Modes Explained',
        desc: 'Learn how to use Parallel, Series, and RAG workflows inside WHISTLE for maximum verification accuracy and intelligent consensus.',
        status: 'SOON' as const,
        tags: ['Parallel', 'Series', 'RAG'],
        href: null,
        color: '#ff00ff',
    },
    {
        id: 'architecture',
        code: 'SEC_03',
        icon: '🏗️',
        title: 'ARCHITECTURE',
        subtitle: 'System Design Deep-Dive',
        desc: 'Understand the consensus engine, node topology, and verification layers that power WHISTLE\'s multi-agent AI system.',
        status: 'SOON' as const,
        tags: ['Engine', 'Topology', 'Consensus'],
        href: null,
        color: '#4285f4',
    },
    {
        id: 'security',
        code: 'SEC_04',
        icon: '🛡️',
        title: 'SECURITY PROTOCOL',
        subtitle: 'Privacy & Compliance',
        desc: 'Privacy guarantees, local-only data processing, and zero-exfiltration architecture explained for security and compliance teams.',
        status: 'SOON' as const,
        tags: ['Privacy', 'Local AI', 'Zero Trust'],
        href: null,
        color: '#d97706',
    },
];

/* ══════════════════════════════════════════════════
   PROTOCOL HUB PAGE
══════════════════════════════════════════════════ */
const Protocol: React.FC = () => {
    const navigate = useNavigate();
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <PageTransition label="PROTOCOL_DIRECTORY">
            <div className="min-h-screen bg-deep-black text-white overflow-x-hidden">

                {/* Subtle grid bg */}
                <div className="fixed inset-0 z-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px),linear-gradient(90deg,rgba(57,255,20,0.04) 1px,transparent 1px)`,
                    backgroundSize: '48px 48px',
                }} />
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-neon-green/[0.04] rounded-full blur-[120px] pointer-events-none z-0" />

                <div className="relative z-10">
                    {/* ── HERO ── */}
                    <section className="pt-36 pb-12 px-6 max-w-6xl mx-auto">
                        <div className="flex items-start justify-between gap-6 flex-wrap">
                            <div>
                                {/* Breadcrumb / Status pill */}
                                <div className="inline-flex items-center gap-3 border border-neon-green/30 px-3 py-1.5 mb-6 glass-panel">
                                    <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-ping" />
                                    <span className="font-mono text-[10px] text-neon-green tracking-[0.35em]">WHISTLE // PROTOCOL_DIRECTORY // v5.0</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-header font-black leading-tight tracking-tighter">
                                    PROTOCOL
                                    <span className="block text-neon-green">DIRECTORY</span>
                                </h1>
                                <p className="text-white/40 font-mono text-sm mt-4 max-w-md leading-relaxed">
                                    The WHISTLE documentation hub. Select a section to access guides, configuration references, and technical deep-dives.
                                </p>
                            </div>

                            {/* Stat block top-right */}
                            <div className="flex gap-3 mt-auto flex-wrap self-end pb-2">
                                {[{ v: '04', l: 'SECTIONS' }, { v: '08', l: 'PROVIDERS' }, { v: '04', l: 'FREE_TIERS' }].map(s => (
                                    <div key={s.l} className="glass-panel border border-white/10 px-4 py-3 text-center min-w-[72px]">
                                        <div className="text-2xl font-header font-black text-neon-green">{s.v}</div>
                                        <div className="text-[8px] text-white/30 tracking-widest font-mono">{s.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="flex items-center gap-4 mt-10">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-[9px] font-mono text-white/20 tracking-[0.3em]">SELECT_SECTION</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                    </section>

                    {/* ── SECTION CARDS ── */}
                    <section className="px-6 pb-24 max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {sections.map((sec, i) => {
                                const isHovered = hoveredId === sec.id;
                                const isActive = sec.status === 'ACTIVE';

                                return (
                                    <div
                                        key={sec.id}
                                        onClick={() => isActive && sec.href && navigate(sec.href)}
                                        onMouseEnter={() => setHoveredId(sec.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        className={`relative flex flex-col glass-panel border overflow-hidden transition-all duration-400
                                        ${isActive ? 'cursor-pointer' : 'cursor-default opacity-55'}
                                        ${isHovered && isActive ? 'scale-[1.015] bg-white/[0.04]' : ''}
                                    `}
                                        style={{
                                            borderColor: isHovered && isActive ? sec.color + '55' : 'rgba(255,255,255,0.07)',
                                            boxShadow: isHovered && isActive
                                                ? `0 0 50px ${sec.color}18, inset 0 0 20px ${sec.color}06`
                                                : 'none',
                                            transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                                            animationDelay: `${i * 0.08}s`,
                                        }}
                                    >
                                        {/* Top accent bar */}
                                        <div
                                            className="h-[2px] w-full transition-all duration-500"
                                            style={{ background: isHovered && isActive ? `linear-gradient(90deg, transparent, ${sec.color}, transparent)` : 'rgba(255,255,255,0.05)' }}
                                        />

                                        <div className="p-7 flex flex-col flex-1">
                                            {/* Header row */}
                                            <div className="flex items-start justify-between mb-5">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl">{sec.icon}</span>
                                                    {isActive ? (
                                                        <span className="text-[9px] font-bold font-mono px-2 py-1 rounded-sm border"
                                                            style={{ color: sec.color, borderColor: sec.color + '50', backgroundColor: sec.color + '15' }}>
                                                            ACTIVE
                                                        </span>
                                                    ) : (
                                                        <span className="text-[9px] font-bold font-mono px-2 py-1 rounded-sm border border-white/10 text-white/30 bg-white/5">
                                                            COMING_SOON
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="font-mono text-[9px] text-white/15">{sec.code}</span>
                                            </div>

                                            {/* Title */}
                                            <div className="mb-1">
                                                <h2 className="text-xl font-header font-black tracking-tight transition-colors duration-300 leading-tight"
                                                    style={{ color: isHovered && isActive ? sec.color : 'white' }}>
                                                    {sec.title}
                                                </h2>
                                                <div className="text-[10px] text-white/30 font-mono tracking-wider mt-0.5">{sec.subtitle}</div>
                                            </div>

                                            {/* Desc */}
                                            <p className="text-white/50 text-xs font-mono leading-relaxed mt-3 mb-5 flex-1">{sec.desc}</p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {sec.tags.map(tag => (
                                                    <span key={tag} className="text-[9px] font-mono px-2 py-1 bg-white/[0.04] border border-white/10 text-white/40 rounded-sm">{tag}</span>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            {isActive ? (
                                                <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest transition-all duration-300 group-hover:gap-3 mt-auto"
                                                    style={{ color: sec.color }}>
                                                    ENTER_SECTION
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                                        className={`w-3.5 h-3.5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                                                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="font-mono text-[10px] text-white/20 tracking-widest mt-auto">⎯ IN_DEVELOPMENT</div>
                                            )}
                                        </div>

                                        {/* Bottom accent */}
                                        <div
                                            className="h-px w-full transition-all duration-500"
                                            style={{ background: isHovered && isActive ? `linear-gradient(90deg, transparent, ${sec.color}40, transparent)` : 'transparent' }}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer info strip */}
                        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
                            <div className="font-mono text-[9px] text-white/20 tracking-widest">
                                WHISTLE PROTOCOL_DIRECTORY // SECTIONS IN ACTIVE DEVELOPMENT // MORE COMING SOON
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="font-mono text-[10px] text-white/30 hover:text-neon-green transition-colors tracking-wider"
                            >
                                ← RETURN_HOME
                            </button>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </PageTransition>
    );
};

export default Protocol;
