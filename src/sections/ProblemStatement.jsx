import React from 'react';

/* ─── Card data ─── */
const statItems = [
  { value: '47%', label: 'experienced or know someone affected by AI voice cloning scams' },
  { value: '83%', label: 'of victims suffered financial loss' },
  { value: '48%', label: 'lost more than ₹50,000' },
  { value: '69%', label: 'cannot differentiate real vs AI-generated voices' },
];

const caseStudies = [
  { location: 'Indore', amount: '₹97,500', detail: 'AI voice cloning phone scam' },
  { location: 'Hyderabad', amount: '₹1.97 Lakh', detail: 'Deepfake voice impersonation fraud' },
  { location: 'Roorkee', amount: '₹6 Lakh', detail: 'Deepfake extortion scheme' },
];

const riskCards = [
  {
    icon: '🔓',
    title: 'Passive Authentication Risks',
    color: '#d97706',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    points: [
      'Existing systems analyze natural speech with no enforced challenge-response',
      'No cognitive verification layer to prove liveness',
      'Allows replay attacks and AI voice injection to bypass security',
    ],
  },
  {
    icon: '📌',
    title: 'Static Voiceprint Limitations',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#fecaca',
    points: [
      'Voices change due to illness, aging, and stress',
      'Static templates cause high False Rejection Rate (FRR)',
      'Static systems are easier to model with generative AI',
    ],
  },
];

const styles = {
  /* ── Stats grid ── */
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '18px',
    marginBottom: '40px',
  },
  statCard: {
    textAlign: 'center',
    padding: '24px 16px',
    background: 'var(--color-primary-bg)',
    border: '1px solid var(--color-primary-light)',
    borderRadius: 'var(--radius-lg)',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 800,
    color: 'var(--color-primary)',
    lineHeight: 1.1,
    marginBottom: '8px',
  },
  statLabel: {
    fontSize: '0.84rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.45,
  },

  /* ── Sub-header ── */
  subHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '18px',
  },
  subHeaderIcon: {
    fontSize: '1.3rem',
  },
  subHeaderTitle: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: 'var(--color-text)',
  },

  /* ── Case studies ── */
  caseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '40px',
  },
  caseCard: {
    padding: '20px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    borderLeft: '3px solid var(--color-danger)',
  },
  caseLocation: {
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--color-text-muted)',
    marginBottom: '4px',
  },
  caseAmount: {
    fontSize: '1.2rem',
    fontWeight: 800,
    color: 'var(--color-danger)',
    marginBottom: '4px',
  },
  caseDetail: {
    fontSize: '0.84rem',
    color: 'var(--color-text-secondary)',
  },

  /* ── Risk cards ── */
  riskGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
    marginBottom: '40px',
  },
  riskCard: {
    padding: '26px',
    borderRadius: 'var(--radius-lg)',
    border: '1.5px solid',
  },
  riskTitle: {
    fontWeight: 700,
    fontSize: '1rem',
    marginBottom: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  riskPoint: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '10px',
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.55,
  },
  riskBullet: {
    flexShrink: 0,
    marginTop: '3px',
    fontSize: '0.7rem',
  },

  /* ── Research question ── */
  research: {
    background: 'linear-gradient(135deg, var(--color-primary-bg) 0%, #f0f9ff 100%)',
    border: '1.5px solid var(--color-primary-light)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px 32px',
    textAlign: 'center',
    position: 'relative',
  },
  researchLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-primary)',
    marginBottom: '16px',
  },
  researchText: {
    fontSize: 'clamp(0.95rem, 2vw, 1.12rem)',
    fontWeight: 500,
    color: 'var(--color-text)',
    lineHeight: 1.7,
    maxWidth: '860px',
    margin: '0 auto',
    fontStyle: 'italic',
  },

  /* ── Source footnote ── */
  source: {
    marginTop: '32px',
    textAlign: 'center',
    fontSize: '0.78rem',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  },
};

/* ─── Responsive overrides via media-query-like inline approach ─── */
const responsiveCSS = `
  @media (max-width: 1024px) {
    .ps-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .ps-case-grid  { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (max-width: 768px) {
    .ps-stats-grid { grid-template-columns: 1fr !important; }
    .ps-case-grid  { grid-template-columns: 1fr !important; }
    .ps-risk-grid  { grid-template-columns: 1fr !important; }
    .ps-research   { padding: 28px 20px !important; }
  }
`;

export default function ProblemStatement() {
  return (
    <section id="problem" className="section section-alt">
      {/* Injected responsive styles */}
      <style>{responsiveCSS}</style>

      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <h2>Problem Statement</h2>
          <p>Why Current Voice Authentication Fails</p>
        </div>

        {/* ── A) Rise of AI Voice Cloning — stats ── */}
        <div style={styles.subHeader}>
          <span style={styles.subHeaderIcon}>📈</span>
          <h3 style={styles.subHeaderTitle}>Rise of AI Voice Cloning</h3>
          <span className="badge badge-danger" style={{ marginLeft: '8px' }}>
            India Survey Data
          </span>
        </div>

        <div className="ps-stats-grid" style={styles.statsGrid}>
          {statItems.map((s) => (
            <div key={s.value} style={styles.statCard}>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── B) Real Cases ── */}
        <div style={styles.subHeader}>
          <span style={styles.subHeaderIcon}>🚨</span>
          <h3 style={styles.subHeaderTitle}>Real Cases — Documented Indian Incidents</h3>
        </div>

        <div className="ps-case-grid" style={styles.caseGrid}>
          {caseStudies.map((c) => (
            <div key={c.location} style={styles.caseCard}>
              <div style={styles.caseLocation}>{c.location}</div>
              <div style={styles.caseAmount}>{c.amount}</div>
              <div style={styles.caseDetail}>{c.detail}</div>
            </div>
          ))}
        </div>

        {/* ── C & D) Passive Auth Risks + Static Voiceprint ── */}
        <div className="ps-risk-grid" style={styles.riskGrid}>
          {riskCards.map((card) => (
            <div
              key={card.title}
              style={{
                ...styles.riskCard,
                background: card.bgColor,
                borderColor: card.borderColor,
              }}
            >
              <div style={{ ...styles.riskTitle, color: card.color }}>
                <span>{card.icon}</span>
                {card.title}
              </div>
              {card.points.map((pt, i) => (
                <div key={i} style={styles.riskPoint}>
                  <span style={{ ...styles.riskBullet, color: card.color }}>●</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── E) Research Problem ── */}
        <div className="ps-research" style={styles.research}>
          <div style={styles.researchLabel}>🎯 Core Research Question</div>
          <p style={styles.researchText}>
            "How can we design a plug-and-play biometric security engine that
            detects AI-generated speech, enforces live human verification, and
            dynamically adapts to natural voice variations — without requiring
            modification to existing enterprise systems?"
          </p>
        </div>

        {/* Source note */}
        <p style={styles.source}>
          Source: AAA Engine Task 1 — Motivation &amp; Problem Statement
        </p>
      </div>
    </section>
  );
}
