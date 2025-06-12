import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from "./WelcomePage";
import CyberQuiz from "./CyberQuiz";
import ContractUpload from "./ContractUpload";
import ResultsDashboard from "./ResultsDashboard";
import ThankYouPage from "./ThankYouPage";
import { calculateCyberHygieneScore, calculateContractRiskScore, calculateOverallRisk } from "../logic/riskScoring";
import { useNavigate, useNavigate as useNavUpload } from "react-router-dom";

// Unifies quiz + contract upload + results in-memory (non-persistence)
// Main router handles forward/pass-data between steps via in-memory hooks

// Unified Flow Controller
function UnifiedFlowRouter() {
  // Step state: 0=quiz, 1=upload, 2=results, 3=thankyou
  const [step, setStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [cyberScoreResult, setCyberScoreResult] = useState(null);
  const [contractText, setContractText] = useState("");
  const [contractScoreResult, setContractScoreResult] = useState(null);
  const [overall, setOverall] = useState(null);

  // Step 1: Cyber Quiz page
  if (step === 0) {
    return (
      <CyberQuiz
        onComplete={({ answers, scoreResult }) => {
          setQuizAnswers(answers);
          setCyberScoreResult(scoreResult);
          setStep(1);
        }}
      />
    );
  }

  // Step 2: Contract Upload page
  if (step === 1) {
    return (
      <ContractUpload
        onContinue={(contract, riskResult) => {
          setContractText(contract);
          setContractScoreResult(riskResult);
          // combine for dashboard
          const overallResult = calculateOverallRisk({
            cyberScore: cyberScoreResult?.score,
            contractScore: riskResult?.score,
          });
          setOverall(overallResult);
          setStep(2);
        }}
        onSkip={() => {
          setContractText("");
          setContractScoreResult({ score: null, level: "unknown", issues: [] });
          const overallResult = calculateOverallRisk({
            cyberScore: cyberScoreResult?.score,
            contractScore: null,
          });
          setOverall(overallResult);
          setStep(2);
        }}
      />
    );
  }

  // Step 3: Results Dashboard
  if (step === 2) {
    return (
      <ResultsDashboard
        cyberScoreResult={cyberScoreResult}
        contractScoreResult={contractScoreResult}
        overall={overall}
        contractText={contractText}
      />
    );
  }

  // Step 4: Thank You
  if (step === 3) {
    return (
      <ThankYouPage
        onRetake={() => {
          // Clear all states for fresh start
          setStep(0);
          setQuizAnswers([]);
          setCyberScoreResult(null);
          setContractText("");
          setContractScoreResult(null);
          setOverall(null);
        }}
      />
    );
  }

  // Fallback for error step state
  return (
    <section className="container hero" style={{ textAlign: "center" }}>
      <div className="subtitle">Error</div>
      <h1 className="title">Something went wrong</h1>
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
  // Only home page ("/") is hard-routed; all other flow handled in-memory via UnifiedFlowRouter.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* All assessment flow (quiz -> upload -> results -> thank you/retake) is handled inside UnifiedFlowRouter */}
        <Route path="/quiz" element={<UnifiedFlowRouter />} />
        {/* Redirect all unknown/legacy routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
