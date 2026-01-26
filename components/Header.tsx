import React from 'react';

interface HeaderProps {
  onJoinWaitlist: () => void;
  onNavigate: (view: 'home' | 'about' | 'pricing' | 'login' | 'signup') => void;
  currentView: 'home' | 'about' | 'pricing' | 'login' | 'signup';
}

const Header: React.FC<HeaderProps> = ({ onJoinWaitlist, onNavigate, currentView }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[110] glitch-bar text-center">
        Project Highlight: Multi-agent AI verification using consensus logic // STATUS: PRE_ALPHA
      </div>
      <nav className="fixed top-6 w-full z-[100] px-6 py-4 flex justify-between items-center bg-deep-black/50 backdrop-blur-md border-b border-white/5">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <span className="material-symbols-outlined text-neon-green group-hover:rotate-90 transition-transform duration-500">radar</span>
          <span className="font-header text-2xl tracking-tighter">WHISTLE</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <button
            className={`nav-link ${currentView === 'home' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'about' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => onNavigate('about')}
          >
            About
          </button>
          <button
            className={`nav-link ${currentView === 'pricing' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => onNavigate('pricing')}
          >
            Pricing
          </button>
          <a className="nav-link text-white/50 cursor-not-allowed" href="#">Protocol</a>

          <div className="flex items-center gap-4 ml-4">
            <button
              onClick={() => onNavigate('login')}
              className={`nav-link ${currentView === 'login' ? 'text-neon-green' : 'text-white'}`}
            >
              Login
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="neon-btn"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => onNavigate('login')}
            className="text-white text-sm"
          >
            Login
          </button>
          <span className="material-symbols-outlined text-white cursor-pointer" onClick={() => onNavigate('signup')}>menu</span>
        </div>
      </nav>
    </>
  );
};

export default Header;