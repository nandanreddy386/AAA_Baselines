import React, { useState, useEffect, useRef } from 'react';
import {
  checkServerHealth,
  getAllUsers,
  registerUser,
  enrollVoice,
  getChallenge,
  verifyVoice,
  getVoiceprintHistory,
  getAuthLogs,
} from '../utils/apiClient';
import { convertBlobTo16kHzWav } from '../utils/audioEncoder';

export default function LiveAppPage() {
  const [activeTab, setActiveTab] = useState('register');
  const [isServerLive, setIsServerLive] = useState(false);
  const [checkingServer, setCheckingServer] = useState(true);
  const [useLiveBackend, setUseLiveBackend] = useState(false);

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  // Check backend server on load
  const probeServer = async () => {
    setCheckingServer(true);
    const live = await checkServerHealth();
    setIsServerLive(live);
    setUseLiveBackend(live);
    setCheckingServer(false);
    loadUsers(live);
  };

  const loadUsers = async (isLive = false) => {
    const users = await getAllUsers(isLive);
    setRegisteredUsers(users);
    if (users.length > 0 && !activeUser) {
      setActiveUser(users[0]);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setCheckingServer(true);
      const live = await checkServerHealth();
      if (!isMounted) return;
      setIsServerLive(live);
      setUseLiveBackend(live);
      setCheckingServer(false);
      const users = await getAllUsers(live);
      if (!isMounted) return;
      setRegisteredUsers(users);
      if (users.length > 0) {
        setActiveUser(users[0]);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem', maxWidth: '1280px' }}>
      {/* Top Banner / Mode Controller */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: isServerLive ? 'var(--color-success)' : 'var(--color-warning)',
              boxShadow: isServerLive ? '0 0 0 3px rgba(16,185,129,0.2)' : '0 0 0 3px rgba(245,158,11,0.2)',
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>
              {checkingServer
                ? 'Probing FastAPI backend (http://localhost:8000)...'
                : isServerLive
                ? 'FastAPI Backend Online (Connected to SpeechBrain & Wav2Vec2)'
                : 'Local Backend Offline — Running in Interactive Client Demo Mode'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {isServerLive
                ? 'Live requests are routed directly to your local Python uvicorn server at port 8000.'
                : 'To execute against genuine neural network models locally, run uvicorn app.main:app --reload.'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={probeServer}
            className="btn btn-secondary"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
            disabled={checkingServer}
          >
            {checkingServer ? 'Checking...' : 'Refresh Status'}
          </button>

          {isServerLive && (
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={useLiveBackend}
                onChange={(e) => {
                  setUseLiveBackend(e.target.checked);
                  loadUsers(e.target.checked);
                }}
              />
              Route to Live API
            </label>
          )}
        </div>
      </div>

      {/* Main SaaS Layout: Sidebar + Content */}
      <div className="saas-layout" style={{ minHeight: 'auto', background: 'transparent' }}>
        {/* Process Stepper Header */}
        <div style={{ width: '100%' }}>
          <div className="process-stepper-bar">
            {[
              { id: 'register', label: '1. Register Identity' },
              { id: 'enroll', label: '2. Enroll Voice' },
              { id: 'verify', label: '3. Authenticate' },
              { id: 'dashboard', label: '4. Audit & Analytics' },
              { id: 'login', label: 'Identity Directory' },
            ].map((step, idx) => {
              const isCurrent = activeTab === step.id;
              return (
                <React.Fragment key={step.id}>
                  <div
                    className={`step-flow-item ${isCurrent ? 'active' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveTab(step.id)}
                  >
                    <div className="step-flow-dot" />
                    <span>{step.label}</span>
                  </div>
                  {idx < 4 && <span className="step-flow-arrow">›</span>}
                </React.Fragment>
              );
            })}
          </div>

          {/* Active Identity Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--color-surface)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                Active Identity Session:
              </span>
              {activeUser ? (
                <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                  {activeUser.name} ({activeUser.email})
                </span>
              ) : (
                <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>None selected</span>
              )}
            </div>

            <button
              onClick={() => setActiveTab('login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Switch Identity
            </button>
          </div>

          {/* Tab 1: Register */}
          {activeTab === 'register' && (
            <RegisterView
              activeUser={activeUser}
              setActiveUser={setActiveUser}
              registeredUsers={registeredUsers}
              refreshUsers={() => loadUsers(useLiveBackend)}
              useLive={useLiveBackend}
              onComplete={() => setActiveTab('enroll')}
            />
          )}

          {/* Tab 2: Enroll */}
          {activeTab === 'enroll' && (
            <EnrollView
              activeUser={activeUser}
              useLive={useLiveBackend}
              onComplete={() => setActiveTab('verify')}
            />
          )}

          {/* Tab 3: Verify */}
          {activeTab === 'verify' && (
            <VerifyView
              activeUser={activeUser}
              useLive={useLiveBackend}
              onComplete={() => setActiveTab('dashboard')}
            />
          )}

          {/* Tab 4: Dashboard */}
          {activeTab === 'dashboard' && (
            <DashboardView activeUser={activeUser} useLive={useLiveBackend} />
          )}

          {/* Tab 5: User Switcher */}
          {activeTab === 'login' && (
            <UserSwitcherView
              activeUser={activeUser}
              setActiveUser={setActiveUser}
              registeredUsers={registeredUsers}
              onSelect={() => setActiveTab('verify')}
            />
          )}
        </div>
      </div>

      {/* Local Backend Instruction Guide */}
      <div
        style={{
          marginTop: '2.5rem',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)' }}>
              How to Run the Real AI Backend Locally
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              The actual repository contains the complete Python backend with SpeechBrain ECAPA-TDNN and Hugging Face Wav2Vec2 models.
            </p>
          </div>
          <a
            href="https://github.com/Speech-Synthesis/AAA_Baselines"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
          >
            Clone Repository
          </a>
        </div>

        <div style={{ background: '#0f172a', borderRadius: 'var(--radius-md)', padding: '1.25rem', color: '#38bdf8', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', overflowX: 'auto' }}>
          <div style={{ color: '#94a3b8' }}># 1. Clone repository & navigate to backend</div>
          <div>git clone https://github.com/Speech-Synthesis/AAA_Baselines.git</div>
          <div>cd AAA_Baselines/backend</div>
          <br />
          <div style={{ color: '#94a3b8' }}># 2. Create virtual environment & install PyTorch, SpeechBrain, Transformers</div>
          <div>python -m venv venv</div>
          <div>venv\Scripts\activate  <span style={{ color: '#64748b' }}># On Windows</span></div>
          <div>pip install -r requirements.txt</div>
          <br />
          <div style={{ color: '#94a3b8' }}># 3. Start FastAPI server with automatic reload</div>
          <div>uvicorn app.main:app --reload --port 8000</div>
          <br />
          <div style={{ color: '#10b981' }}># Once running, click "Refresh Status" above to connect this interface directly to your local models!</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: RegisterView
// ==========================================
function RegisterView({ activeUser, setActiveUser, registeredUsers, refreshUsers, useLive, onComplete }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter both full name and email address.' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await registerUser(name, email, useLive);
      setStatusMsg({
        type: 'success',
        text: `Identity registered successfully! Assigned UUID: ${res.user_id}`,
      });
      setName('');
      setEmail('');
      if (refreshUsers) await refreshUsers();
      if (onComplete) setTimeout(onComplete, 1200);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Registration request failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saas-card">
      <div className="card-title-lg">User Identity Registration</div>
      <div className="card-subtitle-text">
        Register a new identity profile in the AAA Engine database (Endpoint: <code>POST /auth/register</code>)
      </div>

      <form onSubmit={handleRegister}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div className="saas-input-group">
            <label className="saas-label">Full Name</label>
            <input
              type="text"
              className="saas-input"
              placeholder="e.g. Dr. Aditya Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="saas-input-group">
            <label className="saas-label">Email Address</label>
            <input
              type="email"
              className="saas-input"
              placeholder="e.g. aditya@aaaengine.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing Registration...' : 'Register Identity Profile'}
          </button>
        </div>
      </form>

      {statusMsg && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            background: statusMsg.type === 'success' ? 'var(--color-success-light)' : 'var(--color-danger-light)',
            border: `1px solid ${statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`,
            color: statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
            fontSize: '0.92rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>{statusMsg.text}</span>
          {statusMsg.type === 'success' && onComplete && (
            <button
              className="btn btn-primary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
              onClick={onComplete}
            >
              Proceed to Enroll Voice →
            </button>
          )}
        </div>
      )}

      {registeredUsers.length > 0 && (
        <div style={{ marginTop: '2.5rem' }}>
          <div
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginBottom: '1rem',
            }}
          >
            Registered Users ({registeredUsers.length})
          </div>

          <div className="light-user-grid">
            {registeredUsers.map((u) => (
              <div
                key={u.id}
                className={`light-user-card ${activeUser?.id === u.id ? 'selected' : ''}`}
                onClick={() => setActiveUser(u)}
              >
                <div className="user-avatar-initials">
                  {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {u.name}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {u.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: EnrollView
// ==========================================
function EnrollView({ activeUser, useLive, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [sampleCount, setSampleCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    if (!activeUser) {
      setStatusMsg({ type: 'error', text: 'Please select an active identity profile first.' });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const rawBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Resample in-browser to 16kHz Mono 16-bit PCM RIFF WAV
        const wavBlob = await convertBlobTo16kHzWav(rawBlob);
        await handleAudioUpload(wavBlob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setStatusMsg(null);
    } catch {
      setStatusMsg({
        type: 'error',
        text: 'Microphone permission denied or audio device not found. Please enable microphone permissions in your browser.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAudioUpload = async (audioBlob) => {
    setLoading(true);
    try {
      const res = await enrollVoice(activeUser.id, audioBlob, useLive);
      const newCount = res.sample_count || sampleCount + 1;
      setSampleCount(newCount);

      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
        setStatusMsg({
          type: 'success',
          text: `Voice Sample ${currentStep} enrolled. Total samples: ${newCount}. Please record sample ${currentStep + 1} of 3.`,
        });
      } else {
        setEnrollmentComplete(true);
        setStatusMsg({
          type: 'success',
          text: `Voiceprint enrollment complete! Extracted 192-dim ECAPA-TDNN embedding across all 3 acoustic samples.`,
        });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Enrollment audio upload failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="saas-card">
      <div className="card-title-lg">Speaker Voiceprint Enrollment</div>
      <div className="card-subtitle-text">
        Record 3 audio samples (min 3-5s) to extract ECAPA-TDNN 192-dim acoustic embeddings (Endpoint: <code>POST /auth/enroll</code>)
      </div>

      {!activeUser ? (
        <div
          style={{
            padding: '1.75rem',
            textAlign: 'center',
            color: 'var(--color-warning)',
            background: '#fffbeb',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #fde68a',
            fontWeight: 600,
          }}
        >
          No active identity selected. Please select or register a profile first.
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
            }}
          >
            <div>
              Active Enrollee: <strong style={{ color: 'var(--color-text)' }}>{activeUser.name}</strong>
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
              Database Sample Count: <strong style={{ color: 'var(--color-primary)' }}>{sampleCount}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background:
                    step < currentStep
                      ? 'var(--color-success-light)'
                      : step === currentStep
                      ? 'var(--color-primary-light)'
                      : '#ffffff',
                  borderColor:
                    step < currentStep
                      ? 'var(--color-success)'
                      : step === currentStep
                      ? 'var(--color-primary)'
                      : 'var(--color-border)',
                  color:
                    step < currentStep
                      ? 'var(--color-success)'
                      : step === currentStep
                      ? 'var(--color-primary)'
                      : 'var(--color-text-muted)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                {step < currentStep ? `Sample ${step} Complete ✓` : `Sample ${step}`}
              </div>
            ))}
          </div>

          {isRecording && (
            <div className="light-spectrum-box">
              <div className="light-bars-flex">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="light-bar" />
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <button
              className={`btn-saas-record ${isRecording ? 'active-recording' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
              disabled={loading}
            >
              {isRecording
                ? 'Stop Recording & Upload Sample'
                : loading
                ? 'Extracting 192-dim Embedding...'
                : `Record Voice Sample ${currentStep} of 3 (Min 3 Seconds)`}
            </button>
          </div>

          {statusMsg && (
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: statusMsg.type === 'success' ? 'var(--color-success-light)' : 'var(--color-danger-light)',
                border: `1px solid ${statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`,
                color: statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{statusMsg.text}</span>
              {enrollmentComplete && onComplete && (
                <button
                  className="btn btn-primary"
                  style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                  onClick={onComplete}
                >
                  Proceed to Authenticate →
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: VerifyView
// ==========================================
function VerifyView({ activeUser, useLive, onComplete }) {
  const [challenge, setChallenge] = useState(null);
  const [loadingChallenge, setLoadingChallenge] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isRecording, setIsRecording] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [simulateSpoof, setSimulateSpoof] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const fetchNewChallenge = async () => {
    if (!activeUser) {
      setStatusMsg({ type: 'error', text: 'Please select an active identity first.' });
      return;
    }

    setLoadingChallenge(true);
    setVerifyResult(null);
    setStatusMsg(null);
    setChallenge(null);
    clearInterval(timerRef.current);

    try {
      const data = await getChallenge(activeUser.id, useLive);
      setChallenge(data);
      setTimeLeft(90);

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setStatusMsg({
              type: 'error',
              text: 'Challenge token expired (90s TTL limit reached). Please request a fresh challenge.',
            });
            setChallenge(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to generate challenge phrase' });
    } finally {
      setLoadingChallenge(false);
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const startRecording = async () => {
    if (!challenge) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const rawBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const wavBlob = await convertBlobTo16kHzWav(rawBlob);
        await handleVerifySubmit(wavBlob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setStatusMsg(null);
    } catch {
      setStatusMsg({
        type: 'error',
        text: 'Microphone access denied or unavailable. Please enable permissions.',
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVerifySubmit = async (audioBlob) => {
    setVerifying(true);
    clearInterval(timerRef.current);

    try {
      const res = await verifyVoice(activeUser.id, challenge.token, audioBlob, useLive, simulateSpoof);
      setVerifyResult(res);
      setChallenge(null);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Verification pipeline failed' });
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="saas-card">
      <div className="card-title-lg">Adaptive Authentication Protocol</div>
      <div className="card-subtitle-text">
        Deepfake Detection (L2) → Phrase Match (ASR) → Speaker Verification (L1) → Single-Use Token Check (L3)
      </div>

      {!activeUser ? (
        <div
          style={{
            padding: '1.75rem',
            textAlign: 'center',
            color: 'var(--color-warning)',
            background: '#fffbeb',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #fde68a',
            fontWeight: 600,
          }}
        >
          No active identity selected. Please select or register a profile first.
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              Target Identity: <strong style={{ color: 'var(--color-text)' }}>{activeUser.name}</strong> ({activeUser.email})
            </div>

            {!useLive && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-danger)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={simulateSpoof}
                  onChange={(e) => setSimulateSpoof(e.target.checked)}
                />
                Simulate Synthetic Deepfake Attack (Test Layer 2 Block)
              </label>
            )}
          </div>

          {!challenge ? (
            <button className="btn btn-primary" onClick={fetchNewChallenge} disabled={loadingChallenge}>
              {loadingChallenge ? 'Signing HMAC-SHA256 Token...' : 'Request Challenge Phrase (90s TTL)'}
            </button>
          ) : (
            <div>
              <div className="light-challenge-hero">
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                  }}
                >
                  CHALLENGE PHRASE TO SPEAK
                </div>
                <div className="challenge-text-display">{challenge.phrase}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    marginTop: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span>
                    Token Expiry:{' '}
                    <strong style={{ color: timeLeft < 20 ? 'var(--color-danger)' : 'var(--color-primary)' }}>
                      {timeLeft}s
                    </strong>
                  </span>
                  <span>•</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                    HMAC: {challenge.token.substring(0, 16)}...
                  </span>
                </div>
              </div>

              {isRecording && (
                <div className="light-spectrum-box">
                  <div className="light-bars-flex">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="light-bar" />
                    ))}
                  </div>
                </div>
              )}

              <button
                className={`btn-saas-record ${isRecording ? 'active-recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={verifying}
              >
                {isRecording
                  ? 'Stop & Submit Spoken Response'
                  : verifying
                  ? 'Processing L2 → ASR → L1 → L3 Pipeline...'
                  : 'Speak Challenge Phrase & Authenticate'}
              </button>
            </div>
          )}

          {statusMsg && (
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: statusMsg.type === 'success' ? 'var(--color-success-light)' : 'var(--color-danger-light)',
                border: `1px solid ${statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`,
                color: statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
                fontSize: '0.92rem',
                fontWeight: 600,
              }}
            >
              {statusMsg.text}
            </div>
          )}

          {verifyResult && (
            <div className={`light-decision-card ${verifyResult.result}`}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className={`badge-decision-light ${verifyResult.result}`}>
                    {verifyResult.result}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)' }}>
                    {verifyResult.reason}
                  </span>
                </div>

                {verifyResult.layer_blocked && (
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--color-danger)',
                      fontWeight: 700,
                    }}
                  >
                    Blocked at Layer {verifyResult.layer_blocked}
                  </div>
                )}
              </div>

              <div className="saas-metrics-grid">
                <div className="saas-stat-card">
                  <div className="saas-stat-label">L2 Deepfake Label</div>
                  <div
                    className="saas-stat-val"
                    style={{
                      color: verifyResult.l2_label === 'spoof' ? 'var(--color-danger)' : 'var(--color-success)',
                    }}
                  >
                    {verifyResult.l2_label?.toUpperCase() || 'BONAFIDE'}
                  </div>
                </div>

                <div className="saas-stat-card">
                  <div className="saas-stat-label">L2 Spoof Confidence</div>
                  <div className="saas-stat-val">
                    {(verifyResult.l2_confidence * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="saas-stat-card">
                  <div className="saas-stat-label">L1 Speaker Similarity</div>
                  <div className="saas-stat-val" style={{ color: 'var(--color-primary)' }}>
                    {(verifyResult.l1_score * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="saas-stat-card">
                  <div className="saas-stat-label">L3 ASR Phrase Match</div>
                  <div
                    className="saas-stat-val"
                    style={{
                      color: verifyResult.asr_similarity >= 0.6 ? 'var(--color-success)' : 'var(--color-danger)',
                    }}
                  >
                    {verifyResult.asr_similarity != null
                      ? `${(verifyResult.asr_similarity * 100).toFixed(1)}%`
                      : 'N/A'}
                  </div>
                </div>
              </div>

              {verifyResult.asr_transcript && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: '0.35rem',
                    }}
                  >
                    ASR Transcription (Whisper)
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--color-text)' }}>
                    "{verifyResult.asr_transcript}"
                  </div>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '1.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                  }}
                >
                  POST /auth/verify Full REST Response JSON
                </div>
                {onComplete && (
                  <button
                    className="btn btn-primary"
                    style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                    onClick={onComplete}
                  >
                    Proceed to Analytics →
                  </button>
                )}
              </div>

              <pre className="light-inspector-box">{JSON.stringify(verifyResult, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: DashboardView
// ==========================================
function DashboardView({ activeUser, useLive }) {
  const [history, setHistory] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (activeUser) {
      getVoiceprintHistory(activeUser.id, useLive).then((h) => {
        if (isMounted) setHistory(h);
      });
      getAuthLogs(activeUser.id, useLive).then((l) => {
        if (isMounted) setLogs(l);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [activeUser, useLive]);

  return (
    <div className="saas-card">
      <div className="card-title-lg">Biometric Voiceprint Analytics & Forensic Audit Logs</div>
      <div className="card-subtitle-text">
        Real-time tracking of Exponential Moving Average shifts (New = 0.8 × Old + 0.2 × Current) and forensic attempt logs
      </div>

      {!activeUser ? (
        <div
          style={{
            padding: '1.75rem',
            textAlign: 'center',
            color: 'var(--color-warning)',
            background: '#fffbeb',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #fde68a',
            fontWeight: 600,
          }}
        >
          Please select an active identity profile to view individual voiceprint metrics.
        </div>
      ) : (
        <>
          <div className="saas-metrics-grid">
            <div className="saas-stat-card">
              <div className="saas-stat-label">Active User Identity</div>
              <div className="saas-stat-val" style={{ fontSize: '1.25rem', marginTop: '2px' }}>
                {activeUser.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-primary)',
                  marginTop: '4px',
                }}
              >
                {activeUser.id}
              </div>
            </div>

            <div className="saas-stat-card">
              <div className="saas-stat-label">Voiceprint Sample Count</div>
              <div className="saas-stat-val" style={{ color: 'var(--color-success)', marginTop: '2px' }}>
                {history.length > 0 ? history[0].sample_count : 3} Samples
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Adapted via EMA (α = 0.20)
              </div>
            </div>

            <div className="saas-stat-card">
              <div className="saas-stat-label">Embedding Architecture</div>
              <div className="saas-stat-val" style={{ color: 'var(--color-primary)', marginTop: '2px' }}>
                192-dim
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                SpeechBrain ECAPA-TDNN
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Voiceprint Adaptation History (GET /users/:id/voiceprint-history)
            </div>

            <div
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
              }}
            >
              {history.map((h, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0',
                    borderBottom: i < history.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        background: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontWeight: 700,
                      }}
                    >
                      Update #{history.length - i}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      Enrolled Samples: <strong style={{ color: 'var(--color-text)' }}>{h.sample_count}</strong>
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: 'var(--color-primary)',
                    }}
                  >
                    {new Date(h.updated_at).toLocaleDateString('en-GB')}{' '}
                    {new Date(h.updated_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Authentication Audit Log Timeline (auth_logs)
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="light-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Result</th>
                    <th>Blocked Layer</th>
                    <th>L2 Spoof Conf</th>
                    <th>L1 Similarity</th>
                    <th>Audit Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {new Date(log.created_at).toLocaleTimeString()}
                      </td>
                      <td>
                        <span className={`badge-tag-light ${log.result}`}>{log.result}</span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                        {log.layer_blocked ? `L${log.layer_blocked}${log.layer_blocked === 4 ? ' (ASR)' : ''}` : '—'}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>
                        {(log.l2_confidence * 100).toFixed(1)}%
                      </td>
                      <td
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.88rem',
                          color: 'var(--color-primary)',
                        }}
                      >
                        {(log.l1_score * 100).toFixed(1)}%
                      </td>
                      <td style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                        {log.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: UserSwitcherView
// ==========================================
function UserSwitcherView({ activeUser, setActiveUser, registeredUsers, onSelect }) {
  const [lookupEmail, setLookupEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);

  const handleLookup = (e) => {
    e.preventDefault();
    if (!lookupEmail.trim()) return;

    const found = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === lookupEmail.trim().toLowerCase() ||
        u.id === lookupEmail.trim()
    );

    if (found) {
      setActiveUser(found);
      setStatusMsg({ type: 'success', text: `Switched active session to ${found.name}` });
      if (onSelect) onSelect(found);
    } else {
      setStatusMsg({ type: 'error', text: 'Registered identity not found. Please register first.' });
    }
  };

  return (
    <div className="saas-card">
      <div className="card-title-lg">Identity Session Selector</div>
      <div className="card-subtitle-text">
        Select or lookup an enrolled identity to test voice authentication pipeline
      </div>

      <form onSubmit={handleLookup}>
        <div className="saas-input-group">
          <label className="saas-label">Email or User UUID</label>
          <input
            type="text"
            className="saas-input"
            placeholder="Enter registered email address or user UUID..."
            value={lookupEmail}
            onChange={(e) => setLookupEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Lookup Identity & Activate Session
        </button>
      </form>

      {statusMsg && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            background: statusMsg.type === 'success' ? 'var(--color-success-light)' : 'var(--color-danger-light)',
            border: `1px solid ${statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`,
            color: statusMsg.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)',
            fontSize: '0.92rem',
            fontWeight: 600,
          }}
        >
          {statusMsg.text}
        </div>
      )}

      <div style={{ marginTop: '2.5rem' }}>
        <div
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            marginBottom: '1rem',
          }}
        >
          Enrolled Identities Directory ({registeredUsers.length})
        </div>

        {registeredUsers.length === 0 ? (
          <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            No registered users found. Go to Register tab to create one!
          </div>
        ) : (
          <div className="light-user-grid">
            {registeredUsers.map((u) => (
              <div
                key={u.id}
                className={`light-user-card ${activeUser?.id === u.id ? 'selected' : ''}`}
                onClick={() => {
                  setActiveUser(u);
                  setStatusMsg({ type: 'success', text: `Switched active user to ${u.name}` });
                  if (onSelect) onSelect(u);
                }}
              >
                <div className="user-avatar-initials">
                  {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{u.name}</span>
                    {activeUser?.id === u.id && (
                      <span
                        style={{
                          fontSize: '0.72rem',
                          background: 'var(--color-primary)',
                          color: '#ffffff',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: 800,
                        }}
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{u.email}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
