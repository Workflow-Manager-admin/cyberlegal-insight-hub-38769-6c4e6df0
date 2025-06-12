import React, { useState } from "react";
import { calculateCyberHygieneScore, simulateRiskModals } from "../logic/riskScoring";

/**
 * Simple set of cyber hygiene quiz questions and options.
 * Each question can have info for a tooltip (accessible, no dependency).
 */
const QUIZ_DATA = [
  {
    question: "You receive an email from your 'bank' urging you to click a link to verify your account. What do you do?",
    options: [
      "Click the link immediately—it's urgent.",
      "Double-check the sender and contact the bank directly.",
      "Ignore the email completely."
    ],
    tooltip: "Phishing emails often impersonate banks. Look out for urgent requests and suspicious links. Always verify the sender separately."
  },
  {
    question: "How often do you update your passwords for important accounts?",
    options: [
      "Rarely or never.",
      "When prompted or breached.",
      "Regularly, and I use unique passwords."
    ],
    tooltip: "Frequent updates and unique passwords lower your risk. Consider using a password manager."
  },
  {
    question: "Which of these is the best Wi-Fi security practice?",
    options: [
      "Connect to any open Wi-Fi if it has strong signal.",
      "Only use Wi-Fi with a password, and avoid transmitting sensitive data on public networks.",
      "Sharing your Wi-Fi credentials with guests and visitors freely."
    ],
    tooltip: "Public/open Wi-Fi is risky. Only connect to secured networks and avoid sharing sensitive data unless on trusted connections."
  }
];

/**
 * Renders a basic info tooltip.
 */
function InfoTooltip({ text }) {
  // Uses mouse and focus for accessibility.
  const [open, setOpen] = useState(false);
  return (
    <span style={{ display: "inline-block", position: "relative" }}>
      <button
        type="button"
        aria-label="More info"
        className="btn"
        style={{
          padding: "2px 7px",
          background: "var(--color-accent)",
          color: "#333",
          borderRadius: "50%",
          marginLeft: 8,
          fontWeight: 700,
          fontSize: "0.91em",
          lineHeight: "1",
          minWidth: "26px",
          minHeight: "26px",
          cursor: "pointer"
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
      >
        ?
      </button>
      {open && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            zIndex: 99,
            left: "110%",
            top: 0,
            minWidth: "210px",
            maxWidth: "330px",
            padding: "12px 14px",
            background: "#fff",
            color: "#18181b",
            fontSize: "1rem",
            lineHeight: "1.45",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(37,99,235,0.09)",
            border: "1.4px solid var(--color-primary)",
            marginLeft: "8px"
          }}
        >
          <span style={{ fontWeight: "bold", color: "var(--color-primary)" }}>Tip:</span> {text}
        </div>
      )}
    </span>
  );
}

/**
 * Renders quiz step progress bar.
 */
function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "26px 0 18px 0",
        width: "100%",
        maxWidth: "420px"
      }}
      aria-label={`Progress: question ${current + 1} of ${total}`}
    >
      <div
        style={{
          background: "var(--color-primary)",
          height: "9px",
          borderRadius: "6px",
          width: `${percent}%`,
          minWidth: "20px",
          transition: "width 0.4s"
        }}
      />
      <div
        style={{
          background: "#e6e9f0",
          height: "9px",
          borderRadius: "6px",
          width: `${100 - percent}%`,
          minWidth: "0",
          marginLeft: "3px"
        }}
      />
      <span
        style={{
          marginLeft: "1.5em",
          fontSize: "1.02rem",
          color: "var(--secondary-text)",
          minWidth: "62px"
        }}
      >
        {current + 1} / {total}
      </span>
    </div>
  );
}

/**
 * Main CyberQuiz component with question navigation, state, and finish handler.
 */
/**
 * Accepts prop 'onComplete', which receives ({ answers, scoreResult }) when finished.
 */
