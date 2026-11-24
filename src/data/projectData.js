// ============================================================================
// AAA Engine — Project Data
// Source of truth: "Adaptive Acoustic Auth (AAA) Engine — Final Project Report"
// (23CSE498 Project Phase II, Team G090, 15 November 2026) and the
// Speech-Synthesis/AAA_Baselines repository.
// ============================================================================

export const PROJECT = {
  name: 'AAA Engine',
  fullName: 'Adaptive Acoustic Auth (AAA) Engine',
  tagline: 'A Plug-and-Play Biometric Security Middleware with Deepfake Immunity',
  subtitle: '23CSE498 Project Phase II — Final Report, November 2026',
  institution: 'Amrita School of Computing, Department of Computer Science & Engineering',
  course: '23CSE498 — Project Phase II',
  teamNumber: 'Team G090',
  description:
    'An installable voice-authentication middleware. A host asks for a signed, single-use, 90-second challenge; the user speaks it into an AAA-owned capture component; a spoof gate, an exact-phrase gate and a speaker gate feed one policy engine; and the host receives a decision, never raw audio or scores.',
  github: 'https://github.com/Speech-Synthesis/AAA_Baselines',
  guide: {
    name: 'Dr. Harini N',
    title: 'Associate Professor, Department of CSE',
    institution: 'Amrita School of Computing, Amrita Vishwa Vidyapeetham',
    note: 'Faculty Project Guide',
  },
};

// Report Table 15 (ownership), Table 27 (certifications), Appendix B
export const TEAM = [
  {
    sNo: 1,
    name: 'M Nandan Reddy',
    regNo: 'CB.SC.U4CSE23431',
    role: 'AAA-ASR and CallGuard',
    responsibilities:
      'Whisper transcriber and deterministic exact-phrase verifier (160-case suite), ASR fine-tuning study, offline Whisper verification, CallGuard call-centre host, defect remediation, demo runbook and evidence pack.',
    enrichment: { course: 'Mastering Generative Voice AI', platform: 'Udemy', hours: '33 h' },
  },
  {
    sNo: 2,
    name: 'M L N Navadeep Kumar',
    regNo: 'CB.SC.U4CSE23434',
    role: 'AAA-SV: Speaker Verification',
    responsibilities:
      'ECAPA-TDNN fine-tuning pipeline, augmentation, manifest and leakage tools, stability head, calibration, evaluation toolkit, inference wrapper, model card (113 package tests).',
    enrichment: { course: 'Mastering Voice AI: ASR to Emotion AI to Voice Cloning', platform: 'Udemy', hours: '19.5 h' },
  },
  {
    sNo: 3,
    name: 'P Aditya Sai',
    regNo: 'CB.SC.U4CSE23464',
    role: 'AAA-AD Deepfake Detection and AAA-SVG',
    responsibilities:
      'XLS-R 300M B1 detector on ASVspoof 2019 LA, speaker-disjoint Dev-A / Dev-B split, mask-aware pooling, baselines, isolated AAA-SVG red-team lab, backend test evidence.',
    enrichment: { course: 'REST APIs with Python Flask, Docker, AWS, Git, SQLAlchemy', platform: 'Udemy', hours: '14 h' },
  },
  {
    sNo: 4,
    name: 'A V K B Surya',
    regNo: 'CB.SC.U4CSE23467',
    role: 'AAA Core and System Integration',
    responsibilities:
      'API contract and OpenAPI, v1 routes, orchestrator, policy engine, token persistence, rate limiting, model adapters, CI, database migrations, capture-grant and revoke/status routes, release integration.',
    enrichment: { course: 'Data Science, ML, DL, NLP Bootcamp', platform: 'Udemy', hours: '101.5 h' },
  },
  {
    sNo: 5,
    name: 'M Karthik Srijan',
    regNo: 'CB.SC.U4CSE23534',
    role: 'Security and Banking Shield',
    responsibilities:
      'Perimeter authentication, challenge lifecycle, AES-256-GCM voiceprint vault, host authentication, banking decision gateway, AAA-VR risk engine with hard negatives, log redaction, Banking Shield host (85 security and risk tests).',
    enrichment: { course: 'Python Essentials for MLOps', platform: 'Duke / Coursera', hours: 'certified' },
  },
];

