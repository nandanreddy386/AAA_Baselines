import React, { useState } from 'react';
import { API_ENDPOINTS } from '../data/projectData';

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const ep = API_ENDPOINTS[selectedEndpoint];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="section-eyebrow">RESTful Middleware Specification</span>
        <h1 className="section-title">API Documentation & Contract</h1>
        <p className="section-subtitle">
          Complete REST API documentation matching backend/app/main.py and docs/00_SHARED_CONTRACT.md.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Endpoint List Sidebar */}
        <div className="saas-card" style={{ padding: '1.25rem', marginBottom: 0 }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.75rem' }}>
            AVAILABLE REST ROUTES ({API_ENDPOINTS.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {API_ENDPOINTS.map((item, idx) => {
              const isSelected = selectedEndpoint === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedEndpoint(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1px solid var(--color-primary)' : '1px solid transparent',
                    background: isSelected ? 'var(--color-primary-light)' : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: item.method === 'POST' ? 'var(--color-primary)' : 'var(--color-success)',
                      color: '#ffffff',
                    }}
                  >
                    {item.method}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text)',
                      fontWeight: isSelected ? 700 : 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.path}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Endpoint Detail View */}
        <div className="saas-card" style={{ padding: '2rem', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: ep.method === 'POST' ? 'var(--color-primary)' : 'var(--color-success)',
                  color: '#ffffff',
                }}
              >
                {ep.method}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text)' }}>
                {ep.path}
              </span>
            </div>
            <button
              onClick={() => handleCopy(ep.request, 'curl')}
              className="btn btn-secondary"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
            >
              {copiedIndex === 'curl' ? 'Copied curl ✓' : 'Copy curl'}
            </button>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {ep.purpose}
          </p>

          {/* Parameters Table */}
          {ep.params.length > 0 && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
                Request Parameters
              </h4>
              <div style={{ overflowX: 'auto' }}>
                <table className="light-table">
                  <thead>
                    <tr>
                      <th style={{ width: '25%' }}>Parameter</th>
                      <th style={{ width: '25%' }}>Type</th>
                      <th style={{ width: '50%' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ep.params.map((p, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-text)' }}>
                          {p.name}
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--color-primary)' }}>
                          {p.type}
                        </td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                          {p.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Request curl Code Box */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Sample Request (curl)
              </span>
            </div>
            <pre className="light-inspector-box" style={{ marginTop: 0 }}>
              {ep.request}
            </pre>
          </div>

          {/* Response JSON Code Box */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Sample Response (HTTP 200 OK)
              </span>
            </div>
            <pre className="light-inspector-box" style={{ marginTop: 0, color: '#a7f3d0' }}>
              {ep.response}
            </pre>
          </div>

          {/* Error Response if available */}
          {ep.errorResponse && (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-danger)', textTransform: 'uppercase' }}>
                  Sample Error Response (HTTP Rejection)
                </span>
              </div>
              <pre className="light-inspector-box" style={{ marginTop: 0, color: '#fca5a5' }}>
                {ep.errorResponse}
              </pre>
            </div>
          )}

          {/* Implementation Notes */}
          {ep.notes && (
            <div style={{ marginTop: '1.5rem', padding: '0.85rem 1.15rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <strong>Implementation Note:</strong> {ep.notes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
