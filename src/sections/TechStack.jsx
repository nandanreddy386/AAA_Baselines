import React, { useState } from 'react';
import { TECH_STACK } from '../data/projectData';

const categoryIcons = {
  Frontend: '🖥️',
  Backend: '⚡',
  'ML / AI': '🧠',
  'Machine Learning': '🧠',
  ML: '🧠',
  Audio: '🎵',
  'Audio Processing': '🎵',
  Database: '🗄️',
  Security: '🔒',
  Deployment: '📦',
  DevOps: '📦',
  Infrastructure: '📦',
};

function getIcon(category) {
  for (const [key, icon] of Object.entries(categoryIcons)) {
    if (category.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return '🔧';
}

function TechCard({ tech, isHovered, onEnter, onLeave }) {
  return (
    <div
      className="card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        cursor: 'default',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.25)' : undefined,
      }}
    >
      <h4 style={{ fontSize: '0.92rem', marginBottom: 6 }}>{tech.name}</h4>
      <p style={{
        fontSize: '0.78rem', color: 'var(--color-text-muted)',
        margin: 0, lineHeight: 1.55,
      }}>
        {tech.role || tech.description || '—'}
      </p>
      {tech.badge && (
        <span className="badge" style={{ marginTop: 8, display: 'inline-block' }}>
          {tech.badge}
        </span>
      )}
    </div>
  );
}

export default function TechStack() {
  const [hoveredKey, setHoveredKey] = useState(null);

  /* TECH_STACK may be an array of { category, items[] } or an object keyed by category */
  const categories = Array.isArray(TECH_STACK)
    ? TECH_STACK
    : Object.entries(TECH_STACK).map(([category, items]) => ({ category, items }));

  return (
    <section id="techstack" className="section">
      <div className="container">
        {/* ── Header ───────────────────────────── */}
        <div className="section-header">
          <h2>Technology Stack</h2>
          <p>Purpose-selected tools powering every layer of the voice-authentication pipeline.</p>
        </div>

        {/* ── Category groups ──────────────────── */}
        {categories.map((group) => {
          const cat = group.category;
          const items = group.items || group.technologies || [];

          return (
            <div key={cat} style={{ marginBottom: '2.5rem' }}>
              <h3 style={{
                fontSize: '1.05rem', marginBottom: '1rem',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: '1.3rem' }}>{getIcon(cat)}</span>
                {cat}
              </h3>

              <div className="grid-3" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1rem',
              }}>
                {items.map((tech, j) => {
                  const key = `${cat}-${j}`;
                  return (
                    <TechCard
                      key={key}
                      tech={tech}
                      isHovered={hoveredKey === key}
                      onEnter={() => setHoveredKey(key)}
                      onLeave={() => setHoveredKey(null)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── Footer note ─────────────────────── */}
        <p style={{
          textAlign: 'center', fontSize: '0.78rem',
          color: 'var(--color-text-muted)', marginTop: '1.5rem',
          maxWidth: 640, marginLeft: 'auto', marginRight: 'auto',
          lineHeight: 1.6, fontStyle: 'italic',
        }}>
          Technology selections are documented in Task&nbsp;4 — Architecture Design.
          Integration status reflects the current project phase.
        </p>
      </div>
    </section>
  );
}
