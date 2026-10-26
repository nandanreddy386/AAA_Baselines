// ============================================================================
// AAA Engine — Comprehensive Project Data
// Source of truth: Speech-Synthesis/AAA_Baselines GitHub Repository,
// Backend codebase (main.py, layer1-3, models, db), and Academic Documentation.
// ============================================================================

export const PROJECT = {
  name: 'AAA Engine',
  fullName: 'Adaptive Acoustic Auth (AAA) Engine',
  tagline: 'Adaptive, Challenge-Driven Voice Authentication Against Audio Spoofing',
  subtitle: 'A Plug-and-Play Biometric Security Middleware with Deepfake Immunity',
  institution: 'Amrita School of Computing, Department of Computer Science & Engineering',
  course: '23CSE498 — Engineering Project',
  teamNumber: 'Team 90',
  description:
    'A high-security biometric voice authentication middleware integrating ECAPA-TDNN speaker verification, Wav2Vec2 audio deepfake detection, dynamic challenge-response with Whisper ASR verification, cryptographic HMAC-SHA256 replay protection, and continuous EMA voiceprint adaptation.',
  github: 'https://github.com/Speech-Synthesis/AAA_Baselines',
  guide: {
    name: 'Dr. Harini N',
    title: 'Associate Professor, Department of CSE',
    institution: 'Amrita School of Computing, Amrita Vishwa Vidyapeetham',
    note: 'Faculty Project Guide',
  },
  thresholds: {
    l1Similarity: 0.50,
    l2Spoof: 0.50,
    l3Asr: 0.60,
    tokenTtl: '90s',
    emaAlpha: 0.20,
    audioSpec: 'WAV 16 kHz Mono (Enrollment: min 3-5s, Verification: min 2-3s)',
  },
};

export const TEAM = [
  {
    sNo: 1,
    name: 'M Nandan Reddy',
    regNo: 'CB.SC.U4CSE23431',
    role: 'Layer 2 Deepfake Detection (layer2_deepfake.py)',
    responsibilities:
      'Implemented Wav2Vec2 spoof detection with garystafford/wav2vec2-deepfake-voice-detector, audio preprocessing, softmax probability mapping, and anti-spoof rejection gating.',
    enrichment: {
      course: 'Mastering Generative Voice AI: From Tokens to Agentic TTS',
      platform: 'Udemy',
      hours: '18 Hrs',
    },
  },
  {
    sNo: 2,
    name: 'M Navadeep Kumar',
    regNo: 'CB.SC.U4CSE23434',
    role: 'Backend Middleware & Pipeline Orchestration (main.py, db.py, Docker)',
    responsibilities:
      'FastAPI async pipeline wiring (L2 → ASR → L1 → L3), PostgreSQL Supabase ORM schemas, Docker Compose containerization, and CORS middleware.',
    enrichment: {
      course: 'Mastering Speech & Language Models: From ASR to Emotion AI',
      platform: 'Udemy',
      hours: '18 Hrs',
    },
  },
  {
    sNo: 3,
    name: 'Parise Aditya',
    regNo: 'CB.SC.U4CSE23464',
    role: 'Layer 3 Adaptive Voiceprint, Token Security & React Frontend (layer3_adaptive.py, /frontend)',
    responsibilities:
      'HMAC-SHA256 single-use token issuance with 90s TTL, dynamic phrase generation, exponential moving average voiceprint updates, and 5-page React SaaS client.',
    enrichment: {
      course: 'REST APIs with Python, Flask, Docker, AWS, Git & SQLAlchemy',
      platform: 'Udemy',
      hours: '16 Hrs',
    },
  },
  {
    sNo: 4,
    name: 'AVKB Surya',
    regNo: 'CB.SC.U4CSE23467',
    role: 'Layer 1 Speaker Verification (layer1_speaker.py)',
    responsibilities:
      'SpeechBrain ECAPA-TDNN 192-dimensional acoustic embedding extraction, Windows LocalStrategy.COPY deployment, and cosine similarity metric calculation.',
    enrichment: {
      course: 'HuggingFace Audio Course — Audio Classification & Transformers',
      platform: 'HuggingFace',
      hours: '15 Hrs',
    },
  },
  {
    sNo: 5,
    name: 'M Karthik Srijan',
    regNo: 'CB.SC.U4CSE23534',
    role: 'Security Architecture, Threat Modeling & Replay Protection',
    responsibilities:
      'Zero-trust authentication protocol verification, replay defense specifications, challenge entropy analysis, and database security audits.',
    enrichment: {
      course: 'Complete Cryptography Guide: Secure Data & Networks',
      platform: 'Udemy',
      hours: '14 Hrs',
    },
  },
];