// Report Section 4.2, Figure 2, Table 3
export const PIPELINE_LAYERS = [
  {
    layer: 'Step 1',
    title: 'Challenge + Capture Grant',
    spec: 'HMAC-SHA256 signed phrase, bound to the user; grant scoped to one upload',
    threshold: '90 s, single use',
  },
  {
    layer: 'Step 2',
    title: 'Validate & Consume',
    spec: 'WAV 16 kHz mono, 2–10 s, ≤ 5 MB; token consumed by one atomic UPDATE',
    threshold: 'Replay / expiry → DENY',
  },
  {
    layer: 'Gate 1 (parallel)',
    title: 'AAA-AD Spoof Gate',
    spec: 'Wav2Vec2 classifier (B0); XLS-R 300M fine-tuned detector (B1)',
    threshold: 'Spoof → DENY',
  },
  {
    layer: 'Gate 2 (parallel)',
    title: 'AAA-ASR Phrase Gate',
    spec: 'Local Whisper + deterministic normaliser; no fuzzy matching',
    threshold: 'Exact match only',
  },
  {
    layer: 'Gate 3',
    title: 'AAA-SV Speaker Gate',
    spec: 'ECAPA-TDNN 192-dim cosine vs encrypted voiceprint; runs only if AD and ASR pass',
    threshold: 'Low → DENY, marginal → STEP_UP',
  },
  {
    layer: 'Decision',
    title: 'Policy Engine',
    spec: 'One central component; errors fail closed; APPROVE → guarded EMA update',
    threshold: '5 public decisions',
  },
];

// Report Section 5.1, Table 8, Table 14
export const TECH_STACK = [
  {
    category: 'Service tier',
    items: [
      { name: 'Python 3.11 + FastAPI', role: 'Versioned /v1 REST API, orchestrator and policy engine.' },
      { name: 'SQLAlchemy 2.0 + pydantic-settings', role: 'ORM on PostgreSQL (SQLite for development and tests); configuration from environment.' },
      { name: 'SlowAPI', role: 'Per-endpoint rate limits plus a tenant sliding window and lockout.' },
    ],
  },
  {
    category: 'Models (run locally)',
    items: [
      { name: 'SpeechBrain ECAPA-TDNN', role: '192-dim speaker embeddings (B0 pretrained, B1 fine-tuned on VoxCeleb1 dev).' },
      { name: 'Wav2Vec2 / XLS-R 300M', role: 'Spoof detection (B0 baseline classifier, B1 fine-tuned on ASVspoof 2019 LA).' },
      { name: 'OpenAI Whisper', role: 'Local transcription for the exact-phrase gate; no cloud call.' },
    ],
  },
  {
    category: 'Security',
    items: [
      { name: 'HMAC-SHA256 challenge tokens', role: '90 s lifetime, single use, constant-time comparison.' },
      { name: 'JWT HS256 tenant tokens', role: '15-minute lifetime, audience and issuer checked; weak secrets refuse start-up.' },
      { name: 'AES-256-GCM voiceprint vault', role: 'Per-tenant derived key, 96-bit nonce, tamper detection on decrypt.' },
    ],
  },
  {
    category: 'Clients and delivery',
    items: [
      { name: 'React 18 + Vite 5', role: 'Banking Shield and CallGuard hosts, demo client, AAA capture component.' },
      { name: 'Docker + GitHub Actions', role: 'pytest on SQLite and PostgreSQL, ruff, bandit and a container build on every push.' },
    ],
  },
];

