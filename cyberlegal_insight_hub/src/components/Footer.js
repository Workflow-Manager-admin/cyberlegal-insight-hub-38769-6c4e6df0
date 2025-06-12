import React from 'react';

// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer style={{
      background: 'var(--navbar-bg)',
      borderTop: '1px solid var(--navbar-border)',
      padding: '16px 0',
      textAlign: 'center',
      marginTop: 'auto',
      color: 'var(--secondary-text)',
      fontSize: '1rem'
    }}>
      <div className="container">
        &copy; {new Date().getFullYear()} <span style={{ color: 'var(--color-primary)' }}>KAVIA AI</span> &mdash; CyberLegal Insight Hub.
      </div>
    </footer>
  );
}

export default Footer;
