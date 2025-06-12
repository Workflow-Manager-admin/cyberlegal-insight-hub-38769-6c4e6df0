import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { calculateContractRiskScore, simulateRiskModals } from "../logic/riskScoring";

/**
 * ContractUpload component handles upload/paste of contract text.
 * Includes privacy assurance and skip option for cyber risk assessment only.
 * Accessible, secure, and fits UI theme.
 */
// PUBLIC_INTERFACE
function ContractUpload({ onContinue, onSkip }) {
  const [contractText, setContractText] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  // Handle file upload (TXT or PDF as text)
  const handleFileChange = async (e) => {
    setError("");
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.type !== "text/plain") {
      setError("Only .txt files are supported for direct text extraction in this demo.");
      return;
    }
    try {
      const text = await file.text();
      setContractText(text);
    } catch {
      setError("Could not read the file. Please check your file and try again.");
    }
  };

  // Handle pasted text (textarea)
  const handleTextareaChange = (e) => {
    setError("");
    setContractText(e.target.value);
  };

  // On submit (continue)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contractText.trim()) {
      setError("Please paste or upload your contract text, or use 'Skip' below.");
      return;
    }
    // Score contract for demo; display stub risk simulation modal (no-op currently)
    const riskResult = calculateContractRiskScore(contractText.trim());
    // In a future release, show simulation popup if high-risk issues detected
    // e.g., if (riskResult.level === "high") showSimulateRiskModal(simulateRiskModals.contractRedFlag);
    if (onContinue) onContinue(contractText.trim(), riskResult); // Pass risk result up for main flow
  };

  // Skip contract upload (cyber risk only)
  const handleSkip = () => {
    setError("");
    if (onSkip) onSkip();
  };

  return (
    <section className="container hero" style={{ maxWidth: 600 }}>
      <div className="subtitle">Step 2: Secure Contract Analysis</div>
      <h1 className="title" style={{ fontSize: "2rem" }}>
        Upload or Paste Your Contract
      </h1>
      <div
        className="description"
        style={{
          marginBottom: 24,
          fontSize: "1.10rem",
          color: "var(--secondary-text)"
        }}
      >
        Paste contract text below, or upload a .txt file. <br />
        <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>
          We never store or retain your contract data.
        </span>
        <br />
        <span style={{
          display: "inline-block",
          marginTop: 7,
          color: "#59821b",
          fontSize: "0.96em"
        }}>
          Your contract is <b>processed securely in-browser for immediate insights only</b>.
        </span>
      </div>

      <form
        style={{
          width: "100%",
          background: "var(--surface)",
          borderRadius: 17,
          boxShadow: "0 2px 12px rgba(37,99,235,0.09)",
          padding: "2.2em 2.2em 1.3em 2.1em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
        aria-labelledby="uploadContractTitle"
        autoComplete="off"
      >
        <label
          htmlFor="contract-textarea"
          className="form-label"
          style={{
            marginBottom: 7,
            alignSelf: "flex-start",
            fontWeight: 700,
            fontSize: "1.18rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.015em",
          }}
        >
          Paste Contract Text Here
        </label>
        <textarea
          id="contract-textarea"
          className={error ? "error" : ""}
          value={contractText}
          onChange={handleTextareaChange}
          rows={8}
          placeholder="Paste your contract..."
          style={{
            width: "100%",
            maxWidth: 440,
            fontSize: "1.13rem",
            minHeight: 144,
            marginBottom: 17,
            background: "var(--color-card)",
            color: "var(--text-primary)",
            border: "2px solid var(--color-border)",
            borderRadius: "17px",
            padding: "20px 1.3em",
            resize: "vertical",
            boxShadow: error
              ? "0 0 0 5px #e8314713"
              : "0 3.5px 15px 0 rgba(37,99,235,0.09)",
            outline: "none"
          }}
          aria-invalid={error ? "true" : "false"}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 17,
          }}
        >
          <span
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
            }}
          >
            or
          </span>
          <input
            type="file"
            accept=".txt"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="contract-file"
          />
          <button
            type="button"
            className="btn actionable-large"
            style={{
              background: "var(--color-accent)",
              color: "#222",
              fontWeight: 600,
              borderRadius: 7,
              boxShadow: "0 1.9px 7px rgba(251,191,36,0.10)",
              fontSize: "1.09rem",
            }}
            onClick={() =>
              fileInputRef.current && fileInputRef.current.click()
            }
            aria-label="Upload contract text file"
          >
            Upload .txt File
          </button>
        </div>

        {error && (
          <div className="form-error-message" style={{marginBottom: 13}}>
            {error}
          </div>
        )}

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            gap: 18,
            marginTop: 5,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={handleSkip}
            className="btn actionable-large"
            style={{
              background: "#ececec",
              color: "#848a88",
              border: "1.7px solid #cecece",
              fontWeight: 600,
              minWidth: 104,
              fontSize: "1.07em",
            }}
            aria-label="Skip contract to view cyber risk only"
          >
            Skip Contract &rarr;
          </button>
          <button
            type="submit"
            className="btn btn-large actionable-large"
            style={{
              minWidth: 138,
              marginLeft: "auto",
              fontWeight: 700
            }}
            aria-label="Continue to results"
          >
            Analyze Contract
          </button>
        </div>
      </form>
      <div style={{
          marginTop: 22,
          color: "var(--color-accent)",
          fontSize: "0.98em"
        }}>
        <b>Privacy Assurance:</b> Your contract data is <u>not stored</u> or shared. All processing happens securely in your browser.
      </div>
    </section>
  );
}

ContractUpload.propTypes = {
  // Called with contract text when upload/paste/submit is successful
  onContinue: PropTypes.func,
  // Called when user opts to skip contract upload (cyber risk only)
  onSkip: PropTypes.func,
};

export default ContractUpload;
