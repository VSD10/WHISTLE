import React from 'react';

const Benchmarks: React.FC = () => {
  const data = [
    {
      metric: "Decision Source",
      standard: "One model",
      whistle: "Multiple AI agents",
      icon: "psychology",
    },
    {
      metric: "Verification",
      standard: "None",
      whistle: "Consensus-based",
      icon: "fact_check",
    },
    {
      metric: "Confidence Indicator",
      standard: "Not provided",
      whistle: "Confidence score included",
      icon: "speed",
    },
    {
      metric: "Reliability Approach",
      standard: "Direct output",
      whistle: "Cross-verified output",
      icon: "verified_user",
    },
  ];

  return (
    <section className="py-16 md:py-32 bg-deep-black relative overflow-hidden">
      {/* Background subtle grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, white 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, white 0px, transparent 1px, transparent 60px)' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-center text-3xl md:text-5xl font-header font-black uppercase mb-4 tracking-tighter">
          System<span className="text-neon-green">_</span>Benchmarks
        </h2>
        <p className="text-center font-mono text-white/30 text-xs tracking-widest uppercase mb-12 md:mb-16">
          Whistle vs Standard AI — A side-by-side comparison
        </p>

        <div className="max-w-5xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] mb-2">
            <div className="px-6 md:px-8 py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">
              Metric
            </div>
            <div className="px-6 md:px-8 py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40 flex items-center gap-2">
              <span className="material-symbols-outlined text-white/20 text-sm">smart_toy</span>
              Standard AI
            </div>
            <div className="px-6 md:px-8 py-4 font-mono text-[10px] md:text-xs uppercase tracking-widest text-neon-green font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-green text-sm">rocket_launch</span>
              Whistle System
            </div>
          </div>

          {/* Divider line */}
          <div className="h-[2px] bg-gradient-to-r from-neon-green/50 via-neon-magenta/30 to-white/10 mb-1"></div>

          {/* Table Rows */}
          {data.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1fr_1fr_1fr] group transition-all duration-500 hover:bg-white/[0.03] relative ${index !== data.length - 1 ? 'border-b border-white/5' : ''
                }`}
            >
              {/* Hover accent line */}
              <div className="absolute left-0 top-0 w-[3px] h-full bg-neon-green scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

              {/* Metric name */}
              <div className="px-6 md:px-8 py-6 md:py-8 font-mono text-xs md:text-sm text-white/60 flex items-center gap-3">
                <span className="material-symbols-outlined text-white/20 text-lg group-hover:text-neon-green/50 transition-colors duration-500">{row.icon}</span>
                <span className="group-hover:text-white/80 transition-colors duration-500">{row.metric}</span>
              </div>

              {/* Standard AI value */}
              <div className="px-6 md:px-8 py-6 md:py-8 font-mono text-xs md:text-sm flex items-center">
                <span className="text-neon-magenta/70 flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-magenta/40 text-sm">close</span>
                  {row.standard}
                </span>
              </div>

              {/* Whistle value */}
              <div className="px-6 md:px-8 py-6 md:py-8 font-mono text-xs md:text-sm flex items-center">
                <span className="text-neon-green flex items-center gap-2 group-hover:drop-shadow-[0_0_6px_rgba(57,255,20,0.4)] transition-all duration-500">
                  <span className="material-symbols-outlined text-neon-green text-sm">check_circle</span>
                  {row.whistle}
                </span>
              </div>
            </div>
          ))}

          {/* Bottom gradient bar */}
          <div className="h-[2px] bg-gradient-to-r from-neon-green/50 via-neon-magenta/30 to-white/10 mt-1"></div>

          {/* Summary stat badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-10">
            {[
              { label: 'AI Models', value: '4+', color: '#39ff14' },
              { label: 'Verification', value: '100%', color: '#ff00ff' },
              { label: 'Accuracy Boost', value: '3.7x', color: '#ffffff' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-500 group/stat"
              >
                <span
                  className="text-lg md:text-xl font-header font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benchmarks;