import React from "react";
import "./resume-global.css";

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
  Object.keys(map).forEach(k => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), map[k]);
  });
  return out;
};

const clean = (p = "") => p.replace(/^[•\-*]\s*/, "").trim();

/* =========================
   ORIGIN TEMPLATE
========================= */

const Origin = ({ data }) => {
  const skills = (data.skills || []).map(fix);

  const displaySummary =
    data.summary ||
    "Professional summary will appear here once you select a style.";

  return (
    <div
      className="resume-preview"
      style={{
        maxWidth: "8.5in",
        margin: "0 auto",
        // padding: "0.7in",
      }}
    >
      {/* ================= HEADER ================= */}
      <header className="resume-header">
        <Headings titleX={fix(title(data.name || "Your Name"))} />

        <div className="resume-subtext">
          {[data.email, data.phoneNumber, data.location]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div className="resume-subtext">
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      <section>
        <Section title="Professional Summary" />
        <p
          className={
            data.summary
              ? "resume-text"
              : "resume-text resume-placeholder"
          }
        >
          {displaySummary}
        </p>
      </section>

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
          <p className="resume-subtext">
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
            <p className="resume-subtext">
              CGPA: {data.education.cgpa}
            </p>
          )}
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section>
          <Section title="Projects" />
          {data.projects.map((p, i) => (
            <div key={i} className="resume-block">
              <div className="resume-row">
                <strong>
                  {fix(title(p.title || `Project ${i + 1}`))}
                </strong>
                <span>{p.date}</span>
              </div>

              {p.technologies && (
                <p className="resume-subtext">
                  Technologies: {fix(p.technologies)}
                </p>
              )}

              <ul className="resume-list">
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
          <p className="resume-text">{skills.join(", ")}</p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section>
          <Section title="Experience" />
          {data.experience.map((e, i) => (
            <div key={i} className="resume-block">
              <div className="resume-row">
                <strong>{fix(title(e.title || e.role))}</strong>
                <span>{e.duration}</span>
              </div>
              <p className="resume-subtext">
                {fix(title(e.company))} | {e.location}
              </p>
              <ul className="resume-list">
                {(e.points || []).map((p, idx) => (
                  <li key={idx}>{clean(p)}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ================= ACHIEVEMENTS ================= */}
      {data.achievements?.length > 0 && (
        <section>
          <Section title="Achievements & Certifications" />
          <ul className="resume-list">
            {data.achievements.map((a, i) => (
              <li key={i}>{clean(a)}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Origin;
