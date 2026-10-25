import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import ProblemStatement from './sections/ProblemStatement';
import Objectives from './sections/Objectives';
import Methodology from './sections/Methodology';
import Architecture from './sections/Architecture';
import TechStack from './sections/TechStack';
import Progress from './sections/Progress';
import Team from './sections/Team';
import Novelty from './sections/Novelty';
import ApiDocs from './sections/ApiDocs';
import Database from './sections/Database';
import GitHub from './sections/GitHub';
import Demos from './sections/Demos';
import References from './sections/References';
import Footer from './components/Footer';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <ProblemStatement />
        <Objectives />
        <Methodology />
        <Architecture />
        <TechStack />
        <Progress />
        <Team />
        <Novelty />
        <ApiDocs />
        <Database />
        <GitHub />
        <Demos />
        <References />
      </main>
      <Footer />

      {/* Back to top floating button */}
      <button
        onClick={scrollToTop}
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll back to top"
        title="Scroll to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
}

export default App;
