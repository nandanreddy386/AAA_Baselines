import React, { useState } from 'react';
import { DB_SCHEMA } from '../data/projectData';

export default function ArchitecturePage() {
  const [activeTable, setActiveTable] = useState('voiceprints');

  const ARCH_TIERS = [
    {
      tier: 'Tier 1: Client & Audio Resampling',
      badge: 'FRONTEND RUNTIME',
      components: [
        {
          name: 'React 19 + Vite Dashboard',
          desc: 'Lightweight, high-responsiveness SaaS portal providing registration, 3-sample enrollment, challenge acquisition with 90s countdown, and verification metrics.',
        },
        {
          name: 'Web Audio API Resampler (audioEncoder.js)',
          desc: 'Decodes native browser MediaRecorder stream (WebM/Opus) and resamples to strictly 16,000 Hz Mono 16-bit PCM RIFF WAV using an OfflineAudioContext before transmission.',
        },
        {
          name: 'Audio Spectrum Visualizer',
          desc: 'Provides real-time feedback during recording with animated frequency bars to guarantee active audio input.',
        },
      ],
    },
    {
      tier: 'Tier 2: Backend Orchestration & Middleware',
      badge: 'FASTAPI MIDDLEWARE',
      components: [
        {
          name: 'FastAPI Application (main.py)',
          desc: 'High-throughput async Python ASGI server running on port 8000. Coordinates L2 → ASR → L1 → L3 verification cascade and provides CORS handling.',
        },
        {
          name: 'SQLAlchemy ORM (db.py & models.py)',
          desc: 'Manages database sessions, connection pooling to PostgreSQL / Supabase, schema creation, and transaction rollbacks on errors.',
        },
        {
          name: 'Pydantic v2 Request/Response Models',
          desc: 'Strict schema validation for user payloads, challenge issuance, and verification responses with complete JSON serialization.',
        },
      ],
    },
    {
      tier: 'Tier 3: AI Deep Learning Inference',
      badge: 'PYTORCH & TRANSFORMERS',
      components: [
        {
          name: 'Layer 1: SpeechBrain ECAPA-TDNN',
          desc: 'speechbrain/spkrec-ecapa-voxceleb. Extracts 192-dimensional embeddings via attentive statistics pooling. Employs LocalStrategy.COPY to eliminate Windows symlink permission restrictions.',
        },
        {
          name: 'Layer 2: Hugging Face Wav2Vec2',
          desc: 'garystafford/wav2vec2-deepfake-voice-detector. AutoModelForAudioClassification mapping raw audio waveforms to bonafide vs. spoof probabilities via softmax logits.',
        },
        {
          name: 'Layer 3 ASR: OpenAI Whisper (base)',
          desc: 'Performs robust automatic speech recognition to transcribe spoken challenge phrases, followed by difflib text similarity normalization to prevent pre-recorded playback.',
        },
      ],
    },
    {
      tier: 'Tier 4: Relational Data Persistence',
      badge: 'POSTGRESQL (SUPABASE)',
      components: [
        {
          name: 'Biometric Voiceprint Store',
          desc: 'Stores 192-element float arrays representing speaker identity, along with sample counts and adaptation timestamps.',
        },
        {
          name: 'Forensic Audit Logs',
          desc: 'Captures full diagnostic records of every verification attempt, including blocked layer ID, spoof confidence, speaker similarity, and timestamp.',
        },
        {
          name: 'Cryptographic Challenge Sessions',
          desc: 'Maintains active challenge nonces, HMAC signatures, and single-use booleans with 90s TTL expiration.',
        },
      ],
    },
  ];

  const currentTableData = DB_SCHEMA.tables.find((t) => t.name === activeTable) || DB_SCHEMA.tables[0];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">Enterprise System Architecture</span>
        <h1 className="section-title">Verified Implementation Architecture</h1>
        <p className="section-subtitle">
          Engineered as a modular, low-latency biometric security middleware across four distinct operational tiers.
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
              Relational Database Schema (docs/DB_SCHEMA.sql)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              PostgreSQL schema storing identities, 192-dim acoustic vectors, challenge tokens, and forensic audit logs.
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

      {/* Docker Deployment Architecture */}
      <div className="saas-card" style={{ marginTop: '2rem', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          Containerized Deployment (docker-compose.yml)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          Production deployment architecture packaging the FastAPI application and PostgreSQL database with persistent volume mounts.
        </p>

        <div style={{ background: '#0f172a', borderRadius: 'var(--radius-lg)', padding: '1.5rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', overflowX: 'auto' }}>
          <pre>{`version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://aaa_user:secure_pass@db:5432/aaa_db
      - L3_HMAC_SECRET=aaa_engine_l3_adaptive_secret_key_2026
      - WHISPER_MODEL=base
    depends_on:
      - db
    volumes:
      - ./pretrained_models:/app/pretrained_models

  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=aaa_user
      - POSTGRES_PASSWORD=secure_pass
      - POSTGRES_DB=aaa_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`}</pre>
        </div>
      </div>
    </div>
  );
}
