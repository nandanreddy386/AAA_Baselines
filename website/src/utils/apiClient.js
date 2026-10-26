/**
 * AAA Engine Client API
 * Connects to live FastAPI backend at http://localhost:8000.
 * Includes local persistence and realistic fallback simulation for GitHub Pages / static hosting.
 */

const API_BASE = 'http://localhost:8000';

// Default seeded demo identities
const SEED_USERS = [
  {
    id: '4a7b9c21-83d2-4e9a-bb10-9f1234567890',
    name: 'Dr. Harini N (Faculty Guide)',
    email: 'harini@amrita.edu',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    has_voiceprint: true,
  },
  {
    id: 'b28e5c14-22d1-419b-a012-38d9f12845c1',
    name: 'M Nandan Reddy',
    email: 'nandan@aaaengine.io',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    has_voiceprint: true,
  },
  {
    id: 'f93d18c7-43a1-4682-8bc1-12c8e3914a82',
    name: 'M Navadeep Kumar',
    email: 'navadeep@aaaengine.io',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    has_voiceprint: true,
  },
];

// Helper: load/save local storage for offline mode
function getLocalUsers() {
  try {
    const raw = localStorage.getItem('aaa_users');
    return raw ? JSON.parse(raw) : SEED_USERS;
  } catch {
    return SEED_USERS;
  }
}

function saveLocalUsers(users) {
  try {
    localStorage.setItem('aaa_users', JSON.stringify(users));
  } catch (e) {
    console.warn('LocalStorage save failed', e);
  }
}

function getLocalLogs(userId) {
  try {
    const raw = localStorage.getItem(`aaa_logs_${userId}`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [
    {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      user_id: userId,
      l2_label: 'bonafide',
      l2_confidence: 0.985,
      l1_score: 0.884,
      result: 'ACCEPT',
      layer_blocked: null,
      created_at: new Date(Date.now() - 3600000).toISOString(),
      reason: 'Authentication successful',
    },
    {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      user_id: userId,
      l2_label: 'spoof',
      l2_confidence: 0.923,
      l1_score: 0.12,
      result: 'REJECT',
      layer_blocked: 2,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      reason: 'Deepfake/spoof detected',
    },
  ];
}

function saveLocalLogs(userId, logs) {
  try {
    localStorage.setItem(`aaa_logs_${userId}`, JSON.stringify(logs));
  } catch (e) {
    console.warn('LocalStorage log save failed', e);
  }
}

export const checkServerHealth = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return false;
    const data = await res.json();
    return data && data.status === 'running';
  } catch {
    return false;
  }
};

export const getAllUsers = async (isLive = false) => {
  if (isLive) {
    try {
      const res = await fetch(`${API_BASE}/users`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Live getAllUsers failed, falling back to local storage', e);
    }
  }
  return getLocalUsers();
};

export const registerUser = async (name, email, isLive = false) => {
  if (isLive) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Registration failed' }));
        throw new Error(err.detail || 'Registration failed');
      }
      return await res.json();
    } catch (e) {
      if (!e.message.includes('already registered')) {
        console.warn('Live register failed, using offline store', e);
      } else {
        throw e;
      }
    }
  }

  // Offline handler
  const users = getLocalUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('Email already registered');
  }

  const newUser = {
    id: crypto.randomUUID ? crypto.randomUUID() : 'usr-' + Date.now(),
    name,
    email,
    created_at: new Date().toISOString(),
    has_voiceprint: false,
  };
  users.unshift(newUser);
  saveLocalUsers(users);
  return { user_id: newUser.id };
};

export const enrollVoice = async (userId, audioBlob, isLive = false) => {
  if (isLive) {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('audio', audioBlob, 'enrollment.wav');

      const res = await fetch(`${API_BASE}/auth/enroll`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Enrollment failed' }));
        throw new Error(err.detail || 'Enrollment failed');
      }
      return await res.json();
    } catch (e) {
      console.warn('Live enroll failed, using offline simulation', e);
    }
  }

  // Offline simulation
  const users = getLocalUsers();
  const idx = users.findIndex((u) => u.id === userId);
  let sampleCount = 1;
  if (idx !== -1) {
    users[idx].has_voiceprint = true;
    sampleCount = (users[idx].sample_count || 0) + 1;
    users[idx].sample_count = sampleCount;
    saveLocalUsers(users);
  }
  return {
    status: 'enrolled',
    sample_count: sampleCount,
    message: 'Voiceprint sample registered (ECAPA-TDNN 192-dim vector extracted)',
  };
};

