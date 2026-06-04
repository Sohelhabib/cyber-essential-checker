import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!email) return alert("Please enter your email");
    localStorage.setItem("ce_email", email);
    localStorage.setItem("ce_company", company);
    navigate("/assessment");
  };

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <div style={s.logo}>
          <div style={s.logoIcon}>🛡</div>
          <div>
            <div style={s.logoText}>CyberReady</div>
            <div style={s.logoSub}>Cyber Essentials Platform</div>
          </div>
        </div>
        <div style={s.navBadge}>UK Certified</div>
      </nav>

      <div style={s.hero}>
        <div style={s.heroBadge}>
          <span style={s.dot} /> FREE ASSESSMENT
        </div>
        <h1 style={s.h1}>
          Is your business<br />
          <span style={s.blue}>Cyber Essentials</span> ready?
        </h1>
        <p style={s.heroSub}>
          Answer 45 questions in 10 minutes. Get an instant compliance score
          and know exactly what to fix before your certification.
        </p>

        <div style={s.stats}>
          {[["45", "Questions"], ["5", "Controls"], ["10m", "To complete"]].map(
            ([num, label]) => (
              <div key={label} style={s.stat}>
                <div style={s.statNum}>{num}</div>
                <div style={s.statLabel}>{label}</div>
              </div>
            )
          )}
        </div>

        <div style={s.card}>
          <div style={s.fieldLabel}>Work email</div>
          <input
            style={s.input}
            type="email"
            placeholder="your@company.co.uk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={s.fieldLabel}>Company name</div>
          <input
            style={s.input}
            type="text"
            placeholder="Acme Ltd (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <button style={s.ctaBtn} onClick={handleStart}>
            🛡 Start free assessment →
          </button>
          <div style={s.divider} />
          <div style={s.trust}>
            {["No account needed", "NCSC aligned", "Free report"].map((t) => (
              <div key={t} style={s.trustItem}>
                <span style={s.tick}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    background: "#0a0f1e",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 32px",
    borderBottom: "1px solid #1e2d4a",
    background: "#0a0f1e",
  },
  logo: { display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: {
    width: "32px", height: "32px", background: "#0ea5e9",
    borderRadius: "8px", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "16px",
  },
  logoText: { fontSize: "15px", fontWeight: "700", color: "#f0f6ff" },
  logoSub: { fontSize: "11px", color: "#4a7fa5" },
  navBadge: {
    fontSize: "11px", background: "#0ea5e915",
    color: "#0ea5e9", border: "1px solid #0ea5e940",
    padding: "4px 12px", borderRadius: "20px", fontWeight: "500",
  },
  hero: {
    maxWidth: "480px", margin: "0 auto",
    padding: "48px 24px", textAlign: "center",
  },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: "8px",
    background: "#0ea5e915", border: "1px solid #0ea5e930",
    color: "#0ea5e9", fontSize: "11px", fontWeight: "600",
    padding: "5px 14px", borderRadius: "20px",
    letterSpacing: "0.08em", marginBottom: "20px",
  },
  dot: {
    width: "6px", height: "6px",
    background: "#0ea5e9", borderRadius: "50%", display: "inline-block",
  },
  h1: {
    fontSize: "32px", fontWeight: "800", color: "#f0f6ff",
    lineHeight: "1.2", margin: "0 0 14px", letterSpacing: "-0.03em",
  },
  blue: { color: "#0ea5e9" },
  heroSub: {
    fontSize: "15px", color: "#6b8cad",
    lineHeight: "1.6", margin: "0 0 28px",
  },
  stats: {
    display: "flex", justifyContent: "center",
    gap: "36px", marginBottom: "28px",
  },
  stat: { textAlign: "center" },
  statNum: { fontSize: "24px", fontWeight: "700", color: "#f0f6ff" },
  statLabel: { fontSize: "11px", color: "#4a7fa5", marginTop: "2px" },
  card: {
    background: "#111827", border: "1px solid #1e2d4a",
    borderRadius: "14px", padding: "24px", textAlign: "left",
  },
  fieldLabel: {
    fontSize: "11px", color: "#4a7fa5", fontWeight: "600",
    textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px",
  },
  input: {
    width: "100%", background: "#0a0f1e",
    border: "1px solid #1e2d4a", borderRadius: "8px",
    padding: "11px 14px", color: "#f0f6ff", fontSize: "14px",
    marginBottom: "14px", outline: "none", boxSizing: "border-box",
  },
  ctaBtn: {
    width: "100%", background: "#0ea5e9", color: "#fff",
    border: "none", borderRadius: "8px", padding: "13px",
    fontSize: "15px", fontWeight: "700", cursor: "pointer",
    letterSpacing: "-0.01em",
  },
  divider: { borderTop: "1px solid #1e2d4a", margin: "16px 0" },
  trust: { display: "flex", justifyContent: "center", gap: "16px" },
  trustItem: { fontSize: "12px", color: "#4a7fa5" },
  tick: { color: "#0ea5e9", fontWeight: "700" },
};

export default Landing;