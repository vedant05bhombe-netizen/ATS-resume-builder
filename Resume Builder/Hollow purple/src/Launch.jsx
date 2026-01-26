import React from "react";
import Headings from "./Headings";
import Section from "./Section";

/* =========================
   HELPERS
========================= */

const title = (s = "") =>
  s
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const fix = (s = "") => {
  const map = {
    js: "JavaScript",
    javascript: "JavaScript",
    react: "React.js",
    reactjs: "React.js",
    node: "Node.js",
    nodejs: "Node.js",
    html: "HTML",
    css: "CSS",
    python: "Python",
    java: "Java",
    cpp: "C++",
    mongodb: "MongoDB",
    mysql: "MySQL",
    git: "Git",
    aws: "AWS",
  };

  let out = s;
  Object.entries(map).forEach(([k, v]) => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
  });
  return out;
};

const clean = (p = "") =>
  p.replace(/^[•\-*]\s*/, "").trim();

/* =========================
   LAUNCH TEMPLATE
========================= */

const LaunchResume = ({ data }) => {
  const skills = (data.skills || []).map(fix);

  const displaySummary =
    data.summary ||
    "Professional summary will appear here once you complete the onboarding process.";

  return (
    <div
      style={{
        maxWidth: "8.5in",
        margin: "0 auto",
        // padding: "0.7in",
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "11pt",
        lineHeight: 1.45,
        background: "#fff",
        color: "#000",
      }}
    >
      {/* ================= HEADER ================= */}
      <header style={{ marginBottom: "16pt" }}>
        <Headings titleX={fix(title(data.name || "Your Name"))} />

        <div style={{ fontSize: "10.5pt", marginTop: "6pt" }}>
          {[data.email, data.phoneNumber, data.location]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div style={{ fontSize: "10.5pt" }}>
          {[data.linkedin, data.github]
            .filter(Boolean)
            .join(" | ")}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      <section>
        <Section title="Professional Summary" />
        <p
          style={{
            margin: "0 0 14pt 0",
            textAlign: "justify",
            color: data.summary ? "#000" : "#666",
            fontStyle: data.summary ? "normal" : "italic",
          }}
        >
          {displaySummary}
        </p>
      </section>

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section>
          <Section title="Projects" />
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "14pt" }}>
              <Row>
                <strong>
                  {fix(title(p.title || `Project ${i + 1}`))}
                </strong>
                <span>{p.date}</span>
              </Row>

              {p.technologies && (
                <p style={{ fontSize: "10.5pt" }}>
                  Tech Stack: {fix(p.technologies)}
                </p>
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

      {/* ================= SKILLS ================= */}
      {skills.length > 0 && (
        <section>
          <Section title="Skills" />
          <p>{skills.join(", ")}</p>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education?.degree && (
        <section>
          <Section title="Education" />
          <p>
            <strong>
              {fix(title(data.education.degree))}
              {data.education.major &&
                ` in ${fix(title(data.education.major))}`}
            </strong>
          </p>

          <p style={{ fontSize: "10.5pt" }}>
            {fix(
              title(
                data.education.college ||
                  data.education.university ||
                  "University"
              )
            )}{" "}
            | {data.education.graduationYear || "—"}
          </p>

          {data.education.cgpa && (
            <p style={{ fontSize: "10.5pt" }}>
              CGPA: {data.education.cgpa}
            </p>
          )}
        </section>
      )}

      {/* ================= ACHIEVEMENTS ================= */}
      {data.achievements?.length > 0 && (
        <section>
          <Section title="Achievements & Certifications" />
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

export default LaunchResume;
