import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import axios from "axios";

function Assessment() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  const answer = (value) => {
    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers) => {
    setLoading(true);
    try {
      const email = localStorage.getItem("ce_email") || "anonymous@test.com";
      const companyName = localStorage.getItem("ce_company") || "";
      const res = await axios.post("http://localhost:4000/api/assess", {
        email, companyName, answers: finalAnswers,
      });
      localStorage.setItem("ce_results", JSON.stringify(res.data));
      navigate("/results");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Is the server running?");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ ...s.page, justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "16px" }}>
        <div style={s.spinner} />
        <p style={{ color: "#4a7fa5", fontSize: "14px" }}>Calculating your score...</p>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <div style={s.logo}>
          <div style={s.logoIcon}>🛡</div>
          <div style={s.logoText}>CyberReady</div>
        </div>
        <span style={s.counter}>Question {current + 1} of {questions.length}</span>
      </nav>

      <div style={s.inner}>
        <div style={s.topRow}>
          <div style={s.controlTag}>{q.control}</div>
          <span style={s.pct}>{progress}% complete</span>
        </div>

        <div style={s.progressTrack}>
          <div style={{ ...s.progressFill, width: `${progress}%` }} />
        </div>

        <h2 style={s.question}>{q.question}</h2>
        <div style={s.guidance}>{q.guidance}</div>

        <div style={s.btnRow}>
          <button style={s.yesBtn} onClick={() => answer("yes")}>✓ Yes</button>
          <button style={s.partialBtn} onClick={() => answer("partial")}>~ Partial</button>
          <button style={s.noBtn} onClick={() => answer("no")}>✗ No</button>
        </div>

        {current > 0 && (
          <button style={s.backBtn} onClick={() => setCurrent(current - 1)}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh", background: "#0a0f1e",
    fontFamily: "system-ui, -apple-system, sans-serif",
    display: "flex", flexDirection: "column",
  },
  nav: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between", padding: "14px 32px",
    borderBottom: "1px solid #1e2d4a",
  },
  logo: { display: "flex", alignItems: "center", gap: "10px" },
  logoIcon: {
    width: "30px", height: "30px", background: "#0ea5e9",
    borderRadius: "7px", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "15px",
  },
  logoText: { fontSize: "15px", fontWeight: "700", color: "#f0f6ff" },
  counter: { fontSize: "13px", color: "#4a7fa5" },
  inner: { maxWidth: "600px", margin: "0 auto", padding: "40px 24px", width: "100%" },
  topRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "12px",
  },
  controlTag: {
    background: "#0ea5e915", border: "1px solid #0ea5e930",
    color: "#0ea5e9", fontSize: "11px", fontWeight: "600",
    padding: "4px 12px", borderRadius: "20px",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  pct: { fontSize: "12px", color: "#4a7fa5" },
  progressTrack: {
    height: "3px", background: "#1e2d4a",
    borderRadius: "99px", marginBottom: "28px", overflow: "hidden",
  },
  progressFill: {
    height: "3px", background: "#0ea5e9",
    borderRadius: "99px", transition: "width 0.3s ease",
  },
  question: {
    fontSize: "20px", fontWeight: "700", color: "#f0f6ff",
    lineHeight: "1.5", margin: "0 0 14px", letterSpacing: "-0.02em",
  },
  guidance: {
    fontSize: "13px", color: "#4a7fa5", background: "#111827",
    borderLeft: "2px solid #0ea5e9", padding: "10px 14px",
    borderRadius: "0 8px 8px 0", marginBottom: "28px", lineHeight: "1.6",
  },
  btnRow: { display: "flex", gap: "10px", marginBottom: "16px" },
  yesBtn: {
    flex: 1, padding: "16px 8px", background: "#0f2e1a",
    border: "1px solid #16a34a", borderRadius: "10px",
    color: "#4ade80", fontSize: "15px", fontWeight: "700", cursor: "pointer",
  },
  partialBtn: {
    flex: 1, padding: "16px 8px", background: "#2a1f0a",
    border: "1px solid #d97706", borderRadius: "10px",
    color: "#fbbf24", fontSize: "15px", fontWeight: "700", cursor: "pointer",
  },
  noBtn: {
    flex: 1, padding: "16px 8px", background: "#2a0f0f",
    border: "1px solid #dc2626", borderRadius: "10px",
    color: "#f87171", fontSize: "15px", fontWeight: "700", cursor: "pointer",
  },
  backBtn: {
    background: "none", border: "none",
    color: "#4a7fa5", fontSize: "13px", cursor: "pointer", padding: 0,
  },
  spinner: {
    width: "36px", height: "36px",
    border: "3px solid #1e2d4a", borderTop: "3px solid #0ea5e9",
    borderRadius: "50%", animation: "spin 0.8s linear infinite",
  },
};

export default Assessment;