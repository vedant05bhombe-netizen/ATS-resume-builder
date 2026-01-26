import React from "react";
import Headings from "./Headings";
import Section from "./Section";

/* =========================
   HELPERS
========================= */

const t = (s = "") =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const fix = (s = "") => {
  const map = {
    js: "JavaScript",
    reactjs: "React.js",
    nodejs: "Node.js",
    html: "HTML",
    css: "CSS",
    api: "API",
    ai: "AI",
    ml: "ML",
  };
  let out = s;
  Object.keys(map).forEach((k) => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), map[k]);
  });
  return out;
};

const clean = (t = "") => t.replace(/^[•\-*]\s*/, "").trim();

/* =========================
   PULSE TEMPLATE
========================= */

 
const Pulse = ({ data }) => {
const displaySummary = data.summary || "Professional summary will appear here once you complete the onboarding process."; 

  return (
    <div
      style={{
        maxWidth: "8.5in",
        margin: "0 auto",
        // padding: "0.75in",
        fontFamily: "Arial, sans-serif",
        fontSize: "11pt",
        lineHeight: 1.42,
        background: "#fff",
        color: "#000",
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: "14pt" }}>
        <Headings titleX={fix(t(data.name || "Your Name"))} />

        <div style={{ fontSize: "10.5pt" }}>
          {[data.email, data.phoneNumber, data.location]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div style={{ fontSize: "10.5pt" }}>
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </div>
      </header>

      {/* PROFILE / SUMMARY */}
      <section>
        <Section title="Profile" />
        <p style={{ marginTop: "6pt", textAlign: "justify" }}>
          {displaySummary}
        </p>
      </section>

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section>
          <Section title="Experience" />
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "14pt" }}>
              <Row>
                <strong>{fix(t(e.title || e.role))}</strong>
                <span>{e.duration}</span>
              </Row>

              <div style={{ fontSize: "10.2pt", marginBottom: "6pt" }}>
                {fix(t(e.company))} {e.location && `| ${e.location}`}
              </div>

              <ul style={{ marginLeft: "18pt" }}>
                {(e.points || []).map((p, idx) => (
                  <li key={idx}>{clean(p)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <section>
          <Section title="Projects" />
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "12pt" }}>
              <Row>
                <strong>{fix(t(p.title))}</strong>
                <span>{p.date}</span>
              </Row>

              {p.technologies && (
                <div style={{ fontSize: "10pt" }}>
                  Tech: {fix(p.technologies)}
                </div>
              )}

              <ul style={{ marginLeft: "18pt" }}>
                {p.desc && <li>{clean(p.desc)}</li>}
                {(p.points || []).map((pt, idx) => (
                  <li key={idx}>{clean(pt)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section>
          <Section title="Skills" />
          <p>{data.skills.map(fix).join(", ")}</p>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.degree && (
        <section>
          <Section title="Education" />
          <div>
            <strong>
              {fix(t(data.education.degree))}
              {data.education.major &&
                ` in ${fix(t(data.education.major))}`}
            </strong>
          </div>
          <div style={{ fontSize: "10pt" }}>
            {fix(
              t(
                data.education.college ||
                  data.education.university ||
                  "University"
              )
            )}
            {data.education.graduationYear &&
              ` | ${data.education.graduationYear}`}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {data.achievements?.length > 0 && (
        <section>
          <Section title="Certifications" />
          <ul style={{ marginLeft: "18pt" }}>
            {data.achievements.map((a, i) => (
              <li key={i}>{clean(a)}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

/* =========================
   SMALL COMPONENTS
========================= */

const Row = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: "11pt",
    }}
  >
    {children}
  </div>
);

export default Pulse;
