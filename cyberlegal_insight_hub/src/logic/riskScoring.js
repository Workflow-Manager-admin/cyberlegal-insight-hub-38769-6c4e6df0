//
// Smart Risk Scoring Engine (frontend simulation)
// Calculates scores for cyber hygiene quiz and contract upload.
// Also provides UI hooks (modals, toasts stubs) for simulated risk previews.
//

/**
 * Cyber hygiene quiz answers are expected as an array of integers (selected option index per question).
 * Higher option index = better security answer (0=worst, 2=best).
 * Returns { score: 0-100, detail: [] }
 */
// PUBLIC_INTERFACE
export function calculateCyberHygieneScore(answers = []) {
  if (!Array.isArray(answers) || answers.length === 0) {
    return {
      score: 0,
      detail: [],
      level: "unknown"
    };
  }
  // For each question: 0=poor, 1=medium, 2=excellent
  const perQuestionWeight = 100 / answers.length;
  let total = 0;
  const detail = answers.map((ans, idx) => {
    let val = 0;
    if (ans === 2) val = perQuestionWeight;
    else if (ans === 1) val = perQuestionWeight * 0.6;
    else val = perQuestionWeight * 0.25;
    total += val;
    return {
      questionIndex: idx,
      answer: ans,
      scoreContribution: Math.round(val)
    };
  });
  // Clamp to [0,100]
  let score = Math.max(0, Math.min(Math.round(total), 100));
  return {
    score,
    detail,
    level: classifyRiskLevel(score)
  };
}

/**
 * Naive contract risk scoring (demo version).
 * Accepts contractText and analyzes for suspicious keywords or risk signals.
 * Returns { score: 0-100, issues: [] }
 */
// PUBLIC_INTERFACE
export function calculateContractRiskScore(contractText = "") {
  if (!contractText || typeof contractText !== "string") {
    return {
      score: 50,
      issues: [],
      level: "unknown"
    };
  }
  // Red-flag keywords/phrases: the more found, the lower the score.
  const riskyTerms = [
    "hold harmless",
    "indemnify",
    "at our discretion",
    "termination without cause",
    "in perpetuity",
    "non-compete",
    "liquidated damages",
    "unilateral",
    "waives all rights",
    "binding arbitration",
    "automatic renewal"
  ];
  let numRisks = 0;
  const issues = [];
  riskyTerms.forEach((term) => {
    if (contractText.toLowerCase().includes(term)) {
      numRisks++;
      issues.push(term);
    }
  });

  // Base starts at 100, -8pts per found risk term, min 5
  let score = 100 - numRisks * 8;
  score = Math.max(5, score);

  // If contract is very short or very long, flag as abnormal
  if (contractText && contractText.length < 300) {
    score -= 8;
    issues.push("contract too short");
  } else if (contractText && contractText.length > 9000) {
    score -= 8;
    issues.push("contract very long");
  }
  score = Math.max(0, Math.min(100, score));
  return {
    score: Math.round(score),
    issues,
    level: classifyRiskLevel(score)
  };
}

/**
 * Combines cyber and contract scores to provide an overall risk classification ("high/medium/low")
 */
// PUBLIC_INTERFACE
export function calculateOverallRisk({ cyberScore, contractScore }) {
  // Null/NaN/undefined means insufficient data
  if (
    typeof cyberScore !== "number" ||
    typeof contractScore !== "number" ||
    Number.isNaN(cyberScore) ||
    Number.isNaN(contractScore)
  ) {
    return {
      riskLevel: "unknown",
      overallScore: null
    };
  }
  // Weighted: 60% cyber, 40% contract risk
  const overallScore = Math.round(0.6 * cyberScore + 0.4 * contractScore);
  return {
    riskLevel: classifyRiskLevel(overallScore),
    overallScore
  };
}

/**
 * Maps a numeric score (0-100) to a risk label.
 */
function classifyRiskLevel(score) {
  if (typeof score !== "number" || Number.isNaN(score)) return "unknown";
  if (score >= 85) return "low";
  if (score >= 65) return "medium";
  return "high";
}

/**
 * Stubs for risk simulation modals/toasts.
 * These export named constants so UI can trigger a modal or notification for a simulated risk popup.
 */
 // PUBLIC_INTERFACE
export const simulateRiskModals = {
  phishingWarning: {
    id: "phishing-warning-modal",
    title: "Simulated Phishing Alert",
    content: "This is how a suspicious email might appear. Always verify sender addresses!"
  },
  contractRedFlag: {
    id: "contract-redflag-modal",
    title: "Simulated Contract Risk",
    content: "A red-flag clause was found: 'indemnify'. Always review terms with caution."
  },
  toastSuccess: {
    id: "success-toast",
    type: "success",
    message: "Your contract was analyzed securely!"
  },
  toastError: {
    id: "error-toast",
    type: "error",
    message: "An issue occurred during risk analysis."
  }
};
