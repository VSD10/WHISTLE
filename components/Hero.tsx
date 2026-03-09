import React from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onJoinWaitlist: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoinWaitlist }) => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 overflow-hidden">
      <div className="absolute inset-0 circuit-bg z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-transparent to-deep-black z-[1]"></div>

      <div className="obstructed-text top-1/4 -left-10 z-0 hidden md:block">RAW</div>
      <div className="obstructed-text bottom-1/4 -right-10 z-0 hidden md:block">TRUSTED</div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-5xl">
          <div className="inline-block border-l-2 border-neon-magenta pl-4 mb-6 animate-slide-up">
            <span className="text-xs text-neon-magenta tracking-[0.3em] font-bold">SYSTEM_INIT // WAITLIST_OPEN</span>
          </div>
          <h1 className="text-4xl md:text-9xl font-header font-black leading-[0.85] tracking-tighter uppercase mb-8">
            <div className="overflow-hidden">
              <span className="block animate-glitch-reveal delay-100">Raw</span>
            </div>
            <div className="overflow-hidden">
              <span className="block animate-glitch-reveal delay-200">Unfiltered</span>
            </div>
            <div>
              <span className="text-neon-green relative inline-block animate-glitch-reveal delay-300">
                Intelligence
                <div className="absolute -right-12 top-0 text-[10px] font-mono text-white/30 rotate-90 origin-left tracking-widest uppercase whitespace-nowrap hidden md:block animate-pulse">Verified_Logic</div>
              </span>
            </div>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-mono max-w-2xl mb-12 leading-tight animate-slide-up delay-500">
            WHISTLE is a multi-agent AI verification system that improves trust in AI answers through parallel consensus logic. </p>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center animate-slide-up delay-700">
            <div className="group relative">
              <Link
                to="/login"
                className="px-12 py-5 bg-white text-black font-condensed text-xl hover:bg-neon-green transition-all uppercase skew-x-[-12deg] w-full md:w-auto inline-block text-center"
              >
               🚀 Get Early Access
              </Link>
              <div className="absolute -bottom-6 left-0 text-[9px] text-white/40 uppercase font-mono tracking-widest">
                Limited Access // [0x334...]
              </div>
            </div>
            <a
              href="https://prezi.com/p/3b7ln7xt1dlg/whistle-a-weighted-hybrid-intelligent-system-for-trust-logic-evidence/?present=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 border border-white/20 text-white font-condensed text-xl hover:bg-white/10 transition-all uppercase skew-x-[-12deg] md:ml-4 w-full md:w-auto inline-block text-center"
            >
              Read Manifesto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;