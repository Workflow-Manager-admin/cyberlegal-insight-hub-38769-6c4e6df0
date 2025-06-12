import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * ResultsDashboard
 * Shows user's cyber and contract risk scores visually, displays overall risk,
 * and provides interactive tabbed sections for: Cyber Tips, Contract Summary (with highlights), and Action Plan.
 * Accepts user risk data as a prop: {
 *    cyberScoreResult: { score, level, detail?... },
 *    contractScoreResult: { score, level, issues?... },
 *    overall: { overallScore, riskLevel },
 *    contractText?: string,
 * }
 */
function ResultsDashboard({
  cyberScoreResult,
  contractScoreResult,
  overall,
  contractText,
}) {
  // Tabs: "cyber", "contract", "plan"
  const TABS = [
    { key: "cyber", label: "Cyber Tips" },
    { key: "contract", label: "Contract Summary" },
    { key: "plan", label: "Action Plan" },
  ];
  const [activeTab, setActiveTab] = useState("cyber");

  // Score bar/arc
  function renderScoreMeter(score, label, color, level) {
    // Meter is a circular SVG + arc. Accessible for screen readers.
    let arcColor = color || "#2563eb";
    let background = "#e6e9f0";
    let dasharray = 125.6;
    let pct = Math.max(0, Math.min(100, score || 0));
    let arc = (pct / 100) * dasharray;

    let riskBadge = {
      low: { txt: "Low", bg: "#42ad59" },
      medium: { txt: "Medium", bg: "#ffd936" },
      high: { txt: "High", bg: "#e83147" },
      unknown: { txt: "Unknown", bg: "#888" },
    };
    let badge = riskBadge[level] || riskBadge.unknown;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 142,
          margin: 14,
        }}
        aria-label={`${label} Score: ${score} (${level||"unknown"})`}
      >
        <svg width={92} height={92} viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke={background}
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke={arcColor}
            strokeWidth="4.5"
            fill="none"
            strokeDasharray={dasharray}
            strokeDashoffset={dasharray - arc}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.7s" }}
          />
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            fill="#222"
            fontSize="1.12em"
            fontWeight="700"
            alignmentBaseline="middle"
          >
            {score ?? "?"}
          </text>
        </svg>
        <span style={{ fontWeight: 500, marginTop: 8, fontSize: "1.08rem" }}>
          {label}
        </span>
        <span
          style={{
            marginTop: 7,
            background: badge.bg,
            color: badge.bg === "#ffd936" ? "#111" : "#fff",
            padding: "1.5px 12px",
            borderRadius: 16,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {badge.txt}
        </span>
      </div>
    );
  }

  // Action Plan generation (could be dynamic in the future)
  function getActionPlanItems({ overallLevel }) {
    let plan = [
      {
        level: "high",
        title: "Critical: Improve Cyber Hygiene",
        details:
          "Enable two-factor authentication, avoid clicking suspicious emails, and use a password manager for unique, strong passwords.",
      },
      {
        level: "medium",
        title: "Review Contract Clauses Carefully",
        details:
          "Identify 'hold harmless', 'indemnify', and automatic renewal terms. Negotiate or clarify where needed.",
      },
      {
        level: "low",
        title: "Maintain Your Safe Practices",
        details:
          "Continue your current digital security and legal review habits. Stay vigilant for emerging risks.",
      },
    ];

    // Pick items by risk
    if (overallLevel === "high") return [plan[0], plan[1]];
    if (overallLevel === "medium") return [plan[1], plan[0]];
    if (overallLevel === "low") return [plan[2]];
    return [plan[0], plan[1]];
  }

  // Highlight/annotate risky terms in contract summary
  function renderContractSummary() {
    if (!contractText) {
      return (
        <div style={{ color: "#a83232" }}>
          No contract was uploaded or pasted. Only cyber risk is assessed.
        </div>
      );
    }
    if (!contractScoreResult || !contractScoreResult.issues?.length) {
      return (
        <div style={{ color: "#235aad" }}>
          No major risk terms detected. Your contract is likely safe, but always seek legal review for important agreements.
        </div>
      );
    }
    // Highlight risky words in text
    let highlighted = contractText;
    contractScoreResult.issues.forEach((word) => {
      if (!word || word.length < 4) return;
      try {
        highlighted = highlighted.replace(
          new RegExp(`(${escapeRegExp(word)})`, "gi"),
          `<span style="background:#ffd3d3; color:#c00; font-weight:bold;" title="Risk flag: ${word}">$1</span>`
        );
      } catch {}
    });
    return (
      <div>
        <div style={{ marginBottom: 10, color: "#e8731a", fontWeight: 500 }}>
          Risky clause(s) found:<br />
          {contractScoreResult.issues.map((issue, idx) => (
            <span
              key={idx}
              style={{
                background: "#ffd936",
                color: "#6f530d",
                fontWeight: 600,
                padding: "1px 9px",
                marginRight: 6,
                borderRadius: 12,
                fontSize: 15,
              }}
              title={"Investigate: " + issue}
            >
              {issue}
            </span>
          ))}
        </div>
        <div
          style={{
            border: "1.3px solid #ffd936",
            borderRadius: 9,
            padding: "0.77em 1em",
            background: "#fff8dc",
            color: "#422b0b",
            lineHeight: 1.45,
            maxHeight: 260,
            overflowY: "auto",
            fontSize: "1.03em",
            marginBottom: 10,
          }}
          // dangerouslySetInnerHTML for highlighting (text is not persisted to backend, for demo only)
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        <div style={{ color: "#a83232", fontSize: "0.99em", marginBottom: 8 }}>
          <span role="img" aria-label="warning">
            ⚠️
          </span>{" "}
          Please review the highlighted terms with a legal advisor if this contract will be signed.
        </div>
      </div>
    );
  }

  // Escape special regex chars
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  // Cyber Tips Tab
  function renderCyberTips() {
    // Map score to tiered tips
    let risk = cyberScoreResult?.level;
    if (!risk || risk === "unknown")
      return <div>No cyber quiz or insufficient data for tips.</div>;
    let strongTips = [
      "Always double-check email senders before clicking links.",
      "Keep your software and devices up to date.",
      "Use unique, strong passwords for each account and enable 2FA where available.",
      "Avoid sharing sensitive info over public Wi-Fi.",
    ];
    let okTips = [
      "Consider using a password manager.",
      "Update passwords regularly and after data breaches.",
      "Review your account security settings this week.",
    ];
    if (risk === "high")
      return (
        <ul>
          {strongTips.map((tip, idx) => (
            <li key={idx} style={{ marginBottom: 7, color: "#e83147" }}>
              {tip}
            </li>
          ))}
          <li style={{ marginBottom: 7, color: "#e8731a" }}>
            Select the <span style={{fontWeight:600}}>most secure</span> answer for each quiz question next time.
          </li>
        </ul>
      );
    if (risk === "medium")
      return (
        <ul>
          {okTips.map((tip, idx) => (
            <li key={idx} style={{ marginBottom: 7, color: "#ffd936" }}>
              {tip}
            </li>
          ))}
          <li style={{marginTop:10, color:"#2563eb"}}>You're on the right track! See action plan tab for more suggestions.</li>
        </ul>
      );
    return (
      <div style={{ color: "#2563eb" }}>
        Great job! Keep up your secure habits and stay aware of new phishing techniques.
      </div>
    );
  }

  // Action Plan Tab
  function renderActionPlan() {
    let planItems = getActionPlanItems({ overallLevel: overall?.riskLevel });
    return (
      <div>
        {planItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              borderLeft: `7px solid ${
                item.level === "high"
                  ? "#e83147"
                  : item.level === "medium"
                  ? "#ffd936"
                  : "#42ad59"
              }`,
              padding: "13px 18px",
              marginBottom: 17,
              background: "#fefefa",
              borderRadius: 8,
              marginLeft: 4,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: "1.13em", color: "#222" }}>
              {item.title}
            </div>
            <div style={{ color: "#222", fontSize: "1em", marginTop: 5 }}>
              {item.details}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Scorebar summary
  return (
    <section
      className="container hero"
      style={{ paddingTop: 38, maxWidth: 820, width: "100%" }}
    >
      <div className="subtitle">Step 3: Your Risk Report</div>
      <h1 className="title" style={{ marginBottom: 10 }}>
        Unified Assessment Results
      </h1>

      {/* Score meters - cyber, contract, overall */}
      <div
        role="region"
        aria-label="Risk scores"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: "3vw",
          marginBottom: 28,
          flexWrap: "wrap",
        }}
      >
        {renderScoreMeter(
          cyberScoreResult?.score,
          "Cyber Score",
          "#2563eb",
          cyberScoreResult?.level
        )}
        {renderScoreMeter(
          contractScoreResult?.score,
          "Contract Score",
          "#fbbf24",
          contractScoreResult?.level
        )}
        {renderScoreMeter(
          overall?.overallScore,
          "Overall",
          "#42ad59",
          overall?.riskLevel
        )}
      </div>

      {/* Tabbed tips/summary/action plan */}
      <div
        style={{
          background: "var(--surface)",
          borderRadius: 14,
          boxShadow: "0 2px 12px rgba(37,99,235,0.09)",
          padding: "1.9em 2.2em 1.65em 2.2em",
          maxWidth: 620,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div
          role="tablist"
          aria-label="Result detail tabs"
          style={{
            display: "flex",
            gap: 21,
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              className="btn"
              role="tab"
              aria-selected={activeTab === t.key}
              style={{
                background:
                  activeTab === t.key
                    ? "var(--color-primary)"
                    : "var(--navbar-bg)",
                color: activeTab === t.key ? "#fff" : "#2563eb",
                fontWeight: activeTab === t.key ? 600 : 500,
                padding: "10px 28px",
                outline: "none",
                fontSize: "1em",
                borderRadius: 7,
                boxShadow:
                  activeTab === t.key
                    ? "0 2px 10px rgba(37,99,235,0.13)"
                    : "none",
                minWidth: 120,
                border:
                  activeTab === t.key
                    ? "2.1px solid var(--color-primary)"
                    : "1.4px solid #e6e9f0",
                transition: "all 0.13s",
                cursor: activeTab === t.key ? "default" : "pointer",
              }}
              onClick={() => setActiveTab(t.key)}
              tabIndex={0}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab_${activeTab}`}
          style={{ minHeight: 80 }}
        >
          {activeTab === "cyber" && renderCyberTips()}
          {activeTab === "contract" && renderContractSummary()}
          {activeTab === "plan" && renderActionPlan()}
        </div>
      </div>
    </section>
  );
}

ResultsDashboard.propTypes = {
  cyberScoreResult: PropTypes.shape({
    score: PropTypes.number,
    level: PropTypes.string,
  }),
  contractScoreResult: PropTypes.shape({
    score: PropTypes.number,
    level: PropTypes.string,
    issues: PropTypes.array,
  }),
  overall: PropTypes.shape({
    overallScore: PropTypes.number,
    riskLevel: PropTypes.string,
  }),
  contractText: PropTypes.string,
};

export default ResultsDashboard;
