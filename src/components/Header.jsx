import React, { useState, useEffect, useRef, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Problem', href: '#problem' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Tech Stack', href: '#techstack' },
  { label: 'Progress', href: '#progress' },
  { label: 'Team', href: '#team' },
  { label: 'Novelty', href: '#novelty' },
  { label: 'API', href: '#api' },
  { label: 'Database', href: '#database' },
  { label: 'GitHub', href: '#github' },
  { label: 'Demos', href: '#demos' },
  { label: 'References', href: '#references' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef(null);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const handleIntersect = (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActiveSection(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
      }
      if (menuOpen) setMenuOpen(false);
    },
    [menuOpen]
  );

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* ---- styles ---- */
  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      height: 'var(--header-height, 64px)',
      background: 'var(--color-surface, #ffffff)',
      borderBottom: '1px solid var(--color-border, #e2e8f0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 clamp(1rem, 3vw, 2.5rem)',
      zIndex: 100,
      boxSizing: 'border-box',
      fontFamily: 'inherit',
    },
    logo: {
      fontWeight: 700,
      fontSize: '1.25rem',
      color: 'var(--color-primary, #2563eb)',
      letterSpacing: '-0.02em',
      textDecoration: 'none',
      flexShrink: 0,
      cursor: 'pointer',
    },
    desktopNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.15rem',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    navLink: (isActive) => ({
      padding: '0.35rem 0.6rem',
      fontSize: '0.82rem',
      fontWeight: isActive ? 600 : 500,
      color: isActive
        ? 'var(--color-primary, #2563eb)'
        : 'var(--color-text, #1e293b)',
      textDecoration: 'none',
      borderRadius: '6px',
      background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
      transition: 'color 0.2s, background 0.2s',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
    }),
    hamburger: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
      width: '36px',
      height: '36px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      zIndex: 110,
      flexShrink: 0,
    },
    hamburgerLine: (open, index) => {
      const base = {
        width: '22px',
        height: '2px',
        background: 'var(--color-text, #1e293b)',
        borderRadius: '2px',
        transition: 'transform 0.3s ease, opacity 0.2s ease',
        transformOrigin: 'center',
      };
      if (open && index === 0)
        return { ...base, transform: 'translateY(7px) rotate(45deg)' };
      if (open && index === 1) return { ...base, opacity: 0 };
      if (open && index === 2)
        return { ...base, transform: 'translateY(-7px) rotate(-45deg)' };
      return base;
    },
    mobileMenu: (open) => ({
      position: 'absolute',
      top: 'var(--header-height, 64px)',
      left: 0,
      right: 0,
      background: 'var(--color-surface, #ffffff)',
      borderBottom: '1px solid var(--color-border, #e2e8f0)',
      boxShadow: open ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
      maxHeight: open ? '80vh' : '0',
      overflow: open ? 'auto' : 'hidden',
      transition: 'max-height 0.35s ease, box-shadow 0.3s ease',
      zIndex: 99,
      display: 'flex',
      flexDirection: 'column',
      padding: open ? '0.5rem 0' : '0',
    }),
    mobileNavLink: (isActive) => ({
      padding: '0.75rem 1.5rem',
      fontSize: '0.95rem',
      fontWeight: isActive ? 600 : 500,
      color: isActive
        ? 'var(--color-primary, #2563eb)'
        : 'var(--color-text, #1e293b)',
      textDecoration: 'none',
      background: isActive ? 'rgba(37,99,235,0.06)' : 'transparent',
      transition: 'color 0.2s, background 0.2s',
    }),
  };

  return (
    <header style={styles.header}>
      <a
        href="#home"
        style={styles.logo}
        onClick={(e) => handleNavClick(e, '#home')}
        aria-label="AAA Engine — Home"
      >
        AAA Engine
      </a>

      {isMobile ? (
        <>
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span style={styles.hamburgerLine(menuOpen, 0)} />
            <span style={styles.hamburgerLine(menuOpen, 1)} />
            <span style={styles.hamburgerLine(menuOpen, 2)} />
          </button>
          <nav style={styles.mobileMenu(menuOpen)} aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={styles.mobileNavLink(activeSection === link.href.replace('#', ''))}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </>
      ) : (
        <nav style={styles.desktopNav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={styles.navLink(activeSection === link.href.replace('#', ''))}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={(e) => {
                if (activeSection !== link.href.replace('#', '')) {
                  e.currentTarget.style.background = 'rgba(37,99,235,0.05)';
                  e.currentTarget.style.color = 'var(--color-primary, #2563eb)';
                }
              }}
              onMouseLeave={(e) => {
                const isActive = activeSection === link.href.replace('#', '');
                e.currentTarget.style.background = isActive
                  ? 'rgba(37,99,235,0.08)'
                  : 'transparent';
                e.currentTarget.style.color = isActive
                  ? 'var(--color-primary, #2563eb)'
                  : 'var(--color-text, #1e293b)';
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid var(--color-primary, #2563eb)';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
