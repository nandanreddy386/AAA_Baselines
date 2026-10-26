import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LiveAppPage from './pages/LiveAppPage';
import DemosPage from './pages/DemosPage';
import WorkflowPage from './pages/WorkflowPage';
import ArchitecturePage from './pages/ArchitecturePage';
import ApiDocsPage from './pages/ApiDocsPage';
import StatusTeamPage from './pages/StatusTeamPage';

const VALID_PAGES = ['home', 'app', 'demos', 'workflow', 'architecture', 'docs', 'team'];

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setActivePage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (pageId) => {
    if (VALID_PAGES.includes(pageId)) {
      window.location.hash = `#/${pageId}`;
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header activePage={activePage} onNavigate={navigateTo} />

      <main style={{ flex: 1 }}>
        {activePage === 'home' && <HomePage onNavigate={navigateTo} />}
        {activePage === 'app' && <LiveAppPage />}
        {activePage === 'demos' && <DemosPage onNavigate={navigateTo} />}
        {activePage === 'workflow' && <WorkflowPage onNavigate={navigateTo} />}
        {activePage === 'architecture' && <ArchitecturePage onNavigate={navigateTo} />}
        {activePage === 'docs' && <ApiDocsPage />}
        {activePage === 'team' && <StatusTeamPage />}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Floating scroll to top */}
      <button
        onClick={scrollToTop}
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Scroll to top"
        title="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}
