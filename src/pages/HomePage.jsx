import React from 'react';
import { PROJECT, PIPELINE_LAYERS, NOVELTY_COMPARISON } from '../data/projectData';

export default function HomePage({ onNavigate }) {
  return (
    <div>
      {/* 1. HERO SECTION */}
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
          {/* Eyebrow Badge */}
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
              border: '1px solid var(--color-primary-border)',
            }}
          >
            🛡️ {PROJECT.fullName}
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
              fontWeight: 600,
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
              margin: '0 auto 1.75rem',
            }}
          >
            A high-assurance biometric security middleware combining <strong>SpeechBrain ECAPA-TDNN</strong> speaker verification, <strong>Hugging Face Wav2Vec2</strong> audio anti-spoofing, <strong>OpenAI Whisper</strong> dynamic phrase verification, <strong>HMAC-SHA256</strong> cryptographic replay protection, and continuous <strong>Exponential Moving Average (EMA)</strong> voiceprint adaptation.
          </p>

          {/* Project Authority Metadata Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '2rem',
            }}
          >
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', background: '#ffffff', border: '1px solid var(--color-border)', padding: '4px 12px', borderRadius: '16px' }}>
              🏛️ {PROJECT.institution}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', background: '#ffffff', border: '1px solid var(--color-border)', padding: '4px 12px', borderRadius: '16px' }}>
              👥 {PROJECT.teamNumber} • Course {PROJECT.course}
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', background: '#ffffff', border: '1px solid var(--color-border)', padding: '4px 12px', borderRadius: '16px' }}>
              🎓 Faculty Guide: {PROJECT.guide.name}, {PROJECT.guide.title}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
        </div>
      </section>

      {/* 2. PROBLEM STATEMENT (NEXT AFTER HERO) */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">The Threat Landscape</span>
            <h2 className="section-title">Problem Statement</h2>
            <p className="section-subtitle">
              Why traditional voice authentication fails against modern generative AI and acoustic spoofing attacks.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📉</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                47% of Indian Adults Targeted by Voice Scams
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                According to McAfee's global <em>Artificial Imposter</em> study, 47% of surveyed adults in India were directly targeted by AI voice scams, with 83% of victims suffering direct financial loss (averaging ₹50,000+ stolen) through 3-second generative voice clones of family members or banking officials.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                The Classical Speaker Verification Flaw
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Conventional speaker recognition architectures (ECAPA-TDNN, x-vectors) only measure acoustic timbre similarity (<em>"Whose voice does this sound like?"</em>). They have zero native ability to differentiate between a live human vocal tract and an AI neural vocoder producing identical timbre.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔄</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Biological Voice Drift vs. Static Templates
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Natural acoustic drift caused by aging, respiratory fatigue, background acoustics, and microphone variance causes static voice templates to fail over time, resulting in false rejection rates exceeding 15% without continuous, verified adaptation.
              </p>
            </div>
          </div>

          {/* Research Question Box */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 2.5rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
              PROJECT RESEARCH QUESTION
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, lineHeight: 1.6, color: '#f8fafc' }}>
              "How can a modular biometric authentication middleware combine deepfake audio detection, dynamic challenge-response, and continuous voiceprint adaptation to prevent acoustic spoofing without degrading genuine user verification accuracy?"
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT OBJECTIVES (DIRECTLY AFTER PROBLEM STATEMENT) */}
      <section style={{ padding: '4.5rem 1.5rem', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Project Goals & Scope</span>
            <h2 className="section-title">Project Objectives</h2>
            <p className="section-subtitle">
              Formal technical and security engineering objectives established for the AAA Engine project.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🎙️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                1. Robust Speaker Verification
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Extract 192-dimensional acoustic speaker embeddings via SpeechBrain ECAPA-TDNN and verify against stored enrolled voiceprints using clamped cosine similarity with an Equal Error Rate target below 0.87%.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                2. Deepfake & Audio Anti-Spoofing
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Deploy a Wav2Vec2 audio classification gate prior to speaker verification to detect synthetic speech, neural vocoder artifacts, and replay attacks, rejecting fraudulent attempts before identity matching.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🔐</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                3. Challenge-Response Active Liveness
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Issue randomized challenge phrases combined with cryptographic HMAC-SHA256 tokens (strict 90s TTL, single-use consumption) and verify spoken phrases via Whisper ASR to neutralize replay injection.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>🔄</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                4. Continuous Voiceprint Adaptation
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Implement an Exponential Moving Average algorithm (α = 0.20) that smoothly updates stored voiceprints upon authentic verification to counteract natural biological voice drift without compromising security.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>⚡</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                5. Plug-and-Play Middleware API
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Package the authentication cascade as high-concurrency asynchronous FastAPI REST routes with Docker containerization, allowing seamless drop-in integration into banking and enterprise applications.
              </p>
            </div>

            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>📊</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                6. Forensic Auditing & Traceability
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Persist detailed forensic metrics for every attempt in PostgreSQL, recording layer failure codes, deepfake confidence scores, similarity metrics, and challenge timestamps for compliance audits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SYSTEM PIPEFLOW (PIPELINE FLOW) */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">Cascaded Verification Sequence</span>
            <h2 className="section-title">Authentication Pipeline Flow (Pipeflow)</h2>
            <p className="section-subtitle">
              The end-to-end zero-trust verification pipeline executed by the backend for every incoming authentication attempt.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border)',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
              {PIPELINE_LAYERS.map((stage, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.25rem 1rem',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-surface)',
                    border: '1.5px solid var(--color-border)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'all 0.2s',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {stage.layer}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-text)', marginBottom: '6px' }}>
                      {stage.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                      {stage.spec}
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', paddingTop: '8px', borderTop: '1px solid var(--color-border)', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {stage.threshold}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('workflow')}
                className="btn btn-secondary"
                style={{ fontSize: '0.88rem' }}
              >
                Inspect Detailed 6-Stage Workflow Logic →
              </button>
              <button
                onClick={() => onNavigate('app')}
                className="btn btn-primary"
                style={{ fontSize: '0.88rem' }}
              >
                Test Pipeflow in Live Application →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ENGINEERING METHODOLOGY */}
      <section style={{ padding: '4.5rem 1.5rem', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Research & Technical Workflow</span>
            <h2 className="section-title">Project Methodology</h2>
            <p className="section-subtitle">
              Systematic 6-step engineering methodology guiding the design, implementation, and empirical validation of AAA Engine.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {[
              { step: '01', title: 'Data Pipeline & Standardisation', desc: 'Audio normalization to 16kHz mono WAV, silence trimming with librosa, in-browser Web Audio API resampling, and feature extraction.' },
              { step: '02', title: 'Layer 1 ECAPA-TDNN Modeling', desc: 'Pretrained SpeechBrain 192-dim embedding extraction with attentive statistics pooling, Windows LocalStrategy deployment, and cosine similarity tuning.' },
              { step: '03', title: 'Layer 2 Anti-Spoofing Integration', desc: 'Deploying Hugging Face wav2vec2 binary audio classification as an immediate defensive barrier preceding identity verification.' },
              { step: '04', title: 'Layer 3 Cryptographic Tokens & ASR', desc: 'HMAC-SHA256 URL-safe token signing with 90s TTL, randomized phrase generation, and Whisper ASR string similarity matching.' },
              { step: '05', title: 'Adaptive Voiceprint Management', desc: 'Developing the Exponential Moving Average (EMA α = 0.20) formulation to continuously track natural biological voice drift upon authentic logins.' },
              { step: '06', title: 'API Middleware & Full Stack Portal', desc: 'FastAPI async pipeline wiring, PostgreSQL ORM persistence, Docker containerization, and React SaaS client evaluation.' },
            ].map((m, i) => (
              <div key={i} className="saas-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 800, background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '6px' }}>
                    STEP {m.step}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-text)' }}>
                    {m.title}
                  </h3>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => onNavigate('workflow')} className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
              Inspect Detailed Authentication Workflow Diagram →
            </button>
          </div>
        </div>
      </section>

      {/* 6. NOVELTY & COMPETITIVE ADVANTAGE */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">Academic Differentiation</span>
            <h2 className="section-title">Novelty & Competitive Advantage</h2>
            <p className="section-subtitle">
              How AAA Engine advances beyond existing commercial and academic biometric benchmarks.
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

      {/* 7. PROJECT DETAILS & ACADEMIC SUPERVISION */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--color-surface)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">Project Identity & Supervision</span>
            <h2 className="section-title">Project Details & Institutional Authority</h2>
            <p className="section-subtitle">
              Department of Computer Science & Engineering, Amrita School of Computing, Amrita Vishwa Vidyapeetham
            </p>
          </div>

          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                ACADEMIC ENGINEERING PROJECT
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                {PROJECT.fullName}
              </h3>
              <div style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
                Course: <strong>{PROJECT.course}</strong> • <strong>{PROJECT.teamNumber}</strong>
              </div>
              <div style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                {PROJECT.institution}
              </div>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '520px' }}>
                Conducted by Team 90 under the faculty guidance of <strong>{PROJECT.guide.name}</strong>, Associate Professor. A production-ready voice authentication middleware engineered against modern acoustic spoofing and neural voice cloning.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.25rem' }}>
                <button
                  onClick={() => onNavigate('team')}
                  className="btn btn-primary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                  Meet Full Team & Roles →
                </button>
                <button
                  onClick={() => onNavigate('docs')}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Technical Documentation →
                </button>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.25rem' }}>
                Faculty Project Guide
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
                {PROJECT.guide.name}
              </div>
              <div style={{ fontSize: '0.88rem', color: '#38bdf8', marginBottom: '0.25rem' }}>
                {PROJECT.guide.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
                Department of Computer Science & Engineering
              </div>
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.4rem' }}>
                  Student Engineering Team
                </div>
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                  M Nandan Reddy • M Navadeep Kumar • Parise Aditya • AVKB Surya • M Karthik Srijan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
