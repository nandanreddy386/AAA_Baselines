/**
 * AAA Engine Client API
 *
 * Live mode talks to a locally running AAA Engine (http://localhost:8000) through the
 * versioned /v1 contract described in the final report (Section 4.8, Table 6).
 *
 * When no backend is reachable (e.g. on GitHub Pages) the portal runs a clearly
 * labelled SIMULATION that follows the report's policy decision matrix (Table 3):
 * one of five public decisions, a public reason code, and never a raw score.
 */

const API_BASE = 'http://localhost:8000';

// --------------------------------------------------------------------------
// Public vocabulary (report Table 5)
// --------------------------------------------------------------------------

export const DECISIONS = ['APPROVE', 'DENY', 'STEP_UP', 'REVIEW', 'UNAVAILABLE'];

export const DECISION_INFO = {
  APPROVE: 'All gates passed. Voiceprint adaptation is considered.',
  DENY: 'Spoof, phrase mismatch, speaker mismatch, or an expired / used challenge.',
  STEP_UP: 'Borderline result. Ask for another attempt with a fresh challenge or a stronger factor.',
  REVIEW: 'Human review required (high vishing-risk context).',
  UNAVAILABLE: 'A required model or service failed. The engine fails closed.',
};

export const REASON_INFO = {
  OK: 'All verification gates passed.',
  AUTH_FAILED: 'Authentication failed (spoof or speaker gate). The gate is not disclosed to hosts.',
  PHRASE_MISMATCH: 'The spoken words did not exactly match the challenge phrase.',
  REPLAY_DETECTED: 'This challenge token was already used. Tokens are single-use.',
  CHALLENGE_EXPIRED: 'The challenge passed its 90-second lifetime.',
  CHALLENGE_INVALID: 'The challenge token is unknown or not bound to this user.',
  TRY_AGAIN: 'Borderline result. Request a fresh challenge and try again.',
  REVIEW_REQUIRED: 'Escalated to a human reviewer.',
  SERVICE_UNAVAILABLE: 'A required model was unavailable or timed out. Fail-closed refusal.',
};

// Simulation scenarios offered in demo mode (each maps to a row of report Table 3)
export const SIM_SCENARIOS = [
  { id: 'genuine', label: 'Genuine user, correct phrase', expect: 'APPROVE' },
  { id: 'deepfake', label: 'Cloned / synthetic voice', expect: 'DENY' },
  { id: 'wrong_phrase', label: 'Wrong or near-miss phrase', expect: 'DENY' },
  { id: 'impostor', label: 'Different speaker, correct phrase', expect: 'DENY' },
  { id: 'marginal', label: 'Marginal speaker score', expect: 'STEP_UP' },
  { id: 'unavailable', label: 'Model timeout / not ready', expect: 'UNAVAILABLE' },
];

// --------------------------------------------------------------------------
// Demo identities and local persistence (simulation only)
// --------------------------------------------------------------------------

const SEED_USERS = [
  {
    id: '4a7b9c21-83d2-4e9a-bb10-9f1234567890',
    name: 'Demo Customer 001',
    email: 'customer001@example.com',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    has_voiceprint: true,
    sample_count: 3,
  },
  {
    id: 'b28e5c14-22d1-419b-a012-38d9f12845c1',
    name: 'Demo Customer 002',
    email: 'customer002@example.com',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    has_voiceprint: true,
    sample_count: 3,
  },
  {
    id: 'f93d18c7-43a1-4682-8bc1-12c8e3914a82',
    name: 'Demo Customer 003',
    email: 'customer003@example.com',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    has_voiceprint: false,
    sample_count: 0,
  },
];

const STORE_VERSION = 'v2'; // bumped: old local data used the Phase I ACCEPT/REJECT format

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(`aaa_${STORE_VERSION}_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(`aaa_${STORE_VERSION}_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }
}

const getLocalUsers = () => readJson('users', SEED_USERS);
const saveLocalUsers = (users) => writeJson('users', users);
const getLocalLogs = (userId) => readJson(`logs_${userId}`, []);
const saveLocalLogs = (userId, logs) => writeJson(`logs_${userId}`, logs.slice(0, 50));
const getLocalHistory = (userId) => readJson(`history_${userId}`, []);
const saveLocalHistory = (userId, h) => writeJson(`history_${userId}`, h.slice(0, 50));
const getChallenges = () => readJson('challenges', {});
const saveChallenges = (c) => writeJson('challenges', c);

function uuid() {
  return crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + Math.random().toString(16).slice(2);
}

function updateUser(userId, patch) {
  const users = getLocalUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...patch(users[idx]) };
    saveLocalUsers(users);
    return users[idx];
  }
  return null;
}

function pushHistory(userId, sampleCount, event) {
  const h = getLocalHistory(userId);
  h.unshift({ updated_at: new Date().toISOString(), sample_count: sampleCount, event });
  saveLocalHistory(userId, h);
}

