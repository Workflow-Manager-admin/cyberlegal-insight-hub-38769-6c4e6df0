import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Step: Welcome/Landing
function Welcome() {
  return (
    <section className="container hero" style={{textAlign: 'center', paddingTop: '5rem'}}>
      <div className="subtitle">Your Digital & Legal Safety Companion</div>
      <h1 className="title">Welcome to the CyberLegal Insight Hub</h1>
      <div className="description">
        Assess your cyber security and legal awareness in a unified flow.<br/>
        Start your journey to a safer digital and legal life.
      </div>
      <a href="/quiz" className="btn btn-large" style={{marginTop: '1.2rem'}}>Get Started</a>
    </section>
  );
}

// Step: Cyber Quiz
function Quiz() {
  return (
    <section className="container hero" style={{textAlign: 'center'}}>
      <div className="subtitle">Step 1: Digital Behavior Check</div>
      <h1 className="title">Cyber Hygiene Quiz</h1>
      <div className="description">
        {/* TODO: Quiz Implementation */}
        [Quiz component coming soon...]
      </div>
    </section>
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

// PUBLIC_INTERFACE
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
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
