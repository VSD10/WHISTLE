import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import HowItWorks from './components/HowItWorks';
import SystemWorkflow from './components/SystemWorkflow';
import AiCapabilities from './components/AiCapabilities';
import Features from './components/Features';
import Benchmarks from './components/Benchmarks';
import Domains from './components/Domains';
import Footer from './components/Footer';
import WaitlistModal from './components/WaitlistModal';
import About from './components/About';
import Pricing from './components/Pricing';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ChatInterface from './components/ChatInterface';
import NotFound from './components/NotFound';
import LoadingScreen from './components/LoadingScreen';
import Changelog from './components/Changelog';

// Home page component
const HomePage: React.FC<{ onJoinWaitlist: () => void }> = ({ onJoinWaitlist }) => (
  <>
    <Hero onJoinWaitlist={onJoinWaitlist} />
    <ProblemSection />
    <HowItWorks />
    <SystemWorkflow />
    <AiCapabilities />
    <Features />
    <Benchmarks />
    <Domains />
  </>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);

  const handleOpenWaitlist = () => {
    setIsWaitlistOpen(true);
  };

  const handleCloseWaitlist = () => {
    setIsWaitlistOpen(false);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-deep-black text-white selection:bg-neon-magenta selection:text-white min-h-screen flex flex-col overflow-x-hidden">
          <Routes>
            {/* Routes with Header and Footer */}
            <Route path="/" element={
              <>
                <Header onJoinWaitlist={handleOpenWaitlist} />
                <main className="flex-grow">
                  <HomePage onJoinWaitlist={handleOpenWaitlist} />
                </main>
                <Footer />
              </>
            } />

            <Route path="/about" element={
              <>
                <Header onJoinWaitlist={handleOpenWaitlist} />
                <main className="flex-grow">
                  <About />
                </main>
                <Footer />
              </>
            } />

            <Route path="/pricing" element={
              <>
                <Header onJoinWaitlist={handleOpenWaitlist} />
                <main className="flex-grow">
                  <Pricing onJoinWaitlist={handleOpenWaitlist} />
                </main>
                <Footer />
              </>
            } />

            {/* Auth routes without Header/Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected chat route */}
            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatInterface />
              </ProtectedRoute>
            } />

            <Route path="/changelog" element={
              <>
                <Header onJoinWaitlist={handleOpenWaitlist} />
                <main className="flex-grow">
                  <Changelog />
                </main>
                <Footer />
              </>
            } />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <WaitlistModal isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;