// ============================================================================
// AAA Engine — Project Data
// Central data file for all project content extracted from source documents and
// the official Project Review Presentation (23CSE498 - Phase 2 Panel Review 1).
// ============================================================================

export const PROJECT = {
  name: 'AAA Engine',
  fullName: 'Adaptive Acoustic Auth (AAA) Engine',
  tagline: 'Adaptive, Challenge-Driven Voice Authentication Against Audio Spoofing',
  subtitle: 'A Plug-and-Play Biometric Security Middleware with Deepfake Immunity',
  institution: 'Amrita School of Computing, Department of CSE',
  description:
    'A plug-and-play biometric security middleware that combines speaker verification (ECAPA-TDNN), audio anti-spoofing / deepfake detection (Wav2Vec2 / Wav2Vec2BERT), challenge-response active liveness authentication (HMAC-SHA256), and adaptive voiceprint updates (EMA).',
  github: 'https://github.com/Speech-Synthesis/AAA_Baselines',
  guide: {
    name: 'Dr. Harini N',
    title: 'Associate Professor, Department of CSE',
    institution: 'Amrita School of Computing',
    note: 'Faculty Project Guide',
  },
  thresholds: {
    l1Similarity: 0.70,
    l2Spoof: 0.50,
    tokenTtl: '90s',
    emaAlpha: 0.20,
    audioSpec: 'WAV · 16 kHz · Mono (Enroll: min 5s, Verify: min 2–3s)',
  }
};

export const TEAM = [
  {
    sNo: 1,
    name: 'M Nandan Reddy',
    regNo: 'CB.SC.U4CSE23431',
    role: 'Layer 2 Deepfake Detection (layer2_deepfake.py)',
    enrichment: {
      course: 'Mastering Generative Voice AI: From Tokens to Agentic TTS',
      platform: 'Udemy',
      hours: '18 Hrs'
    }
  },
  {
    sNo: 2,
    name: 'M Navadeep Kumar',
    regNo: 'CB.SC.U4CSE23434',
    role: 'API Middleware & Pipeline Orchestration (main.py, db.py)',
    enrichment: {
      course: 'Mastering Speech & Language Models: From ASR to Emotion AI',
      platform: 'Udemy',
      hours: '18 Hrs'
    }
  },
  {
    sNo: 3,
    name: 'Parise Aditya',
    regNo: 'CB.SC.U4CSE23464',
    role: 'Layer 3 Adaptive Voiceprint & Token Logic (layer3_adaptive.py)',
    enrichment: {
      course: 'REST APIs with Python, Flask, Docker, AWS, Git & SQLAlchemy',
      platform: 'Udemy',
      hours: '16 Hrs'
    }
  },
  {
    sNo: 4,
    name: 'AVKB Surya',
    regNo: 'CB.SC.U4CSE23467',
    role: 'Layer 1 Speaker Verification (layer1_speaker.py)',
    enrichment: {
      course: 'HuggingFace Audio Course — Audio Classification & Transformers',
      platform: 'HuggingFace',
      hours: '15 Hrs'
    }
  },
  {
    sNo: 5,
    name: 'M Karthik Srijan',
    regNo: 'CB.SC.U4CSE23534',
    role: 'Security Architecture, Tokens & Cryptography',
    enrichment: {
      course: 'Complete Cryptography Guide: Secure Data & Networks',
      platform: 'Udemy',
      hours: '14 Hrs'
    }
  },
];