// Report Section 4.8, Table 6
export const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/challenges',
    purpose: 'Issues a fresh challenge phrase and HMAC-signed token bound to the user (90 s lifetime). Rate limited.',
    params: [{ name: 'user_id', type: 'string (JSON)', description: 'AAA user ID or pseudonymous host reference.' }],
    request: `curl -X POST http://localhost:8000/v1/challenges \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": "customer_002"}'`,
    response: `{
  "challenge_id": "c-77a1...",
  "phrase": "The quiet fox runs",
  "token": "<hmac signed>",
  "ttl_seconds": 90,
  "capture": { "component": "aaa-web-capture", "upload_url": "/v1/verify" }
}`,
    notes: 'Phrases come from 108 common words in 8 templates (28,400 phrases).',
  },
  {
    method: 'POST',
    path: '/v1/capture/grants',
    purpose: 'Issues a short-lived, single-use grant that lets the AAA capture component upload audio directly to the engine.',
    params: [
      { name: 'user_id', type: 'string (JSON)', description: 'User the grant is bound to.' },
      { name: 'challenge_id', type: 'string (JSON)', description: 'Challenge the grant is bound to.' },
    ],
    request: `curl -X POST http://localhost:8000/v1/capture/grants \\
  -H "Content-Type: application/json" \\
  -d '{"user_id": "...", "challenge_id": "..."}'`,
    response: `{
  "grant_id": "JQp82v...",
  "capture_url": "/static/capture/index.html?grant=...",
  "expires_at": "..."
}`,
    notes: 'The host embeds the capture URL in an iframe and never handles raw audio.',
  },
  {
    method: 'POST',
    path: '/v1/enroll',
    purpose: 'Validates a consented sample, extracts the ECAPA-TDNN embedding and stores it encrypted.',
    params: [
      { name: 'user_id', type: 'UUID (form-data)', description: 'User to enrol.' },
      { name: 'audio', type: 'WAV (multipart)', description: '16 kHz mono speech sample.' },
    ],
    request: `curl -X POST http://localhost:8000/v1/enroll \\
  -F "user_id=<uuid>" -F "audio=@sample.wav"`,
    response: `{
  "status": "enrolled",
  "sample_count": 3
}`,
    notes: 'Several samples are recorded before a voiceprint is relied on (FR-09).',
  },
  {
    method: 'POST',
    path: '/v1/verify',
    purpose: 'Runs the gates and the policy engine. Returns a decision and a public reason, never a score.',
    params: [
      { name: 'user_id', type: 'UUID (form-data)', description: 'Claimed identity.' },
      { name: 'token', type: 'string (form-data)', description: 'Challenge token (single use).' },
      { name: 'audio', type: 'WAV (multipart)', description: '16 kHz mono, 2–10 s, at most 5 MB.' },
    ],
    request: `curl -X POST http://localhost:8000/v1/verify \\
  -F "user_id=<uuid>" -F "token=<token>" -F "audio=@answer.wav"`,
    response: `{
  "request_id": "a8e1bee3-...",
  "decision": "APPROVE",
  "reason_public": "OK",
  "risk_level": "LOW",
  "requires_fresh_challenge": false,
  "requires_human_review": false
}`,
    errorResponse: `{
  "request_id": "f462d61c-...",
  "decision": "DENY",
  "reason_public": "REPLAY_DETECTED",
  "risk_level": "LOW",
  "requires_fresh_challenge": false,
  "requires_human_review": false
}`,
    notes: 'Decisions: APPROVE, DENY, STEP_UP, REVIEW, UNAVAILABLE. A model error or timeout yields UNAVAILABLE, never APPROVE.',
  },
  {
    method: 'GET',
    path: '/v1/verification-requests/{id}',
    purpose: 'Status of a completed verification. Public fields only.',
    params: [{ name: 'id', type: 'string (path)', description: 'Request ID from /v1/verify.' }],
    request: 'curl http://localhost:8000/v1/verification-requests/<request_id>',
    response: `{
  "request_id": "...",
  "decision": "APPROVE",
  "reason_public": "OK"
}`,
    notes: '404 if the identifier is unknown or expired.',
  },
  {
    method: 'DELETE',
    path: '/v1/voiceprints/{id}/revoke',
    purpose: 'Tenant-authorised revocation with an object-level check and an audit event.',
    params: [{ name: 'id', type: 'UUID (path)', description: 'Voiceprint to revoke.' }],
    request: `curl -X DELETE http://localhost:8000/v1/voiceprints/<id>/revoke \\
  -H "Authorization: Bearer <tenant token>"`,
    response: `{
  "voiceprint_id": "...",
  "status": "revoked"
}`,
    notes: 'A revoked voiceprint can no longer authenticate (FR-10).',
  },
  {
    method: 'POST',
    path: '/v1/risk/transcript',
    purpose: 'AAA-VR vishing analysis of call transcript segments. Returns a risk level, a public reason code and an action.',
    params: [{ name: 'segments', type: 'array (JSON)', description: 'Transcript segments.' }],
    request: `curl -X POST http://localhost:8000/v1/risk/transcript \\
  -H "Content-Type: application/json" \\
  -d '{"session_id": "call-1", "transcript": "Never share your OTP with anyone."}'`,
    response: `{
  "request_id": "...",
  "session_id": "call-1",
  "risk_level": "LOW",
  "reason_public": "SAFE_CONVERSATION",
  "recommended_action": "..."
}`,
    notes: 'Seven frozen reason codes; no floating-point score is returned. Security advice is not flagged.',
  },
  {
    method: 'GET',
    path: '/v1/health, /v1/ready',
    purpose: 'Liveness, and readiness of the database, models and configuration.',
    params: [],
    request: 'curl http://localhost:8000/v1/ready',
    response: `{
  "status": "ready",
  "checks": { "database": "ok", "models": { "...": "ok" }, "configuration": "ok" }
}`,
    notes: 'Readiness returns 503 until every dependency is healthy.',
  },
  {
    method: 'POST',
    path: '/v1/auth/token',
    purpose: 'Client-credential exchange for a tenant-scoped bearer token.',
    params: [
      { name: 'client_id', type: 'string (JSON)', description: 'Host client ID.' },
      { name: 'client_secret', type: 'string (JSON)', description: 'Host client secret.' },
    ],
    request: `curl -X POST http://localhost:8000/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"client_id": "...", "client_secret": "...", "tenant_id": "bank-demo"}'`,
    response: `{
  "access_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 900
}`,
    notes: '15-minute lifetime. The legacy /auth/* routes remain only as deprecated aliases.',
  },
];

