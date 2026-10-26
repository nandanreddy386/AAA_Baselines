import React, { useState } from 'react';

const layerColors = {
  layer1: { bg: '#1e3a5f', border: '#2980b9', label: 'Layer 1 — Speaker Verification' },
  layer2: { bg: '#5a3e00', border: '#e67e22', label: 'Layer 2 — Anti-Spoofing Gate' },
  layer3: { bg: '#1a4a3a', border: '#1abc9c', label: 'Layer 3 — Adaptive Update' },
  middleware: { bg: 'rgba(255,255,255,0.05)', border: 'var(--color-border)' },
  client: { bg: 'rgba(139,92,246,0.15)', border: '#8b5cf6' },
  database: { bg: 'rgba(236,72,153,0.15)', border: '#ec4899' },
  reject: { bg: 'rgba(239,68,68,0.2)', border: '#ef4444' },
};

const componentCards = [
  { title: 'Challenge Generator', desc: 'Generates randomised phrases, signs as JWT with 90s expiry.', icon: '🎲' },
  { title: 'Token Validator', desc: 'Verifies HMAC signature, expiry, and single-use status.', icon: '🔑' },
  { title: 'Audio Preprocessor', desc: 'Decodes audio, 16 kHz resampling, silence trim, FBANK extraction.', icon: '🎛️' },
  { title: 'Anti-Spoofing Gate (L2)', desc: 'Wav2Vec2BERT inference — classifies audio as real or AI-generated.', icon: '🛡️' },
  { title: 'Speaker Verifier (L1)', desc: 'ECAPA-TDNN embedding generation + cosine comparison.', icon: '🔊' },
  { title: 'Decision Engine', desc: 'Applies thresholds, determines final ACCEPT / REJECT.', icon: '⚖️' },
  { title: 'Voiceprint Updater (L3)', desc: 'Computes weighted blend: 0.8 × Old + 0.2 × New.', icon: '🔄' },
  { title: 'Database Layer', desc: 'PostgreSQL schema: voiceprints, session log, auth log tables.', icon: '🗄️' },
];

/* ── tiny arrow helper ─────────────────────────────────────── */
const Arrow = ({ label, style: extra = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, ...extra }}>
    <div style={{ width: 2, height: 18, background: 'var(--color-text-muted)' }} />
    {label && (
      <span style={{
        fontSize: '0.65rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)',
        background: 'var(--color-bg)', padding: '1px 8px', borderRadius: 4, whiteSpace: 'nowrap',
      }}>{label}</span>
    )}
    <div style={{
      width: 0, height: 0,
      borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
      borderTop: '8px solid var(--color-text-muted)',
    }} />
  </div>
);