export const PIPELINE_LAYERS = [
  {
    layer: 'Stage 0',
    title: 'Challenge & Cryptography',
    component: 'HMAC-SHA256 Tokenizer',
    spec: 'Dynamic Phrase + 90s TTL Nonce',
    threshold: 'Strict 90s TTL Single-Use',
    codeFile: 'backend/app/layer3_adaptive.py',
    description:
      'Generates randomized dynamic phrase (e.g., "Say: 3 Crimson Falcon 8") and signs a URL-safe token (nonce.expires_ts.sig) valid for exactly 90 seconds. Single-use consumption guarantees zero-replay vulnerability.',
  },
  {
    layer: 'Layer 2',
    title: 'Deepfake & Spoof Gate',
    component: 'Hugging Face Wav2Vec2',
    spec: 'garystafford/wav2vec2-deepfake-voice-detector',
    threshold: 'Spoof Confidence < 0.50',
    codeFile: 'backend/app/layer2_deepfake.py',
    description:
      'Evaluates raw acoustic waveforms to detect synthetic artifacts, text-to-speech vocoders, and replay anomalies before speaker verification. Rejects immediately if spoof probability exceeds 0.50.',
  },
  {
    layer: 'Layer 3 ASR',
    title: 'Challenge Phrase Match',
    component: 'OpenAI Whisper (base)',
    spec: 'SequenceMatcher Text Normalization',
    threshold: 'Similarity Ratio ≥ 0.60',
    codeFile: 'backend/app/layer3_asr.py',
    description:
      'Transcribes spoken user audio and verifies whether the spoken phrase matches the issued challenge phrase. Normalizes numerals and punctuation, rejecting spoofed pre-recorded clips that do not match the prompt.',
  },
  {
    layer: 'Layer 1',
    title: 'Speaker Verification',
    component: 'SpeechBrain ECAPA-TDNN',
    spec: 'speechbrain/spkrec-ecapa-voxceleb (192-dim)',
    threshold: 'Cosine Similarity ≥ 0.50',
    codeFile: 'backend/app/layer1_speaker.py',
    description:
      'Extracts 192-dimensional acoustic identity embedding and computes normalized cosine similarity against the enrolled voiceprint. Blocks impersonation attempts.',
  },
  {
    layer: 'Stage 5',
    title: 'Token Invalidation',
    component: 'HMAC Authenticator',
    spec: 'Timing-safe compare_digest',
    threshold: 'Valid, Unused, Unexpired',
    codeFile: 'backend/app/layer3_adaptive.py',
    description:
      'Validates signature integrity using timing-safe compare_digest and immediately consumes the token in memory and database, rendering replay attempts impossible.',
  },
  {
    layer: 'Layer 3 EMA',
    title: 'Adaptive Voiceprint Shift',
    component: 'Exponential Moving Average',
    spec: 'New = 0.8 × Old + 0.2 × Current (α = 0.2)',
    threshold: 'Only On Full ACCEPT',
    codeFile: 'backend/app/layer3_adaptive.py',
    description:
      'Smoothly adapts the stored 192-dim vector to accommodate natural biological voice drift (aging, acoustic variance, minor illness) without lowering security standards.',
  },
];