// Report Section 4.5, Figure 4, Listing 1
export const DB_SCHEMA = {
  tables: [
    {
      name: 'users',
      description: 'Tenant-scoped identities. Hosts pass a pseudonymous reference; identities are never linked across tenants.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'User identifier' },
        { name: 'name', type: 'TEXT', constraint: '', description: 'Display name or host reference' },
        { name: 'email', type: 'TEXT', constraint: 'UNIQUE', description: 'Optional contact' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: 'DEFAULT now()', description: 'Creation time' },
      ],
    },
    {
      name: 'voiceprints',
      description: 'One voiceprint per user: the 192-dim embedding, encrypted with AES-256-GCM under a per-tenant key.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Voiceprint identifier' },
        { name: 'user_id', type: 'UUID', constraint: 'FK users(id), UNIQUE', description: 'Owner (1:1)' },
        { name: 'embedding', type: 'TEXT (encrypted)', constraint: 'NOT NULL', description: '192-dim vector, nonce + ciphertext + tag' },
        { name: 'sample_count', type: 'INT', constraint: '', description: 'Enrolment samples and guarded updates' },
        { name: 'updated_at', type: 'TIMESTAMP', constraint: '', description: 'Last guarded EMA update' },
      ],
    },
    {
      name: 'challenges',
      description: 'Issued challenges. Consumption is one conditional UPDATE, so concurrent replays resolve to one success.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Challenge identifier' },
        { name: 'user_id', type: 'UUID', constraint: 'FK users(id)', description: 'User the challenge is bound to' },
        { name: 'phrase', type: 'TEXT', constraint: '', description: 'Phrase the user must speak' },
        { name: 'token', type: 'TEXT', constraint: 'UNIQUE, indexed', description: 'Signed single-use token' },
        { name: 'signature', type: 'TEXT', constraint: '', description: 'HMAC-SHA256 over the payload' },
        { name: 'payload', type: 'TEXT', constraint: '', description: 'Signed payload (user, expiry, phrase, nonce)' },
        { name: 'expires_at', type: 'TIMESTAMP', constraint: 'indexed', description: 'Issue time + 90 s' },
        { name: 'used', type: 'BOOLEAN', constraint: 'DEFAULT FALSE, indexed', description: 'Set once, atomically' },
      ],
    },
    {
      name: 'auth_logs',
      description: 'Audit trail: which gate blocked a request and the outcome. Internal scores are kept for audit only and never returned to hosts.',
      fields: [
        { name: 'id', type: 'UUID', constraint: 'PRIMARY KEY', description: 'Log entry' },
        { name: 'user_id', type: 'UUID', constraint: 'FK users(id)', description: 'Subject' },
        { name: 'challenge_id', type: 'UUID', constraint: 'FK challenges(id), nullable', description: 'Challenge used' },
        { name: 'result', type: 'TEXT', constraint: '', description: 'Public decision' },
        { name: 'layer_blocked', type: 'INT', constraint: 'nullable', description: 'Gate that blocked the request' },
        { name: 'created_at', type: 'TIMESTAMP', constraint: '', description: 'Time of attempt' },
      ],
    },
  ],
};

