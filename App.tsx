import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import SystemWorkflow from './components/SystemWorkflow';
import Features from './components/Features';
import Benchmarks from './components/Benchmarks';
import Domains from './components/Domains';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import About from './components/About';
import Pricing from './components/Pricing';
import Login from './components/Login';
import Signup from './components/Signup';
import ChatInterface from './components/ChatInterface';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'pricing' | 'login' | 'signup' | 'chat' | '404'>('home');

  const handleOpenWaitlist = () => {
    setIsWaitlistOpen(true);
  };

  const handleCloseWaitlist = () => {
    setIsWaitlistOpen(false);
  };

  const navigateTo = (view: 'home' | 'about' | 'pricing' | 'login' | 'signup' | 'chat' | '404') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="bg-deep-black text-white selection:bg-neon-magenta selection:text-white min-h-screen flex flex-col overflow-x-hidden">
      {currentView !== 'chat' && currentView !== '404' && (
        <Header
          onJoinWaitlist={handleOpenWaitlist}
          onNavigate={navigateTo}
          currentView={currentView}
        />
      )}

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onJoinWaitlist={handleOpenWaitlist} />
            <ProblemSection />
            <HowItWorks />
            <SystemWorkflow />
            <Features />
            <Benchmarks />
            <Domains />
          </>
        )}
        {currentView === 'about' && <About />}
        {currentView === 'pricing' && <Pricing onJoinWaitlist={handleOpenWaitlist} />}
        {currentView === 'login' && <Login onNavigate={navigateTo} />}
        {currentView === 'signup' && <Signup onNavigate={navigateTo} />}
        {currentView === 'chat' && <ChatInterface />}
        {currentView === '404' && <NotFound onNavigate={navigateTo} />}
      </main>

      {currentView !== 'chat' && currentView !== '404' && <Footer onNavigate={navigateTo} />}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
    </div>
  );
};

export default App;