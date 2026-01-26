import React from "react";
import Headings from "./Headings";
import Section from "./Section";


const t = (s = "") =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
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
    docker: "Docker",
  };
  let out = s;
  Object.keys(map).forEach((k) => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), map[k]);
  });
  return out;
};

const clean = (p = "") => p.replace(/^[•\-*]\s*/, "").trim();

/* =========================
   BYTE TEMPLATE
========================= */

const Byte = ({ data }) => {
  const skills = (data.skills || []).map(fix);
  const displaySummary =
    data.summary ||
    "Professional summary will appear here once you complete the onboarding process.";

  return (
    <div
      style={{
        maxWidth: "8.5in",
        margin: "0 auto",
        // padding: "0.55in",
        fontFamily: "Arial, sans-serif",
        fontSize: "10.8pt",
        lineHeight: 1.38,
        background: "#fff",
        color: "#000",
      }}
    >
      
      <header style={{ marginBottom: "10pt" }}>
        <Headings titleX={fix(t(data.name || "Your Name"))} />

        <div style={{ fontSize: "10pt" }}>
          {[data.email, data.phoneNumber, data.location]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div style={{ fontSize: "10pt" }}>
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </div>
      </header>

    
      <section>
        <Section title="Professional Summary" />
        <p style={{ textAlign: "justify", margin: "0 0 8pt 0" }}>
          {displaySummary}
        </p>
      </section>

   
      {skills.length > 0 && (
        <section>
          <Section title="Skills" />
          <p>{skills.join(", ")}</p>
        </section>
      )}

   
      {data.projects?.length > 0 && (
        <section>
          <Section title="Projects" />
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "8pt" }}>
              <Row>
                <strong>{fix(t(p.title || `Project ${i + 1}`))}</strong>
                <span>{p.date}</span>
              </Row>

              {p.technologies && (
                <div style={{ fontSize: "9.8pt" }}>Tech: {fix(p.technologies)}</div>
              )}

              <ul style={{ marginLeft: "16pt" }}>
                {p.desc && <li>{clean(p.desc)}</li>}
                {(p.points || []).slice(0, 2).map((pt, idx) => (
                  <li key={idx}>{clean(pt)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

 
      {data.experience?.length > 0 && (
        <section>
          <Section title="Experience" />
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "8pt" }}>
              <Row>
                <strong>{fix(t(e.title || e.role))}</strong>
                <span>{e.duration}</span>
              </Row>
              <div style={{ fontSize: "9.8pt" }}>
                {fix(t(e.company))} | {e.location}
              </div>
              <ul style={{ marginLeft: "16pt" }}>
                {(e.points || []).slice(0, 2).map((p, idx) => (
                  <li key={idx}>{clean(p)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {data.education?.degree && (
        <section>
          <Section title="Education" />
          <div>
            <strong>
              {fix(t(data.education.degree))}
              {data.education.major && ` in ${fix(t(data.education.major))}`}
            </strong>
          </div>
          <div style={{ fontSize: "9.8pt" }}>
            {fix(
              t(
                data.education.college ||
                  data.education.university ||
                  "University"
              )
            )}{" "}
            | {data.education.graduationYear}
          </div>
        </section>
      )}
    </div>
  );
};


const Row = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: "10.5pt",
    }}
  >
    {children}
  </div>
);

export default Byte;
