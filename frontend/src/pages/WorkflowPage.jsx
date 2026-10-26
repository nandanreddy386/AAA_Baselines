import React, { useState } from 'react';

export default function WorkflowPage({ onNavigate }) {
  const [selectedStage, setSelectedStage] = useState(0);

  const STAGES_DETAIL = [
    {
      index: 0,
      badge: 'PRE-AUTHENTICATION',
      title: 'Dynamic Challenge Generation & HMAC-SHA256 Token Issuance',
      layerName: 'Cryptographic Layer (backend/app/layer3_adaptive.py)',
      modelUsed: 'HMAC-SHA256 Secret Key Tokenizer',
      endpoint: 'GET /auth/challenge?user_id={uuid}',
      threshold: 'Strict 90-Second TTL • Single-Use Consumption',
      summary:
        'To defeat static pre-recorded physical replay attacks, every verification session requires a randomized acoustic challenge and a tamper-proof cryptographic token.',
      steps: [
        'Backend generates a dynamic randomized challenge phrase (60% randomized word templates e.g. "Say: 7 Crimson Falcon 4", 40% phonetically balanced sentences).',
        'Generates a cryptographically secure 16-byte random hexadecimal nonce.',
        'Calculates token expiration timestamp: now + 90 seconds (strictly enforced TTL).',
        'Signs the raw payload "{user_id}:{expires_timestamp}:{phrase}:{nonce}" using HMAC-SHA256 with a server-side secret key.',
        'Issues token string formatted as "{nonce}.{expires_timestamp}.{signature}". Stored in memory and challenges database table.',
      ],
      math: 'Token = Nonce \\, \\Vert \\, T_{exp} \\, \\Vert \\, \\text{HMAC-SHA256}_{K}(user\\_id \\, \\Vert \\, T_{exp} \\, \\Vert \\, phrase \\, \\Vert \\, Nonce)',
      rejectionScenario: {
        condition: 'Attacker attempts to use expired challenge or re-submit a previously captured token.',
        layerBlocked: 3,
        result: 'REJECT',
        reason: 'Invalid or expired token',
      },
    },
    {
      index: 1,
      badge: 'AUDIO PREPROCESSING',
      title: 'In-Browser 16kHz WAV Resampling & Silence Trimming',
      layerName: 'Client Audio Pipeline (frontend/src/utils/audioEncoder.js)',
      modelUsed: 'Web Audio API • OfflineAudioContext',
      endpoint: 'Client-side WebM/Opus → 16kHz PCM WAV',
      threshold: '16,000 Hz • 1 Channel (Mono) • 16-bit PCM RIFF',
      summary:
        'Neural models require strictly standardized 16kHz mono audio. Browsers record in compressed WebM/Opus at 44.1kHz or 48kHz. AAA Engine handles deterministic resampling in-browser before upload.',
      steps: [
        'Browser MediaRecorder captures microphone audio stream as audio/webm blobs.',
        'AudioContext decodes compressed WebM array buffer into raw PCM audio buffers at device native sample rate.',
        'OfflineAudioContext resamples the buffer to exactly 16,000 samples per second.',
        'Converts 32-bit floating point audio samples into 16-bit signed PCM integers with clipping protection.',
        'Appends canonical 44-byte RIFF/WAVE header and uploads as multipart/form-data to POST /auth/verify.',
      ],
      math: 'x_{16k}[n] = \\text{Resample}_{f_s \\to 16000}\\Big( \\frac{1}{C}\\sum_{c=1}^C x_{native}[n, c] \\Big)',
      rejectionScenario: {
        condition: 'Corrupted audio stream or unsupported codec.',
        layerBlocked: 'Client Error',
        result: 'REJECT',
        reason: 'Audio preprocessing failure: fallback to librosa on backend',
      },
    },
    {
      index: 2,
      badge: 'FIRST DEFENSIVE GATE',
      title: 'Layer 2: Deepfake & Audio Anti-Spoofing Detection',
      layerName: 'Anti-Spoofing Gate (backend/app/layer2_deepfake.py)',
      modelUsed: 'garystafford/wav2vec2-deepfake-voice-detector (Hugging Face)',
      endpoint: 'POST /auth/verify (Internal Gate 1)',
      threshold: 'L2 Spoof Confidence < 0.50 (Rejects if spoof prob ≥ 0.50)',
      summary:
        'Layer 2 executes FIRST before speaker verification. This architectural choice prevents consuming expensive ECAPA-TDNN computation on malicious synthetic audio.',
      steps: [
        'Loads audio bytes into 16kHz mono floating-point numpy array.',
        'Passes waveform through AutoFeatureExtractor and Wav2Vec2 audio classification architecture.',
        'Extracts model logits corresponding to binary labels: {0: "real", 1: "fake"}.',
        'Applies softmax function to obtain normalized probabilities real_prob and fake_prob.',
        'If fake_prob >= 0.50, immediately rejects request and writes to auth_logs with layer_blocked=2.',
      ],
      math: 'P(\\text{spoof} \\mid x) = \\frac{e^{z_{\\text{fake}}}}{e^{z_{\\text{real}}} + e^{z_{\\text{fake}}}}, \\quad \\text{Reject if } P(\\text{spoof}) > 0.50',
      rejectionScenario: {
        condition: 'Attacker generates TTS voice clone (ElevenLabs, Bark, Tortoise) or replays recording through low-quality transducer.',
        layerBlocked: 2,
        result: 'REJECT',
        reason: 'Deepfake/spoof detected (Layer 2 blocked)',
      },
    },
    {
      index: 3,
      badge: 'LIVENESS VERIFICATION',
      title: 'Layer 3 ASR: Speech-to-Text Challenge Phrase Verification',
      layerName: 'Acoustic Liveness Layer (backend/app/layer3_asr.py)',
      modelUsed: 'OpenAI Whisper (base model) + difflib SequenceMatcher',
      endpoint: 'POST /auth/verify (Internal Gate 2)',
      threshold: 'String Similarity Ratio ≥ 0.60',
      summary:
        'Even if an attacker presents bonafide human audio, this layer verifies whether they actually spoke the currently active challenge phrase.',
      steps: [
        'Transcribes spoken audio bytes locally using OpenAI Whisper base model.',
        'Normalizes challenge phrase and transcribed text: converts to lowercase, strips punctuation, and converts number words to digits ("seven" → "7").',
        'Strips "Say:" command prefix from the expected prompt.',
        'Computes string similarity ratio using difflib.SequenceMatcher.ratio() between expected and spoken phrases.',
        'If similarity ratio < 0.60, blocks authentication with layer_blocked=4 (ASR phrase mismatch).',
      ],
      math: '\\text{Similarity}(T_{exp}, T_{spoken}) = \\frac{2 \\cdot M}{|T_{exp}| + |T_{spoken}|} \\ge 0.60',
      rejectionScenario: {
        condition: 'Attacker plays a genuine recording of the victim speaking an older challenge phrase or arbitrary words.',
        layerBlocked: 4,
        result: 'REJECT',
        reason: "Challenge phrase mismatch: expected '7 crimson falcon 4' but heard 'my voice is my password'",
      },
    },
    {
      index: 4,
      badge: 'BIOMETRIC IDENTITY',
      title: 'Layer 1: ECAPA-TDNN Speaker Verification',
      layerName: 'Identity Verification Layer (backend/app/layer1_speaker.py)',
      modelUsed: 'speechbrain/spkrec-ecapa-voxceleb (192-dim)',
      endpoint: 'POST /auth/verify (Internal Gate 3)',
      threshold: 'Cosine Similarity Score ≥ 0.50 (Normalized [0, 1])',
      summary:
        'Once audio is proven to be bonafide human speech and contains the correct challenge phrase, Layer 1 verifies the biometric identity against the stored enrolled voiceprint.',
      steps: [
        'Passes 16kHz waveform into ECAPA-TDNN encoder with attentive statistics pooling.',
        'Extracts a 192-dimensional speaker embedding vector representing vocal tract geometry.',
        'Retrieves enrolled voiceprint vector from PostgreSQL voiceprints table for claimed user_id.',
        'Computes cosine similarity between new embedding and stored voiceprint.',
        'Clamps similarity score to [0, 1] via max(0.0, cos_sim). If score < 0.50, rejects with layer_blocked=1.',
      ],
      math: 'S_C(u, v) = \\max\\left(0, \\frac{u \\cdot v}{\\|u\\| \\|v\\|}\\right) \\ge 0.50',
      rejectionScenario: {
        condition: 'Impostor speaks the correct challenge phrase, but their acoustic voiceprint does not match the enrolled profile.',
        layerBlocked: 1,
        result: 'REJECT',
        reason: 'Speaker verification failed (similarity below 0.50)',
      },
    },
    {
      index: 5,
      badge: 'CONTINUOUS ADAPTATION',
      title: 'Token Invalidation & Layer 3 EMA Voiceprint Adaptation',
      layerName: 'Adaptive Security Protocol (backend/app/layer3_adaptive.py)',
      modelUsed: 'Exponential Moving Average (α = 0.20)',
      endpoint: 'POST /auth/verify (Finalization)',
      threshold: 'Executed Strictly on 100% Verification ACCEPT',
      summary:
        'To prevent biometric aging and voice drift from degrading system usability, authentic sessions smoothly evolve the stored voiceprint over time.',
      steps: [
        'Validates token HMAC signature and consumes token (sets used = true).',
        'Retrieves current enrolled embedding from voiceprints table.',
        'Applies element-wise Exponential Moving Average: New = 0.8 × Old + 0.2 × Current.',
        'Updates embedding in PostgreSQL, increments sample_count by 1, and updates updated_at timestamp.',
        'Writes full forensic metrics to auth_logs with result="ACCEPT" and returns HTTP 200 payload.',
      ],
      math: '\\mathbf{e}_{t} = (1 - \\alpha) \\mathbf{e}_{t-1} + \\alpha \\mathbf{e}_{\\text{current}} = 0.8 \\mathbf{e}_{t-1} + 0.2 \\mathbf{e}_{\\text{current}}',
      rejectionScenario: {
        condition: 'Voiceprint adaptation NEVER executes on rejected attempts, preventing adversarial poisoning of the enrolled template.',
        layerBlocked: null,
        result: 'ACCEPT',
        reason: 'Authentication successful: Voiceprint adapted',
      },
    },
  ];

  const current = STAGES_DETAIL[selectedStage];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">Zero-Trust Pipeline Specification</span>
        <h1 className="section-title">Cascaded 6-Stage Authentication Protocol</h1>
        <p className="section-subtitle">
          Inspect how AAA Engine coordinates cryptographic challenge validation, deepfake audio filtering, Whisper ASR phrase verification, ECAPA-TDNN speaker verification, and adaptive voiceprint updates.
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
            Mathematical Formulation
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
              Rejection & Failure Condition
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'var(--color-danger)', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              EXIT CODE: REJECT (Layer {current.rejectionScenario.layerBlocked})
            </span>
          </div>
          <div style={{ fontSize: '0.88rem', color: '#991b1b', lineHeight: 1.5 }}>
            <strong>Trigger:</strong> {current.rejectionScenario.condition}
          </div>
          <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#7f1d1d' }}>
            Result: "{current.rejectionScenario.result}" • Reason: "{current.rejectionScenario.reason}"
          </div>
        </div>
      </div>

      {/* Decision Tree Diagram */}
      <div className="saas-card" style={{ marginTop: '2rem', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          Verification Decision Logic Tree (backend/app/main.py)
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          Each verification request follows a strict cascading order. If any check fails, the pipeline aborts immediately without processing subsequent layers.
        </p>

        <div style={{ background: '#0f172a', borderRadius: 'var(--radius-lg)', padding: '1.5rem', color: '#f8fafc', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.8, overflowX: 'auto' }}>
          <div>1. Request Ingestion: [user_id, token, audio.wav]</div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>Check Database</span>: Does user exist? Has enrolled voiceprint?</div>
          <div>│   └── No ──► <span style={{ color: '#ef4444' }}>HTTP 404/400 REJECT</span> ("User has no voiceprint")</div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>GATE 1: Layer 2 Deepfake Detection</span> (garystafford/wav2vec2-deepfake-voice-detector)</div>
          <div>│   ├── Spoof Prob &gt; 0.50 ──► <span style={{ color: '#ef4444' }}>REJECT (layer_blocked: 2)</span> [Deepfake/spoof detected]</div>
          <div>│   └── Spoof Prob ≤ 0.50 ──► Continue to Gate 2</div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>GATE 2: Layer 3 ASR Phrase Verification</span> (OpenAI Whisper base)</div>
          <div>│   ├── Phrase Similarity &lt; 0.60 ──► <span style={{ color: '#ef4444' }}>REJECT (layer_blocked: 4)</span> [Challenge phrase mismatch]</div>
          <div>│   └── Phrase Similarity ≥ 0.60 ──► Continue to Gate 3</div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>GATE 3: Layer 1 Speaker Verification</span> (speechbrain/spkrec-ecapa-voxceleb)</div>
          <div>│   ├── Cosine Similarity &lt; 0.50 ──► <span style={{ color: '#ef4444' }}>REJECT (layer_blocked: 1)</span> [Speaker verification failed]</div>
          <div>│   └── Cosine Similarity ≥ 0.50 ──► Continue to Token Check</div>
          <div>│</div>
          <div>├── <span style={{ color: '#38bdf8' }}>GATE 4: Layer 3 Token Check</span> (HMAC signature, 90s TTL, single-use)</div>
          <div>│   ├── Token invalid/expired/used ──► <span style={{ color: '#ef4444' }}>REJECT (layer_blocked: 3)</span> [Invalid or expired token]</div>
          <div>│   └── Token valid ──► Consume Token (used = True)</div>
          <div>│</div>
          <div>└── <span style={{ color: '#10b981' }}>SUCCESS: All Gates Passed</span></div>
          <div>    ├── Layer 3 EMA Voiceprint Update: New = 0.8 × Old + 0.2 × Current</div>
          <div>    ├── Write audit log to auth_logs with result="ACCEPT"</div>
          <div>    └── Return JSON response: <span style={{ color: '#10b981' }}>result: "ACCEPT", confidence: l1_score</span></div>
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button onClick={() => onNavigate('app')} className="btn btn-primary">
            Test This Pipeline Live in Application →
          </button>
        </div>
      </div>
    </div>
  );
}
