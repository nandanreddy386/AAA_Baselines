import React from 'react';

const steps = [
  {
    num: 1,
    title: 'User Enrollment',
    layer: null,
    description:
      'Initial voiceprint creation from 10–15 s audio → 192-dim embedding stored.',
  },
  {
    num: 2,
    title: 'Challenge Generation',
    layer: null,
    description:
      'System generates randomised phrase (e.g., "Say: 9 Red Chair 47") with HMAC-SHA256 signed JWT, 90-second expiry.',
  },
  {
    num: 3,
    title: 'Audio Recording & Preprocessing',
    layer: null,
    description:
      'User speaks challenge, audio captured at 16 kHz mono, silence-trimmed, FBANK features extracted.',
  },
  {
    num: 4,
    title: 'Token Validation',
    layer: null,
    description:
      'Session token signature verified, expiry checked, single-use enforced.',
  },
  {
    num: 5,
    title: 'Anti-Spoofing Classification',
    layer: 'Layer 2',
    description:
      'Wav2Vec2BERT classifies audio as Bonafide or Spoof. Spoof → immediate REJECT.',
  },
  {
    num: 6,
    title: 'Speaker Embedding Generation',
    layer: 'Layer 1',
    description:
      'ECAPA-TDNN generates 192-dim live embedding, cosine similarity compared (threshold: 0.75).',
  },
  {
    num: 7,
    title: 'Decision',
    layer: null,
    description:
      'Accept if bonafide AND similarity ≥ threshold, Reject otherwise.',
  },
  {
    num: 8,
    title: 'Voiceprint Update',
    layer: 'Layer 3',
    description:
      'On accept, if voice drift > 0.05: New = 0.8 × Old + 0.2 × Current.',
  },
  {
    num: 9,
    title: 'Logging & Response',
    layer: null,
    description:
      'Result, confidence scores, session ID returned. All logged to auth_log table.',
  },
];

/* ---- colour helpers for layer badges ---- */
const layerColors = {
  'Layer 1': { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
  'Layer 2': { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  'Layer 3': { bg: 'rgba(16,185,129,0.12)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
};

export default function Methodology() {
  return (
    <section id="methodology" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Proposed Methodology</h2>
          <p>Step-by-Step Authentication Flow</p>
        </div>

        <div style={timelineWrap}>
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={step.num} style={rowStyle}>
                {/* ---- left: dot + line ---- */}
                <div style={railStyle}>
                  <div style={dotStyle}>
                    <span style={dotNumStyle}>{step.num}</span>
                  </div>
                  {!isLast && <div style={lineStyle} />}
                </div>

                {/* ---- right: card ---- */}
                <div style={stepCardStyle}>
                  <div style={cardHeaderStyle}>
                    <h3 style={stepTitleStyle}>{step.title}</h3>
                    {step.layer && (
                      <span
                        style={{
                          ...badgeStyle,
                          backgroundColor: layerColors[step.layer].bg,
                          color: layerColors[step.layer].color,
                          border: `1px solid ${layerColors[step.layer].border}`,
                        }}
                      >
                        {step.layer}
                      </span>
                    )}
                  </div>
                  <p style={stepDescStyle}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- inline styles ---- */

const timelineWrap = {
  maxWidth: 720,
  margin: '0 auto',
  paddingTop: '1rem',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'stretch',
  position: 'relative',
};

const railStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexShrink: 0,
  width: 48,
};

const dotStyle = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: 'var(--color-primary, #6366f1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  boxShadow: '0 0 0 4px rgba(99,102,241,0.15)',
  zIndex: 1,
};

const dotNumStyle = {
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.85rem',
  lineHeight: 1,
};

const lineStyle = {
  width: 3,
  flex: 1,
  background: 'var(--color-primary, #6366f1)',
  opacity: 0.22,
  borderRadius: 2,
};

const stepCardStyle = {
  flex: 1,
  marginLeft: 16,
  marginBottom: 28,
  padding: '1rem 1.25rem',
  background: 'var(--color-card-bg, #fff)',
  borderRadius: 10,
  border: '1px solid var(--color-border, #e5e7eb)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
};

const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  flexWrap: 'wrap',
  marginBottom: '0.35rem',
};

const stepTitleStyle = {
  fontSize: '1.05rem',
  fontWeight: 700,
  color: 'var(--color-text)',
  margin: 0,
};

const badgeStyle = {
  fontSize: '0.7rem',
  fontWeight: 600,
  padding: '2px 8px',
  borderRadius: 999,
  letterSpacing: '0.02em',
  whiteSpace: 'nowrap',
};

const stepDescStyle = {
  fontSize: '0.93rem',
  lineHeight: 1.6,
  color: 'var(--color-text-light)',
  margin: 0,
};
