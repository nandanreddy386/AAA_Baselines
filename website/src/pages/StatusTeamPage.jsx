import React from 'react';
import { TEAM, IMPLEMENTATION_MATRIX, PROJECT, ACADEMIC_REFERENCES } from '../data/projectData';

export default function StatusTeamPage() {
  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">Academic Engineering Tracking</span>
        <h1 className="section-title">Implementation Status & Engineering Team</h1>
        <p className="section-subtitle">
          Transparent auditing of implemented capabilities versus future semester plans, verified against the repository codebase.
        </p>
      </div>

      {/* Implementation Matrix */}
      <div className="saas-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)' }}>
              Component Verification Matrix
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Source-of-truth priority: Actual repository code &gt; Architecture design &gt; Planned research.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
              ● 7 Verified in Code
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              ○ 2 Planned Phase 2
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="light-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>System Component</th>
                <th style={{ width: '22%' }}>Model / Technology</th>
                <th style={{ width: '18%' }}>Status</th>
                <th style={{ width: '35%' }}>Technical Verification Details</th>
              </tr>
            </thead>
            <tbody>
              {IMPLEMENTATION_MATRIX.map((row, idx) => {
                const isDone = row.status.includes('Verified');
                return (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: 'var(--color-text)' }}>
                      {row.component}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--color-primary)' }}>
                      {row.model}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '12px',
                          background: isDone ? 'var(--color-success-light)' : 'var(--color-primary-light)',
                          color: isDone ? 'var(--color-success)' : 'var(--color-primary)',
                          fontFamily: 'var(--font-mono)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isDone ? 'VERIFIED' : 'PLANNED'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.84rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      {row.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Cards */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-eyebrow">Project Contributors</span>
          <h2 className="section-title">The Engineering Team</h2>
          <p className="section-subtitle">
            Department of Computer Science & Engineering, Amrita School of Computing (23CSE498 - Team 90)
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {TEAM.map((member) => (
            <div key={member.sNo} className="saas-card" style={{ padding: '1.5rem', marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div className="user-avatar-initials" style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}>
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-text)' }}>
                    {member.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-primary)' }}>
                    {member.regNo}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
                {member.role}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {member.responsibilities}
              </p>

              <div style={{ background: 'var(--color-surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.78rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                  Enrichment Course
                </div>
                <div style={{ color: 'var(--color-text)', fontWeight: 600, marginTop: '2px' }}>
                  {member.enrichment.course}
                </div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  {member.enrichment.platform} • {member.enrichment.hours}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Guide Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ flex: '1 1 500px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            ACADEMIC PROJECT SUPERVISOR
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            {PROJECT.guide.name}
          </h2>
          <div style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
            {PROJECT.guide.title}
          </div>
          <div style={{ fontSize: '0.95rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            {PROJECT.guide.institution}
          </div>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '640px' }}>
            Supervising research on biometric acoustic anti-spoofing, neural voiceprint drift tracking, and challenge-response authentication architectures for Course 23CSE498.
          </p>
        </div>

        <div style={{ flex: '0 1 260px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
            Course Details
          </div>
          <div style={{ fontWeight: 800, color: '#ffffff', fontSize: '1.1rem', marginTop: '4px' }}>
            {PROJECT.course}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '2px' }}>
            {PROJECT.teamNumber}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem', color: '#cbd5e1' }}>
            Amrita School of Computing, Amrita Vishwa Vidyapeetham
          </div>
        </div>
      </div>

      {/* Academic Citations */}
      <div className="saas-card" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
          Key Academic References & Literature
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          Foundational research informing the model selection, dataset evaluation, and security protocols in AAA Engine.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ACADEMIC_REFERENCES.map((ref) => (
            <div
              key={ref.id}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  [{ref.id}]
                </span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text)' }}>
                  {ref.title}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginLeft: '1.5rem' }}>
                {ref.authors} — <em>{ref.venue}</em>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', marginLeft: '1.5rem', marginTop: '4px' }}>
                Impact on AAA: {ref.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
