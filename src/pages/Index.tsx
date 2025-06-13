
import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';
import LoginModal from '../components/LoginModal';
import FeeDashboard from '../components/FeeDashboard';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard'>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setCurrentPage('dashboard');
  };

  const handleLoginClick = (type: 'student' | 'admin') => {
    setLoginType(type);
    setIsLoginModalOpen(true);
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'dashboard') {
    return <FeeDashboard onBackToLanding={handleBackToLanding} />;
  }

  return (
    <>
      <LandingPage onLoginClick={handleLoginClick} />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        loginType={loginType}
      />
    </>
  );
};

export default Index;