// PUBLIC_INTERFACE
function CyberQuiz({ onComplete }) {
  const [step, setStep] = useState(0); // index of current question
  const [answers, setAnswers] = useState([]); // user answers as array

  // Move to next question
  function handleNext(selectedIdx) {
    const newAnswers = answers.slice(0, step);
    newAnswers[step] = selectedIdx;
    setAnswers(newAnswers);
    if (step < QUIZ_DATA.length - 1) {
      setStep(step + 1);
    } else if (onComplete) {
      // Calculate score before completing
      const scoreResult = calculateCyberHygieneScore(newAnswers);
      onComplete({ answers: newAnswers, scoreResult });
      // -- In future, could trigger simulateRiskModals.phishingWarning here if demoing modals.
    }
  }

  // Move back (if not at first question)
  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  // If done, show summary/complete message
  if (answers.length === QUIZ_DATA.length) {
    return (
      <section className="container hero" style={{ maxWidth: 520 }}>
        <div className="subtitle" style={{ marginBottom: 6 }}>
          Cyber Hygiene Check Complete!
        </div>
        <h2 className="title" style={{ fontSize: "2rem", marginBottom: 0 }}>
          Thanks for Completing the Quiz
        </h2>
        <div className="description" style={{ marginTop: 14, marginBottom: 22 }}>
          Your answers will guide your personalized risk profile. Continue to the next step to analyze your contracts or go back to review your digital behavior.
        </div>
        <button
          className="btn btn-large"
          style={{ minWidth: 120 }}
          onClick={() => {
            if (onComplete) onComplete(answers); // triggers route step in parent
          }}
        >
          Continue
        </button>
      </section>
    );
  }

  // Current question data
  const q = QUIZ_DATA[step];

  return (
    <section className="container hero" style={{ maxWidth: 540, paddingBottom: "2.5em" }}>
      <div className="subtitle">Step 1: Digital Behavior Check</div>
      <h1 className="title" style={{ fontSize: "2rem", marginBottom: 8 }}>
        Cyber Hygiene Quiz
      </h1>
      <ProgressBar current={step} total={QUIZ_DATA.length} />
      <form
        aria-label={`Question ${step + 1} of ${QUIZ_DATA.length}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          margin: "0 auto",
          width: "100%",
          maxWidth: 430,
          background: "var(--surface)",
          padding: "2em 2em 1.2em 2em",
          borderRadius: "14px",
          boxShadow: "0 1.8px 7px rgba(37,99,235,0.06)"
        }}
        onSubmit={e => e.preventDefault()}
      >
        <div style={{ fontWeight: 600, fontSize: "1.23rem", marginBottom: 10 }}>
          {q.question}
          <InfoTooltip text={q.tooltip} />
        </div>
        <fieldset style={{ border: "none", padding: 0, margin: 0, width: "100%" }}>
          <legend className="visually-hidden">{`Question ${step + 1}`}</legend>
          {q.options.map((opt, idx) => (
            <label
              key={idx}
              htmlFor={`q${step}-opt${idx}`}
              style={{
                display: "flex",
                alignItems: "center",
                lineHeight: "1.5",
                background: "#f8fafc",
                padding: "13px 16px",
                borderRadius: "8px",
                border: "1.2px solid #e5e7eb",
                marginBottom: "10px",
                cursor: "pointer",
                fontSize: "1.06rem",
                boxShadow: idx === answers[step] ? "0 0 0 2px var(--color-primary)" : undefined,
                fontWeight: idx === answers[step] ? 600 : 400
              }}
              tabIndex={0}
            >
              <input
                type="radio"
                name={`question-${step}`}
                id={`q${step}-opt${idx}`}
                checked={answers[step] === idx}
                onChange={() => handleNext(idx)}
                style={{ accentColor: "var(--color-primary)", marginRight: 13 }}
                tabIndex={-1}
                aria-checked={answers[step] === idx}
              />
              {opt}
            </label>
          ))}
        </fieldset>
        <div style={{ width: "100%", margin: "10px 0 0 0", display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            className="btn"
            style={{
              background: step === 0 ? "var(--disabled-text)" : "var(--navbar-bg)",
              color: "#888",
              cursor: step === 0 ? "not-allowed" : "pointer"
            }}
            disabled={step === 0}
            onClick={handleBack}
            tabIndex={step === 0 ? -1 : 0}
          >
            Back
          </button>
        </div>
      </form>
    </section>
  );
}

export default CyberQuiz;
