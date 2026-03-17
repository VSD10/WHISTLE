import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';

interface HeaderProps {
  onJoinWaitlist: () => void;
}

const Header: React.FC<HeaderProps> = ({ onJoinWaitlist }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[110] glitch-bar text-center">
        Project Highlight: Multi-agent AI verification using consensus logic // STATUS: PRE_ALPHA
      </div>
      <nav className="fixed top-6 left-0 right-0 z-[100] px-6 py-4 flex justify-between items-center bg-deep-black/50 backdrop-blur-md border-b border-white/5">
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img src="/whistle.png" alt="Whistle" className="w-8 h-8 group-hover:rotate-12 transition-transform duration-500" style={{ filter: 'brightness(0) saturate(100%) invert(78%) sepia(86%) saturate(1644%) hue-rotate(68deg) brightness(104%) contrast(115%)' }} />
          <span className="font-header text-2xl tracking-tighter">WHISTLE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={`nav-link ${isActive('/') ? 'text-neon-green' : 'text-white'}`}
            onClick={scrollToTop}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={`nav-link ${isActive('/about') ? 'text-neon-green' : 'text-white'}`}
            onClick={scrollToTop}
          >
            About
          </NavLink>
          <NavLink
            to="/changelog"
            className={`nav-link ${isActive('/changelog') ? 'text-neon-green' : 'text-white'}`}
            onClick={scrollToTop}
          >
            Updates
          </NavLink>
          <NavLink
            to="/protocol"
            className={`nav-link ${isActive('/protocol') ? 'text-neon-green' : 'text-white'}`}
            onClick={scrollToTop}
          >
            Protocol
          </NavLink>

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            {user ? (
              <Link
                to="/chat"
                state={{ openSettings: true }}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User"
                      className="w-10 h-10 rounded-full border border-neon-green/50 group-hover:border-neon-green transition-colors object-cover shadow-[0_0_10px_rgba(57,255,20,0.2)]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-neon-green/10 border border-neon-green/50 flex items-center justify-center text-neon-green group-hover:bg-neon-green/20 transition-colors shadow-[0_0_10px_rgba(57,255,20,0.2)]">
                      <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-neon-green rounded-full border-2 border-black animate-pulse"></span>
                </div>
              </Link>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'text-neon-green' : 'text-white'}`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="neon-btn"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <Link to="/chat" className="flex items-center gap-2 mr-2">
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-neon-green/50 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-neon-green/10 border border-neon-green/50 flex items-center justify-center text-neon-green">
                  <span className="material-symbols-outlined text-xs">person</span>
                </div>
              )}
            </Link>
          )}
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
          <NavLink
            to="/"
            className={`text-2xl font-header uppercase tracking-widest ${isActive('/') ? 'text-neon-green' : 'text-white'}`}
            onClick={() => { closeMobileMenu(); scrollToTop(); }}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={`text-2xl font-header uppercase tracking-widest ${isActive('/about') ? 'text-neon-green' : 'text-white'}`}
            onClick={() => { closeMobileMenu(); scrollToTop(); }}
          >
            About
          </NavLink>
          <NavLink
            to="/changelog"
            className={`text-2xl font-header uppercase tracking-widest ${isActive('/changelog') ? 'text-neon-green' : 'text-white'}`}
            onClick={() => { closeMobileMenu(); scrollToTop(); }}
          >
            Updates
          </NavLink>
          <NavLink
            to="/protocol"
            className={`text-2xl font-header uppercase tracking-widest ${isActive('/protocol') ? 'text-neon-green' : 'text-white'}`}
            onClick={() => { closeMobileMenu(); scrollToTop(); }}
          >
            Protocol
          </NavLink>
          <div className="w-12 h-[1px] bg-white/20 my-2"></div>

          {user ? (
            <Link
              to="/chat"
              state={{ openSettings: true }}
              className="flex flex-col items-center gap-2"
              onClick={closeMobileMenu}
            >
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User"
                  className="w-16 h-16 rounded-full border-2 border-neon-green object-cover shadow-[0_0_15px_rgba(57,255,20,0.3)]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-neon-green/10 border-2 border-neon-green flex items-center justify-center text-neon-green shadow-[0_0_15px_rgba(57,255,20,0.3)]">
                  <span className="material-symbols-outlined text-2xl">person</span>
                </div>
              )}
              <span className="text-xl font-mono uppercase tracking-widest text-neon-green mt-2">
                OPEN_SETTINGS
              </span>
            </Link>
          ) : (
            <>
              <NavLink
                to="/login"
                className={`text-xl font-mono uppercase tracking-widest ${isActive('/login') ? 'text-neon-green' : 'text-white'}`}
                onClick={closeMobileMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="neon-btn text-lg px-8 py-3"
                onClick={closeMobileMenu}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Header;