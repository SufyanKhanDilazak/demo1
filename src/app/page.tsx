import React from 'react';
import AnimatedLandingPage from './components/Main';
import Services from './components/Services';
import AboutSection from './components/About2';
import NebulaScene from './components/Three';
import PortfolioSection from './components/Portfolio';
import Footer from './components/Footer';

const Page = () => {
  return (
    <div className="relative">
      <NebulaScene />
      <div className="relative z-10">
        <div className="min-h-screen">
          <AnimatedLandingPage />
        </div>

        <div className="min-h-screen">
          <Services />
        </div>

        <div className="min-h-screen">
          <PortfolioSection />
        </div>

        <div className="min-h-screen">
          <AboutSection />
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default Page;
