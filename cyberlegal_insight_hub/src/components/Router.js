import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import WelcomePage from "./WelcomePage";
import CyberQuiz from "./CyberQuiz";
import { useNavigate } from "react-router-dom";

// Step: Cyber Quiz
function Quiz() {
  // Use router navigation to proceed to upload step on quiz completion
  const navigate = useNavigate();
  return (
    <CyberQuiz
      onComplete={() => {
        navigate("/upload");
      }}
    />
  );
}

// Step: Contract Upload/Paste
function Upload() {
  return (
    <section className="container hero" style={{textAlign: 'center'}}>
      <div className="subtitle">Step 2: Analyze Your Legal Documents</div>
      <h1 className="title">Upload or Paste a Contract</h1>
      <div className="description">
        {/* TODO: Upload/Paste component */}
        [Contract analysis component coming soon...]
      </div>
    </section>
  );
}

// Step: Results Dashboard
function Results() {
  return (
    <section className="container hero" style={{textAlign: 'center'}}>
      <div className="subtitle">Step 3: Your Risk Report</div>
      <h1 className="title">Assessment Results</h1>
      <div className="description">
        {/* TODO: Results Dashboard */}
        [Unified risk dashboard coming soon...]
      </div>
    </section>
  );
}

// Step: Thank You
function ThankYou() {
  return (
    <section className="container hero" style={{textAlign: 'center'}}>
      <div className="subtitle">Thank You</div>
      <h1 className="title">Assessment Complete!</h1>
      <div className="description">
        {/* TODO: Thank you actions */}
        We appreciate your time. Stay tuned for your personalized insights!
      </div>
    </section>
  );
}

/**
 * AppRouter wraps all routes for CyberLegal Insight Hub.
 * Home ("/") uses polished WelcomePage with branding, intro, illustration, CTA.
 */
// PUBLIC_INTERFACE
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/results" element={<Results />} />
        <Route path="/thankyou" element={<ThankYou />} />
        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