export const TECH_STACK = [
  {
    category: 'Frontend & Client',
    icon: '🖥️',
    items: [
      {
        name: 'React (Vite)',
        role: '5-page responsive demo client and admin dashboard running on localhost:5173 with browser microphone capture and live pipeline visualization.',
      },
      {
        name: 'audioEncoder.js',
        role: 'In-browser real-time audio conversion encoding WebM mic stream to 16kHz mono PCM WAV required by the AI inference engine.',
      },
      {
        name: 'Streamlit',
        role: 'Alternative lightweight rapid-testing dashboard for visual analytics including auth rates, spoofing attempts, and drift metrics.',
      },
    ],
  },
  {
    category: 'Backend & API Middleware',
    icon: '⚡',
    items: [
      {
        name: 'Python FastAPI',
        role: 'High-concurrency async REST API framework (port 8000) with Pydantic v2 response models, async multipart audio upload, and Depends(get_db) session injection.',
      },
      {
        name: 'SQLAlchemy ORM',
        role: 'Database abstraction managing PostgreSQL connections, native ARRAY(Float) embedding columns, and session lifecycle.',
      },
      {
        name: 'Uvicorn',
        role: 'ASGI web server implementation with auto-reload powering high-throughput asynchronous inference handling.',
      }
    ],
  },
  {
    category: 'Machine Learning & AI Core',
    icon: '🧠',
    items: [
      {
        name: 'ECAPA-TDNN (SpeechBrain)',
        role: 'Layer 1 Speaker Verification — generates 192-dim voice embeddings with channel attention and attentive statistics pooling. Local .pth weights with LocalStrategy.COPY.',
      },
      {
        name: 'Custom Wav2Vec2 / Wav2Vec2BERT',
        role: 'Layer 2 Deepfake Detector — locally fine-tuned checkpoint on ASVspoof 2019 LA; lazy-loaded from disk on first request; {0:real, 1:fake} logits → softmax.',
      },
      {
        name: 'PyTorch & Hugging Face',
        role: 'Underlying deep learning runtime supporting automatic CUDA GPU acceleration and CPU fallback.',
      },
    ],
  },
  {
    category: 'Audio Processing',
    icon: '🎵',
    items: [
      {
        name: 'LibROSA',
        role: 'Audio silence trimming, 16kHz mono resampling, and fallback decoder for browser WebM audio.',
      },
      {
        name: 'torchaudio',
        role: 'Direct tensor audio decoding and FBANK feature extraction for model inputs.',
      },
    ],
  },
  {
    category: 'Database & Storage',
    icon: '🗄️',
    items: [
      {
        name: 'PostgreSQL',
        role: 'Primary relational data tier with native ARRAY(Float) column for 192-dim embeddings, users, challenges, and auth_logs. No external vector DB needed.',
      },
    ],
  },
  {
    category: 'Security & Protocols',
    icon: '🔒',
    items: [
      {
        name: 'HMAC-SHA256 Tokenization',
        role: 'Format: nonce.expires_ts.sig; 90s TTL; single-use in-memory store; hmac.compare_digest timing-safe verification for production-grade replay protection.',
      },
      {
        name: 'Dynamic Challenge Generator',
        role: '60% randomised phrase (Say: {num} {colour} {object} {num}) + 40% static pool to defeat pre-recorded injection at the protocol layer.',
      },
      {
        name: 'Exponential Moving Average (EMA)',
        role: 'Layer 3 adaptive voiceprint update with α = 0.2 (0.8 × Old + 0.2 × Current) applied on enrollment and successful verification.',
      }
    ],
  },
  {
    category: 'Containerisation & Deployment',
    icon: '📦',
    items: [
      {
        name: 'Docker & Docker Compose',
        role: 'Multi-service container orchestration packaging FastAPI backend and PostgreSQL database with port bindings (8000, 5432).',
      },
    ],
  },
];

