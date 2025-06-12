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
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              aria-label="Email address"
              style={{
                border: "1.2px solid #e5e7eb",
                borderRadius: 7,
                fontSize: "1.06em",
                padding: "10px 13px",
                width: "100%",
                maxWidth: 240,
                marginBottom: 4
              }}
              onChange={e => { setEmail(e.target.value); if (subscribeError) setSubscribeError(""); }}
              required
            />
            <button
              type="submit"
              className="btn"
              style={{
                background: "var(--color-accent)",
                color: "#222",
                fontWeight: 600,
                minWidth: 138
              }}
            >
              Subscribe for Updates
            </button>
            {subscribeError &&
              <div style={{ color: "#bb1d2c", marginTop: 7, fontSize: "0.99em" }}>
                {subscribeError}
              </div>
            }
            <div style={{
              marginTop: 7,
              color: "var(--secondary-text)",
              fontSize: "0.95em"
            }}>
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