export const TECH_STACK = [
  {
    category: 'Client & Audio Encoding',
    items: [
      {
        name: 'React 19 + Vite',
        role: 'Responsive administrative dashboard and client testing interface with real-time audio visualization.',
      },
      {
        name: 'Web Audio API (audioEncoder.js)',
        role: 'In-browser resampler converting browser MediaRecorder WebM/Opus audio to pristine 16kHz Mono 16-bit PCM RIFF WAV format.',
      },
      {
        name: 'OfflineAudioContext',
        role: 'Deterministic audio rendering ensuring standard 16,000 samples/sec for deep learning models.',
      },
    ],
  },
  {
    category: 'Backend & Orchestration',
    items: [
      {
        name: 'Python FastAPI',
        role: 'High-performance asynchronous REST API running on port 8000 orchestrating L2 → ASR → L1 → L3 pipeline.',
      },
      {
        name: 'SQLAlchemy ORM',
        role: 'Database abstraction managing PostgreSQL connections, UUID primary keys, and session lifecycle.',
      },
      {
        name: 'Uvicorn ASGI',
        role: 'Production ASGI server powering non-blocking concurrent request handling.',
      },
    ],
  },
  {
    category: 'Machine Learning & Models',
    items: [
      {
        name: 'SpeechBrain ECAPA-TDNN',
        role: 'Model: speechbrain/spkrec-ecapa-voxceleb. Pretrained 192-dim speaker embeddings with attentive statistics pooling.',
      },
      {
        name: 'Hugging Face Wav2Vec2',
        role: 'Model: garystafford/wav2vec2-deepfake-voice-detector. Audio classification model detecting synthetic voice & vocoder artifacts.',
      },
      {
        name: 'OpenAI Whisper (base)',
        role: 'Robust speech-to-text model running locally for dynamic challenge phrase transcript verification.',
      },
      {
        name: 'PyTorch & torchaudio',
        role: 'Deep learning inference engine with automatic CUDA acceleration and CPU execution fallback.',
      },
    ],
  },
  {
    category: 'Security & Cryptography',
    items: [
      {
        name: 'HMAC-SHA256 Tokenization',
        role: 'Format: nonce.expires_ts.sig. 90-second Time-To-Live, single-use enforcement, hmac.compare_digest timing-safe verification.',
      },
      {
        name: 'Dynamic Challenge Generator',
        role: 'Randomized word & number sequences preventing pre-recorded replay and injection attacks.',
      },
      {
        name: 'EMA Voiceprint Adaptation',
        role: 'Exponential moving average (α = 0.20) updating stored voiceprints only after 100% successful authentication.',
      },
    ],
  },
  {
    category: 'Database & Infrastructure',
    items: [
      {
        name: 'PostgreSQL (Supabase)',
        role: 'Relational database storing users, 192-dim vector arrays, active challenges, and forensic audit logs.',
      },
      {
        name: 'Docker & Docker Compose',
        role: 'Multi-service container orchestration packaging FastAPI backend and database services.',
      },
    ],
  },
];