export const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/auth/register',
    purpose: 'Initial user registration in the system creating a new user record before biometric voice enrollment.',
    params: [
      { name: 'name', type: 'string (json)', description: 'Full name of the user.' },
      { name: 'email', type: 'string (json)', description: 'Unique user email address.' },
    ],
    request: `{
  "name": "Jane Doe",
  "email": "jane.doe@example.com"
}`,
    response: `{
  "user_id": "4a7b9c21-83d2-4e9a-bb10-9f1234567890"
}`,
    notes: 'Initial user registration endpoint generating a unique UUID for subsequent biometric voice enrollment.',
  },
  {
    method: 'POST',
    path: '/auth/enroll',
    purpose: 'Voice enrollment endpoint. Accepts minimum 5 seconds of audio, extracts 192-dim ECAPA-TDNN embedding, applies EMA, and stores voiceprint in PostgreSQL.',
    params: [
      { name: 'user_id', type: 'string (form)', description: 'UUID of the registered user.' },
      { name: 'audio', type: 'file (multipart)', description: 'Minimum 5 seconds 16kHz WAV mono audio.' },
    ],
    request: `curl -X POST http://localhost:8000/auth/enroll \\
  -F "user_id=4a7b9c21-83d2-4e9a-bb10-9f1234567890" \\
  -F "audio=@enroll_sample.wav"`,
    response: `{
  "status": "enrolled",
  "sample_count": 1,
  "embedding_dim": 192,
  "message": "Voiceprint enrolled successfully"
}`,
    notes: 'Applies EMA averaging if re-enrolling or updating sample_count. Raw audio is never persisted.',
  },
  {
    method: 'GET',
    path: '/auth/challenge',
    purpose: 'Issues a randomised or structured challenge phrase and HMAC-SHA256 signed token with a 90-second Time-To-Live (TTL).',
    params: [
      { name: 'user_id', type: 'string (query)', description: 'UUID of the user attempting verification.' },
    ],
    request: `curl -X GET "http://localhost:8000/auth/challenge?user_id=4a7b9c21-83d2-4e9a-bb10-9f1234567890"`,
    response: `{
  "phrase": "Say: 9 Red Chair 47",
  "token": "4a7b9c21.1764289000.a94f83b27c...",
  "expires_at": "2026-09-18T14:32:00Z"
}`,
    notes: 'Token format is nonce.expires_ts.sig. 60% randomised phrase pool + 40% static. Enforced single-use.',
  },
  {
    method: 'POST',
    path: '/auth/verify',
    purpose: 'Core verification gate. Runs Layer 2 (Deepfake Gate) -> Layer 1 (Speaker Verification) -> Layer 3 (EMA Voiceprint Update).',
    params: [
      { name: 'user_id', type: 'string (form)', description: 'UUID of the user.' },
      { name: 'token', type: 'string (form)', description: 'HMAC token from /auth/challenge.' },
      { name: 'audio', type: 'file (multipart)', description: 'Spoken challenge response (min 2–3s, 16kHz WAV mono).' },
    ],
    request: `curl -X POST http://localhost:8000/auth/verify \\
  -F "user_id=4a7b9c21-83d2-4e9a-bb10-9f1234567890" \\
  -F "token=4a7b9c21.1764289000.a94f83b27c..." \\
  -F "audio=@spoken_challenge.wav"`,
    response: `{
  "result": "ACCEPT",
  "confidence": 0.942,
  "layer_blocked": null,
  "session_id": "9c1b7a23-45f6-78d9-0123-abcdef456789",
  "reason": "Authentication successful",
  "l2_label": "bonafide",
  "l2_confidence": 0.985,
  "l1_score": 0.884
}`,
    errorResponse: `{
  "result": "REJECT",
  "confidence": 0.12,
  "layer_blocked": 2,
  "session_id": "9c1b7a23-45f6-78d9-0123-abcdef456789",
  "reason": "Audio classified as spoof by Layer 2 anti-spoofing gate",
  "l2_label": "spoof",
  "l2_confidence": 0.912,
  "l1_score": null
}`,
    notes: 'Layer 2 blocks spoofed audio before Layer 1 embedding computation. Thresholds: L2 spoof = 0.5, L1 similarity = 0.70.',
  },
  {
    method: 'GET',
    path: '/users/{id}/voiceprint-history',
    purpose: 'Auditing endpoint returning the history of voiceprint updates, adaptive drift events, and authentication attempts for an individual user.',
    params: [
      { name: 'id', type: 'string (path)', description: 'UUID of user.' },
    ],
    request: `curl -X GET "http://localhost:8000/users/4a7b9c21-83d2-4e9a-bb10-9f1234567890/voiceprint-history"`,
    response: `[
  {
    "timestamp": "2026-09-18T14:30:00Z",
    "event": "adaptive_update",
    "alpha": 0.2,
    "similarity": 0.884,
    "result": "ACCEPT"
  }
]`,
    notes: 'Supports auditing compliance and monitoring natural voice drift over time.',
  },
];

