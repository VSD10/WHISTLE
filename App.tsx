import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Benchmarks from './components/Benchmarks';
import Domains from './components/Domains';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import About from './components/About';
import Pricing from './components/Pricing';
import Login from './components/Login';
import Signup from './components/Signup';

const App: React.FC = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'pricing' | 'login' | 'signup'>('home');

  const handleOpenWaitlist = () => {
    setIsWaitlistOpen(true);
  };

  const handleCloseWaitlist = () => {
    setIsWaitlistOpen(false);
  };

  const navigateTo = (view: 'home' | 'about' | 'pricing' | 'login' | 'signup') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="bg-deep-black text-white selection:bg-neon-magenta selection:text-white min-h-screen flex flex-col">
      <Header
        onJoinWaitlist={handleOpenWaitlist}
        onNavigate={navigateTo}
        currentView={currentView}
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onJoinWaitlist={handleOpenWaitlist} />
            <ProblemSection />
            <HowItWorks />
            <Features />
            <Benchmarks />
            <Domains />
          </>
        )}
        {currentView === 'about' && <About />}
        {currentView === 'pricing' && <Pricing onJoinWaitlist={handleOpenWaitlist} />}
        {currentView === 'login' && <Login onNavigate={navigateTo} />}
        {currentView === 'signup' && <Signup onNavigate={navigateTo} />}
      </main>

      <Footer />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
    </div>
  );
};

export default App;