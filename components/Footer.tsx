import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-black border-t border-white/10 pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-neon-green text-4xl">radar</span>
              <div>
                <h2 className="text-3xl font-header tracking-tighter font-black">WHISTLE</h2>
                <p className="text-[9px] text-neon-magenta font-mono font-bold tracking-[0.2em]">
                  WEIGHTED HYBRID INTELLIGENT SYSTEM
                </p>
              </div>
            </div>
            <p className="text-xs font-mono text-white/40 uppercase leading-relaxed mb-8">
              DECONSTRUCTING THE MONOLITH. A final year project dedicated to multi-agent AI verification using consensus logic and weighted hybrid intelligence.
            </p>
            <div className="flex gap-4">
              <a className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-neon-green hover:text-neon-green transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">terminal</span>
              </a>
              <a className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-neon-green hover:text-neon-green transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">data_object</span>
              </a>
              <a className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-neon-green hover:text-neon-green transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">hub</span>
              </a>
            </div>
          </div>

          {/* Links and Status */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[10px] text-neon-green font-mono uppercase mb-6 tracking-widest underline underline-offset-8">Navigation</h4>
              <ul className="text-[10px] font-mono space-y-4 text-white/50 uppercase">
                <li><a className="hover:text-white transition-colors" href="/">Home</a></li>
                <li><a className="hover:text-white transition-colors" href="/about">About</a></li>
                <li><a className="hover:text-white transition-colors" href="/pricing">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] text-neon-magenta font-mono uppercase mb-6 tracking-widest underline underline-offset-8">Project_Team</h4>
              <ul className="text-[10px] font-mono space-y-4 text-white/50 uppercase">
                <li><a className="hover:text-white transition-colors" href="#">Lead_Dev_Alpha</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Logic_Architect</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Data_Engineer</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] text-white font-mono uppercase mb-6 tracking-widest underline underline-offset-8">Status</h4>
              <div className="bg-white/5 p-4 border border-white/10 font-mono">
                <div className="flex justify-between text-[9px] mb-2">
                  <span>UPTIME</span>
                  <span className="text-neon-green">99.9%</span>
                </div>
                <div className="w-full bg-white/10 h-1">
                  <div className="bg-neon-green w-[99.9%] h-full box-shadow-[0_0_10px_#39ff14]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em]">
            © 2024 WHISTLE_SYS // FYP_DECONSTRUCTED // ALL_RIGHTS_RESERVED
          </div>
          <div className="flex gap-8 text-[9px] font-bold text-neon-green animate-pulse uppercase font-mono">
            <span>SECURITY: AES_256_ACTIVE</span>
            <span>SIGNAL: STABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;