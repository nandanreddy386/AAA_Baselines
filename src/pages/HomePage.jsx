import React from 'react';
import { PROJECT, PIPELINE_LAYERS, NOVELTY_COMPARISON, KEY_RESULTS } from '../data/projectData';

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
            Voice Authentication that{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Turns Away Cloned Voices
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
            A host application asks the engine for a <strong>signed, single-use, 90-second challenge</strong>. The user speaks it into an <strong>AAA-owned capture component</strong>. A <strong>spoof gate</strong> and an <strong>exact-phrase gate</strong> run in parallel, then a <strong>speaker gate</strong> compares the voice with an <strong>encrypted voiceprint</strong>. One <strong>policy engine</strong> returns a single decision, and any failure leads to a safe refusal. The host never sees raw audio or scores.
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
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📞</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Cloned Voices Are Already Stealing Money
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Zero-shot cloning needs only seconds of reference audio. Our Phase I study collected Indian vishing cases: a teacher in Indore lost Rs. 97,500, a farmer in Roorkee Rs. 6 lakh, and two Hyderabad victims Rs. 1.97 lakh and Rs. 1.4 lakh, each after a call in a familiar voice.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔓</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                Passive, Static, Closed Systems
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Deployed voice biometrics listen passively, store one frozen voiceprint, cannot tell a live speaker from a synthetic one, can be replayed, and cannot be added to an existing application as middleware.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🧩</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                A Detector Alone Is Not Enough
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                A challenge protocol changes the flow, the spoof verdict depends on who owns the audio path, an evolving template needs controlled write access, and the verdict must be one decision. That is why the gates, policy engine and capture component ship together.
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
              "How can a plug-and-play engine detect AI-generated speech, enforce live human verification and adapt to natural voice variation without requiring changes to the host system?"
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
              The seven objectives set in the final report, each verified in the testing and traceability sections.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem' }}>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔌</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                1. Installable Middleware
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                A stable, versioned REST contract, so integration costs a host two calls rather than a redesign.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔐</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                2. Active Liveness
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                An unpredictable, HMAC-signed, 90-second, single-use challenge for every attempt.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                3. Fail-Closed Gates
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Spoof detection, exact-phrase verification and speaker verification chained as independent gates that all fail closed.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🔒</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                4. Biometric Data Stays in the Engine
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Audio goes straight from the device to the engine, voiceprints are encrypted at rest, hosts receive only a categorical decision.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📞</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                5. Anti-Vishing Analysis
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                A separate transcript risk engine (AAA-VR) for call centres that does not touch the authentication path.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏦</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                6. Two Independent Hosts
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Banking Shield (transactions) and CallGuard (call-centre risk) both run on the same middleware.
              </p>
            </div>
            <div className="saas-card" style={{ marginBottom: 0, padding: '2rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📏</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                7. Honest Reporting
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Every result is stated with its dataset, split, configuration and limits; no claim the evidence cannot carry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SYSTEM PIPEFLOW (PIPELINE FLOW) */}
      <section style={{ padding: '4.5rem 1.5rem', background: '#ffffff', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-eyebrow">Verification Pipeline</span>
            <h2 className="section-title">How One Authentication Runs</h2>
            <p className="section-subtitle">
              Validate first, then the spoof and phrase gates in parallel, then the speaker gate, then one decision. Every gate fails closed: a model error gives UNAVAILABLE, never APPROVE.
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
                See the Full Decision Matrix →
              </button>
              <button
                onClick={() => onNavigate('app')}
                className="btn btn-primary"
                style={{ fontSize: '0.88rem' }}
              >
                Try the Interactive Demo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RESULTS (final report, Section 8) */}
      <section style={{ padding: '4.5rem 1.5rem', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Testing & Evaluation</span>
            <h2 className="section-title">Results</h2>
            <p className="section-subtitle">
              Measured numbers from the final report. Each is stated with its scope, and the open items are listed rather than hidden.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {KEY_RESULTS.map((r) => (
              <div key={r.label} className="saas-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>
                  {r.value}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '0.25rem' }}>{r.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{r.note}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            {[
              {
                step: 'AAA-ASR',
                title: 'Fine-tuning rejected on evidence',
                desc: 'A decoder-only Whisper fine-tune on LibriSpeech lowered word and character error, but exact-phrase accuracy fell from 47.07 % to 44.73 % on 427 held-out utterances. The stock model stayed deployed.',
              },
              {
                step: 'AAA-AD',
                title: 'XLS-R detector, first run',
                desc: 'Best Dev-A EER 0.0685 % at epoch 1, then early stopping. This is an in-distribution figure on generators shared with training; the untouched LA evaluation set is still to run.',
              },
              {
                step: 'AAA-SV',
                title: 'ECAPA-TDNN fine-tune on a V100',
                desc: 'VoxCeleb1 dev (1,211 speakers), zero overlap with the 40 test speakers. Loss 1.58 → 0.93 in the first epoch. Bucketed EER and calibration are pending the frozen evaluation run.',
              },
              {
                step: 'Security',
                title: 'Attacks refused',
                desc: 'Token replay and tampering, cross-tenant access, voiceprint bit-flips, wildcard CORS, score probing and weak start-up secrets were all rejected; concurrent replay of one challenge gives exactly one success.',
              },
              {
                step: 'Research',
                title: 'Separation-aware detection study',
                desc: 'Training on separated speech gave a 4–6 point EER gain (p ≤ 0.001). The proposed Dynamic-Margin OC-Softmax reached 8.98 % EER, not significantly better than static OC-Softmax (p = 0.071).',
              },
              {
                step: 'Users',
                title: '34-participant study',
                desc: 'Would recommend 88.2 %, satisfied 82.4 %, felt secure 76.5 %. First-time users found it harder, which led to recording hints and plain-language rejection reasons.',
              },
            ].map((m) => (
              <div key={m.title} className="saas-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, background: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '6px' }}>
                    {m.step}
                  </span>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--color-text)' }}>{m.title}</h3>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="saas-card" style={{ marginBottom: 0, padding: '1.5rem', background: '#fffbeb', borderColor: '#fde68a' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>Known limitations</h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Latency was measured on CPU, so the 2.0 s p95 target depends on GPU inference. The deepfake result is in-distribution and says little about unseen generators. The vishing engine is rule-based. Rate limits and lockout are process-local, and master keys come from environment variables rather than a managed key service. The user study is a usability study, not a security evaluation.
            </p>
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
              Feature comparison carried over from the Phase I competitor analysis (report Table 1). "Partial" means the capability exists only in part or as a research artefact.
            </p>
          </div>

          <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <table className="light-table">
              <thead>
                <tr>
                  <th style={{ width: '32%' }}>Capability</th>
                  <th style={{ width: '17%' }}>HSBC / Nuance</th>
                  <th style={{ width: '17%' }}>Google / Azure</th>
                  <th style={{ width: '17%' }}>ASVspoof baselines</th>
                  <th style={{ width: '17%', color: 'var(--color-primary)' }}>AAA Engine</th>
                </tr>
              </thead>
              <tbody>
                {NOVELTY_COMPARISON.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>{row.feature}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{row.traditional}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{row.commercial}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{row.research}</td>
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
                Conducted by Team G090 under the guidance of <strong>{PROJECT.guide.name}</strong>, Associate Professor. A working, tested voice-authentication middleware demonstrated through two host applications. It is not production-certified: load testing and an independent penetration test are future work.
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
                  M Nandan Reddy • M L N Navadeep Kumar • P Aditya Sai • A V K B Surya • M Karthik Srijan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
