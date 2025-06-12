import React from 'react';

function Footer() {
  // Edit mode control/button/toggle has been removed as requested.
  return (
    <footer style={{
      background: 'var(--color-bg-surface)',
      borderTop: '1.5px solid var(--color-border)',
      padding: '18px 0',
      textAlign: 'center',
      marginTop: 'auto',
      color: 'var(--text-secondary)',
      fontSize: '1rem',
      letterSpacing: '0.01em',
      fontFamily: 'var(--font-family)'
    }}>
      <div className="container">
        &copy; {new Date().getFullYear()} <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>KAVIA AI</span> &mdash; CyberLegal Insight Hub.
      </div>
    </footer>
  );
}

export default Footer;
