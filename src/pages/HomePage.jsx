import React from 'react';
import { PROJECT, PIPELINE_LAYERS, NOVELTY_COMPARISON } from '../data/projectData';

export default function HomePage({ onNavigate }) {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          background: 'linear-gradient(170deg, #ffffff 0%, #f8fafc 40%, #eff6ff 100%)',
          padding: '4.5rem 1.5rem 3.5rem',
          borderBottom: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '960px' }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              padding: '6px 18px',
              borderRadius: '20px',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '1.25rem',
            }}
          >
            🛡️ {PROJECT.fullName} • {PROJECT.teamNumber}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              color: 'var(--color-text)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}
          >
            Adaptive Voice Authentication with{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Zero-Trust Deepfake Immunity
            </span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              lineHeight: 1.5,
              marginBottom: '1.25rem',
            }}
          >
            {PROJECT.tagline}
          </p>

          <p
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              maxWidth: '820px',
              margin: '0 auto 2rem',
            }}
          >
            A high-assurance biometric middleware that pairs <strong>SpeechBrain ECAPA-TDNN</strong> speaker verification with <strong>Wav2Vec2</strong> audio anti-spoofing, <strong>OpenAI Whisper</strong> spoken challenge phrase verification, <strong>HMAC-SHA256</strong> replay protection, and continuous <strong>Exponential Moving Average (EMA)</strong> voiceprint adaptation.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <button
              onClick={() => onNavigate('app')}
              className="btn btn-primary"
              style={{ padding: '0.85rem 1.75rem', fontSize: '1rem', fontWeight: 700 }}
            >
              Launch Live Application Demo →
            </button>
            <button
              onClick={() => onNavigate('workflow')}
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
            >
              Inspect Authentication Pipeline
            </button>
            <a
              href={PROJECT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
            >
              GitHub Source Code ↗
            </a>
          </div>

          {/* Interactive Pipeline Ribbon */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-md)',
              textAlign: 'left',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>
                VERIFIED ARCHITECTURE PIPELINE FLOW (backend/app/main.py)
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                Cascade Gating Strategy
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
              {PIPELINE_LAYERS.map((stage, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    {stage.layer}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-text)' }}>
                    {stage.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                    {stage.threshold}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section style={{ padding: '4rem 1.5rem', background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">The Threat Landscape</span>
            <h2 className="section-title">Why Traditional Voice Authentication Fails Against Modern Generative AI</h2>
            <p className="section-subtitle">
              Voice deepfakes and automated cloning technologies have made conventional biometric voice recognition vulnerable to impersonation, synthetic generation, and pre-recorded replay injection.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="saas-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📉</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                47% of Indian Adults Targeted by Voice Scams
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                According to McAfee's <em>Artificial Imposter</em> research, 83% of victims suffered direct financial loss, with ₹50,000+ lost on average due to 3-second generative voice clones of family members and banking representatives.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                The Classical Speaker Verification Flaw
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Models like ECAPA-TDNN and x-vectors are designed solely to answer <em>"Whose voice does this sound like?"</em> They do not distinguish between an authentic human vocal tract and an AI neural vocoder producing the identical timbre.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔄</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Biological Voice Drift vs. Static Voiceprints
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Natural acoustic drift caused by aging, respiratory fatigue, background environment, and microphone variance causes static voice templates to fail over time, resulting in false rejection rates exceeding 15%.
              </p>
            </div>
          </div>

          {/* Research Question Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              PRIMARY RESEARCH QUESTION (23CSE498)
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.6, color: '#f8fafc' }}>
              "How can a modular biometric authentication middleware combine deepfake audio detection, dynamic challenge-response, and continuous voiceprint adaptation to prevent acoustic spoofing without degrading genuine user verification accuracy?"
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Defensive Capabilities</span>
            <h2 className="section-title">The Four Pillars of AAA Engine</h2>
            <p className="section-subtitle">
              Every request passes through independent cryptographic and neural verification checkpoints.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            <div className="saas-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                PILLAR 1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                ECAPA-TDNN Speaker Verification
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Generates 192-dimensional embeddings via channel-attentive statistics pooling using <code>speechbrain/spkrec-ecapa-voxceleb</code>. Computes normalized cosine similarity clamped to [0, 1] with a calibrated 0.50 acceptance threshold.
              </p>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-primary)' }}>
                Target: EER &lt; 0.87% on VoxCeleb1
              </div>
            </div>

            <div className="saas-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-danger)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                PILLAR 2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                Wav2Vec2 Deepfake Gate
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Pre-verification defensive gate utilizing <code>garystafford/wav2vec2-deepfake-voice-detector</code>. Evaluates high-frequency spectral artifacts and vocoder signatures, blocking spoofed and synthetic audio before identity matching.
              </p>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-danger)' }}>
                Rejects if spoof prob &gt; 0.50
              </div>
            </div>

            <div className="saas-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-success)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                PILLAR 3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                Whisper ASR Spoken Challenge
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Dynamic phrase generation (e.g., <em>"Say: 7 Crimson Falcon 4"</em>) paired with local OpenAI Whisper transcription. Spoken text is compared using SequenceMatcher string similarity to defeat pre-recorded physical replay clips.
              </p>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-success)' }}>
                Requires phrase similarity ≥ 0.60
              </div>
            </div>

            <div className="saas-card" style={{ marginBottom: 0 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-warning)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                PILLAR 4
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
                EMA Adaptive Voiceprints
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Exponential Moving Average voiceprint updates (α = 0.20) automatically adjust stored voiceprints after every successful authentication: <code>New = 0.8 × Old + 0.2 × Current</code>. Defeats template aging gracefully.
              </p>
              <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-warning)' }}>
                Applied strictly upon full ACCEPT
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Novelty Comparison Matrix */}
      <section style={{ padding: '4rem 1.5rem', background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">Academic Differentiation</span>
            <h2 className="section-title">Novelty & Competitive Comparison</h2>
            <p className="section-subtitle">
              How AAA Engine advances beyond existing commercial and academic benchmarks.
            </p>
          </div>

          <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <table className="light-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>Architectural Dimension</th>
                  <th style={{ width: '26%' }}>Traditional Biometrics</th>
                  <th style={{ width: '26%' }}>Commercial Solutions</th>
                  <th style={{ width: '26%', color: 'var(--color-primary)' }}>AAA Engine (This Work)</th>
                </tr>
              </thead>
              <tbody>
                {NOVELTY_COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>{row.feature}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{row.traditional}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{row.commercial}</td>
                    <td style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem', background: 'var(--color-primary-light)' }}>
                      {row.aaaEngine}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Project Team & Guide Credit */}
      <section style={{ padding: '3.5rem 1.5rem', background: 'var(--color-surface)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 500px' }}>
              <span className="section-eyebrow">Academic Supervision</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                {PROJECT.institution}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: 1.6 }}>
                Developed as part of <strong>{PROJECT.course}</strong> by <strong>{PROJECT.teamNumber}</strong> under the faculty guidance of <strong>{PROJECT.guide.name}</strong>, {PROJECT.guide.title}.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => onNavigate('team')} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                  Meet the Full Team & Roles →
                </button>
                <button onClick={() => onNavigate('docs')} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                  Read Technical Docs →
                </button>
              </div>
            </div>

            <div
              style={{
                flex: '0 1 360px',
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Faculty Project Guide
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-primary)', marginTop: '4px' }}>
                {PROJECT.guide.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {PROJECT.guide.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {PROJECT.guide.institution}
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Team Members: Nandan Reddy • Navadeep Kumar • Parise Aditya • Surya • Karthik Srijan
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
