import React from 'react';

const Updates: React.FC = () => {
    const updates = [
        {
            version: 'v5.0.0',
            date: 'Mar 17, 2026',
            title: 'Major Release v5.0.0',
            desc: 'Latest stable build: Whistle_5.0.0_x64_en-US.msi. Significant AI inference performance improvements, enhanced multi-model consensus, and new system tray integration.',
            tag: 'LATEST',
            tagColor: '#39ff14',
            icon: 'rocket_launch',
        },
        {
            version: 'v4.0.0',
            date: 'Mar 17, 2026',
            title: 'Distribution Update v4.0.0',
            desc: 'Released Whistle_4.0.0_x64_en-US.msi. Improved local model loading, VRAM management, and stability fixes for the consensus engine under high load.',
            tag: 'STABLE',
            tagColor: '#39ff14',
            icon: 'download',
        },
        {
            version: 'v1.0.2',
            date: 'Mar 9, 2026',
            title: 'Stable Distribution v1.0.2',
            desc: 'New distribution release: Whistle_1.0.2_x64-setup.exe. Improved installation stability and added cross-version selection support in the download hub.',
            tag: 'LEGACY',
            tagColor: '#888',
            icon: 'history',
        },
        {
            version: 'v2.5.0',
            date: 'Mar 3, 2026',
            title: 'Parallel Workflow Redesign',
            desc: 'Replaced spinning orbital animation with a structured 4-model → 1 Verdict Agent flowchart. Animated SVG data particles flow from each model into the central consensus core.',
            tag: 'UI',
            tagColor: '#39ff14',
            icon: 'account_tree',
        },
        {
            version: 'v2.5.0',
            date: 'Mar 3, 2026',
            title: 'Series Workflow Pipeline',
            desc: 'New horizontal chain pipeline: A1 RECEIVE → A2 ANALYZE → A3 REFINE → A4 VALIDATE → OUTPUT. Animated glowing data pulses flow through each connector arrow.',
            tag: 'UI',
            tagColor: '#ff00ff',
            icon: 'route',
        },
        {
            version: 'v2.5.0',
            date: 'Mar 3, 2026',
            title: 'Personal AI RAG Vault',
            desc: 'Redesigned with animated encrypted data streams converging on a central shield, floating MEMORY/CONTEXT/HISTORY storage blocks, and a live status indicator.',
            tag: 'UI',
            tagColor: '#ffffff',
            icon: 'shield_lock',
        },
        {
            version: 'v2.5.0',
            date: 'Mar 3, 2026',
            title: 'Icon Rendering Fix',
            desc: 'Fixed root cause of all Material Symbols icons rendering as text. Added missing .material-symbols-outlined CSS class and corrected the Google Fonts URL axis syntax.',
            tag: 'FIX',
            tagColor: '#39ff14',
            icon: 'build',
        },
        {
            version: 'v2.5.0',
            date: 'Mar 3, 2026',
            title: 'Features & Benchmarks Redesign',
            desc: 'Colorful feature cards with gradient heading, per-card accent colors, and Material Symbol icons. Benchmarks table with ✓/✗ indicators, hover glow effects, and summary stat badges.',
            tag: 'UI',
            tagColor: '#ff00ff',
            icon: 'auto_awesome',
        },
        {
            version: 'v2.5.0',
            date: 'Mar 3, 2026',
            title: 'Updates Timeline Section',
            desc: 'Added a live updates timeline section to the homepage with vertical gradient line, animated dots, colored version tags, and hover animations.',
            tag: 'NEW',
            tagColor: '#39ff14',
            icon: 'update',
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