export const DB_SCHEMA = {
  tables: [
    {
      name: 'users',
      description: 'Stores core account identities and contact information.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Unique user identifier' },
        { name: 'name', type: 'VARCHAR(255)', constraint: 'NOT NULL', description: 'User full name' },
        { name: 'email', type: 'VARCHAR(255)', constraint: 'UNIQUE, NOT NULL', description: 'User email address' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Account creation timestamp' },
      ],
    },
    {
      name: 'voiceprints',
      description: 'Stores enrolled 192-dimensional ECAPA-TDNN speaker embeddings with sample counts.',
      fields: [
        { name: 'user_id', type: 'UUID', constraint: 'FK → users.id, PK', description: 'Reference to user' },
        { name: 'embedding', type: 'ARRAY(Float)', constraint: 'NOT NULL', description: '192-dim ECAPA-TDNN voiceprint vector' },
        { name: 'sample_count', type: 'INTEGER', constraint: 'DEFAULT 1', description: 'Count of enrollment and verified update samples' },
        { name: 'updated_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Last adaptive update timestamp' },
      ],
    },
    {
      name: 'challenges',
      description: 'Maintains active challenge phrases and cryptographic HMAC-SHA256 session tokens.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Unique challenge identifier' },
        { name: 'user_id', type: 'UUID', constraint: 'FK → users.id', description: 'User targeted by challenge' },
        { name: 'phrase', type: 'TEXT', constraint: 'NOT NULL', description: 'Randomised spoken challenge text' },
        { name: 'token', type: 'TEXT', constraint: 'NOT NULL', description: 'HMAC signature token (nonce.expires_ts.sig)' },
        { name: 'expires_at', type: 'TIMESTAMP', constraint: 'NOT NULL', description: 'Expiration timestamp (90s TTL)' },
        { name: 'used', type: 'BOOLEAN', constraint: 'DEFAULT FALSE', description: 'Single-use consumption enforcement' },
      ],
    },
    {
      name: 'auth_logs',
      description: 'Audit log capturing every authentication attempt, pipeline scores, and blocking layer information.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Log entry identifier' },
        { name: 'user_id', type: 'UUID', constraint: 'FK → users.id', description: 'User evaluated' },
        { name: 'challenge_id', type: 'UUID', constraint: 'FK → challenges.id', description: 'Associated challenge' },
        { name: 'l2_label', type: 'VARCHAR(20)', constraint: '', description: 'Anti-spoof classification (bonafide / spoof)' },
        { name: 'l2_confidence', type: 'FLOAT', constraint: '', description: 'Wav2Vec2 confidence score' },
        { name: 'l1_score', type: 'FLOAT', constraint: '', description: 'ECAPA-TDNN cosine similarity score' },
        { name: 'result', type: 'VARCHAR(20)', constraint: 'NOT NULL', description: 'Final decision: ACCEPT or REJECT' },
        { name: 'layer_blocked', type: 'INTEGER', constraint: 'NULLABLE', description: 'Blocked layer ID (1, 2, or NULL)' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT NOW()', description: 'Execution timestamp' },
      ],
    },
  ],
};

export const IMPLEMENTATION_STATUS = [
  {
    module: 'Infra + Backend (main.py, db.py, models.py)',
    lead: 'M Navadeep Kumar',
    state: 'PostgreSQL via SQLAlchemy ORM; all 5 FastAPI routes live; Pydantic v2 response models; L2→L1→L3 pipeline in POST /auth/verify; EMA applied on /enroll AND on successful /verify.',
    status: 'Integrated',
  },
  {
    module: 'Layer 1 Speaker Verification (layer1_speaker.py)',
    lead: 'AVKB Surya',
    state: 'Custom ECAPA-TDNN instantiated from local .pth weights; LocalStrategy.COPY bypasses Windows symlink restriction; librosa fallback for browser audio; 192-dim cosine sim normalised to 0–1.',
    status: 'Functional',
  },
  {
    module: 'Layer 2 Deepfake Detection (layer2_deepfake.py)',
    lead: 'M Nandan Reddy',
    state: 'Locally fine-tuned Wav2Vec2 checkpoint (trained on ASVspoof 2019 LA); lazy-loaded from disk on first request; maps {0:real, 1:fake} logits → softmax → {bonafide/spoof, confidence}; CUDA auto-detected.',
    status: 'Functional',
  },
  {
    module: 'Layer 3 + Frontend (layer3_adaptive.py, /frontend)',
    lead: 'Parise Aditya',
    state: 'HMAC-SHA256 tokens (nonce.expires_ts.sig, 90s TTL, single-use, timing-safe compare_digest); dynamic challenge phrases (60% randomised Say: {num} {colour} {object} {num} + 40% static); React Vite frontend with 5 pages.',
    status: 'Integrated',
  },
  {
    module: 'Phase 2 Integration Demonstration',
    lead: 'Full Team (Team 90)',
    state: 'All 4 branches merged; enroll → challenge → verify end-to-end tested — ACCEPT + REJECT (Layer 2 blocked & Layer 1 blocked) both demonstrated live to panel.',
    status: 'Demonstrated Live',
  }
];

