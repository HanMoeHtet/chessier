import React from 'react';
import FamousPlayersSection from 'src/components/FamousPlayersSection';
import Footer from 'src/components/Footer';
import HeroSection from 'src/components/HeroSection';
import Navbar from 'src/components/Navbar';
import Resources from 'src/components/Resources';

const LandingPage: React.FC = () => {
  return (
    <div className="max-w-screen min-h-screen relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FamousPlayersSection />
      <Resources />
      <Footer />
    </div>
  );
};

export default LandingPage;