// Report Table 9, Table 13, Sections 8.4–8.7, Section 11
export const IMPLEMENTATION_MATRIX = [
  {
    component: 'Frontend / UI',
    model: 'Banking Shield, CallGuard, AAA capture component',
    status: 'Integrated',
    details: 'Both hosts use the AAA capture component instead of recording audio themselves; CallGuard runs four seeded scenarios.',
  },
  {
    component: 'Backend / service',
    model: 'FastAPI v1 routes, adapters, policy engine',
    status: 'Integrated',
    details: 'Challenge, enrol, verify, risk, capture, revoke, status, health and readiness routes; parallel AD and ASR; typed exceptions; configurable thresholds.',
  },
  {
    component: 'Database / persistence',
    model: 'PostgreSQL (SQLite for tests)',
    status: 'Integrated',
    details: 'Atomic token consumption, expiry clean-up, indexes, tracked migrations, row-level security, per-tenant encrypted voiceprints.',
  },
  {
    component: 'API and authentication',
    model: 'OpenAPI 3.1, JWT tenant tokens, capture grants',
    status: 'Functional',
    details: 'Host authentication with signature and 300 s timestamp window, rate limits, lockout, CORS allow list with wildcards rejected.',
  },
  {
    component: 'AAA-SV speaker verification',
    model: 'ECAPA-TDNN B0 + fine-tuned B1',
    status: 'Integrated (evaluation in progress)',
    details: 'B1 fine-tuned on a V100 (loss 1.58 → 0.93 over 3,514 steps, zero speaker leakage). Bucketed EER and calibration figures are pending the frozen evaluation run.',
  },
  {
    component: 'AAA-AD deepfake detection',
    model: 'Wav2Vec2 B0 + XLS-R 300M B1',
    status: 'Integrated (evaluation in progress)',
    details: 'B1 Dev-A EER 0.0685 % at epoch 1. In-distribution only: the untouched LA evaluation set and Dev-B calibration are still to run.',
  },
  {
    component: 'AAA-ASR exact phrase gate',
    model: 'Stock Whisper + deterministic verifier',
    status: 'Integrated',
    details: 'Fine-tuning was rejected: it lowered exact-phrase accuracy from 47.07 % to 44.73 % on held-out LibriSpeech, so the stock model is deployed.',
  },
  {
    component: 'AAA-VR transcript risk',
    model: 'Rules-first engine',
    status: 'Integrated',
    details: 'Seven public reason codes, negation and advisory handling, 28 hard-negative tests, under 2.5 ms per 50-word transcript.',
  },
  {
    component: 'Shared rate-limit store and managed keys',
    model: 'Redis, KMS with rotation',
    status: 'Future work',
    details: 'Rate limits and lockout are process-local today; master keys come from environment variables.',
  },
  {
    component: 'Custom AAA-AD architecture and learned AAA-VR classifier',
    model: 'Layer fusion + attentive pooling; learned risk model',
    status: 'Future work',
    details: 'Designed and unit-tested; training and evaluation on held-out generators are reserved for the next phase.',
  },
];

