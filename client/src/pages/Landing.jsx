import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const handleStart = () => {
    if (!email) return alert("Please enter your email");
    localStorage.setItem("ce_email", email);
    localStorage.setItem("ce_company", company);
    navigate("/assessment");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 70 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.5 + 0.1,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,165,233,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(14,165,233,${0.12 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{
      minHeight: "100dvh",
      width: "100%",
      background: "#0a0f1e",
      fontFamily: "system-ui, -apple-system, sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>

      {/* CANVAS */}
      <canvas ref={canvasRef} style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* GRID */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: "linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* GLOW 1 - top left */}
      <div style={{
        position: "fixed",
        top: "-150px",
        left: "-150px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* GLOW 2 - bottom right */}
      <div style={{
        position: "fixed",
        bottom: "-150px",
        right: "-150px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* SCAN LINE */}
      <div style={{
        position: "fixed",
        left: 0,
        width: "100vw",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.4), transparent)",
        pointerEvents: "none",
        zIndex: 2,
        animation: "scan 6s linear infinite",
      }} />

      {/* NAV */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 32px",
        borderBottom: "1px solid #1e2d4a",
        position: "relative",
        zIndex: 10,
        background: "rgba(10,15,30,0.9)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            background: "#0ea5e9",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}>🛡</div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#f0f6ff" }}>CyberMark</div>
            <div style={{ fontSize: "11px", color: "#4a7fa5" }}>Cyber Essentials Platform</div>
          </div>
        </div>
        <div style={{
          fontSize: "11px",
          background: "#0ea5e915",
          color: "#0ea5e9",
          border: "1px solid #0ea5e940",
          padding: "4px 12px",
          borderRadius: "20px",
          fontWeight: "500",
        }}>UK Certified</div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "520px",
        margin: "0 auto",
        padding: "48px 24px",
        textAlign: "center",
      }}>

        {/* BADGE */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#0ea5e915",
          border: "1px solid #0ea5e930",
          color: "#0ea5e9",
          fontSize: "11px",
          fontWeight: "600",
          padding: "5px 14px",
          borderRadius: "20px",
          letterSpacing: "0.08em",
          marginBottom: "20px",
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            background: "#0ea5e9",
            borderRadius: "50%",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }} />
          FREE ASSESSMENT
        </div>

        {/* HEADING */}
        <h1 style={{
          fontSize: "36px",
          fontWeight: "800",
          color: "#f0f6ff",
          lineHeight: "1.2",
          margin: "0 0 14px",
          letterSpacing: "-0.03em",
        }}>
          Is your business<br />
          <span style={{ color: "#0ea5e9" }}>Cyber Essentials</span> ready?
        </h1>

        {/* SUBHEADING */}
        <p style={{
          fontSize: "15px",
          color: "#6b8cad",
          lineHeight: "1.6",
          margin: "0 auto 28px",
          maxWidth: "400px",
        }}>
          Answer 45 questions in 10 minutes. Get an instant compliance score
          and know exactly what to fix before your certification.
        </p>

        {/* STATS */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "36px",
          marginBottom: "28px",
        }}>
          {[["45", "Questions"], ["5", "Controls"], ["10m", "To complete"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#f0f6ff" }}>{num}</div>
              <div style={{ fontSize: "11px", color: "#4a7fa5", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* FORM CARD */}
        <div style={{
          background: "rgba(17,24,39,0.9)",
          border: "1px solid #1e2d4a",
          borderRadius: "16px",
          padding: "24px",
          textAlign: "left",
        }}>
          <div style={{
            fontSize: "11px",
            color: "#4a7fa5",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "6px",
          }}>Work email</div>

          <input
            style={{
              width: "100%",
              background: "rgba(10,15,30,0.8)",
              border: "1px solid #1e2d4a",
              borderRadius: "8px",
              padding: "11px 14px",
              color: "#f0f6ff",
              fontSize: "14px",
              marginBottom: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
            type="email"
            placeholder="your@company.co.uk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
          />

          <div style={{
            fontSize: "11px",
            color: "#4a7fa5",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "6px",
          }}>Company name</div>

          <input
            style={{
              width: "100%",
              background: "rgba(10,15,30,0.8)",
              border: "1px solid #1e2d4a",
              borderRadius: "8px",
              padding: "11px 14px",
              color: "#f0f6ff",
              fontSize: "14px",
              marginBottom: "14px",
              outline: "none",
              boxSizing: "border-box",
            }}
            type="text"
            placeholder="Acme Ltd (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <button
            style={{
              width: "100%",
              background: "#0ea5e9",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "13px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              marginBottom: "12px",
            }}
            onClick={handleStart}
          >
            🛡 Start free assessment →
          </button>

          <div style={{ borderTop: "1px solid #1e2d4a", margin: "4px 0 12px" }} />

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            {["No account needed", "NCSC aligned", "Free report"].map((t) => (
              <div key={t} style={{ fontSize: "12px", color: "#4a7fa5" }}>
                <span style={{ color: "#0ea5e9", fontWeight: "700" }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;