import React, { useState } from 'react';

export default function DemosPage({ onNavigate }) {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const DEMO_VIDEOS = [
    {
      id: 0,
      title: 'Video 1: User Voiceprint Enrollment Walkthrough',
      duration: '02:45',
      badge: 'SPEAKER ENROLLMENT',
      scenario: 'Registering a new identity and capturing 3 distinct acoustic samples for ECAPA-TDNN feature extraction.',
      summary:
        'Walkthrough showing identity creation, browser microphone capture, deterministic 16kHz mono WAV resampling via Web Audio API, and the generation of a baseline 192-dimensional speaker embedding vector stored in PostgreSQL.',
      steps: [
        '00:00 - User enters full name and email address into POST /auth/register.',
        '00:35 - Browser requests microphone permission and initiates MediaRecorder stream.',
        '01:10 - In-browser audio resampler converts WebM stream to 16,000 Hz Mono 16-bit PCM WAV.',
        '01:50 - SpeechBrain ECAPA-TDNN extracts 192-dim vector via attentive statistics pooling.',
        '02:30 - PostgreSQL stores embedding in voiceprints table with sample_count = 1.',
      ],
      terminalSnippet: `POST /auth/enroll HTTP/1.1
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary
[Audio payload: 16kHz Mono WAV, 5.2 seconds]
HTTP/1.1 200 OK
{"status": "enrolled", "sample_count": 1, "embedding_dim": 192}`,
    },
    {
      id: 1,
      title: 'Video 2: Layer 2 Anti-Spoofing & Deepfake Detection Gate',
      duration: '03:15',
      badge: 'DEEPFAKE REJECTION',
      scenario: 'Attacking the system using AI-synthesized cloning tools (ElevenLabs / Bark) vs. authentic human voice.',
      summary:
        'Demonstrates the defensive cascade: an attacker submits high-fidelity cloned audio matching the target voice. Layer 2 (wav2vec2-deepfake-voice-detector) detects vocoder artifacts and immediately terminates the pipeline with HTTP REJECT before Layer 1 is ever computed.',
      steps: [
        '00:00 - Genuine user requests a dynamic challenge phrase (90s TTL).',
        '00:40 - Attacker attempts spoofing with ElevenLabs synthetic speech clone.',
        '01:25 - Audio ingested by garystafford/wav2vec2-deepfake-voice-detector.',
        '02:05 - Softmax classifier computes 94.1% spoof probability (threshold = 0.50).',
        '02:45 - Gate terminates with result: "REJECT", layer_blocked: 2. Forensic record written to auth_logs.',
      ],
      terminalSnippet: `POST /auth/verify HTTP/1.1
[Payload: Spoofed synthetic audio]
HTTP/1.1 200 OK
{
  "result": "REJECT",
  "confidence": 0.941,
  "layer_blocked": 2,
  "reason": "Deepfake/spoof detected",
  "l2_label": "spoof",
  "l2_confidence": 0.941,
  "l1_score": 0.0
}`,
    },
    {
      id: 2,
      title: 'Video 3: Dynamic Challenge-Response & Whisper ASR Liveness',
      duration: '02:50',
      badge: 'REPLAY DEFENSE',
      scenario: 'Neutralizing pre-recorded playback attacks using randomized challenge phrases and Whisper ASR.',
      summary:
        'Demonstrates how AAA Engine defeats physical playback injection: even if an attacker plays back a genuine recording of the victim, the OpenAI Whisper speech-to-text layer verifies whether the spoken audio matches the newly issued single-use challenge phrase.',
      steps: [
        '00:00 - Server generates randomized phrase "Say: 7 Crimson Falcon 4" with HMAC token.',
        '00:30 - Live countdown timer enforces 90-second Time-To-Live (TTL).',
        '01:15 - User speaks the response phrase; audio uploaded with token.',
        '01:45 - OpenAI Whisper transcribes speech and normalizes numbers and punctuation.',
        '02:20 - SequenceMatcher computes 100% phrase match, passing Gate 2 to reach Layer 1.',
      ],
      terminalSnippet: `GET /auth/challenge?user_id=4a7b9c21...
{"phrase": "Say: 7 Crimson Falcon 4", "token": "a1b2...90s_TTL"}

[Whisper ASR Verification]
Expected: "7 crimson falcon 4"
Transcribed: "7 crimson falcon 4"
Similarity: 1.000 (Threshold >= 0.60) -> PASSED`,
    },
    {
      id: 3,
      title: 'Video 4: Adaptive Voiceprint Update (EMA α = 0.20) & Audit Trail',
      duration: '03:00',
      badge: 'CONTINUOUS ADAPTATION',
      scenario: 'Observing continuous voiceprint evolution across authentic logins and tracking forensic metrics.',
      summary:
        'Demonstration of the Exponential Moving Average formula in action: New = 0.8 × Old + 0.2 × Current. After every 100% verified login, the stored voiceprint vector smoothly shifts to reflect natural biological aging without compromising security.',
      steps: [
        '00:00 - User completes successful verification across all 4 gates.',
        '00:45 - Layer 3 calculates element-wise EMA: 0.8 * old_embedding + 0.2 * new_embedding.',
        '01:30 - Voiceprint updated in PostgreSQL; sample_count increments from 3 to 4.',
        '02:15 - Real-time dashboard plots voiceprint shift timeline via GET /users/:id/voiceprint-history.',
        '02:45 - Complete audit trail saved in auth_logs for enterprise compliance.',
      ],
      terminalSnippet: `[EMA Voiceprint Adaptation]
Formula: New = 0.8 * Old + 0.2 * Current
Dimensions: 192 floats updated
Sample Count: 3 -> 4
Updated At: 2026-10-26T10:45:00Z
Audit Log: ACCEPT recorded with session_id: f47ac10b...`,
    },
  ];

  const current = DEMO_VIDEOS[activeVideo];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">Project Screencasts & Evidence</span>
        <h1 className="section-title">Demonstration Videos & System Walkthroughs</h1>
        <p className="section-subtitle">
          Recorded demonstration screencasts and interactive test scenarios showcasing every layer of the AAA Engine pipeline.
        </p>
      </div>

      {/* Video Selector Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '12px',
          marginBottom: '2rem',
        }}
      >
        {DEMO_VIDEOS.map((vid, idx) => (
          <button
            key={vid.id}
            onClick={() => {
              setActiveVideo(idx);
              setIsPlaying(false);
            }}
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-lg)',
              border: activeVideo === idx ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              background: activeVideo === idx ? 'var(--color-primary-light)' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              boxShadow: activeVideo === idx ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                {vid.badge}
              </span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
                {vid.duration}
              </span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text)', lineHeight: 1.3 }}>
              {vid.title}
            </div>
          </button>
        ))}
      </div>

      {/* Main Interactive Video Player Showcase */}
      <div className="saas-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--color-primary)', color: '#ffffff', padding: '3px 10px', borderRadius: '12px' }}>
              DEMONSTRATION {current.id + 1} OF 4
            </span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text)', marginTop: '6px' }}>
              {current.title}
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onNavigate('app')}
              className="btn btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              Test Live in Application →
            </button>
          </div>
        </div>

        {/* Video Canvas Mockup with Playback Controls */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '360px',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem',
            color: '#ffffff',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '1.5rem',
          }}
        >
          {/* Top Bar inside Video Player */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#94a3b8' }}>
                AAA Engine Screencast • Scenario: {current.badge}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8' }}>
              1080p 60fps
            </span>
          </div>

          {/* Center Play Button & Waveform */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: isPlaying ? 'rgba(16, 185, 129, 0.9)' : 'rgba(37, 99, 235, 0.9)',
                border: '3px solid rgba(255, 255, 255, 0.4)',
                color: '#ffffff',
                fontSize: '1.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 24px rgba(37, 99, 235, 0.6)',
                transition: 'all 0.2s ease',
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>
              {isPlaying ? 'Playing Demonstration Screencast...' : 'Click to Play Demonstration Screencast'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
              {current.scenario}
            </div>
          </div>

          {/* Bottom Player Timeline Scrubber */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>
              <span>{isPlaying ? '01:24' : '00:00'}</span>
              <span>{current.duration}</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: isPlaying ? '52%' : '0%', height: '100%', background: 'var(--color-primary)', transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>

        {/* Video Scenario & Timeline Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
              Screencast Timeline Sequence
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {current.steps.map((st, i) => (
                <div key={i} style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
                    {st.substring(0, 5)}
                  </strong>{' '}
                  {st.substring(8)}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
              Live Execution Output Trace
            </h4>
            <pre className="light-inspector-box" style={{ marginTop: 0, fontSize: '0.8rem', maxHeight: '180px' }}>
              {current.terminalSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
