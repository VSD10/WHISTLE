import React from 'react';

const Benchmarks: React.FC = () => {
  const data = [
    { metric: "Decision Source", standard: "One model", whistle: "Multiple AI agents" },
    { metric: "Verification", standard: "None", whistle: "Consensus-based" },
    { metric: "Confidence Indicator", standard: "Not provided", whistle: "Confidence score included" },
    { metric: "Reliability Approach", standard: "Direct output", whistle: "Cross-verified output" }
  ];

  return (
    <section className="py-16 md:py-32 bg-deep-black">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-header font-black uppercase mb-12 md:mb-16 tracking-tighter">
          System_Benchmarks
        </h2>
        <div className="max-w-4xl mx-auto border border-neon-green/30 overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-3 bg-neon-green/10 font-mono text-[10px] uppercase tracking-widest py-4 border-b border-neon-green/30">
              <div className="px-6 border-r border-neon-green/20">Metric_Type</div>
              <div className="px-6 border-r border-neon-green/20">Standard_Single_AI</div>
              <div className="px-6 text-neon-green font-bold">Whistle_System</div>
            </div>

            {data.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-3 font-mono text-[10px] py-6 uppercase hover:bg-white/5 transition-colors ${
                  index !== data.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="px-6 border-r border-white/5 text-white/40">{row.metric}</div>
                <div className="px-6 border-r border-white/5 text-neon-magenta">{row.standard}</div>
                <div className="px-6 text-neon-green">{row.whistle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benchmarks;