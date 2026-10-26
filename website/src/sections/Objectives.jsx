import React from 'react';

const objectives = [
  {
    icon: '🎙️',
    title: 'Speaker Identity Verification',
    description:
      'Generate 192-dim speaker embeddings via ECAPA-TDNN and compare with stored voiceprints using cosine similarity (threshold: 0.75).',
  },
  {
    icon: '🛡️',
    title: 'Deepfake & Spoofing Detection',
    description:
      'Classify incoming audio as bonafide or spoof using Wav2Vec2BERT fine-tuned on ASVspoof 2019 LA and 2021 DF datasets.',
  },
  {
    icon: '🔐',
    title: 'Challenge-Response Authentication',
    description:
      'Generate randomised challenge phrases with time-bounded JWT tokens (90-second expiry) for active liveness verification.',
  },
  {
    icon: '🔄',
    title: 'Adaptive Voiceprint Updates',
    description:
      'Update stored voiceprints after successful authentication using weighted formula: New = 0.8 × Old + 0.2 × Current.',
  },
  {
    icon: '🔌',
    title: 'Plug-and-Play API Middleware',
    description:
      'Provide reusable FastAPI REST endpoints (GET /auth/challenge, POST /auth/verify, POST /auth/enroll) requiring zero modification to existing applications.',
  },
  {
    icon: '📋',
    title: 'Security Logging & Traceability',
    description:
      'Log every authentication attempt with session IDs, pipeline scores, and blocking layer information for audit compliance.',
  },
];

export default function Objectives() {
  return (
    <section id="objectives" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Project Objectives</h2>
        </div>

        <div className="grid-3">
          {objectives.map((obj, i) => (
            <div className="card" key={i} style={cardStyle}>
              <span style={iconStyle}>{obj.icon}</span>
              <h3 style={titleStyle}>{obj.title}</h3>
              <p style={descStyle}>{obj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- inline styles ---- */

const iconStyle = {
  fontSize: '2.2rem',
  display: 'block',
  marginBottom: '0.75rem',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const titleStyle = {
  fontSize: '1.1rem',
  fontWeight: 700,
  marginBottom: '0.5rem',
  color: 'var(--color-text)',
};

const descStyle = {
  fontSize: '0.95rem',
  lineHeight: 1.65,
  color: 'var(--color-text-light)',
  margin: 0,
};