// --------------------------------------------------------------------------
// Challenge phrase generator: mirrors backend/app/layer3_adaptive.py
// (108 common words, 8 templates, 28,400 phrases)
// --------------------------------------------------------------------------

const NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
const COLORS = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'gray', 'gold', 'silver'];
const ANIMALS = ['dog', 'cat', 'bird', 'fish', 'horse', 'cow', 'pig', 'duck', 'frog', 'bear', 'lion', 'tiger', 'wolf', 'fox', 'rabbit', 'mouse', 'snake', 'monkey', 'elephant', 'zebra'];
const OBJECTS = ['book', 'cup', 'ball', 'chair', 'table', 'door', 'window', 'car', 'tree', 'house', 'phone', 'key', 'lamp', 'clock', 'box', 'bag', 'hat', 'shoe', 'pen', 'ring'];
const ADJECTIVES = ['big', 'small', 'fast', 'slow', 'tall', 'short', 'hot', 'cold', 'new', 'old', 'happy', 'quiet', 'loud', 'soft', 'hard', 'bright', 'dark', 'clean', 'strong', 'kind'];
const VERBS = ['runs', 'jumps', 'sits', 'walks', 'eats', 'sleeps', 'plays', 'reads', 'sings', 'draws', 'swims', 'flies', 'drives', 'rides', 'climbs'];
const PLACES = ['park', 'home', 'school', 'store', 'beach', 'farm', 'city', 'town', 'lake', 'hill'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export function generatePhrase() {
  switch (Math.floor(Math.random() * 8)) {
    case 0: return `${pick(NUMBERS)} ${pick(COLORS)} ${pick(ANIMALS)}`;
    case 1: return `The ${pick(ADJECTIVES)} ${pick(ANIMALS)} ${pick(VERBS)}`;
    case 2: return `${pick(COLORS)} ${pick(OBJECTS)} and ${pick(OBJECTS)}`;
    case 3: return `${pick(NUMBERS)} ${pick(ADJECTIVES)} ${pick(OBJECTS)}`;
    case 4: return `The ${pick(ANIMALS)} ${pick(VERBS)} at ${pick(PLACES)}`;
    case 5: return `${pick(ADJECTIVES)} ${pick(COLORS)} ${pick(OBJECTS)}`;
    case 6: return `My ${pick(ANIMALS)} is ${pick(ADJECTIVES)}`;
    default: return `${pick(NUMBERS)} ${pick(ANIMALS)} in ${pick(PLACES)}`;
  }
}

// --------------------------------------------------------------------------
// Live backend helpers
// --------------------------------------------------------------------------

async function readError(res, fallback) {
  const body = await res.json().catch(() => ({}));
  const d = body.detail;
  if (d && typeof d === 'object') return d.message || d.code || fallback;
  return d || body.message || fallback;
}

export const checkServerHealth = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/v1/health`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return false;
    const data = await res.json();
    return data && data.status === 'healthy';
  } catch {
    return false;
  }
};

export const getAllUsers = async (isLive = false) => {
  if (isLive) {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error(await readError(res, 'Could not load users'));
    return await res.json();
  }
  return getLocalUsers();
};

export const registerUser = async (name, email, isLive = false) => {
  if (isLive) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    if (!res.ok) throw new Error(await readError(res, 'Registration failed'));
    return await res.json();
  }

  const users = getLocalUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('Email already registered');
  }
  const newUser = {
    id: uuid(),
    name,
    email,
    created_at: new Date().toISOString(),
    has_voiceprint: false,
    sample_count: 0,
  };
  users.unshift(newUser);
  saveLocalUsers(users);
  return { user_id: newUser.id };
};

export const enrollVoice = async (userId, audioBlob, isLive = false) => {
  if (isLive) {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('audio', audioBlob, 'enrollment.wav');
    const res = await fetch(`${API_BASE}/v1/enroll`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error(await readError(res, 'Enrollment failed'));
    return await res.json();
  }

  const user = updateUser(userId, (u) => ({
    has_voiceprint: true,
    sample_count: (u.sample_count || 0) + 1,
  }));
  const sampleCount = user ? user.sample_count : 1;
  pushHistory(userId, sampleCount, sampleCount === 1 ? 'Voiceprint created (encrypted at rest)' : 'Enrolment sample added');
  return {
    request_id: uuid(),
    status: 'enrolled',
    sample_count: sampleCount,
    is_new: sampleCount === 1,
  };
};

export const getChallenge = async (userId, isLive = false) => {
  if (isLive) {
    const res = await fetch(`${API_BASE}/v1/challenges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    });
    if (!res.ok) throw new Error(await readError(res, 'Challenge failed'));
    return await res.json();
  }

  const phrase = generatePhrase();
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('');
  const expiresAt = new Date(Date.now() + 90000);
  const token = `${nonce}.${Math.floor(expiresAt.getTime() / 1000)}.simulated-hmac-sha256`;
  const challenges = getChallenges();
  challenges[token] = { user_id: userId, phrase, expires_at: expiresAt.toISOString(), used: false };
  saveChallenges(challenges);
  return {
    request_id: uuid(),
    challenge_id: uuid(),
    phrase,
    token,
    expires_at: expiresAt.toISOString(),
    ttl_seconds: 90,
    simulated: true,
  };
};

