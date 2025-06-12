import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * Welcome Page for CyberLegal Insight Hub.
 * Displays branding, logo, friendly illustration (static SVG), welcoming intro, and a CTA to start the risk assessment.
 */
function WelcomePage() {
  const navigate = useNavigate();

  // Handler for CTA button
  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <section className="container hero" aria-labelledby="welcomeTitle">
      {/* Branding/Logo Row */}
      <div className="logo" style={{justifyContent: "center", marginBottom: "0.7rem"}}>
        <span className="logo-symbol" aria-hidden="true" title="KAVIA AI Logo">*</span>
        <span style={{fontWeight: 700}}>CyberLegal Insight Hub</span>
      </div>
      {/* Friendly Illustration (SVG placeholder) */}
      <div
        aria-hidden="true"
        style={{
          margin: "0 auto",
          height: "132px",
          maxWidth: "240px",
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* Simple illustrative SVG, compliant with brand blue/accent */}
        <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="24" width="136" height="80" rx="16" fill="#f1f5f9" stroke="#2563eb" strokeWidth="3"/>
          <circle cx="44" cy="64" r="14" fill="#2563eb" opacity="0.21"/>
          <circle cx="111" cy="64" r="14" fill="#fbbf24" opacity="0.21"/>
          <rect x="38" y="36" width="76" height="12" rx="6" fill="#2563eb" opacity="0.13"/>
          <rect x="38" y="88" width="76" height="6" rx="3" fill="#2563eb" opacity="0.13"/>
          {/* Abstract shield/hand shake */}
          <g>
            <path d="M74,73 Q75,78 80,78 Q85,78 86,73" stroke="#2563eb" strokeWidth="2" fill="none"/>
            <ellipse cx="80" cy="64" rx="14" ry="16" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
            <path d="M91,67 Q87,63 80,67 Q73,71 69,67" stroke="#2563eb" strokeWidth="2" fill="none"/>
            <circle cx="85" cy="68" r="2.3" fill="#2563eb"/>
            <circle cx="75" cy="68" r="2.3" fill="#fbbf24"/>
          </g>
        </svg>
      </div>
      <div className="subtitle" style={{marginBottom: "0.5rem"}}>
        Your Digital & Legal Safety Companion
      </div>
      <h1 id="welcomeTitle" className="title" style={{marginBottom: "0.2em"}}>
        Welcome to the CyberLegal Insight Hub
      </h1>
      <div className="description" style={{marginBottom: "1.2em"}}>
        Assess your <strong>cyber security</strong> and <strong>legal awareness</strong> with a unified KAVIA-powered flow.<br />
        Discover your risks and get clear, actionable recommendations to stay safer, smarter, and protected.
      </div>
      <button
        className="btn btn-large"
        style={{marginTop: "0.1em"}}
        onClick={handleStart}
        aria-label="Start Unified Risk Assessment"
        tabIndex={0}
      >
        Get Started
      </button>
    </section>
  );
}

export default WelcomePage;
