import React, { useState } from 'react';
import { API_ENDPOINTS, PROJECT } from '../data/projectData';

const ApiDocs = () => {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const copyToClipboard = (text, idx) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    }
  };

  return (
    <section id="api" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2>REST API Documentation & Frozen Interface</h2>
          <p>
            The AAA Engine exposes a 5-endpoint REST API (FastAPI / port 8000) adhering to the shared contract specified in Slide 4 of the Project Review.
          </p>
        </div>

        {/* Global API Configuration Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '36px'
        }}>
          <div className="card" style={{ padding: '16px 20px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
              Base Middleware URL
            </span>
            <code style={{ display: 'block', marginTop: '4px', fontSize: '0.95rem', color: 'var(--color-primary)' }}>
              http://localhost:8000
            </code>
          </div>
          <div className="card" style={{ padding: '16px 20px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
              Audio Requirement
            </span>
            <strong style={{ display: 'block', marginTop: '4px', fontSize: '0.9rem', color: 'var(--color-text)' }}>
              {PROJECT.thresholds.audioSpec}
            </strong>
          </div>
          <div className="card" style={{ padding: '16px 20px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
              Decision Thresholds (main.py)
            </span>
            <span style={{ display: 'block', marginTop: '4px', fontSize: '0.9rem', color: 'var(--color-text)' }}>
              L2 Spoof: <strong>0.50</strong> · L1 Similarity: <strong>0.70</strong>
            </span>
          </div>
          <div className="card" style={{ padding: '16px 20px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
              Token TTL & Adaptation
            </span>
            <span style={{ display: 'block', marginTop: '4px', fontSize: '0.9rem', color: 'var(--color-text)' }}>
              90s Single-Use · EMA α = 0.20
            </span>
          </div>
        </div>

        {/* Endpoints List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {API_ENDPOINTS.map((endpoint, idx) => (
            <div key={idx} className="card" style={{ borderLeft: endpoint.method === 'GET' ? '4px solid #059669' : '4px solid #2563eb' }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px',
                paddingBottom: '14px',
                borderBottom: '1px solid var(--color-border)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className={`method-badge ${endpoint.method === 'GET' ? 'method-get' : 'method-post'}`}>
                    {endpoint.method}
                  </span>
                  <code style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--color-text)' }}>
                    {endpoint.path}
                  </code>
                </div>
                <span className="badge badge-muted" style={{ fontSize: '0.78rem' }}>
                  Pydantic v2 Validated
                </span>
              </div>

              {/* Purpose */}
              <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                {endpoint.purpose}
              </p>

              {/* Parameters Table */}
              {endpoint.params.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                    Request Parameters & Payload
                  </h4>
                  <table className="data-table" style={{ fontSize: '0.84rem' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '22%' }}>Field / Param</th>
                        <th style={{ width: '24%' }}>Type & Location</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.params.map((p, pIdx) => (
                        <tr key={pIdx}>
                          <td><code>{p.name}</code></td>
                          <td><span className="badge badge-muted">{p.type}</span></td>
                          <td>{p.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Request Example */}
              {endpoint.request && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--color-text-muted)' }}>
                      Example Request
                    </span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => copyToClipboard(endpoint.request, `req-${idx}`)}
                      style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                    >
                      {copiedIdx === `req-${idx}` ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="code-block" style={{ margin: 0, padding: '14px', fontSize: '0.8rem' }}>
                    <code>{endpoint.request}</code>
                  </pre>
                </div>
              )}

              {/* Response Example */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--color-text-muted)' }}>
                    Example Success Response (HTTP 200)
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => copyToClipboard(endpoint.response, `res-${idx}`)}
                    style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                  >
                    {copiedIdx === `res-${idx}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="code-block" style={{ margin: 0, padding: '14px', fontSize: '0.8rem' }}>
                  <code>{endpoint.response}</code>
                </pre>
              </div>

              {/* Error Response (if any) */}
              {endpoint.errorResponse && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--color-danger)' }}>
                      Example Rejection Response (Layer Blocked)
                    </span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => copyToClipboard(endpoint.errorResponse, `err-${idx}`)}
                      style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                    >
                      {copiedIdx === `err-${idx}` ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="code-block" style={{ margin: 0, padding: '14px', fontSize: '0.8rem', borderColor: '#fca5a5' }}>
                    <code>{endpoint.errorResponse}</code>
                  </pre>
                </div>
              )}

              {/* Notes */}
              {endpoint.notes && (
                <div style={{ marginTop: '14px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  💡 <strong>Implementation Note:</strong> {endpoint.notes}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ApiDocs;