export const UPCOMING_SEMESTER_PLANS = [
  {
    title: 'Middleware-First Redesign',
    details: 'Package AAA as a drop-in, framework-agnostic auth middleware (pip-installable). Provide ready-made adapter wrappers for FastAPI, Flask, and Express.js with pluggable model backends.',
  },
  {
    title: 'Layer 1 Upgrade — Speaker Verification',
    details: 'Benchmark ECAPA-TDNN EER on VoxCeleb1 targeting ≤ 0.87% (vs 3.1% x-vector baseline). Tune cosine similarity threshold beyond current 0.70 on dev split to minimize FAR/FRR.',
  },
  {
    title: 'Layer 2 Upgrade — Deepfake Detection',
    details: 'Upgrade existing locally trained Wav2Vec2 baseline to fine-tuned Wav2Vec2BERT on ASVspoof 2019 LA using Amrita HPC (V100, FP16). Evaluate on ASVspoof 2021 DF to beat LFCC-LCNN (~15–20% EER) and RawNet2 (~10–14% EER).',
  },
  {
    title: 'In-House Deepfake Voice Generator (Red Teaming)',
    details: 'Build voice-cloning TTS generator (YourTTS/XTTS zero-shot) to synthesize adversarial spoof samples in-house. Closes-the-loop red-teaming with target > 95% Layer 2 detection rate.',
  },
  {
    title: 'Challenge-Response Enhancement',
    details: 'Integrate Whisper-tiny ASR to confirm spoken words match challenge phrase (closing semantic liveness gap). Migrate token store from in-memory dictionary to Redis for multi-worker safety.',
  },
  {
    title: 'Voiceprint & Drift Tracking',
    details: 'Add drift_history table to log old/new embedding, cosine delta, and timestamp. Adjust enrollment minimum from 5s to 10s and tune EMA α ∈ {0.7, 0.8, 0.9} on real drift data.',
  },
  {
    title: 'Security Hardening & Load Evaluation',
    details: 'Implement rate limiting on /auth/verify and IP abuse detection in auth_logs. Run Locust load tests simulating 50 concurrent users with target p95 latency < 1.5s.',
  }
];

export const COMPARISON_TABLE = [
  {
    feature: 'Challenge–Response (Active Liveness)',
    hsbc: false, google: false, asvspoof: false, aaa: true,
  },
  {
    feature: 'Wav2Vec2 / Wav2Vec2BERT Deepfake Detection',
    hsbc: false, google: false, asvspoof: 'Partial', aaa: true,
  },
  {
    feature: 'Dynamic Voiceprint Update (EMA α=0.2)',
    hsbc: false, google: false, asvspoof: false, aaa: true,
  },
  {
    feature: 'Zero-Shot Clone Resistance',
    hsbc: false, google: false, asvspoof: 'Partial', aaa: true,
  },
  {
    feature: 'Plug-and-Play Middleware Architecture',
    hsbc: false, google: 'Partial', asvspoof: false, aaa: true,
  },
  {
    feature: 'Replay Attack Prevention (HMAC-SHA256)',
    hsbc: false, google: false, asvspoof: true, aaa: true,
  },
  {
    feature: 'Natural Voice Drift Adaptation',
    hsbc: false, google: false, asvspoof: false, aaa: true,
  },
];

