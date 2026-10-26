import React from 'react';
import { TEAM, PROJECT } from '../data/projectData';

const Team = () => {
  return (
    <section id="team" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>Project Team & Leadership</h2>
          <p>
            Engineered by the AAA Engine team at the Department of Computer Science & Engineering, Amrita School of Computing.
          </p>
        </div>

        {/* Faculty Guide Card */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 48px auto',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1d4ed8, #0891b2)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '700',
            flexShrink: 0
          }}>
            🎓
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <span className="badge badge-primary">Faculty Project Guide</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Department of CSE</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', margin: '0 0 4px 0', color: 'var(--color-text)' }}>
              {PROJECT.guide.name}
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              {PROJECT.guide.title} · {PROJECT.guide.institution}
            </p>
          </div>
        </div>

        {/* Team Members Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {TEAM.map((member) => (
            <div key={member.regNo} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  color: 'var(--color-primary-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '1rem',
                  flexShrink: 0
                }}>
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-text)' }}>
                    {member.name}
                  </h4>
                  <code style={{ fontSize: '0.8rem', color: 'var(--color-primary)', display: 'block', marginTop: '2px' }}>
                    {member.regNo}
                  </code>
                </div>
              </div>

              {/* Module Ownership */}
              <div style={{
                background: 'var(--color-surface-alt)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '14px',
                border: '1px solid var(--color-border)',
                fontSize: '0.82rem'
              }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', marginBottom: '2px', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  Project Role & Module
                </span>
                <span style={{ color: 'var(--color-text)', fontWeight: '500' }}>
                  {member.role}
                </span>
              </div>

              {/* Technical Enrichment MOOC */}
              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px dashed var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>
                  Technical Specialization
                </span>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                  {member.enrichment.course}
                </p>
                <span className="badge badge-muted" style={{ marginTop: '6px', fontSize: '0.72rem' }}>
                  {member.enrichment.platform} · {member.enrichment.hours}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Meta Info */}
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          fontSize: '0.88rem',
          color: 'var(--color-text-secondary)'
        }}>
          <strong>AAA Engine — Biometric Security Engineering</strong> · Department of Computer Science & Engineering · Amrita Vishwa Vidyapeetham
        </div>

      </div>
    </section>
  );
};

export default Team;