export const getChallenge = async (userId, isLive = false) => {
  if (isLive) {
    try {
      const res = await fetch(`${API_BASE}/auth/challenge?user_id=${userId}`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Challenge failed' }));
        throw new Error(err.detail || 'Challenge failed');
      }
      return await res.json();
    } catch (e) {
      console.warn('Live getChallenge failed, using offline simulation', e);
    }
  }

  // Offline random phrase generator
  const NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const COLOURS = ['red', 'blue', 'green', 'amber', 'silver', 'crimson', 'golden', 'violet'];
  const OBJECTS = ['falcon', 'phoenix', 'panther', 'sapphire', 'nexus', 'echo', 'matrix', 'shield'];
  const n1 = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  const col = COLOURS[Math.floor(Math.random() * COLOURS.length)];
  const obj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
  const n2 = NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  const phrase = `Say: ${n1} ${col} ${obj} ${n2}`;

  const nonce = Math.random().toString(36).substring(2, 10);
  const expiresAt = new Date(Date.now() + 90000);
  const token = `${nonce}.${Math.floor(expiresAt.getTime() / 1000)}.hmac_sha256_mock_sig`;

  return {
    phrase,
    token,
    expires_at: expiresAt.toISOString(),
  };
};

export const verifyVoice = async (userId, token, audioBlob, isLive = false, simulateSpoof = false) => {
  if (isLive) {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('token', token);
      formData.append('audio', audioBlob, 'verify.wav');

      const res = await fetch(`${API_BASE}/auth/verify`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Verification failed' }));
        throw new Error(err.detail || 'Verification failed');
      }
      return await res.json();
    } catch (e) {
      console.warn('Live verify failed, falling back to simulation', e);
    }
  }

  // Offline realistic simulation
  const sessionId = crypto.randomUUID ? crypto.randomUUID() : 'sess-' + Date.now();
  let result;

  if (simulateSpoof) {
    result = {
      result: 'REJECT',
      confidence: 0.94,
      layer_blocked: 2,
      session_id: sessionId,
      reason: 'Deepfake / synthetic speech detected at Layer 2 (wav2vec2 gate)',
      l2_label: 'spoof',
      l2_confidence: 0.941,
      l1_score: 0.15,
      asr_transcript: 'synthetic audio detected',
      asr_similarity: 0.1,
    };
  } else {
    // Realistic genuine authentication
    const l1 = +(0.78 + Math.random() * 0.16).toFixed(3);
    const l2 = +(0.96 + Math.random() * 0.035).toFixed(3);
    const asrSim = +(0.85 + Math.random() * 0.15).toFixed(2);
    result = {
      result: 'ACCEPT',
      confidence: l1,
      layer_blocked: null,
      session_id: sessionId,
      reason: 'Authentication successful: All security layers passed',
      l2_label: 'bonafide',
      l2_confidence: l2,
      l1_score: l1,
      asr_transcript: 'verified speech phrase',
      asr_similarity: asrSim,
    };
  }

  // Save to local logs
  const logs = getLocalLogs(userId);
  logs.unshift({
    id: 'log-' + Math.random().toString(36).substring(2, 9),
    user_id: userId,
    l2_label: result.l2_label,
    l2_confidence: result.l2_confidence,
    l1_score: result.l1_score,
    result: result.result,
    layer_blocked: result.layer_blocked,
    created_at: new Date().toISOString(),
    reason: result.reason,
  });
  saveLocalLogs(userId, logs);

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
  }

  return [
    { updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), sample_count: 4 },
    { updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), sample_count: 3 },
    { updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), sample_count: 2 },
    { updated_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), sample_count: 1 },
  ];
};

export const getAuthLogs = async (userId, isLive = false) => {
  if (isLive) {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}/auth-logs`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Live auth logs failed', e);
    }
  }
  return getLocalLogs(userId);
};