export const API_ENDPOINTS = [
  {
    method: 'GET',
    path: '/',
    purpose: 'Health check and service status confirmation.',
    params: [],
    request: 'curl -X GET http://localhost:8000/',
    response: `{
  "message": "AAA Engine API",
  "status": "running"
}`,
    notes: 'Used by the frontend to detect live backend availability.',
  },
  {
    method: 'GET',
    path: '/users',
    purpose: 'Retrieves all registered user profiles with voiceprint enrollment status.',
    params: [],
    request: 'curl -X GET http://localhost:8000/users',
    response: `[
  {
    "id": "4a7b9c21-83d2-4e9a-bb10-9f1234567890",
    "name": "Dr. Harini N",
    "email": "harini@amrita.edu",
    "created_at": "2026-10-21T09:15:00Z",
    "has_voiceprint": true
  }
]`,
    notes: 'Orders users by created_at descending.',
  },
  {
    method: 'POST',
    path: '/auth/register',
    purpose: 'Registers a new user identity profile before voice enrollment.',
    params: [
      { name: 'name', type: 'string (JSON)', description: 'Full name of the user.' },
      { name: 'email', type: 'string (JSON)', description: 'Unique email address.' },
    ],
    request: `curl -X POST http://localhost:8000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Aditya Sharma", "email": "aditya@example.com"}'`,
    response: `{
  "user_id": "9b12c8f4-3d71-4a92-9e81-5f2187b409cd"
}`,
    notes: 'Rejects with HTTP 400 if email is already registered.',
  },
  {
    method: 'POST',
    path: '/auth/enroll',
    purpose: 'Extracts ECAPA-TDNN 192-dim embedding and stores/updates voiceprint.',
    params: [
      { name: 'user_id', type: 'UUID (form-data)', description: 'UUID of the registered user.' },
      { name: 'audio', type: 'File (multipart)', description: 'WAV 16kHz mono audio (minimum 3-5 seconds).' },
    ],
    request: `curl -X POST http://localhost:8000/auth/enroll \\
  -F "user_id=9b12c8f4-3d71-4a92-9e81-5f2187b409cd" \\
  -F "audio=@enrollment_sample.wav"`,
    response: `{
  "status": "enrolled",
  "sample_count": 3
}`,
    notes: 'If voiceprint exists, applies EMA adaptation to smoothly incorporate the new sample.',
  },
  {
    method: 'GET',
    path: '/auth/challenge',
    purpose: 'Issues a dynamic challenge phrase and HMAC-SHA256 signed token with 90s TTL.',
    params: [
      { name: 'user_id', type: 'UUID (query string)', description: 'Target user ID.' },
    ],
    request: 'curl -X GET "http://localhost:8000/auth/challenge?user_id=9b12c8f4-3d71-4a92-9e81-5f2187b409cd"',
    response: `{
  "phrase": "Say: 7 Crimson Falcon 4",
  "token": "a1b2c3d4e5f60718.1764289000.8f1e2d3c4b5a...",
  "expires_at": "2026-10-26T11:45:00Z"
}`,
    notes: 'Format: nonce.expires_ts.sig. Token is strictly single-use and expires after 90 seconds.',
  },
  {
    method: 'POST',
    path: '/auth/verify',
    purpose: 'Core authentication pipeline: L2 Deepfake Gate → L3 ASR Phrase Match → L1 Speaker Verification → L3 Token Check → EMA Update.',
    params: [
      { name: 'user_id', type: 'UUID (form-data)', description: 'Claimed identity UUID.' },
      { name: 'token', type: 'string (form-data)', description: 'Signed challenge token.' },
      { name: 'audio', type: 'File (multipart)', description: 'Spoken challenge audio clip.' },
    ],
    request: `curl -X POST http://localhost:8000/auth/verify \\
  -F "user_id=9b12c8f4-3d71-4a92-9e81-5f2187b409cd" \\
  -F "token=a1b2c3d4e5f60718.1764289000.8f1e2d3c4b5a..." \\
  -F "audio=@verification_response.wav"`,
    response: `{
  "result": "ACCEPT",
  "confidence": 0.884,
  "layer_blocked": null,
  "session_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "reason": "Authentication successful",
  "l2_label": "bonafide",
  "l2_confidence": 0.985,
  "l1_score": 0.884,
  "asr_transcript": "7 crimson falcon 4",
  "asr_similarity": 1.0
}`,
    errorResponse: `{
  "result": "REJECT",
  "confidence": 0.923,
  "layer_blocked": 2,
  "session_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "reason": "Deepfake/spoof detected",
  "l2_label": "spoof",
  "l2_confidence": 0.923,
  "l1_score": 0.0,
  "asr_transcript": null,
  "asr_similarity": null
}`,
    notes: 'Blocked layers: 1 = Speaker Mismatch, 2 = Deepfake Detected, 3 = Expired/Invalid Token, 4 = Challenge Phrase Mismatch.',
  },
  {
    method: 'GET',
    path: '/users/{id}/voiceprint-history',
    purpose: 'Returns historical voiceprint adaptation and sample count timeline.',
    params: [
      { name: 'id', type: 'UUID (path)', description: 'User ID.' },
    ],
    request: 'curl -X GET http://localhost:8000/users/9b12c8f4-3d71-4a92-9e81-5f2187b409cd/voiceprint-history',
    response: `[
  {
    "updated_at": "2026-10-26T10:45:00Z",
    "sample_count": 4
  },
  {
    "updated_at": "2026-10-26T09:30:00Z",
    "sample_count": 3
  }
]`,
    notes: 'Used to audit biological voice evolution and verify EMA stability.',
  },
  {
    method: 'GET',
    path: '/users/{id}/auth-logs',
    purpose: 'Returns detailed forensic logs of the last 50 authentication attempts for a user.',
    params: [
      { name: 'id', type: 'UUID (path)', description: 'User ID.' },
    ],
    request: 'curl -X GET http://localhost:8000/users/9b12c8f4-3d71-4a92-9e81-5f2187b409cd/auth-logs',
    response: `[
  {
    "id": "c1a9382b-4e12-4f90-bc41-89d123456789",
    "user_id": "9b12c8f4-3d71-4a92-9e81-5f2187b409cd",
    "l2_label": "bonafide",
    "l2_confidence": 0.985,
    "l1_score": 0.884,
    "result": "ACCEPT",
    "layer_blocked": null,
    "created_at": "2026-10-26T10:45:00Z",
    "reason": "Authentication successful"
  }
]`,
    notes: 'Audit log stores full forensic metrics for enterprise compliance.',
  },
];

