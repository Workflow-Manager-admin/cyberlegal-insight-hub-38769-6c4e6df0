import React from 'react';

function Header() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main">
      <div className="container" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" aria-label="KAVIA AI CyberLegal Insight Hub Home" style={{
            color: "var(--text-heading)",
            textShadow: "0 0 14px var(--color-primary)",
            fontWeight: 800,
            fontFamily: "var(--font-family)",
          }}>
            <span className="logo-symbol" aria-hidden="true" style={{
              color: "var(--color-accent)",
              fontSize: "1.67em"
            }}>*</span>
            CyberLegal Insight Hub
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
