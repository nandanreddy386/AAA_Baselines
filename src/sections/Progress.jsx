import React from 'react';
import { IMPLEMENTATION_STATUS, UPCOMING_SEMESTER_PLANS } from '../data/projectData';

const Progress = () => {
  return (
    <section id="progress" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Project Progress & Implementation State</h2>
          <p>
            Current implementation status across all authentication modules. All core components are functional, integrated, and verified.
          </p>
        </div>

        {/* Phase Status Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%)',
          border: '1px solid #93c5fd',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 30px',
          marginBottom: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>Core Pipeline Complete</span>
              <span className="badge badge-primary" style={{ fontSize: '0.85rem' }}>End-to-End Verified</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#1e3a8a', margin: 0 }}>
              End-to-End Authentication Pipeline Operational
            </h3>
            <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontSize: '0.92rem' }}>
              Both ACCEPT (Bona Fide speaker match) and REJECT (Layer 2 spoof blocked & Layer 1 identity mismatch) paths verified end-to-end.
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block' }}>Release Status</span>
            <strong style={{ color: 'var(--color-text)' }}>Active Baseline (v1.0)</strong>
          </div>
        </div>

        {/* Implementation Status Table */}
        <div className="card" style={{ marginBottom: '48px', overflowX: 'auto' }}>
          <h3 style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛠️</span> Module Functionality & Integration State
          </h3>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Module / Track</th>
                <th style={{ width: '20%' }}>Module Lead</th>
                <th>Implementation Details & Verification</th>
                <th style={{ width: '15%', textAlign: 'center' }}>State</th>
              </tr>
            </thead>
            <tbody>
              {IMPLEMENTATION_STATUS.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <strong style={{ color: 'var(--color-text)', display: 'block', fontSize: '0.92rem' }}>
                      {item.module.split('(')[0]}
                    </strong>
                    <code style={{ fontSize: '0.78rem', color: 'var(--color-primary)' }}>
                      {item.module.includes('(') ? item.module.split('(')[1].replace(')', '') : ''}
                    </code>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                      {item.lead}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                    {item.state}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${
                      item.status === 'Integrated' || item.status === 'Demonstrated Live'
                        ? 'badge-success'
                        : 'badge-primary'
                    }`}>
                      {item.status === 'Demonstrated Live' ? '✓ ' + item.status : item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Plans for Upcoming Semesters */}
        <div>
          <div className="section-header" style={{ marginBottom: '28px', textAlign: 'left' }}>
            <h3>🚀 Engineering Roadmap & Production Hardening</h3>
            <p style={{ margin: 0 }}>
              Key technical initiatives covering framework adapters, adversarial red-teaming, and model fine-tuning.
            </p>
          </div>

          <div className="grid-3">
            {UPCOMING_SEMESTER_PLANS.map((plan, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.82rem',
                    fontWeight: '700'
                  }}>
                    {idx + 1}
                  </span>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-text)', margin: 0 }}>
                    {plan.title}
                  </h4>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {plan.details}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Progress;
