import React from 'react';

const Domains: React.FC = () => {
  return (
    <section className="py-20 md:py-40 bg-data-gray overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-header font-black uppercase mb-12 md:mb-16 tracking-tighter">Deployed_Domains</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white text-black p-8 flex-1 min-w-[250px] skew-x-0 md:skew-x-[-6deg] hover:bg-neon-green transition-colors cursor-default group">
            <h4 className="font-header text-3xl font-black uppercase mb-2 group-hover:tracking-wide transition-all">Students</h4>
            <p className="text-[10px] font-mono uppercase opacity-70">Research verification and source cross-checking.</p>
          </div>

          <div className="border border-neon-magenta p-8 flex-1 min-w-[250px] skew-x-0 md:skew-x-[6deg] hover:bg-neon-magenta hover:text-black transition-colors group cursor-default">
            <h4 className="font-header text-3xl font-black uppercase mb-2 text-neon-magenta group-hover:text-black transition-colors">Finance</h4>
            <p className="text-[10px] font-mono uppercase text-white/40 group-hover:text-black/70">Data auditing and regulatory compliance checks.</p>
          </div>

          <div className="bg-neon-green text-black p-8 flex-1 min-w-[250px] skew-x-0 md:skew-x-[-6deg] hover:bg-white transition-colors cursor-default group">
            <h4 className="font-header text-3xl font-black uppercase mb-2 group-hover:tracking-wide transition-all">Business</h4>
            <p className="text-[10px] font-mono uppercase opacity-70">Strategic intelligence and automated reporting.</p>
          </div>

          <div className="border border-white/20 p-8 flex-1 min-w-[250px] skew-x-0 md:skew-x-[6deg] hover:border-neon-green hover:bg-neon-green/10 transition-colors cursor-default group">
            <h4 className="font-header text-3xl font-black uppercase mb-2 group-hover:text-neon-green transition-colors">Information</h4>
            <p className="text-[10px] font-mono uppercase text-white/40 group-hover:text-neon-green/70">General truth-seeking in a noisy ecosystem.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Domains;