import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      num: '01',
      title: 'Multi-AI Verification',
      desc: 'Parallel processing across GPT-4, Claude 3, and Llama 3 to cross-reference every claim.',
      icon: 'verified_user',
      color: 'neon-green',
      hex: '#39ff14',
      borderColor: 'border-neon-green',
      textColor: 'text-neon-green',
      bgHover: 'hover:bg-neon-green/5',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]',
    },
    {
      num: '02',
      title: 'Consensus Logic',
      desc: 'Mathematical models to determine truth based on majority agreement and model reliability.',
      icon: 'hub',
      color: 'neon-magenta',
      hex: '#ff00ff',
      borderColor: 'border-neon-magenta',
      textColor: 'text-neon-magenta',
      bgHover: 'hover:bg-neon-magenta/5',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(255,0,255,0.15)]',
    },
    {
      num: '03',
      title: 'Confidence Scoring',
      desc: 'Each answer includes a confidence level based on response consistency.',
      icon: 'speed',
      color: 'white',
      hex: '#ffffff',
      borderColor: 'border-white/40',
      textColor: 'text-white',
      bgHover: 'hover:bg-white/5',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]',
    },
  ];

  return (
    <section className="py-20 md:py-40 container mx-auto px-6">
      <h2 className="text-3xl md:text-5xl font-header font-black uppercase mb-12 tracking-tighter">
        Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-magenta to-white">Reliable AI Decisions</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={f.num}
            className={`${f.borderColor} border p-6 md:p-10 relative overflow-hidden group ${f.bgHover} ${f.shadow} transition-all duration-500 rounded-lg`}
          >
            {/* Colored corner badge */}
            <div
              className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center font-mono text-[10px] font-bold"
              style={{ backgroundColor: `${f.hex}15`, color: f.hex }}
            >
              {f.num}
            </div>

            {/* Accent top line */}
            <div
              className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-700"
              style={{ backgroundColor: f.hex }}
            ></div>

            {/* Icon */}
            <div className="mb-5">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-500"
                style={{ borderColor: `${f.hex}40`, boxShadow: `0 0 0px ${f.hex}00` }}
                onMouseEnter={() => { }}
              >
                <span
                  className="material-symbols-outlined text-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ color: f.hex }}
                >
                  {f.icon}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className={`text-xl md:text-2xl font-header uppercase mb-4 transition-colors duration-500 group-hover:${f.textColor}`}>
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-xs font-mono text-white/60 leading-relaxed">
              {f.desc}
            </p>

            {/* Bottom glow on hover */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ backgroundColor: f.hex, boxShadow: `0 0 10px ${f.hex}` }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;