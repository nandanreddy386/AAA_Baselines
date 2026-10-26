import React from 'react';
import { PROJECT } from '../data/projectData';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  const FOOTER_PAGES = [
    { id: 'home', label: 'Home / Overview' },
    { id: 'app', label: 'Live Application' },
    { id: 'workflow', label: 'Auth Workflow' },
    { id: 'architecture', label: 'System Architecture' },
    { id: 'docs', label: 'API & Tech Docs' },
    { id: 'team', label: 'Status & Team' },
  ];

  return (
    <footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid var(--color-border)',
        padding: '3.5rem 1.5rem 2rem',
        color: 'var(--color-text)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1100px',
          marginBottom: '2.5rem',
        }}
      >
        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🛡️</span>
            <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-primary)' }}>
              AAA Engine
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            Adaptive Acoustic Auth (AAA) Engine — a plug-and-play biometric security middleware integrating speaker verification, audio deepfake detection, dynamic challenge-response, and adaptive voiceprints.
          </p>
          <a
            href={PROJECT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Speech-Synthesis/AAA_Baselines
          </a>
        </div>

        {/* Portal Pages */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
            Portal Navigation
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {FOOTER_PAGES.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => onNavigate(p.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--color-primary)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--color-text)')}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Academic Supervision */}
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-text-muted)', marginBottom: '0.85rem' }}>
            Academic Information
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 0.5rem 0' }}>
            <strong>Course:</strong> {PROJECT.course} ({PROJECT.teamNumber})
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: '0 0 0.5rem 0' }}>
            <strong>Faculty Project Guide:</strong> {PROJECT.guide.name}, {PROJECT.guide.title}
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
            {PROJECT.institution}
          </p>
        </div>
      </div>

      <div
        className="container"
        style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1.5rem',
          maxWidth: '1100px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)',
        }}
      >
        <span>&copy; {CURRENT_YEAR} AAA Engine. Released under MIT License for academic research.</span>
        <span>Amrita Vishwa Vidyapeetham • Department of Computer Science & Engineering</span>
      </div>
    </footer>
  );
}