// Report Table 1
export const NOVELTY_COMPARISON = [
  { feature: 'Active challenge-response liveness', traditional: 'No', commercial: 'No', research: 'No', aaaEngine: 'Yes' },
  { feature: 'Deepfake detection gate', traditional: 'No', commercial: 'No', research: 'Partial', aaaEngine: 'Yes' },
  { feature: 'Dynamic voiceprint update', traditional: 'No', commercial: 'No', research: 'No', aaaEngine: 'Yes' },
  { feature: 'Plug-and-play middleware API', traditional: 'No', commercial: 'Partial', research: 'No', aaaEngine: 'Yes' },
  { feature: 'Replay prevention by single-use token', traditional: 'No', commercial: 'No', research: 'Yes', aaaEngine: 'Yes' },
  { feature: 'Transcript-level vishing risk', traditional: 'No', commercial: 'No', research: 'No', aaaEngine: 'Yes' },
];

// Report Section 8 (measured results)
export const KEY_RESULTS = [
  { value: '414', label: 'automated backend tests passing', note: 'after the 15 Nov remediation' },
  { value: '113', label: 'speaker-verification package tests', note: 'AAA-SV' },
  { value: '160', label: 'exact-phrase verifier cases', note: '14 groups, runs in < 1 s' },
  { value: '20', label: 'tenant-isolation tests', note: 'no cross-tenant read or decrypt' },
  { value: '34', label: 'user-study participants', note: '88.2 % would recommend' },
  { value: '922 / 471 / 177 ms', label: 'CPU time: deepfake / ASR / speaker', note: 'measured per stage, AD ∥ ASR in parallel' },
];

export const ACADEMIC_REFERENCES = [
  {
    id: 1,
    title: 'ECAPA-TDNN: Emphasized Channel Attention, Propagation and Aggregation in TDNN Based Speaker Verification',
    authors: 'B. Desplanques, J. Thienpondt, K. Demuynck',
    venue: 'Interspeech 2020',
    details: 'Speaker-verification backbone (AAA-SV B0, fine-tuned for B1).',
  },
  {
    id: 2,
    title: 'XLS-R: Self-supervised Cross-lingual Speech Representation Learning at Scale',
    authors: 'A. Babu, C. Wang, A. Tjandra, et al.',
    venue: 'arXiv:2111.09296, 2021',
    details: 'Backbone of the fine-tuned AAA-AD B1 spoof detector.',
  },
  {
    id: 3,
    title: 'Robust Speech Recognition via Large-Scale Weak Supervision',
    authors: 'A. Radford, J. W. Kim, T. Xu, G. Brockman, C. McLeavey, I. Sutskever',
    venue: 'ICML 2023',
    details: 'Whisper, run locally for the exact-phrase gate.',
  },
  {
    id: 4,
    title: 'ASVspoof 2019: A Large-Scale Public Database of Synthesized, Converted and Replayed Speech',
    authors: 'X. Wang, J. Yamagishi, M. Todisco, H. Delgado, A. Nautsch, N. Evans, et al.',
    venue: 'Computer Speech and Language, vol. 64, 2020',
    details: 'Training and evaluation protocol for AAA-AD.',
  },
  {
    id: 5,
    title: 'VoxCeleb: A Large-Scale Speaker Identification Dataset',
    authors: 'A. Nagrani, J. S. Chung, A. Zisserman',
    venue: 'Interspeech 2017',
    details: 'VoxCeleb1 development partition used to fine-tune AAA-SV B1.',
  },
  {
    id: 6,
    title: 'One-Class Learning Towards Synthetic Voice Spoofing Detection',
    authors: 'Y. Zhang, F. Jiang, Z. Duan',
    venue: 'IEEE Signal Processing Letters, vol. 28, 2021',
    details: 'Basis for the team’s Dynamic-Margin OC-Softmax separation-aware study.',
  },
];
