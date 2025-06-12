import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * ThankYouPage
 * Final step in the assessment flow: displays a friendly thank you,
 * option to retake the assessment, and a subscribe-for-updates CTA.
 *
 * Props:
 *   onRetake: function to reset the assessment flow to the first step
 */
function ThankYouPage({ onRetake }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeError, setSubscribeError] = useState("");

  // Simulate subscribe for updates (no real backend)
  function handleSubscribe(e) {
    e.preventDefault();
    setSubscribeError("");
    if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email.trim())) {
      setSubscribeError("Please enter a valid email address.");
      return;
    }
    // Simulate "success" (could integrate 3rd-party/newsletter API here)
    setTimeout(() => setSubscribed(true), 550);
  }

  return (
    <section className="container hero" style={{ textAlign: "center", maxWidth: 540 }}>
      <div className="subtitle" style={{ marginBottom: 4 }}>
        Thank You for Using CyberLegal Insight Hub
      </div>
      <h1 className="title" style={{ fontSize: "2.1rem", marginBottom: 0 }}>
        Assessment Complete!
      </h1>
      <div className="description" style={{ margin: "18px 0 14px 0" }}>
        We're grateful for your time.<br />
        Your awareness is your best protection.<br />
        <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>
          Stay safe, stay secure, and keep learning!
        </span>
      </div>
      {onRetake && (
        <button
          className="btn btn-large"
          style={{ marginTop: 20, minWidth: 170, fontWeight: 600 }}
          onClick={onRetake}
        >
          Retake Assessment
        </button>
      )}
      <div style={{
        margin: '32px auto 0 auto',
        background: 'var(--surface)',
        borderRadius: 14,
        padding: '2em',
        boxShadow: '0 2px 10px rgba(37,99,235,0.05)',
        maxWidth: 380,
        width: '100%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div style={{ marginBottom: 13, fontWeight: 500, fontSize: "1.13em" }}>
          Stay Updated on Cyber & Legal Safety
        </div>
        {!subscribed ? (
          <form
            onSubmit={handleSubscribe}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: "100%"
            }}
            aria-label="Subscribe for updates"
          >
            <label
              htmlFor="subscribe-email"
              className="form-label"
              style={{ alignSelf: "flex-start", fontWeight: 600, fontSize: "1.08em" }}
            >
              Email for updates
            </label>
            <input
              id="subscribe-email"
              type="email"
              placeholder="Your email address"
              value={email}
              aria-label="Email address"
              className={subscribeError ? "error" : ""}
              style={{
                borderRadius: 17,
                fontSize: "1.17em",
                padding: "18px 20px",
                width: "100%",
                maxWidth: 240,
                marginBottom: 4,
                border: subscribeError ? "2px solid var(--color-danger)" : "2px solid var(--color-border)",
                boxShadow: subscribeError
                  ? "0 0 0 5px #e8314713"
                  : "0 2.5px 7px 0 rgba(37,99,235,0.09)",
                background: "var(--color-card)",
                color: "var(--text-primary)",
                outline: "none"
              }}
              onChange={e => { setEmail(e.target.value); if (subscribeError) setSubscribeError(""); }}
              required
              aria-invalid={!!subscribeError}
            />
            <button
              type="submit"
              className="btn actionable-large"
              style={{
                background: "var(--color-accent)",
                color: "#222",
                fontWeight: 600,
                minWidth: 148,
                fontSize: "1.1em",
              }}
            >
              Subscribe for Updates
            </button>
            {subscribeError &&
              <div className="form-error-message" style={{marginTop: 7}}>
                {subscribeError}
              </div>
            }
            <div
              style={{
                marginTop: 7,
                color: "var(--text-secondary)",
                fontSize: "0.98em",
              }}
            >
              No spam. Only rare updates about cyber/legal safety & product improvements.
            </div>
          </form>
        ) : (
          <div style={{ color: "#2563eb", fontWeight: 600 }}>
            🎉 Thank you! You’re subscribed.<br />
            Watch your inbox for insightful updates.
          </div>
        )}
      </div>
      <div style={{ marginTop: 38, color: "#a7a7a7", fontSize: "1em" }}>
        &mdash; The KAVIA Team
      </div>
    </section>
  );
}

export default ThankYouPage;