const SideArrow = ({ label, direction = 'right' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    {direction === 'right' && <div style={{ width: 20, height: 2, background: 'var(--color-text-muted)' }} />}
    {label && (
      <span style={{
        fontSize: '0.6rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)',
        whiteSpace: 'nowrap',
      }}>{label}</span>
    )}
    <div style={{
      width: 0, height: 0,
      ...(direction === 'right'
        ? { borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '7px solid var(--color-text-muted)' }
        : { borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRight: '7px solid var(--color-text-muted)' }),
    }} />
  </div>
);

/* ── Diagram box primitive ─────────────────────────────────── */
const Box = ({ children, bg, border, style: extra = {}, small = false }) => (
  <div style={{
    background: bg, border: `1.5px solid ${border}`, borderRadius: 10,
    padding: small ? '6px 14px' : '14px 22px',
    textAlign: 'center', fontSize: small ? '0.72rem' : '0.82rem',
    fontFamily: 'var(--font-mono)', color: 'var(--color-text)',
    lineHeight: 1.45, ...extra,
  }}>
    {children}
  </div>
);

const RejectBadge = () => (
  <span style={{
    display: 'inline-block', background: layerColors.reject.bg, border: `1px solid ${layerColors.reject.border}`,
    color: '#ef4444', borderRadius: 6, padding: '2px 10px', fontSize: '0.68rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
  }}>REJECT</span>
);

/* ================================================================ */
/*  MAIN COMPONENT                                                   */
/* ================================================================ */
export default function Architecture() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="architecture" className="section section-alt">
      <div className="container">
        {/* ── Header ────────────────────────────── */}
        <div className="section-header">
          <h2>System Architecture</h2>
          <p>Three-Layer Security Pipeline</p>
        </div>

        {/* ── Diagram ───────────────────────────── */}
        <div style={{
          maxWidth: 820, margin: '0 auto 3rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
        }}>

          {/* CLIENT */}
          <Box bg={layerColors.client.bg} border={layerColors.client.border}
            style={{ width: '100%', maxWidth: 520 }}>
            <div style={{ fontWeight: 700, marginBottom: 2, fontSize: '0.85rem' }}>CLIENT APPLICATION</div>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>Banking App&nbsp;/&nbsp;Security Portal</span>
          </Box>

          <Arrow label="GET /auth/challenge  |  POST /auth/verify" />

          {/* MIDDLEWARE OUTER */}
          <div style={{
            width: '100%', border: `1.5px solid var(--color-border)`, borderRadius: 14,
            background: 'rgba(255,255,255,0.03)', padding: '18px 16px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
          }}>
            <div style={{
              fontWeight: 700, fontSize: '0.82rem', marginBottom: 12,
              fontFamily: 'var(--font-mono)', color: 'var(--color-text)',
              textAlign: 'center',
            }}>
              AAA ENGINE MIDDLEWARE&nbsp;
              <span style={{ fontWeight: 400, opacity: 0.55, fontSize: '0.72rem' }}>(FastAPI / Python)</span>
            </div>

            {/* Challenge → Token row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, flexWrap: 'wrap', width: '100%', marginBottom: 4,
            }}>
              <Box bg="rgba(255,255,255,0.06)" border="var(--color-border)" small>Challenge Generator</Box>
              <SideArrow direction="right" />
              <Box bg="rgba(255,255,255,0.06)" border="var(--color-border)" small>Token Validator</Box>
            </div>

            <Arrow />

            {/* LAYER 2 */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, flexWrap: 'wrap', width: '100%',
            }}>
              <Box bg={layerColors.layer2.bg} border={layerColors.layer2.border}
                style={{ flex: '1 1 260px', maxWidth: 420 }}>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#f59e0b', marginBottom: 2 }}>LAYER 2</div>
                Anti-Spoofing Gate&nbsp;<span style={{ opacity: 0.6, fontSize: '0.7rem' }}>(Wav2Vec2BERT)</span>
              </Box>
              <SideArrow label="Spoof?" direction="right" />
              <RejectBadge />
            </div>

            <Arrow />

            {/* LAYER 1 */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, flexWrap: 'wrap', width: '100%',
            }}>
              <Box bg={layerColors.layer1.bg} border={layerColors.layer1.border}
                style={{ flex: '1 1 260px', maxWidth: 420 }}>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#3b82f6', marginBottom: 2 }}>LAYER 1</div>
                Speaker Verification&nbsp;<span style={{ opacity: 0.6, fontSize: '0.7rem' }}>(ECAPA-TDNN)</span>
              </Box>
              <SideArrow label="No Match?" direction="right" />
              <RejectBadge />
            </div>

            <Arrow />

            {/* LAYER 3 */}
            <Box bg={layerColors.layer3.bg} border={layerColors.layer3.border}
              style={{ width: '100%', maxWidth: 420 }}>
              <div style={{ fontWeight: 700, fontSize: '0.75rem', color: '#34d399', marginBottom: 2 }}>LAYER 3</div>
              Adaptive Voiceprint Update&nbsp;<span style={{ opacity: 0.6, fontSize: '0.7rem' }}>(Weighted Blend)</span>
            </Box>
          </div>

          <Arrow />

          {/* DATABASE */}
          <Box bg={layerColors.database.bg} border={layerColors.database.border}
            style={{ width: '100%', maxWidth: 520 }}>
            <div style={{ fontWeight: 700, marginBottom: 2, fontSize: '0.85rem' }}>PostgreSQL DATABASE</div>
            <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>Embeddings&nbsp;/&nbsp;Logs&nbsp;/&nbsp;Session Tokens</span>
          </Box>
        </div>

        {/* ── Legend ─────────────────────────────── */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
          marginBottom: '2.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)',
        }}>
          {[layerColors.layer1, layerColors.layer2, layerColors.layer3].map((l) => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 14, height: 14, borderRadius: 4,
                background: l.bg, border: `1.5px solid ${l.border}`, display: 'inline-block',
              }} />
              {l.label}
            </div>
          ))}
        </div>

        {/* ── Component cards ───────────────────── */}
        <h3 style={{ textAlign: 'center', marginBottom: '1.2rem', fontSize: '1.15rem' }}>
          Component Breakdown
        </h3>

        <div className="grid-4" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}>
          {componentCards.map((c, i) => (
            <div
              key={i}
              className="card"
              onMouseEnter={() => setActiveCard(i)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                cursor: 'default',
                transition: 'transform 0.2s, box-shadow 0.2s',
                transform: activeCard === i ? 'translateY(-4px)' : 'none',
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{c.icon}</div>
              <h4 style={{ fontSize: '0.88rem', marginBottom: 6 }}>{c.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
