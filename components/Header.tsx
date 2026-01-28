import React from 'react';

interface HeaderProps {
  onJoinWaitlist: () => void;
  onNavigate: (view: 'home' | 'about' | 'pricing' | 'login' | 'signup' | '404') => void;
  currentView: 'home' | 'about' | 'pricing' | 'login' | 'signup' | '404';
}

const Header: React.FC<HeaderProps> = ({ onJoinWaitlist, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavigate = (view: 'home' | 'about' | 'pricing' | 'login' | 'signup' | '404') => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[110] glitch-bar text-center">
        Project Highlight: Multi-agent AI verification using consensus logic // STATUS: PRE_ALPHA
      </div>
      <nav className="fixed top-6 left-0 right-0 z-[100] px-6 py-4 flex justify-between items-center bg-deep-black/50 backdrop-blur-md border-b border-white/5">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavigate('home')}
        >
          <span className="material-symbols-outlined text-neon-green group-hover:rotate-90 transition-transform duration-500">radar</span>
          <span className="font-header text-2xl tracking-tighter">WHISTLE</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button
            className={`nav-link ${currentView === 'home' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => handleNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-link ${currentView === 'about' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => handleNavigate('about')}
          >
            About
          </button>
          <button
            className={`nav-link ${currentView === 'pricing' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => handleNavigate('pricing')}
          >
            Pricing
          </button>
          <button className="nav-link text-white/50 cursor-not-allowed" onClick={() => handleNavigate('404')}>Protocol</button>

          <div className="flex items-center gap-4 ml-4">
            <button
              onClick={() => handleNavigate('login')}
              className={`nav-link ${currentView === 'login' ? 'text-neon-green' : 'text-white'}`}
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate('signup')}
              className="neon-btn"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-deep-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col items-center gap-8 animate-fade-in md:hidden">
          <button
            className={`text-2xl font-header uppercase tracking-widest ${currentView === 'home' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => handleNavigate('home')}
          >
            Home
          </button>
          <button
            className={`text-2xl font-header uppercase tracking-widest ${currentView === 'about' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => handleNavigate('about')}
          >
            About
          </button>
          <button
            className={`text-2xl font-header uppercase tracking-widest ${currentView === 'pricing' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => handleNavigate('pricing')}
          >
            Pricing
          </button>
          <div className="w-12 h-[1px] bg-white/20 my-2"></div>
          <button
            className={`text-xl font-mono uppercase tracking-widest ${currentView === 'login' ? 'text-neon-green' : 'text-white'}`}
            onClick={() => handleNavigate('login')}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate('signup')}
            className="neon-btn text-lg px-8 py-3"
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  );
};

export default Header;