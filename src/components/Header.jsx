import React, { useState, useEffect } from 'react';
import { checkServerHealth } from '../utils/apiClient';
import { PROJECT } from '../data/projectData';

export default function Header({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isServerLive, setIsServerLive] = useState(false);

  const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'app', label: 'Live App', badge: 'Interactive' },
    { id: 'demos', label: 'Demo Videos' },
    { id: 'workflow', label: 'Auth Workflow' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'docs', label: 'API & Docs' },
    { id: 'team', label: 'Status & Team' },
  ];

  useEffect(() => {
    checkServerHealth().then(setIsServerLive);
    const interval = setInterval(() => {
      checkServerHealth().then(setIsServerLive);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        height: '68px',
        background: '#ffffff',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1rem, 3vw, 2.5rem)',
        zIndex: 1000,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Brand & Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        onClick={() => handleNavClick('home')}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #1d4ed8 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            fontWeight: 800,
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
          }}
        >
          🛡️
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-text)', lineHeight: 1.15 }}>
            AAA Engine
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            Adaptive Acoustic Auth
          </div>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
        className="hide-on-mobile"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.45rem 0.75rem',
                fontSize: '0.84rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                background: isActive ? 'var(--color-primary-light)' : 'transparent',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: isActive ? 'var(--color-primary)' : 'var(--color-primary-light)',
                    color: isActive ? '#ffffff' : 'var(--color-primary)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Right Action Group: Server Status & GitHub */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Backend health status badge */}
        <div
          title={isServerLive ? 'FastAPI server online at http://localhost:8000' : 'Offline demo mode active'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '12px',
            background: isServerLive ? 'var(--color-success-light)' : '#fef3c7',
            color: isServerLive ? 'var(--color-success)' : '#d97706',
            border: `1px solid ${isServerLive ? 'var(--color-success)' : '#fde68a'}`,
          }}
          className="hide-on-mobile"
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: isServerLive ? 'var(--color-success)' : '#f59e0b',
            }}
          />
          <span>{isServerLive ? 'API: Live' : 'Client Mode'}</span>
        </div>

        <a
          href={PROJECT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{
            padding: '0.45rem 0.85rem',
            fontSize: '0.82rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="hide-on-mobile">GitHub</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-on-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label="Toggle navigation menu"
        >
          <span style={{ width: '22px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }} />
          <span style={{ width: '22px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }} />
          <span style={{ width: '22px', height: '2px', background: 'var(--color-text)', borderRadius: '2px' }} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '68px',
            left: 0,
            right: 0,
            background: '#ffffff',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            gap: '6px',
            zIndex: 999,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                fontSize: '0.95rem',
                fontWeight: activePage === item.id ? 700 : 500,
                color: activePage === item.id ? 'var(--color-primary)' : 'var(--color-text)',
                background: activePage === item.id ? 'var(--color-primary-light)' : 'transparent',
                borderRadius: '8px',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'var(--color-primary)', color: '#fff' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
