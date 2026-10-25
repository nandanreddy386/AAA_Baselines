import React from 'react';

const FOOTER_NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'API', href: '#api' },
  { label: 'Demos', href: '#demos' },
  { label: 'Team', href: '#team' },
  { label: 'References', href: '#references' },
];

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
  const currentYear = CURRENT_YEAR;

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ---- styles ---- */
  const styles = {
    footer: {
      background: 'var(--color-surface, #ffffff)',
      borderTop: '1px solid var(--color-border, #e2e8f0)',
      padding: '3rem clamp(1.5rem, 5vw, 4rem) 2rem',
      fontFamily: 'inherit',
      color: 'var(--color-text, #1e293b)',
    },
    inner: {
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '2rem 3rem',
    },
    brandCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    logo: {
      fontWeight: 700,
      fontSize: '1.2rem',
      color: 'var(--color-primary, #2563eb)',
      letterSpacing: '-0.02em',
    },
    tagline: {
      fontSize: '0.88rem',
      color: '#64748b',
      lineHeight: 1.5,
      maxWidth: '280px',
    },
    colTitle: {
      fontWeight: 600,
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#94a3b8',
      marginBottom: '0.6rem',
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
    },
    navLink: {
      fontSize: '0.9rem',
      color: 'var(--color-text, #1e293b)',
      textDecoration: 'none',
      transition: 'color 0.2s',
      padding: '0.15rem 0',
      display: 'inline-block',
    },
    externalLink: {
      fontSize: '0.9rem',
      color: 'var(--color-primary, #2563eb)',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'opacity 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
    },
    infoCol: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
    },
    infoText: {
      fontSize: '0.88rem',
      color: '#64748b',
      lineHeight: 1.55,
      margin: 0,
    },
    divider: {
      border: 'none',
      borderTop: '1px solid var(--color-border, #e2e8f0)',
      margin: '2rem auto 1rem',
      maxWidth: '1100px',
    },
    bottom: {
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.82rem',
      color: '#94a3b8',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        {/* Brand column */}
        <div style={styles.brandCol}>
          <span style={styles.logo}>AAA Engine</span>
          <p style={styles.tagline}>
            Automated Assessment of Articulation — an end-to-end speech
            analysis and evaluation platform.
          </p>
          <a
            href="https://github.com/Speech-Synthesis/AAA_Baselines"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.externalLink}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--color-primary, #2563eb)';
              e.currentTarget.style.outlineOffset = '2px';
            }}
            onBlur={(e) => (e.currentTarget.style.outline = 'none')}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Quick links column */}
        <div>
          <div style={styles.colTitle}>Quick Links</div>
          <ul style={styles.navList}>
            {FOOTER_NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={styles.navLink}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--color-primary, #2563eb)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--color-text, #1e293b)')
                  }
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid var(--color-primary, #2563eb)';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => (e.currentTarget.style.outline = 'none')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Info column */}
        <div style={styles.infoCol}>
          <div style={styles.colTitle}>About</div>
          <p style={styles.infoText}>
            Built by the AAA Engine Team — Department of CSE
          </p>
          <p style={styles.infoText}>
            Faculty Guide: Dr.&nbsp;Harini&nbsp;N, Associate Professor
          </p>
        </div>
      </div>

      <hr style={styles.divider} />

      <div style={styles.bottom}>
        <span>&copy; {currentYear} AAA Engine. All rights reserved.</span>
        <span>Department of Computer Science &amp; Engineering</span>
      </div>
    </footer>
  );
};

export default Footer;
