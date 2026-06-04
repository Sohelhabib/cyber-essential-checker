import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("ce_results");
    if (!data) navigate("/");
    else setResults(JSON.parse(data));
  }, []);

  if (!results) return null;

  const { overallScore, controlBreakdown, gaps, readiness } = results;

  const scoreColor =
    overallScore >= 85 ? "#4ade80" :
    overallScore >= 60 ? "#fbbf24" : "#f87171";

  const scoreBorder =
    overallScore >= 85 ? "#16a34a" :
    overallScore >= 60 ? "#d97706" : "#dc2626";

  const barColor = (score) =>
    score >= 85 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";

  const sevColor = (s) =>
    s === "critical" ? "#f87171" : s === "medium" ? "#fbbf24" : "#4a7fa5";

  const criticalGaps = gaps.filter((g) => g.severity === "critical");
  const otherGaps = gaps.filter((g) => g.severity !== "critical");

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <div style={s.logo}>
          <div style={s.logoIcon}>🛡</div>
          <div style={s.logoText}>CyberReady</div>
        </div>
        <span style={s.navLabel}>Assessment complete</span>
      </nav>

      <div style={s.inner}>

        <div style={s.scoreCard}>
          <div style={{ ...s.scoreCircle, borderColor: scoreBorder }}>
            <span style={{ ...s.scoreNum, color: scoreColor }}>{overallScore}</span>
            <span style={s.scoreDen}>/100</span>
          </div>
          <div style={s.scoreInfo}>
            <div style={s.scoreLabel}>Overall readiness score</div>
            <div style={s.scoreTitle}>{readiness}</div>
            <div style={s.scoreSub}>{gaps.length} gaps found — {criticalGaps.length} critical</div>
          </div>
        </div>

        <div style={s.section}>
          <div style={s.sectionTitle}>Score by control</div>
          {controlBreakdown.map((c) => (
            <div key={c.name} style={s.barRow}>
              <span style={s.barLabel}>{c.name}</span>
              <div style={s.barTrack}>
                <div style={{ ...s.barFill, width: `${c.score}%`, background: barColor(c.score) }} />
              </div>
              <span style={s.barPct}>{c.score}%</span>
            </div>
          ))}
        </div>

        {criticalGaps.length > 0 && (
          <div style={s.upgradeBox}>
            <div style={s.upgradeTitle}>
              {criticalGaps.length} critical gaps need fixing
            </div>
            <div style={s.upgradeSub}>
              Get the full remediation guide — exactly what to fix, step by step, to pass Cyber Essentials certification.
            </div>
            <button style={s.upgradeBtn}>
              Get full report — £9/month
            </button>
          </div>
        )}

        {gaps.length > 0 && (
          <div style={s.section}>
            <div style={s.sectionTitle}>Gaps found ({gaps.length})</div>
            {[...criticalGaps, ...otherGaps].slice(0, 5).map((g) => (
              <div key={g.id} style={s.gapCard}>
                <div style={s.gapTop}>
                  <span style={{ ...s.severity, color: sevColor(g.severity) }}>
                    ● {g.severity}
                  </span>
                  <span style={s.gapControl}>{g.control}</span>
                </div>
                <p style={s.gapQ}>{g.question}</p>
                {g.severity === "critical" && (
                  <p style={s.gapGuidance}>{g.guidance}</p>
                )}
              </div>
            ))}
            {gaps.length > 5 && (
              <div style={s.moreGaps}>+ {gaps.length - 5} more gaps in full report</div>
            )}
          </div>
        )}

        <button style={s.retakeBtn} onClick={() => navigate("/")}>
          ← Start new assessment
        </button>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh", background: "#0a0f1e",
    fontFamily: "system-ui, -apple-system, sans-serif",
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
  navLabel: { fontSize: "12px", color: "#4a7fa5" },
  inner: { maxWidth: "620px", margin: "0 auto", padding: "32px 24px" },
  scoreCard: {
    background: "#111827", border: "1px solid #1e2d4a",
    borderRadius: "14px", padding: "20px",
    display: "flex", alignItems: "center", gap: "20px", marginBottom: "12px",
  },
  scoreCircle: {
    width: "72px", height: "72px", borderRadius: "50%",
    border: "3px solid", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  scoreNum: { fontSize: "26px", fontWeight: "800", lineHeight: 1 },
  scoreDen: { fontSize: "11px", color: "#4a7fa5" },
  scoreInfo: { flex: 1 },
  scoreLabel: {
    fontSize: "11px", color: "#4a7fa5", textTransform: "uppercase",
    letterSpacing: "0.06em", marginBottom: "4px",
  },
  scoreTitle: { fontSize: "18px", fontWeight: "700", color: "#f0f6ff", marginBottom: "4px" },
  scoreSub: { fontSize: "13px", color: "#6b8cad" },
  section: {
    background: "#111827", border: "1px solid #1e2d4a",
    borderRadius: "14px", padding: "16px 20px", marginBottom: "12px",
  },
  sectionTitle: {
    fontSize: "13px", fontWeight: "600", color: "#f0f6ff",
    marginBottom: "14px", textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  barRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  barLabel: { fontSize: "12px", color: "#6b8cad", width: "180px", flexShrink: 0 },
  barTrack: { flex: 1, height: "5px", background: "#1e2d4a", borderRadius: "99px", overflow: "hidden" },
  barFill: { height: "5px", borderRadius: "99px", transition: "width 0.5s ease" },
  barPct: { fontSize: "12px", fontWeight: "600", color: "#f0f6ff", width: "36px", textAlign: "right" },
  upgradeBox: {
    background: "#0c1e35", border: "1px solid #0ea5e940",
    borderRadius: "14px", padding: "20px",
    textAlign: "center", marginBottom: "12px",
  },
  upgradeTitle: { fontSize: "16px", fontWeight: "700", color: "#f0f6ff", marginBottom: "8px" },
  upgradeSub: { fontSize: "13px", color: "#6b8cad", marginBottom: "16px", lineHeight: "1.6" },
  upgradeBtn: {
    background: "#0ea5e9", color: "#fff", border: "none",
    borderRadius: "8px", padding: "12px 28px",
    fontSize: "14px", fontWeight: "700", cursor: "pointer",
  },
  gapCard: {
    border: "1px solid #1e2d4a", borderRadius: "10px",
    padding: "12px 14px", marginBottom: "8px",
  },
  gapTop: { display: "flex", justifyContent: "space-between", marginBottom: "6px" },
  severity: { fontSize: "12px", fontWeight: "600", textTransform: "capitalize" },
  gapControl: { fontSize: "12px", color: "#4a7fa5" },
  gapQ: { fontSize: "13px", color: "#c8d8e8", margin: "0 0 4px", lineHeight: "1.5" },
  gapGuidance: { fontSize: "12px", color: "#4a7fa5", margin: 0, lineHeight: "1.5" },
  moreGaps: { fontSize: "13px", color: "#4a7fa5", textAlign: "center", padding: "8px 0" },
  retakeBtn: {
    background: "none", border: "none",
    color: "#0ea5e9", fontSize: "14px", cursor: "pointer",
    padding: "8px 0", marginTop: "4px",
  },
};

export default Results;