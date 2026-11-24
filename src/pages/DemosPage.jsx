import React from 'react';

// Report Section 8.15, Table 25
const DEMO_SCRIPT = [
  {
    step: 1,
    segment: 'Start-up',
    shown: 'Engine, database and host applications start; the readiness probe reports healthy; the simulated-call banner is visible.',
  },
  {
    step: 2,
    segment: 'Enrolment and challenge',
    shown: 'Banking Shield enrolment through the capture frame; a fresh challenge with its 90-second timer.',
  },
  {
    step: 3,
    segment: 'Authentication',
    shown: 'APPROVE for a genuine attempt; DENY for a replayed token; STEP_UP for a marginal attempt.',
  },
  {
    step: 4,
    segment: 'CallGuard scenarios',
    shown: 'Routine call approved; credential solicitation escalated; genuine advisory not flagged; address change sent to review.',
  },
  {
    step: 5,
    segment: 'Privacy and audit',
    shown: 'The audit table shows request IDs and public reasons only; no score appears anywhere.',
  },
  {
    step: 6,
    segment: 'Offline and security',
    shown: 'Network disconnected and the workflow repeated; a cross-tenant request refused.',
  },
];

// Report Section 5.12 (all data synthetic)
const CALLGUARD_SCENARIOS = [
  {
    title: 'Routine transfer confirmation',
    risk: 'LOW',
    decision: 'APPROVE',
    detail: 'A customer confirms a scheduled transfer. No risk cues; voice verification approves.',
  },
  {
    title: 'Urgent credential solicitation',
    risk: 'CRITICAL',
    decision: 'DENY',
    detail: 'A caller claiming to be a finance director demands credentials urgently. AAA-VR flags authority and urgency cues; the call is denied and escalated to a tier-2 supervisor.',
  },
  {
    title: 'Genuine security advisory',
    risk: 'LOW',
    decision: 'APPROVE',
    detail: 'The agent reminds the customer never to share an OTP. Negation and advisory handling mean this warning is not flagged: no false alarm.',
  },
  {
    title: 'Address change, unverified beneficiary',
    risk: 'MEDIUM',
    decision: 'REVIEW',
    detail: 'A request to change the address alongside a new, unverified beneficiary is sent for human review.',
  },
];

// Report Table 11
const BANKING_TIERS = [
  ['Low risk', 'Balance view, statement download', 'Standard pass accepted; a spoof result always denies'],
  ['Standard', 'Small transfer, payee view', 'Clean pass required; a marginal speaker score gives STEP_UP'],
  ['High value', 'Large transfer, new beneficiary', 'Clean pass with a stricter score; marginal gives STEP_UP; any risk signal gives REVIEW'],
];

const riskColor = { LOW: 'APPROVE', MEDIUM: 'STEP_UP', HIGH: 'REVIEW', CRITICAL: 'DENY' };

export default function DemosPage({ onNavigate }) {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">System Demonstration (report Section 8.14)</span>
        <h1 className="section-title">Demonstration Script & Host Scenarios</h1>
        <p className="section-subtitle">
          Both host applications run on one middleware instance. The supervisor demonstration follows a five-to-seven-minute script.
          All call data is synthetic.
        </p>
      </div>

      {/* Demonstration script */}
      <div className="saas-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1rem' }}>Demonstration script</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="light-table">
            <thead>
              <tr>
                <th style={{ width: '8%' }}>Step</th>
                <th style={{ width: '24%' }}>Segment</th>
                <th>What is shown</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_SCRIPT.map((d) => (
                <tr key={d.step}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{d.step}</td>
                  <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>{d.segment}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>{d.shown}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => onNavigate('app')}>
            Try steps 2, 3 and 5 in the interactive demo →
          </button>
        </div>
      </div>

      {/* CallGuard */}
      <div className="saas-card" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          CallGuard: four seeded scenarios
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          An operator signs in, sees a priority queue, opens a call and works with a live synthetic transcript, the AAA-VR risk panel and an
          escalation form. The audit log shows request IDs and public reasons only, and the console never records or proxies audio.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {CALLGUARD_SCENARIOS.map((c, i) => (
            <div key={c.title} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', background: '#ffffff' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Scenario {i + 1}
              </div>
              <div style={{ fontWeight: 800, color: 'var(--color-text)', margin: '4px 0 10px' }}>{c.title}</div>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span className={`badge-tag-light ${riskColor[c.risk]}`}>Risk {c.risk}</span>
                <span className={`badge-tag-light ${c.decision}`}>{c.decision}</span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>{c.detail}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
          A Day 3 audit found five CallGuard defects (for example, a numeric certainty percentage shown to operators). Four were fixed in code and
          the fifth was worked around with a separate environment; the pages were then captured again as an 11-image evidence set.
        </p>
      </div>

      {/* Banking Shield */}
      <div className="saas-card" style={{ padding: '2rem', marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          Banking Shield: tiered decisions
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
          A mock retail-banking front end with enrolment, a transaction simulator, step-up handling and a security dashboard. It calls the
          engine only through the public API and the embedded capture component, and renders decisions and public reasons only.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table className="light-table">
            <thead>
              <tr>
                <th>Policy tier</th>
                <th>Typical banking action</th>
                <th>Gateway behaviour</th>
              </tr>
            </thead>
            <tbody>
              {BANKING_TIERS.map(([tier, action, behaviour]) => (
                <tr key={tier}>
                  <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>{tier}</td>
                  <td style={{ fontSize: '0.88rem' }}>{action}</td>
                  <td style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>{behaviour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
