import React, { useState } from 'react';
import { DB_SCHEMA } from '../data/projectData';

export default function ArchitecturePage() {
  const [activeTable, setActiveTable] = useState('voiceprints');

  const ARCH_TIERS = [
    {
      tier: 'Client tier',
      badge: 'HOSTS + CAPTURE',
      components: [
        {
          name: 'Banking Shield',
          desc: 'Mock retail-banking host: enrolment, transaction simulator, step-up handling and a security dashboard. Tiered policy: a balance view accepts a standard pass; a high-value transfer needs a clean pass, treats a marginal score as STEP_UP and any risk signal as REVIEW.',
        },
        {
          name: 'CallGuard',
          desc: 'Call-centre console: priority queue, live synthetic transcript, AAA-VR risk panel and tier-2 escalation, with four seeded scenarios. It never records or proxies audio.',
        },
        {
          name: 'AAA capture component',
          desc: 'Runs on the user’s device in an isolated frame, records locally, uploads straight to the engine with a capture grant, and posts only a safe status to the verified parent origin.',
        },
      ],
    },
    {
      tier: 'Service tier',
      badge: 'FASTAPI /v1',
      components: [
        {
          name: 'API gateway',
          desc: 'Tenant bearer token, request ID, per-endpoint rate limits, a 100-request-per-minute tenant window, lockout for 15 minutes after five failures, and a CORS allow list that rejects wildcards.',
        },
        {
          name: 'Challenge and capture-grant services',
          desc: 'HMAC-signed, 90-second, single-use challenges held in the database and consumed atomically; grants scoped to one tenant, user, challenge and upload.',
        },
        {
          name: 'Orchestrator and policy engine',
          desc: 'Validates input, runs AD and ASR in parallel, runs SV only if both pass, and lets one model-free policy module return the decision. Any error becomes UNAVAILABLE.',
        },
      ],
    },
    {
      tier: 'Model adapters (local, offline-capable)',
      badge: 'HEALTH • PREDICT • VERSION • TIMEOUT',
      components: [
        {
          name: 'AAA-AD spoof gate',
          desc: 'B0: pretrained Wav2Vec2 deepfake classifier. B1: XLS-R 300M fine-tuned on ASVspoof 2019 LA with attention-mask-aware pooling.',
        },
        {
          name: 'AAA-ASR phrase gate',
          desc: 'Stock Whisper loaded from a staged, hash-checked directory with no download, followed by a deterministic exact-phrase verifier with no learned parameters.',
        },
        {
          name: 'AAA-SV speaker gate and AAA-VR risk engine',
          desc: 'ECAPA-TDNN 192-dim embeddings (B0 pretrained, B1 fine-tuned). AAA-VR is a separate, rules-first transcript risk engine that never touches the authentication path.',
        },
      ],
    },
    {
      tier: 'Persistence tier',
      badge: 'POSTGRESQL (SQLITE FOR TESTS)',
      components: [
        {
          name: 'Encrypted voiceprint vault',
          desc: 'AES-256-GCM with a key derived per tenant, a fresh 96-bit nonce per record and tamper detection on decrypt. Raw audio is not retained.',
        },
        {
          name: 'Challenges',
          desc: 'Unique signed token, expiry and used flag, indexed so atomic consumption and clean-up stay cheap. Row-level security is enabled on all tables.',
        },
        {
          name: 'Audit log',
          desc: 'Which gate blocked a request and the outcome. Internal scores are kept for audit only; logs redact tokens, authorisation headers and biometric vectors.',
        },
      ],
    },
  ];

  const currentTableData = DB_SCHEMA.tables.find((t) => t.name === activeTable) || DB_SCHEMA.tables[0];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">System Architecture (report Section 4)</span>
        <h1 className="section-title">Three-Tier Middleware</h1>
        <p className="section-subtitle">
          The host backend starts a session and receives a decision. The audio takes a different route: capture component to engine, directly.
        </p>
      </div>

      {/* 4-Tier Interactive Architecture View */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
        {ARCH_TIERS.map((tier, idx) => (
          <div key={idx} className="saas-card" style={{ padding: '1.75rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text)' }}>
                {tier.tier}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '3px 10px', borderRadius: '12px' }}>
                {tier.badge}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {tier.components.map((comp, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text)', marginBottom: '0.35rem' }}>
                    {comp.name}
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                    {comp.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Relational Database Schema Explorer */}
      <div className="saas-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)' }}>
              Database Schema (report Figure 4)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Four entities. A user owns at most one voiceprint and many challenges and audit rows; row-level security is enabled on all four tables.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {DB_SCHEMA.tables.map((t) => (
              <button
                key={t.name}
                onClick={() => setActiveTable(t.name)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  border: activeTable === t.name ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  background: activeTable === t.name ? 'var(--color-primary-light)' : '#ffffff',
                  color: activeTable === t.name ? 'var(--color-primary)' : 'var(--color-text)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>
            Table: <code style={{ color: 'var(--color-primary)' }}>{currentTableData.name}</code>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {currentTableData.description}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="light-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Column Name</th>
                <th style={{ width: '22%' }}>Data Type</th>
                <th style={{ width: '26%' }}>Constraints / Index</th>
                <th style={{ width: '30%' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.fields.map((f, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text)' }}>
                    {f.name}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                    {f.type}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {f.constraint || '—'}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {f.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Installation (report Section 5.5, Listing 5) */}
      <div className="saas-card" style={{ marginTop: '2rem', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          Installation and Configuration
        </h3>
        <ol style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
          <li>Provision PostgreSQL and apply the tracked migrations.</li>
          <li>Set the secrets in the environment: database URL, a JWT secret of at least 32 characters, the challenge HMAC secret and the voiceprint master key. Start-up refuses missing or weak secrets.</li>
          <li>Set the allowed origins explicitly; wildcards are refused.</li>
          <li>Stage the three models on local disk and record their hashes in the model manifest.</li>
          <li>Start the service and wait for the readiness probe, which returns 503 until the database, models and configuration are healthy.</li>
          <li>Register each host as a tenant and issue its client credentials.</li>
        </ol>
        <div style={{ background: '#0f172a', borderRadius: 'var(--radius-lg)', padding: '1.5rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', overflowX: 'auto' }}>
          <pre>{`cp .env.example .env               # set secrets, thresholds, origins
uvicorn app.main:app --port 8000   # start the service tier
curl localhost:8000/v1/health      # liveness
curl localhost:8000/v1/ready       # models and database present?`}</pre>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
          The local, offline profile is the default and the only one used in acceptance testing; cloud and hybrid inference are explicit administrator choices, never silent fallbacks.
        </p>
      </div>
    </div>
  );
}
