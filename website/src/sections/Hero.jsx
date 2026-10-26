import React from 'react';

const pipelineSteps = [
  {
    layer: 'Layer 2',
    title: 'Anti-Spoofing Gate',
    model: 'Wav2Vec2BERT',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    icon: '🛡️',
  },
  {
    layer: 'Layer 1',
    title: 'Speaker Verification',
    model: 'ECAPA-TDNN',
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    icon: '🔊',
  },
  {
    layer: 'Layer 3',
    title: 'Adaptive Voiceprint Update',
    model: '',
    color: '#059669',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    icon: '🔄',
  },
];

const techBadges = ['FastAPI', 'PyTorch', 'SpeechBrain', 'PostgreSQL', 'Docker'];

const styles = {
  hero: {
    position: 'relative',
    background: 'linear-gradient(168deg, #ffffff 0%, #f8fafc 40%, #eff6ff 100%)',
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0.35,
    pointerEvents: 'none',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '20px',
    position: 'relative',
    zIndex: 1,
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--color-primary-light)',
    color: 'var(--color-primary-dark)',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '0.82rem',
    fontWeight: 600,
    letterSpacing: '0.03em',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 800,
    lineHeight: 1.15,
    color: 'var(--color-text)',
    letterSpacing: '-0.02em',
  },
  titleAccent: {
    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginTop: '-8px',
  },
  tagline: {
    fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    maxWidth: '720px',
    lineHeight: 1.5,
  },
  overview: {
    fontSize: '0.98rem',
    color: 'var(--color-text-muted)',
    maxWidth: '760px',
    lineHeight: 1.75,
  },
  btnGroup: {
    display: 'flex',
    gap: '14px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '6px',
  },
  /* ---- Pipeline ---- */
  pipelineWrap: {
    width: '100%',
    maxWidth: '860px',
    marginTop: '28px',
  },
  pipelineLabel: {
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-text-muted)',
    marginBottom: '14px',
  },
  pipeline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0',
    flexWrap: 'wrap',
  },
  pipelineStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '22px 22px 18px',
    borderRadius: 'var(--radius-lg)',
    border: '1.5px solid',
    minWidth: '190px',
    flex: '1 1 190px',
    maxWidth: '260px',
    position: 'relative',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  stepLayer: {
    fontSize: '0.68rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    opacity: 0.7,
    marginBottom: '4px',
  },
  stepIcon: {
    fontSize: '1.5rem',
    marginBottom: '6px',
  },
  stepTitle: {
    fontWeight: 700,
    fontSize: '0.9rem',
    lineHeight: 1.3,
    marginBottom: '4px',
  },
  stepModel: {
    fontSize: '0.74rem',
    fontFamily: 'var(--font-mono)',
    opacity: 0.65,
    fontWeight: 500,
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    fontSize: '1.35rem',
    padding: '0 6px',
    flexShrink: 0,
    userSelect: 'none',
  },
  /* ---- Tech badges ---- */
  techRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  techBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 14px',
    borderRadius: '20px',
    fontSize: '0.76rem',
    fontWeight: 600,
    background: 'var(--color-surface)',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-border)',
    letterSpacing: '0.02em',
  },
};

export default function Hero() {
  return (
    <section id="home" className="section" style={styles.hero}>
      {/* Decorative circles */}
      <div
        style={{
          ...styles.decorCircle,
          width: '520px',
          height: '520px',
          background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
          top: '-160px',
          right: '-120px',
        }}
      />
      <div
        style={{
          ...styles.decorCircle,
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)',
          bottom: '-100px',
          left: '-80px',
        }}
      />

      <div className="container" style={styles.inner}>
        {/* Eyebrow */}
        <span style={styles.eyebrow}>🔐 Open-Source Research Project</span>

        {/* Title block */}
        <h1 style={styles.title}>
          <span style={styles.titleAccent}>AAA Engine</span>
        </h1>
        <p style={styles.subtitle}>Adaptive Acoustic Auth Engine</p>
        <p style={styles.tagline}>
          Adaptive, Challenge-Driven Voice Authentication Against Audio Spoofing
        </p>

        {/* Overview */}
        <p style={styles.overview}>
          A plug-and-play voice authentication middleware that combines speaker
          verification, audio anti-spoofing and deepfake detection,
          challenge-response authentication, and adaptive voiceprint updates —
          designed as a FastAPI middleware layer for seamless enterprise
          integration.
        </p>

        {/* Buttons */}
        <div style={styles.btnGroup}>
          <a href="#problem" className="btn btn-primary">
            Explore the Project ↓
          </a>
          <a
            href="https://github.com/Speech-Synthesis/AAA_Baselines"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            ★ View GitHub Repository
          </a>
        </div>

        {/* Pipeline Visualization */}
        <div style={styles.pipelineWrap}>
          <p style={styles.pipelineLabel}>3-Layer Authentication Pipeline</p>
          <div style={styles.pipeline}>
            {pipelineSteps.map((step, i) => (
              <React.Fragment key={step.layer}>
                <div
                  style={{
                    ...styles.pipelineStep,
                    background: step.bgColor,
                    borderColor: step.borderColor,
                    color: step.color,
                  }}
                >
                  <span style={styles.stepLayer}>{step.layer}</span>
                  <span style={styles.stepIcon}>{step.icon}</span>
                  <span style={{ ...styles.stepTitle, color: step.color }}>
                    {step.title}
                  </span>
                  {step.model && (
                    <span style={styles.stepModel}>{step.model}</span>
                  )}
                </div>
                {i < pipelineSteps.length - 1 && (
                  <span style={styles.arrow}>▸</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tech badges */}
        <div style={styles.techRow}>
          {techBadges.map((tech) => (
            <span key={tech} style={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