// --------------------------------------------------------------------------
// Verification
// --------------------------------------------------------------------------

/**
 * Simulated policy engine. Mirrors report Table 3:
 * challenge is consumed first (atomic, single use), then AD || ASR, then SV only
 * if both passed, then one central decision. Returns public fields only.
 */
function simulateVerify(userId, token, scenario) {
  const out = (decision, reason_public, gate) => ({
    request_id: uuid(),
    session_id: uuid(),
    decision,
    reason_public,
    risk_level: 'LOW',
    requires_fresh_challenge: decision === 'STEP_UP',
    requires_human_review: decision === 'REVIEW',
    simulated: true,
    // gate trace is for the demo only: the real API never returns it to hosts
    _demo_trace: gate,
  });

  const challenges = getChallenges();
  const ch = challenges[token];
  if (!ch || ch.user_id !== userId) {
    return out('DENY', 'CHALLENGE_INVALID', { challenge: 'invalid' });
  }
  if (ch.used) {
    return out('DENY', 'REPLAY_DETECTED', { challenge: 'already used' });
  }
  if (new Date(ch.expires_at) < new Date()) {
    return out('DENY', 'CHALLENGE_EXPIRED', { challenge: 'expired' });
  }
  // Atomic single-use consumption happens before any model runs
  ch.used = true;
  saveChallenges(challenges);

  const consumed = { challenge: 'consumed (single use)' };
  switch (scenario) {
    case 'unavailable':
      return out('UNAVAILABLE', 'SERVICE_UNAVAILABLE', { ...consumed, AD: 'timeout', ASR: 'not run', SV: 'not run' });
    case 'deepfake':
      return out('DENY', 'AUTH_FAILED', { ...consumed, AD: 'FAIL (spoof)', ASR: 'PASS', SV: 'skipped' });
    case 'wrong_phrase':
      return out('DENY', 'PHRASE_MISMATCH', { ...consumed, AD: 'PASS', ASR: 'FAIL (not an exact match)', SV: 'skipped' });
    case 'impostor':
      return out('DENY', 'AUTH_FAILED', { ...consumed, AD: 'PASS', ASR: 'PASS', SV: 'FAIL (below threshold)' });
    case 'marginal':
      return out('STEP_UP', 'TRY_AGAIN', { ...consumed, AD: 'PASS', ASR: 'PASS', SV: 'MARGINAL' });
    default: {
      const user = updateUser(userId, (u) => ({ sample_count: (u.sample_count || 0) + 1 }));
      if (user) pushHistory(userId, user.sample_count, 'Guarded EMA update after APPROVE (0.8 old + 0.2 new)');
      return out('APPROVE', 'OK', { ...consumed, AD: 'PASS', ASR: 'PASS (exact match)', SV: 'PASS', EMA: 'voiceprint updated' });
    }
  }
}

export const verifyVoice = async (userId, token, audioBlob, isLive = false, scenario = 'genuine') => {
  let result;
  if (isLive) {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('token', token);
    formData.append('audio', audioBlob, 'verify.wav');
    const res = await fetch(`${API_BASE}/v1/verify`, { method: 'POST', body: formData });
    if (!res.ok) throw new Error(await readError(res, 'Verification failed'));
    result = await res.json();
  } else {
    result = simulateVerify(userId, token, scenario);
    const logs = getLocalLogs(userId);
    logs.unshift({
      id: result.request_id,
      created_at: new Date().toISOString(),
      decision: result.decision,
      reason_public: result.reason_public,
      risk_level: result.risk_level,
    });
    saveLocalLogs(userId, logs);
  }
  return result;
};

export const getVoiceprintHistory = async (userId, isLive = false) => {
  if (isLive) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/voiceprint-history`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Live voiceprint history failed', e);
    }
    return [];
  }
  return getLocalHistory(userId);
};

/**
 * Audit trail. Public fields only (report Section 8.15, step 5):
 * request id, decision and public reason, never a score.
 */
export const getAuthLogs = async (userId, isLive = false) => {
  if (isLive) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/auth-logs`);
      if (res.ok) {
        const rows = await res.json();
        return rows.map((r) => ({
          id: r.id,
          created_at: r.created_at,
          decision: r.result,
          reason_public: r.reason || '—',
        }));
      }
    } catch (e) {
      console.warn('Live auth logs failed', e);
    }
    return [];
  }
  return getLocalLogs(userId);
};
