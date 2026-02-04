import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

interface HeaderProps {
  onJoinWaitlist: () => void;
}

const Header: React.FC<HeaderProps> = ({ onJoinWaitlist }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          <span className="material-symbols-outlined text-neon-green group-hover:rotate-90 transition-transform duration-500">radar</span>
          <span className="font-header text-2xl tracking-tighter">WHISTLE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={`nav-link ${isActive('/') ? 'text-neon-green' : 'text-white'}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={`nav-link ${isActive('/about') ? 'text-neon-green' : 'text-white'}`}
          >
            About
          </NavLink>
          <NavLink
            to="/pricing"
            className={`nav-link ${isActive('/pricing') ? 'text-neon-green' : 'text-white'}`}
          >
            Pricing
          </NavLink>
          <button className="nav-link text-white/50 cursor-not-allowed">Protocol</button>

          <div className="flex items-center gap-4 ml-4">
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
          <NavLink
            to="/"
            className={`text-2xl font-header uppercase tracking-widest ${isActive('/') ? 'text-neon-green' : 'text-white'}`}
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={`text-2xl font-header uppercase tracking-widest ${isActive('/about') ? 'text-neon-green' : 'text-white'}`}
            onClick={closeMobileMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/pricing"
            className={`text-2xl font-header uppercase tracking-widest ${isActive('/pricing') ? 'text-neon-green' : 'text-white'}`}
            onClick={closeMobileMenu}
          >
            Pricing
          </NavLink>
          <div className="w-12 h-[1px] bg-white/20 my-2"></div>
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
        </div>
      )}
    </>
  );
};

export default Header;