export const REFERENCES = [
  { id: '1', authors: 'J. Yamagishi et al.', year: 2021, title: 'ASVspoof 2021: Accelerating Progress in Spoofed and Deepfake Speech Detection', venue: 'ASVspoof Consortium', link: 'https://arxiv.org/abs/2109.05581' },
  { id: '2', authors: 'K. Liou et al.', year: 2024, title: 'Enhancing ECAPA-TDNN with Feature Processing Module and Attention Mechanism for Speaker Verification', venue: 'Interspeech / arXiv', link: 'https://arxiv.org/abs/2406.12345' },
  { id: '3', authors: 'A. Borodin et al.', year: 2024, title: 'AASIST3: KAN-Enhanced AASIST Speech Deepfake Detection using SSL Features and Additional Regularization for the ASVspoof 2024 Challenge', venue: 'ASVspoof 2024 Challenge', link: 'https://arxiv.org/abs/2408.08739' },
  { id: '4', authors: 'Baevski et al.', year: 2020, title: 'wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations', venue: 'NeurIPS', link: 'https://arxiv.org/abs/2006.11477' },
  { id: '5', authors: 'Desplanques et al.', year: 2020, title: 'ECAPA-TDNN: Emphasized Channel Attention, Propagation and Aggregation', venue: 'Interspeech', link: 'https://arxiv.org/abs/2005.07143' },
  { id: '6', authors: 'Snyder et al.', year: 2018, title: 'X-vectors: Robust DNN Embeddings for Speaker Recognition', venue: 'IEEE ICASSP', link: 'https://danielpovey.com/files/2018_icassp_xvectors.pdf' },
  { id: '7', authors: 'S. Wani et al.', year: 2025, title: 'HCN-TA: Hierarchical Capsule Network with Temporal Attention for a Generalizable Approach to Audio Deepfake Detection', venue: 'arXiv / IEEE', link: 'https://arxiv.org/abs/2501.01234' },
  { id: '8', authors: 'Ramnadh et al.', year: 2025, title: 'Audio-Based Deepfake Detection Leveraging ECAPA-TDNN and TIMIT-TTS Corpus', venue: 'arXiv / IEEE', link: 'https://arxiv.org/abs/2501.05678' },
  { id: '9', authors: 'Li et al.', year: 2013, title: 'Speaker Adaptation and Model Update Techniques in Speaker Verification Systems', venue: 'IEEE TASLP', link: 'https://ieeexplore.ieee.org/document/6451097' },
  { id: '10', authors: 'Das et al.', year: 2018, title: 'Liveness Detection for Voice Authentication Using Challenge-Response Mechanisms', venue: 'IEEE S&P Workshops', link: 'https://ieeexplore.ieee.org/document/8424636' },
  { id: '11', authors: 'Todisco et al.', year: 2019, title: 'ASVspoof 2019: Future horizons in spoofed and fake audio detection', venue: 'Interspeech', link: 'https://arxiv.org/abs/1904.05441' },
  { id: '12', authors: 'Casanova et al.', year: 2022, title: 'YourTTS: Towards Zero-Shot Multi-Speaker TTS and Voice Conversion', venue: 'ICML / arXiv', link: 'https://arxiv.org/abs/2112.02418' },
  { id: '13', authors: 'Jung et al.', year: 2021, title: 'AASIST: Audio Anti-Spoofing using Integrated Spectro-Temporal Graph Attention Networks', venue: 'ICASSP / arXiv', link: 'https://arxiv.org/abs/2110.01200' },
  { id: '14', authors: 'Wan et al.', year: 2018, title: 'Generalized End-to-End Loss for Speaker Verification (GE2E)', venue: 'IEEE ICASSP', link: 'https://arxiv.org/abs/1710.10467' },
];

export const DOCUMENTS = [
  {
    title: 'Task 1 — Motivation & Problem Statement',
    description: 'Real-world AI voice fraud in India, user pain points, vishing taxonomy, and research problem definition.',
    type: 'DOCX',
    filename: 'Task1_Motivation_Problem_Statement.docx',
    available: true,
  },
  {
    title: 'Task 2 — Technical Domain Knowledge',
    description: 'Core biometric concepts, ASVspoof benchmarks, 192-dim ECAPA-TDNN embeddings, active liveness detection, and zero-shot voice cloning threat model.',
    type: 'DOCX',
    filename: 'Task2_Technical_Domain_Knowledge.docx',
    available: true,
  },
  {
    title: 'Task 3 — Literature Review & Dataset Study',
    description: 'Review of speaker verification and anti-spoofing models, ASVspoof dataset analysis, and techniques vs weaknesses.',
    type: 'DOCX',
    filename: 'Task3_Literature_Review.docx',
    available: true,
  },
  {
    title: 'Task 4 — Architecture Design',
    description: 'Three-layer security pipeline, FastAPI REST API design, HMAC challenge-response logic, and PostgreSQL schema.',
    type: 'DOCX',
    filename: 'Task4_Architecture_Design.docx',
    available: true,
  },
  {
    title: 'Task 5 — Novelty & Differentiation',
    description: 'Three novelty pillars, differentiation from HSBC Voice ID and cloud APIs, and architectural justifications.',
    type: 'DOCX',
    filename: 'Task5_Novelty_Differentiation.docx',
    available: true,
  },
  {
    title: 'Task 6 — Phase Planning & Timeline',
    description: 'Three-phase execution plan, milestone deliverables, risk mitigation, and evaluation targets.',
    type: 'DOCX',
    filename: 'Task6_Phase_Planning.docx',
    available: true,
  },
  {
    title: 'Project Review Presentation (Phase 2 Review 1)',
    description: '11-slide review presentation covering implementation progress, module ownership, and frozen API signatures.',
    type: 'PDF',
    filename: 'final_ppt.pdf',
    available: true,
  },
];
