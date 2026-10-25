import React from 'react';
import { PROJECT } from '../data/projectData';

const GitHub = () => {
  return (
    <section id="github" className="section">
      <div className="container">
        <div className="card" style={{
          padding: '48px 36px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '840px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* GitHub Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#0f172a',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            fontSize: '2rem'
          }}>
            <svg height="36" viewBox="0 0 16 16" width="36" fill="currentColor">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
          </div>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
            Open Source Baseline Repository
          </h2>
          <code style={{
            fontSize: '1rem',
            color: 'var(--color-primary)',
            background: 'var(--color-primary-bg)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-block',
            marginBottom: '16px'
          }}>
            Speech-Synthesis/AAA_Baselines
          </code>

          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.98rem',
            maxWidth: '620px',
            margin: '0 auto 28px auto',
            lineHeight: '1.6'
          }}>
            Contains the core repository for the <strong>Adaptive Acoustic Auth Engine</strong>, including <code>layer1_speaker.py</code>, <code>layer2_deepfake.py</code>, <code>layer3_adaptive.py</code>, and FastAPI pipeline orchestration in <code>main.py</code>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <a
              href={PROJECT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <span>Explore GitHub Repository ↗</span>
            </a>
          </div>

          {/* Repository Details */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border)',
            textAlign: 'left',
            fontSize: '0.84rem'
          }}>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: '600' }}>Active Branches</span>
              <span style={{ color: 'var(--color-text)' }}>4 Feature Tracks Merged</span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: '600' }}>Orchestration</span>
              <span style={{ color: 'var(--color-text)' }}>main.py (FastAPI)</span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: '600' }}>Client App</span>
              <span style={{ color: 'var(--color-text)' }}>/frontend (React + Vite)</span>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)', display: 'block', fontWeight: '600' }}>Access Policy</span>
              <span style={{ color: 'var(--color-text)' }}>Academic & Review Access</span>
            </div>
          </div>

          {/* Access advisory */}
          <p style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
            margin: '20px 0 0 0',
            fontStyle: 'italic'
          }}>
            Note: Repository visibility and checkpoint weights are maintained under project review access guidelines.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GitHub;