export const DB_SCHEMA = {
  tables: [
    {
      name: 'users',
      description: 'Stores user credentials and profile identity data.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Unique user identifier' },
        { name: 'name', type: 'TEXT', constraint: 'NOT NULL', description: 'User full legal name' },
        { name: 'email', type: 'TEXT', constraint: 'UNIQUE NOT NULL', description: 'Unique user email address' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT now()', description: 'Account registration timestamp' },
      ],
    },
    {
      name: 'voiceprints',
      description: 'Stores enrolled 192-dimensional ECAPA-TDNN acoustic embeddings and sample counters.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Voiceprint identifier' },
        { name: 'user_id', type: 'UUID', constraint: 'REFERENCES users(id) ON DELETE CASCADE', description: 'Foreign key to users table' },
        { name: 'embedding', type: 'FLOAT8[192] / JSON', constraint: 'NOT NULL', description: '192-dim ECAPA-TDNN vector' },
        { name: 'sample_count', type: 'INT', constraint: 'DEFAULT 1', description: 'Count of enrolled/adapted audio samples' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT now()', description: 'Initial enrollment timestamp' },
        { name: 'updated_at', type: 'TIMESTAMP', constraint: 'DEFAULT now()', description: 'Latest EMA adaptation timestamp' },
      ],
    },
    {
      name: 'challenges',
      description: 'Maintains active challenge phrases and cryptographic HMAC session tokens.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Challenge identifier' },
        { name: 'user_id', type: 'UUID', constraint: 'REFERENCES users(id) ON DELETE CASCADE', description: 'User requesting challenge' },
        { name: 'phrase', type: 'TEXT', constraint: 'NOT NULL', description: 'Dynamic challenge phrase to speak' },
        { name: 'token', type: 'TEXT', constraint: 'NOT NULL', description: 'HMAC signature string (nonce.expires_ts.sig)' },
        { name: 'expires_at', type: 'TIMESTAMP', constraint: 'NOT NULL', description: 'Token expiration (strictly 90s TTL)' },
        { name: 'used', type: 'BOOLEAN', constraint: 'DEFAULT FALSE', description: 'Single-use consumption enforcement' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT now()', description: 'Challenge issuance timestamp' },
      ],
    },
    {
      name: 'auth_logs',
      description: 'Immutable forensic audit trail capturing every authentication attempt and model score.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY DEFAULT gen_random_uuid()', description: 'Log entry identifier' },
        { name: 'user_id', type: 'UUID', constraint: 'REFERENCES users(id) ON DELETE CASCADE', description: 'Target user identity' },
        { name: 'challenge_id', type: 'UUID', constraint: 'REFERENCES challenges(id) NULLABLE', description: 'Associated challenge session' },
        { name: 'l2_label', type: 'TEXT', constraint: 'NULLABLE', description: 'Deepfake label (bonafide / spoof)' },
        { name: 'l2_confidence', type: 'FLOAT', constraint: 'NULLABLE', description: 'Wav2Vec2 confidence score' },
        { name: 'l1_score', type: 'FLOAT', constraint: 'NULLABLE', description: 'ECAPA-TDNN cosine similarity score' },
        { name: 'result', type: 'TEXT', constraint: 'NOT NULL', description: 'Final decision: ACCEPT or REJECT' },
        { name: 'layer_blocked', type: 'INT', constraint: 'NULLABLE', description: 'Blocked layer (1=Speaker, 2=Spoof, 3=Token, 4=ASR)' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT now()', description: 'Evaluation timestamp' },
      ],
    },
  ],
};

