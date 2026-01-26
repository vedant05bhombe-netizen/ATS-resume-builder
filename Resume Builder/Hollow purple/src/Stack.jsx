import React from "react";
import Heading from "./Headings";
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
    ts: "TypeScript",
    react: "React.js",
    reactjs: "React.js",
    nextjs: "Next.js",
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
    docker: "Docker",
    aws: "AWS",
  };

  let out = s;
  Object.keys(map).forEach(k => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), map[k]);
  });
  return out;
};

const clean = (p = "") =>
  p.replace(/^[•\-*]\s*/, "").trim();

/* =========================
   STACK TEMPLATE
========================= */

const Stack = ({ data }) => {
  const skills = (data.skills || []).map(fix);
  const tech = skills.slice(0, 8);
  const tools = skills.slice(8);

  return (
    <div
      style={{
        maxWidth: "8.5in",
        margin: "0 auto",
      
        fontFamily: "Inter, Arial, sans-serif",
        fontSize: "11pt",
        lineHeight: 1.45,
        background: "#fff",
        color: "#000",
      }}
    >
      {/* ================= HEADER ================= */}
      <header style={{ marginBottom: "14pt" }}>
        <Heading titleX={fix(title(data.name || "Your Name"))} />

        <div style={{ fontSize: "10.5pt", marginTop: "4pt" }}>
          {[data.email, data.phoneNumber, data.location]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div style={{ fontSize: "10.5pt" }}>
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {(data.summary || "").trim() && (
        <section>
          <Section title="Professional Summary" />
          <p style={{ textAlign: "justify" }}>
            {data.summary}
          </p>
        </section>
      )}

      {/* ================= TECH STACK ================= */}
      {skills.length > 0 && (
        <section>
          <Section title="Technical Stack" />
          <p>
            <strong>Languages & Frameworks:</strong> {tech.join(", ")}
          </p>
          {tools.length > 0 && (
            <p>
              <strong>Tools & Platforms:</strong> {tools.join(", ")}
            </p>
          )}
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section>
          <Section title="Projects" />
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "12pt" }}>
              <Row>
                <strong>{fix(title(p.title))}</strong>
                <span>{p.date}</span>
              </Row>

              {p.technologies && (
                <p style={{ fontSize: "10.5pt" }}>
                  Tech: {fix(p.technologies)}
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

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section>
          <Section title="Experience" />
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "12pt" }}>
              <Row>
                <strong>{fix(title(e.title || e.role))}</strong>
                <span>{e.duration}</span>
              </Row>
              <p style={{ fontSize: "10.5pt" }}>
                {fix(title(e.company))} | {e.location}
              </p>
              <ul style={{ marginLeft: "18pt" }}>
                {(e.points || []).map((p, idx) => (
                  <li key={idx}>{clean(p)}</li>
                ))}
              </ul>
            </div>
          ))}
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
            | {data.education.graduationYear}
          </p>
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

export default Stack;
