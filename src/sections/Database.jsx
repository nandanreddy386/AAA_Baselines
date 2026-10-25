import React from 'react';
import { DB_SCHEMA } from '../data/projectData';

const Database = () => {
  return (
    <section id="database" className="section">
      <div className="container">
        <div className="section-header">
          <h2>Database Schema & Data Tier</h2>
          <p>
            Persisted in PostgreSQL using SQLAlchemy ORM. Uses native <code>ARRAY(Float)</code> vectors to store 192-dimensional ECAPA-TDNN voiceprints without external vector DB dependencies.
          </p>
        </div>

        {/* ER Diagram Card */}
        <div className="card" style={{ marginBottom: '40px', background: 'var(--color-surface-alt)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '20px', textAlign: 'center' }}>
            Entity-Relationship & Data Flow Architecture (4 Tables)
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            alignItems: 'stretch'
          }}>
            {/* Table 1: users */}
            <div style={{
              background: 'var(--color-surface)',
              border: '2px solid #2563eb',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ color: '#2563eb', fontSize: '0.95rem' }}>users</strong>
                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Primary Entity</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                <li>🔑 <strong>id</strong>: UUID (PK)</li>
                <li>• name: VARCHAR(255)</li>
                <li>• email: VARCHAR(255) [UNIQUE]</li>
                <li>• created_at: TIMESTAMP</li>
              </ul>
            </div>

            {/* Table 2: voiceprints */}
            <div style={{
              background: 'var(--color-surface)',
              border: '2px solid #059669',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ color: '#059669', fontSize: '0.95rem' }}>voiceprints</strong>
                <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Biometric Embeddings</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                <li>🔗 <strong>user_id</strong>: UUID (FK → users.id)</li>
                <li>🧬 <strong>embedding</strong>: ARRAY(Float) [192]</li>
                <li>• sample_count: INTEGER</li>
                <li>• updated_at: TIMESTAMP</li>
              </ul>
            </div>

            {/* Table 3: challenges */}
            <div style={{
              background: 'var(--color-surface)',
              border: '2px solid #d97706',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ color: '#d97706', fontSize: '0.95rem' }}>challenges</strong>
                <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>Active Tokens</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                <li>🔑 <strong>id</strong>: UUID (PK)</li>
                <li>🔗 user_id: UUID (FK → users.id)</li>
                <li>• phrase: TEXT (Spoken phrase)</li>
                <li>🔒 token: TEXT (HMAC signature)</li>
                <li>⏱️ expires_at: TIMESTAMP (90s TTL)</li>
                <li>• used: BOOLEAN (Single-use)</li>
              </ul>
            </div>

            {/* Table 4: auth_logs */}
            <div style={{
              background: 'var(--color-surface)',
              border: '2px solid #64748b',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong style={{ color: '#475569', fontSize: '0.95rem' }}>auth_logs</strong>
                <span className="badge badge-muted" style={{ fontSize: '0.7rem' }}>Audit Trail</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                <li>🔑 <strong>id</strong>: UUID (PK)</li>
                <li>🔗 user_id: UUID (FK → users.id)</li>
                <li>🔗 challenge_id: UUID (FK)</li>
                <li>• l2_label: VARCHAR (bonafide/spoof)</li>
                <li>• l2_confidence: FLOAT</li>
                <li>• l1_score: FLOAT (Cosine Sim)</li>
                <li>• result: VARCHAR (ACCEPT/REJECT)</li>
                <li>• layer_blocked: INT (1, 2, NULL)</li>
                <li>• created_at: TIMESTAMP</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detailed Schema Tables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {DB_SCHEMA.tables.map((table, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-text)', margin: 0 }}>
                  Table: <code>{table.name}</code>
                </h3>
                <span className="badge badge-muted" style={{ fontSize: '0.78rem' }}>SQLAlchemy Model</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                {table.description}
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ fontSize: '0.85rem' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '22%' }}>Column Name</th>
                      <th style={{ width: '22%' }}>SQL Data Type</th>
                      <th style={{ width: '22%' }}>Constraint / Index</th>
                      <th>Purpose & Definition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.fields.map((f, fIdx) => (
                      <tr key={fIdx}>
                        <td><code>{f.name}</code></td>
                        <td><span className="badge badge-muted">{f.type}</span></td>
                        <td>
                          {f.constraint ? (
                            <strong style={{ fontSize: '0.78rem', color: 'var(--color-primary-dark)' }}>
                              {f.constraint}
                            </strong>
                          ) : (
                            <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                          )}
                        </td>
                        <td style={{ color: 'var(--color-text-secondary)' }}>{f.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Data Privacy & GDPR Section */}
        <div className="card" style={{ marginTop: '36px', borderLeft: '4px solid #059669', background: '#f0fdf4' }}>
          <h4 style={{ color: '#065f46', marginBottom: '8px' }}>
            🔒 Privacy by Design & GDPR Biometric Compliance
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#166534', margin: 0, lineHeight: '1.6' }}>
            The AAA Engine enforces non-reversible biometric templates: <strong>zero raw audio recordings are stored in the database</strong>. 
            Audio received in <code>/auth/enroll</code> and <code>/auth/verify</code> is processed in volatile memory, converted to mathematical 192-dimensional floating-point vectors, and immediately discarded. Even in the event of an unauthorized database dump, acoustic speech cannot be reconstructed from normalized ECAPA embeddings.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Database;
