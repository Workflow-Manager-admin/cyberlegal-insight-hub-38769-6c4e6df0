import React from 'react';

// PUBLIC_INTERFACE
function Header() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main">
      <div className="container" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" aria-label="KAVIA AI CyberLegal Insight Hub Home">
            <span className="logo-symbol" aria-hidden="true">*</span>
            CyberLegal Insight Hub
          </div>
          {/* Nav elements/buttons could go here in the future */}
        </div>
      </div>
    </nav>
  );
}

export default Header;
