import React from 'react';

const Updates: React.FC = () => {
    const updates = [
        {
            version: 'v2.4',
            date: 'Mar 2026',
            title: 'Personal RAG with Memory',
            desc: 'Full conversation memory with RAG over past chats. Users can input their own LLM provider URL and API key for personalized AI interactions.',
            tag: 'NEW',
            tagColor: '#39ff14',
            icon: 'psychology',
        },
        {
            version: 'v2.3',
            date: 'Feb 2026',
            title: 'Chat Mode & Supabase Integration',
            desc: 'Single-model RAG chat mode with persistent storage via Supabase. Distinct UI color scheme for mode transitions.',
            tag: 'FEATURE',
            tagColor: '#ff00ff',
            icon: 'chat',
        },
        {
            version: 'v2.2',
            date: 'Feb 2026',
            title: 'Multi-Model Parallel Verification',
            desc: '4-model parallel processing pipeline with consensus engine. Cross-verified outputs with confidence scoring for every claim.',
            tag: 'CORE',
            tagColor: '#39ff14',
            icon: 'hub',
        },
        {
            version: 'v2.1',
            date: 'Jan 2026',
            title: 'Series Workflow Engine',
            desc: 'Sequential chain processing: RECEIVE → ANALYZE → REFINE → VALIDATE → OUTPUT. Deep refinement with error-checking at every stage.',
            tag: 'ENGINE',
            tagColor: '#ffffff',
            icon: 'route',
        },
        {
            version: 'v2.0',
            date: 'Jan 2026',
            title: 'Render Deployment & Docker',
            desc: 'Production-ready deployment with Dockerfile for backend OCR dependencies. Frontend environment variable support for API URLs.',
            tag: 'DEPLOY',
            tagColor: '#ff00ff',
            icon: 'cloud_upload',
        },
    ];

    return (
        <section className="py-16 md:py-32 relative overflow-hidden">
            {/* Background animated dots */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neon-green/10 border border-neon-green/20 rounded-full mb-6">
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-mono text-neon-green tracking-widest uppercase">Live Updates</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-header font-black uppercase tracking-tighter mb-4">
                        What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-magenta">New</span>
                    </h2>
                    <p className="font-mono text-white/30 text-xs tracking-widest uppercase">
                        Latest improvements and releases
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-3xl mx-auto relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-green/40 via-neon-magenta/20 to-transparent"></div>

                    {updates.map((update, i) => (
                        <div key={i} className="relative pl-16 md:pl-20 pb-12 last:pb-0 group">
                            {/* Timeline dot */}
                            <div className="absolute left-[18px] md:left-[26px] top-1 w-3 h-3 rounded-full border-2 transition-all duration-500 group-hover:scale-150"
                                style={{ borderColor: update.tagColor, boxShadow: `0 0 0px ${update.tagColor}00` }}>
                                <div className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-30" style={{ backgroundColor: update.tagColor }}></div>
                            </div>

                            {/* Card */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-5 md:p-6 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 relative overflow-hidden group-hover:translate-x-1">
                                {/* Top accent line */}
                                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-700" style={{ backgroundColor: update.tagColor }}></div>

                                {/* Header row */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-lg transition-colors duration-500" style={{ color: update.tagColor }}>{update.icon}</span>
                                        <div>
                                            <h3 className="text-sm md:text-base font-header uppercase font-bold group-hover:text-white transition-colors">{update.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[9px] font-mono text-white/30">{update.version}</span>
                                                <span className="text-[9px] font-mono text-white/20">•</span>
                                                <span className="text-[9px] font-mono text-white/30">{update.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        className="text-[8px] font-mono tracking-widest px-2 py-0.5 rounded border"
                                        style={{ color: update.tagColor, borderColor: `${update.tagColor}30`, backgroundColor: `${update.tagColor}08` }}
                                    >
                                        {update.tag}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-[11px] md:text-xs font-mono text-white/50 leading-relaxed pl-8">
                                    {update.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Updates;
