import React from 'react';

const demoTopics = [
  {
    title: '1. User Voice Enrollment Walkthrough',
    description: 'Capturing minimum 5s 16kHz mono audio via browser microphone, silence-trimming with librosa, generating 192-dim ECAPA embedding, and storing in PostgreSQL.',
    stage: 'Demonstrated to Panel',
    icon: '🎙️',
  },
  {
    title: '2. Dynamic Challenge-Response Protocol',
    description: 'Issuance of randomised phrase (60% dynamic + 40% static) with HMAC-SHA256 signature token, 90s TTL countdown, and single-use invalidation upon submission.',
    stage: 'Demonstrated to Panel',
    icon: '⚡',
  },
  {
    title: '3. Layer 2: Deepfake Spoof Detection Gate',
    description: 'Live test passing AI-synthesized cloning samples vs bonafide human voice through fine-tuned Wav2Vec2 checkpoint. Immediate REJECT before Layer 1 is reached.',
    stage: 'Demonstrated to Panel',
    icon: '🛡️',
  },
  {
    title: '4. Layer 1: Speaker Verification Matching',
    description: 'ECAPA-TDNN extraction of live spoken challenge embedding, cosine similarity calculation against enrolled template, and acceptance thresholding (0.70).',
    stage: 'Demonstrated to Panel',
    icon: '🔊',
  },
  {
    title: '5. Layer 3: Adaptive Voiceprint Update (EMA)',
    description: 'Post-authentication execution of the weighted blend formula (New = 0.8 × Old + 0.2 × Current) and verification in PostgreSQL voiceprints table.',
    stage: 'Demonstrated to Panel',
    icon: '🔄',
  },
  {
    title: '6. End-to-End Client & Admin Dashboard',
    description: 'Live 5-page React Vite client interaction communicating with FastAPI backend on port 8000, displaying real-time logs and decision rationale.',
    stage: 'Demonstrated to Panel',
    icon: '💻',
  },
];

const Demos = () => {
  return (
    <section id="demos" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Demonstrations & Video Walkthroughs</h2>
          <p>
            The complete authentication pipeline was demonstrated live during the <strong>23CSE498 Phase 2 Panel Review 1</strong> on September 18, 2026. Recorded video sessions and interactive sandbox clips will be uploaded here.
          </p>
        </div>

        {/* Video Placeholder Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {demoTopics.map((topic, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Fake Video Screen */}
              <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  marginBottom: '8px'
                }}>
                  ▶
                </div>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                  Demo Screencast #{idx + 1}
                </span>

                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  color: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>{topic.icon}</span> Live Pipeline
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--color-text)', margin: 0 }}>
                  {topic.title}
                </h3>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                {topic.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>
                  ✓ {topic.stage}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Media publishing soon
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice */}
        <div style={{
          textAlign: 'center',
          padding: '16px 24px',
          background: 'var(--color-surface)',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          maxWidth: '680px',
          margin: '0 auto',
          fontSize: '0.86rem',
          color: 'var(--color-text-secondary)'
        }}>
          📹 Video files are currently undergoing institutional review compression. Live source code and CLI demonstration scripts can be tested directly from the repository.
        </div>

      </div>
    </section>
  );
};

export default Demos;
