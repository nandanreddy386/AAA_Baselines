import React from 'react';
import { REFERENCES, PROJECT } from '../data/projectData';

const datasets = [
  { name: 'VoxCeleb1', layer: 'Layer 1: Speaker Verification', size: '~35 GB', desc: 'Audio clips of 1,251 celebrities used to train and benchmark ECAPA-TDNN speaker verification models.' },
  { name: 'MUSAN + RIR', layer: 'Layer 1: Robustness', size: '~11 GB', desc: 'Music, Speech, and Noise corpus plus simulated Room Impulse Responses for noise-augmented training.' },
  { name: 'ASVspoof 2019 LA', layer: 'Layer 2: Anti-Spoofing Train', size: '~8 GB', desc: 'Logical Access partition used to train Wav2Vec2 on synthetic speech and voice conversion artifacts.' },
  { name: 'ASVspoof 2021 DF', layer: 'Layer 2: Deepfake Eval', size: '~15 GB', desc: 'Deepfake track containing modern lossy-compressed and neural vocoder voice clones for zero-shot testing.' },
  { name: 'VCTK Corpus', layer: 'Layer 3: Dynamic Adaptation', size: '~11 GB', desc: 'Multi-accent speech recordings from 110 English speakers used to benchmark EMA voiceprint stability.' },
];

const References = () => {
  return (
    <section id="references" className="section">
      <div className="container">
        <div className="section-header">
          <h2>References & Benchmark Datasets</h2>
          <p>
            Academic literature and speech datasets informing the AAA Engine's design, feature extraction front-ends, and evaluation targets.
          </p>
        </div>

        {/* Papers Section */}
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📚</span> Key Academic Literature
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {REFERENCES.map((ref) => (
              <li
                key={ref.id}
                style={{
                  paddingBottom: '14px',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  color: 'var(--color-text-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-muted" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    [{ref.id}]
                  </span>
                  <strong style={{ color: 'var(--color-text)' }}>{ref.authors} ({ref.year}).</strong>
                  <span>"{ref.title}."</span>
                  <em style={{ color: 'var(--color-text-muted)' }}>{ref.venue}.</em>
                  {ref.link && (
                    <a
                      href={ref.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.82rem', marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>Paper Link ↗</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Datasets Section */}
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🗂️</span> Benchmark & Training Datasets
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ fontSize: '0.85rem' }}>
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Dataset Name</th>
                  <th style={{ width: '24%' }}>Pipeline Layer</th>
                  <th style={{ width: '14%' }}>Approx. Size</th>
                  <th>Dataset Purpose & Usage in AAA Engine</th>
                </tr>
              </thead>
              <tbody>
                {datasets.map((ds, idx) => (
                  <tr key={idx}>
                    <td><strong style={{ color: 'var(--color-text)' }}>{ds.name}</strong></td>
                    <td><span className="badge badge-primary">{ds.layer}</span></td>
                    <td><code>{ds.size}</code></td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{ds.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acknowledgements */}
        <div style={{
          padding: '24px 30px',
          background: 'var(--color-surface-alt)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}>
          <h4 style={{ marginBottom: '8px', color: 'var(--color-text)' }}>Acknowledgements & Institutional Support</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', maxWidth: '720px', margin: '0 auto', lineHeight: '1.6' }}>
            The authors express sincere gratitude to <strong>{PROJECT.guide.name}</strong> ({PROJECT.guide.title}, Department of CSE) for continuous guidance and architectural reviews throughout Project Phase 2, and to the Amrita High-Performance Computing (HPC) facility for providing GPU acceleration resources for baseline model training.
          </p>
        </div>

      </div>
    </section>
  );
};

export default References;