export const IMPLEMENTATION_MATRIX = [
  {
    component: 'Layer 1: Speaker Verification',
    model: 'SpeechBrain ECAPA-TDNN (VoxCeleb)',
    status: 'Implemented & Verified',
    phase: 'Phase 1 Checkpoint',
    details:
      'Extracts 192-dim embeddings using speechbrain/spkrec-ecapa-voxceleb. Computes clamped cosine similarity max(0, cos_sim). Threshold tuned to 0.50 (lowered from 0.70 to prevent false rejects on diverse microphones). LocalStrategy.COPY prevents Windows symlink failures.',
  },
  {
    component: 'Layer 2: Deepfake & Audio Anti-Spoofing',
    model: 'garystafford/wav2vec2-deepfake-voice-detector',
    status: 'Implemented & Verified',
    phase: 'Phase 1 Checkpoint',
    details:
      'Fine-tuned Hugging Face Wav2Vec2 model for binary audio classification ({0: real, 1: fake} mapped to bonafide / spoof). Evaluates raw waveform with softmax logits. Threshold: 0.50. Evaluated against replay & TTS attacks.',
  },
  {
    component: 'Layer 3 ASR: Challenge Phrase Matching',
    model: 'OpenAI Whisper (base)',
    status: 'Implemented & Verified',
    phase: 'Phase 1 Checkpoint',
    details:
      'Added in commit e3b5af2. Transcribes spoken response and computes difflib SequenceMatcher similarity ratio against normalized challenge phrase. Rejects if similarity < 0.60 with Layer 4 code.',
  },
  {
    component: 'Layer 3: Challenge-Response & Cryptographic Tokens',
    model: 'HMAC-SHA256 Token Engine',
    status: 'Implemented & Verified',
    phase: 'Phase 1 Checkpoint',
    details:
      'Randomized phrase generator (dynamic pool + static sentences). Cryptographic token format nonce.expires_ts.sig signed with secret key. Timing-safe comparison (hmac.compare_digest) and strict 90s TTL with single-use consumption in memory and DB.',
  },
  {
    component: 'Layer 3: Adaptive Voiceprint Evolution',
    model: 'EMA Algorithm (α = 0.20)',
    status: 'Implemented & Verified',
    phase: 'Phase 1 Checkpoint',
    details:
      'Updates stored 192-dim vector according to New = 0.8 × Old + 0.2 × Current upon enrollment and after every fully verified ACCEPT result. Smoothly tracks acoustic drift.',
  },
  {
    component: 'Backend API & Database',
    model: 'FastAPI + SQLAlchemy + PostgreSQL',
    status: 'Implemented & Verified',
    phase: 'Phase 1 Checkpoint',
    details:
      'All 8 REST endpoints implemented with Pydantic schemas, dependency injection, and automatic table creation. Hosted on PostgreSQL / Supabase with Docker Compose.',
  },
  {
    component: 'Client UI & Web Audio Processing',
    model: 'React Vite + Web Audio API',
    status: 'Implemented & Verified',
    phase: 'Phase 1 Checkpoint',
    details:
      'Full 5-page SaaS workflow (Register, Enroll 3 samples, Authenticate with 90s timer, Dashboard Analytics). In-browser 16kHz WAV resampling via OfflineAudioContext.',
  },
  {
    component: 'Model Fine-Tuning on ASVspoof2019 / VoxCeleb1',
    model: 'Wav2Vec2BERT + ECAPA-TDNN',
    status: 'Planned for Phase 2',
    phase: 'Phase 2 / HPC Cluster',
    details:
      'Fine-tuning Wav2Vec2BERT on ASVspoof 2019 LA and evaluating on 2021 DF using Amrita HPC GPU cluster. Benchmarking ECAPA-TDNN Equal Error Rate (EER) targeting < 0.87% on VoxCeleb1.',
  },
  {
    component: 'Pip Middleware Package',
    model: 'Framework-Agnostic Python SDK',
    status: 'Planned for Phase 2',
    phase: 'Future Semester',
    details:
      'Packaging AAA Engine as a drop-in pip library with pluggable backend decorators for FastAPI, Flask, and Django.',
  },
];

