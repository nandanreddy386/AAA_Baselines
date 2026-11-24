import React, { useState } from 'react';

export default function WorkflowPage({ onNavigate }) {
  const [selectedStage, setSelectedStage] = useState(0);

  const STAGES_DETAIL = [
    {
      index: 0,
      badge: 'CHALLENGE & GRANT',
      title: 'Signed, Single-Use Challenge and Capture Grant',
      layerName: 'Challenge service + capture grant service (backend/app/layer3_adaptive.py, api/v1/capture.py)',
      threshold: '90 s lifetime • single use',
      summary:
        'The host backend asks for a challenge. The engine draws a fresh phrase, signs it, stores it with a 90-second expiry, and issues a capture grant bound to the user and that challenge.',
      steps: [
        'Host calls POST /v1/challenges with a pseudonymous user reference; the engine maps it to a tenant-scoped identity.',
        'A phrase is drawn at random from 108 common words in 8 templates (for example "The quiet fox runs").',
        'The payload (user, expiry, phrase, nonce) is signed with HMAC-SHA256 using a secret read only from the environment; start-up refuses a missing or weak secret.',
        'The challenge is stored in the database with indexes on token, expiry and used.',
        'POST /v1/capture/grants issues a short-lived, single-use grant so the device can upload audio without the host in the middle.',
      ],
      math: 'token = nonce . expiry . HMAC-SHA256(secret, user : expiry : phrase : nonce)',
      rejectionScenario: {
        condition: 'A token whose signature does not verify, or a grant that is expired, used or bound to someone else.',
        result: 'DENY',
        reason: 'CHALLENGE_INVALID',
      },
    },
    {
      index: 1,
      badge: 'CAPTURE',
      title: 'AAA-Owned Capture Component',
      layerName: 'backend/app/static/capture/index.html (isolated iframe)',
      threshold: 'Host never receives raw audio',
      summary:
        'The host page embeds the AAA capture component in an isolated frame. Audio travels only between the user’s device and the engine.',
      steps: [
        'The component shows the phrase and the 90-second timer and asks for microphone permission.',
        'Audio is recorded locally and converted in the browser to 16 kHz mono 16-bit WAV.',
        'It uploads directly to POST /v1/verify; the host is not in the audio path.',
        'When done, it posts only a safe status (decision, risk level, public reason) to the parent page, and the parent origin is checked on every message.',
      ],
      math: 'device → engine (audio)    engine → host (decision only)',
      rejectionScenario: {
        condition: 'Message from an unexpected parent origin, or microphone permission refused.',
        result: 'No upload',
        reason: 'Capture aborted safely',
      },
    },
    {
      index: 2,
      badge: 'VALIDATE & CONSUME',
      title: 'Input Validation and Atomic Token Consumption',
      layerName: 'Orchestrator (backend/app/api/v1/verify.py)',
      threshold: 'WAV 16 kHz mono • 2–10 s • ≤ 5 MB',
      summary:
        'A request is validated before any model runs, so malformed or oversized input is stopped cheaply. The challenge is consumed by a single conditional database update.',
      steps: [
        'Check the container, sample rate, duration and size.',
        'Check the challenge state: it must exist, belong to this user, be unused and be unexpired.',
        'Consume it with one conditional UPDATE: it succeeds for exactly one caller, so two concurrent replays cannot both pass.',
        'Only then are the models allowed to run.',
      ],
      math: 'UPDATE challenges SET used = TRUE WHERE token = :t AND used = FALSE AND expires_at > NOW()   -- 1 row: accept, 0 rows: refuse',
      rejectionScenario: {
        condition: 'An attacker re-submits a token that was already used, or submits after 90 seconds.',
        result: 'DENY',
        reason: 'REPLAY_DETECTED / CHALLENGE_EXPIRED',
      },
    },
    {
      index: 3,
      badge: 'GATE 1 ∥ GATE 2',
      title: 'Spoof Gate (AAA-AD) and Exact-Phrase Gate (AAA-ASR), in Parallel',
      layerName: 'Model adapters (backend/app/adapters/ad.py, asr.py; app/aaa_asr/phrase_matcher.py)',
      threshold: 'Spoof → DENY • any word differs → DENY',
      summary:
        'The two gates are independent and each can reject on its own, so they run together in a thread pool. The critical path is the slower of the two, not their sum.',
      steps: [
        'AAA-AD labels the audio bona fide or spoof (Wav2Vec2 baseline B0; fine-tuned XLS-R 300M B1). Thresholds come from environment settings, never hard-coded.',
        'AAA-ASR transcribes locally with Whisper; no cloud call is made.',
        'The phrase verifier normalises both texts: case, punctuation, whitespace, a short list of fillers (um, uh, er…), contractions, and digits ↔ words for 0–99.',
        'It then requires strict equality. No edit distance, phonetic or semantic matching; a confident wrong transcript is still a mismatch, and confidence can only tighten the outcome.',
        'The expected phrase is always read from the server-side challenge record, never from the browser.',
      ],
      math: 'normalise(heard) == normalise(expected)   (the Phase I similarity ratio ≥ 0.6 was removed)',
      rejectionScenario: {
        condition: 'A cloned voice, or a genuine recording that says an older phrase or a near-miss ("seven red cat" for "seven red cats").',
        result: 'DENY',
        reason: 'AUTH_FAILED (spoof) / PHRASE_MISMATCH',
      },
    },
    {
      index: 4,
      badge: 'GATE 3',
      title: 'Speaker Gate (AAA-SV)',
      layerName: 'backend/app/layer1_speaker.py, adapters/sv.py',
      threshold: 'Low → DENY • marginal → STEP_UP',
      summary:
        'Speaker verification is the most sensitive step because it touches the stored template, so it runs only on audio that has already proven live and on script.',
      steps: [
        'Extract a 192-dim ECAPA-TDNN embedding from the audio.',
        'Decrypt the stored voiceprint (AES-256-GCM, per-tenant key); a flipped bit in the nonce or ciphertext fails decryption.',
        'Compute cosine similarity against the voiceprint.',
        'Scores below threshold are denied; marginal scores route to STEP_UP rather than APPROVE.',
      ],
      math: 'score = (e · v) / (‖e‖ ‖v‖)',
      rejectionScenario: {
        condition: 'An impostor speaks the correct phrase in their own voice.',
        result: 'DENY',
        reason: 'AUTH_FAILED',
      },
    },
    {
      index: 5,
      badge: 'DECISION',
      title: 'Policy Engine, Audit and Guarded Voiceprint Update',
      layerName: 'backend/app/core/policy_engine.py',
      threshold: 'One of 5 public decisions',
      summary:
        'One module with no model dependencies turns the gate results into a single decision and a public reason. Every decision rule is auditable in one file.',
      steps: [
        'Apply the decision matrix: APPROVE, DENY, STEP_UP, REVIEW or UNAVAILABLE.',
        'Any model error, timeout or unready dependency becomes UNAVAILABLE. The decision never defaults to approval.',
        'Write an audit row with the request ID, the gate that blocked and the outcome; logs redact tokens and biometric vectors.',
        'Only on APPROVE, and only above the score and quality gates, update the template with an exponential moving average.',
        'Return the request ID, decision and public reason, with no scores, embeddings or stack traces.',
      ],
      math: 'v_new = 0.8 · v_old + 0.2 · e   (only after APPROVE, score > 0.85, quality > 0.70)',
      rejectionScenario: {
        condition: 'A failed or borderline attempt tries to shift the template towards an attacker.',
        result: 'No update',
        reason: 'Template unchanged',
      },
    },
  ];

  const current = STAGES_DETAIL[selectedStage];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">Verification Pipeline (report Section 4)</span>
        <h1 className="section-title">One Authentication, Step by Step</h1>
        <p className="section-subtitle">
          Challenge and grant, AAA-owned capture, validation and atomic consumption, the spoof and phrase gates in parallel, the speaker gate, and one policy decision. Every gate fails closed.
        </p>
      </div>

      {/* Pipeline Navigation Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '8px',
          marginBottom: '2rem',
        }}
      >
        {STAGES_DETAIL.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedStage(idx)}
            style={{
              padding: '0.85rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              border: selectedStage === idx ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              background: selectedStage === idx ? 'var(--color-primary-light)' : '#ffffff',
              color: selectedStage === idx ? 'var(--color-primary)' : 'var(--color-text)',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '0.82rem',
              transition: 'all 0.2s',
              boxShadow: selectedStage === idx ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <div style={{ fontSize: '0.7rem', color: selectedStage === idx ? 'var(--color-primary)' : 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Stage {idx}
            </div>
            <div style={{ marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.badge}
            </div>
          </button>
        ))}
      </div>

      {/* Active Stage Inspector Card */}
      <div className="saas-card" style={{ padding: '2.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--color-primary)', color: '#ffffff', padding: '3px 10px', borderRadius: '12px' }}>
              STAGE {current.index} • {current.badge}
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '8px' }}>
              {current.title}
            </h2>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Source: <code>{current.layerName}</code>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              Security Criterion
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-primary)' }}>
              {current.threshold}
            </div>
          </div>
        </div>

        {/* Summary */}
        <p style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          {current.summary}
        </p>

        {/* Operational Steps */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
            Execution Sequence
          </h4>
          <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {current.steps.map((st, i) => (
              <li key={i} style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                {st}
              </li>
            ))}
          </ol>
        </div>

        {/* Mathematical Equation Box */}
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Rule
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: 700, overflowX: 'auto' }}>
            {current.math}
          </div>
        </div>

        {/* Failure Rejection Scenario */}
        <div
          style={{
            background: 'var(--color-danger-light)',
            border: '1px solid var(--color-danger)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-danger)', textTransform: 'uppercase' }}>
              What Is Refused Here
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'var(--color-danger)', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              OUTCOME: {current.rejectionScenario.result}
            </span>
          </div>
          <div style={{ fontSize: '0.88rem', color: '#991b1b', lineHeight: 1.5 }}>
            <strong>Trigger:</strong> {current.rejectionScenario.condition}
          </div>
          <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#7f1d1d' }}>
            Decision: {current.rejectionScenario.result} • Public reason: {current.rejectionScenario.reason}
          </div>
        </div>
      </div>

      {/* Decision Tree Diagram */}
      <div className="saas-card" style={{ marginTop: '2rem', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          Policy Decision Matrix (report Table 3)
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          The policy engine is the only place that decides. Hosts learn two small, frozen vocabularies: five decisions and the public reason codes.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table className="light-table">
            <thead>
              <tr>
                <th>AD (spoof)</th>
                <th>ASR (phrase)</th>
                <th>SV (speaker)</th>
                <th>Public decision</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Pass', 'Pass', 'Pass', 'APPROVE', 'voiceprint update considered'],
                ['Fail', '–', '–', 'DENY', 'spoof'],
                ['Pass', 'Fail', '–', 'DENY', 'phrase mismatch'],
                ['Pass', 'Pass', 'Fail', 'DENY', 'speaker mismatch'],
                ['Pass', 'Pass', 'Marginal', 'STEP_UP', 'try again or stronger check'],
                ['Borderline', 'Pass', '–', 'STEP_UP', ''],
                ['High vishing-risk context', '–', '–', 'REVIEW', 'human review required'],
                ['Error / timeout / not ready', '–', '–', 'UNAVAILABLE', 'fail closed'],
              ].map(([ad, asr, sv, d, note], i) => (
                <tr key={i}>
                  <td>{ad}</td>
                  <td>{asr}</td>
                  <td>{sv}</td>
                  <td>
                    <span className={`badge-tag-light ${d}`}>{d}</span>
                    {note && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '8px' }}>{note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f172a', borderRadius: 'var(--radius-lg)', padding: '1.5rem', color: '#f8fafc', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.8, overflowX: 'auto' }}>
          <div>POST /v1/verify  [user_id, token, audio.wav]</div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>Validate</span>: WAV 16 kHz mono, 2–10 s, ≤ 5 MB → else HTTP 400 / 413</div>
          <div>├── <span style={{ color: '#38bdf8' }}>Consume challenge</span> (one atomic UPDATE)</div>
          <div>│   └── used / expired / not this user ──► <span style={{ color: '#ef4444' }}>DENY</span> (no model runs)</div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>AAA-AD</span>  ∥  <span style={{ color: '#38bdf8' }}>AAA-ASR</span>   (run in parallel)</div>
          <div>│   ├── model error ──► <span style={{ color: '#94a3b8' }}>UNAVAILABLE</span></div>
          <div>│   ├── spoof ──► <span style={{ color: '#ef4444' }}>DENY</span>    borderline ──► <span style={{ color: '#f59e0b' }}>STEP_UP</span></div>
          <div>│   └── phrase not exact ──► <span style={{ color: '#ef4444' }}>DENY</span></div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>AAA-SV</span>  (only if both passed)</div>
          <div>│   ├── low ──► <span style={{ color: '#ef4444' }}>DENY</span>    marginal ──► <span style={{ color: '#f59e0b' }}>STEP_UP</span></div>
          <div>│</div>
          <div>└── <span style={{ color: '#10b981' }}>Policy engine</span> ──► APPROVE | DENY | STEP_UP | REVIEW | UNAVAILABLE</div>
          <div>    ├── audit row: request id, gate, outcome (no biometric data)</div>
          <div>    ├── APPROVE only: guarded EMA update, voiceprint stays encrypted</div>
          <div>    └── response: request_id, decision, reason_public  <span style={{ color: '#94a3b8' }}>(no scores)</span></div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button onClick={() => onNavigate('app')} className="btn btn-primary">
            Try the Interactive Demo →
          </button>
        </div>
      </div>
    </div>
  );
}
