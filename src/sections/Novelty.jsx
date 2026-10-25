import React from 'react';
import { COMPARISON_TABLE } from '../data/projectData';

const Novelty = () => {
  return (
    <section id="novelty" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Novelty & Differentiation</h2>
          <p>
            Bridging the security gap in modern voice biometrics by addressing why existing passive systems and static templates fail against generative AI threats.
          </p>
        </div>

        {/* Three Novelty Pillars */}
        <div className="grid-3" style={{ marginBottom: '48px' }}>
          {/* Pillar 1 */}
          <div className="card" style={{ borderTop: '4px solid var(--color-primary)' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Novelty Pillar 1</span>
            <h3 style={{ fontSize: '1.18rem', marginBottom: '12px', color: 'var(--color-text)' }}>
              Dynamic Challenge-Response + Deepfake Detection Pipeline
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
              Unlike passive systems (such as HSBC Voice ID) that passively listen to static phrases, AAA Engine generates unpredictable, time-bounded challenge tokens (90s TTL) and forces active cognitive liveness.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
              The spoken audio is passed through <strong>Layer 2 (Wav2Vec2)</strong> before speaker verification, blocking replay attacks and neural vocoder artifacts before embedding computation.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="card" style={{ borderTop: '4px solid var(--color-accent)' }}>
            <span className="badge badge-success" style={{ marginBottom: '12px' }}>Novelty Pillar 2</span>
            <h3 style={{ fontSize: '1.18rem', marginBottom: '12px', color: 'var(--color-text)' }}>
              Adaptive Voiceprint Update via Exponential Moving Average (EMA)
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
              Existing enterprise solutions store a static enrollment template that degrades over time due to aging, colds, or fatigue, leading to high False Rejection Rates (FRR).
            </p>
            <div style={{
              background: 'var(--color-surface-alt)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--color-primary-dark)',
              marginBottom: '12px'
            }}>
              New_Voiceprint = 0.8 × Old + 0.2 × Current
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Maintains long-term biometric stability without forcing users through friction-heavy re-enrollment cycles.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="card" style={{ borderTop: '4px solid var(--color-warning)' }}>
            <span className="badge badge-warning" style={{ marginBottom: '12px' }}>Novelty Pillar 3</span>
            <h3 style={{ fontSize: '1.18rem', marginBottom: '12px', color: 'var(--color-text)' }}>
              Plug-and-Play FastAPI Middleware Architecture
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
              Proprietary banking systems require extensive core infrastructure re-engineering. AAA Engine is designed as stateless, containerized REST middleware.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Any banking portal or client app integrates via standardized HTTP endpoints (<code>/auth/challenge</code> and <code>/auth/verify</code>) with zero changes to existing core authentication databases.
            </p>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="card" style={{ overflowX: 'auto', marginBottom: '32px' }}>
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.2rem', margin: '0 0 6px 0' }}>
              Comparative Analysis: Existing Solutions vs. AAA Engine
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', margin: 0 }}>
              Preserved from Task 3 literature review and Task 5 gap analysis.
            </p>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Architectural & Security Feature</th>
                <th style={{ textAlign: 'center', width: '15%' }}>HSBC Voice ID (Nuance)</th>
                <th style={{ textAlign: 'center', width: '15%' }}>Google / Azure Speech APIs</th>
                <th style={{ textAlign: 'center', width: '15%' }}>Standard ASVspoof Baselines</th>
                <th style={{ textAlign: 'center', width: '17%', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
                  AAA Engine (Proposed)
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.feature}</strong></td>
                  <td style={{ textAlign: 'center' }}>
                    {row.hsbc ? <span className="status-check">✔</span> : <span className="status-cross">✘</span>}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {row.google === 'Partial' ? (
                      <span className="badge badge-warning">Partial</span>
                    ) : row.google ? (
                      <span className="status-check">✔</span>
                    ) : (
                      <span className="status-cross">✘</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {row.asvspoof === 'Partial' ? (
                      <span className="badge badge-warning">Partial</span>
                    ) : row.asvspoof ? (
                      <span className="status-check">✔</span>
                    ) : (
                      <span className="status-cross">✘</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', background: '#f0fdf4', fontWeight: '700' }}>
                    <span className="status-check" style={{ fontSize: '1.1rem' }}>✔</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Academic Note */}
        <div style={{
          padding: '14px 20px',
          background: 'var(--color-surface-alt)',
          borderLeft: '4px solid var(--color-primary)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.84rem',
          color: 'var(--color-text-secondary)'
        }}>
          <strong>Research Note:</strong> Comparisons reflect documented production configurations of commercial systems as reported in public technical whitepapers and industry disclosures (e.g., AWS Connect Voice ID end-of-support in 2026).
        </div>

      </div>
    </section>
  );
};

export default Novelty;