export const NOVELTY_COMPARISON = [
  {
    feature: 'Dual-Layer Architecture',
    traditional: 'Separate or isolated solutions (speaker verification only)',
    commercial: 'Often vendor-locked, black-box cloud APIs',
    aaaEngine: 'Cascaded L2 Deepfake Gate → L3 ASR → L1 Speaker Verification in a single zero-trust pipeline',
  },
  {
    feature: 'Anti-Spoofing Integration',
    traditional: 'None or simple heuristic pitch/energy checks',
    commercial: 'Basic replay detection without open synthetic weights',
    aaaEngine: 'Transformer-based Wav2Vec2 audio classification evaluating raw spectral artifacts',
  },
  {
    feature: 'Dynamic Challenge Replay Defense',
    traditional: 'Static passphrases ("My voice is my password")',
    commercial: 'SMS/TOTP multi-factor (disruptive UX)',
    aaaEngine: 'HMAC-SHA256 single-use tokens with 90s TTL + dynamic phrase spoken verification via Whisper',
  },
  {
    feature: 'Voiceprint Adaptation',
    traditional: 'Static template created once at enrollment',
    commercial: 'Opaque periodic batch re-training',
    aaaEngine: 'Continuous, verified Exponential Moving Average (α = 0.2) tracking natural biological drift',
  },
  {
    feature: 'Deployment Form Factor',
    traditional: 'Desktop research scripts (MATLAB/Python notebooks)',
    commercial: 'Expensive proprietary enterprise SaaS',
    aaaEngine: 'Open-source FastAPI middleware + Docker containerization with client-side 16kHz resampling',
  },
];

export const ACADEMIC_REFERENCES = [
  {
    id: 1,
    title: 'ECAPA-TDNN: Emphasized Channel Attention, Propagation and Aggregation in TDNN Based Speaker Verification',
    authors: 'B. Desplanques, J. Thienpondt, K. Demuynck',
    venue: 'Interspeech 2020',
    details: 'Foundation paper for our Layer 1 speaker verification embedding model.',
  },
  {
    id: 2,
    title: 'wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations',
    authors: 'A. Baevski, H. Zhou, A. Mohamed, M. Auli',
    venue: 'NeurIPS 2020',
    details: 'Underlying self-supervised representation used by our Layer 2 deepfake detector.',
  },
  {
    id: 3,
    title: 'Robust Speech Recognition via Large-Scale Weak Supervision',
    authors: 'A. Radford, J. W. Kim, T. Xu, G. Brockman, C. McLeavey, I. Sutskever',
    venue: 'OpenAI Whisper Technical Report 2022',
    details: 'Speech-to-text model powering our Layer 3 ASR spoken challenge verification.',
  },
  {
    id: 4,
    title: 'ASVspoof 2019: The 3rd Automatic Speaker Verification Spoofing and Countermeasures Challenge',
    authors: 'M. Todisco, X. Wang, V. Vestman, et al.',
    venue: 'Interspeech 2019',
    details: 'Standard benchmark dataset and threat taxonomy for physical replay and logical access attacks.',
  },
  {
    id: 5,
    title: 'VoxCeleb: A Large-Scale Speaker Identification Dataset',
    authors: 'A. Nagrani, J. S. Chung, A. Zisserman',
    venue: 'Interspeech 2017',
    details: 'Speaker recognition dataset used for training the ECAPA-TDNN weights.',
  },
];
