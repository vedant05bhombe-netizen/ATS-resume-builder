import React from "react";
import Section from "./Section";
import Headings from "./Headings";
import "./resume-global.css";

/* =========================
   HELPERS
========================= */

const toTitleCase = (str = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const fixAbbreviations = (str = "") => {
  const map = {
    btech: "B.Tech",
    mtech: "M.Tech",
    bca: "BCA",
    mca: "MCA",
    bsc: "B.Sc",
    msc: "M.Sc",
    phd: "Ph.D",
    ai: "AI",
    ml: "ML",
    ui: "UI",
    ux: "UX",
    api: "API",
    html: "HTML",
    css: "CSS",
    js: "JavaScript",
    reactjs: "React.js",
    nodejs: "Node.js",
  };

  let out = str;
  Object.entries(map).forEach(([k, v]) => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
  });
  return out;
};

const enhanceBulletPoint = (text = "") => {
  let t = text.trim().replace(/^[•\-*]\s*/, "");
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
};

const normalizeSkill = (s = "") => {
  const dict = {
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
    mysql: "MySQL",
    mongodb: "MongoDB",
    git: "Git",
    aws: "AWS",
    docker: "Docker",
  };
  return dict[s.toLowerCase()] || s;
};

/* =========================
   NOVA TEMPLATE
========================= */

const NovaResume = ({ data }) => {
  const skills = (data.skills || []).map(normalizeSkill);
  const displaySummary =
    data.summary ||
    "Professional summary will appear here once you complete the onboarding process.";

  return (
    <div
      style={{
        maxWidth: "8.5in",
        minHeight: "11in",
        margin: "0 auto",
       
        background: "#fff",
        color: "#000",
        fontFamily: "Calibri, Arial, sans-serif",
        fontSize: "11pt",
        lineHeight: "1.45",
      }}
    >
      {/* ================= HEADER ================= */}
      <div style={{ marginBottom: "18px" }}>
        <Headings
          titleX={fixAbbreviations(
            toTitleCase(data.name || "Your Name")
          )}
        />

        <div style={{ fontSize: "10.5pt", marginTop: "6px" }}>
          {[data.email, data.phoneNumber, data.location]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div style={{ fontSize: "10.5pt" }}>
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <Section title="Professional Summary" />
      <p style={{ margin: "0 0 14px 0", textAlign: "justify" }}>
        {displaySummary}
      </p>

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <>
          <Section title="Experience" />
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <strong>
                  {fixAbbreviations(
                    toTitleCase(exp.title || exp.role || "Job Title")
                  )}
                </strong>
                <span style={{ fontSize: "10.5pt" }}>
                  {exp.duration ||
                    `${exp.startDate || "Start"} - ${
                      exp.endDate || "Present"
                    }`}
                </span>
              </div>

              <div style={{ fontSize: "10.5pt", marginBottom: "4px" }}>
                {fixAbbreviations(
                  toTitleCase(exp.company || "")
                )}
                {exp.location && `, ${exp.location}`}
              </div>

              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {(exp.points || []).map((p, idx) => (
                  <li key={idx}>{enhanceBulletPoint(p)}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <>
          <Section title="Projects" />
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <strong>
                  {fixAbbreviations(
                    toTitleCase(p.title || `Project ${i + 1}`)
                  )}
                </strong>
                <span>{p.date}</span>
              </div>

              {p.technologies && (
                <div style={{ fontSize: "10.5pt" }}>
                  Technologies: {p.technologies}
                </div>
              )}

              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {p.desc && <li>{enhanceBulletPoint(p.desc)}</li>}
                {(p.points || []).map((pt, idx) => (
                  <li key={idx}>{enhanceBulletPoint(pt)}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education?.degree && (
        <>
          <Section title="Education" />
          <div style={{ marginBottom: "12px" }}>
            <strong>
              {fixAbbreviations(toTitleCase(data.education.degree))}
              {data.education.major &&
                ` in ${fixAbbreviations(
                  toTitleCase(data.education.major)
                )}`}
            </strong>
            <div style={{ fontSize: "10.5pt" }}>
              {fixAbbreviations(
                toTitleCase(
                  data.education.college ||
                    data.education.university
                )
              )}
              {" | "}
              {data.education.graduationYear || "—"}
            </div>
          </div>
        </>
      )}

      {/* ================= SKILLS ================= */}
      {skills.length > 0 && (
        <>
          <Section title="Skills" />
          <div style={{ fontSize: "10.5pt" }}>
            {skills.join(", ")}
          </div>
        </>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {data.achievements?.length > 0 && (
        <>
          <Section title="Certifications" />
          <ul style={{ paddingLeft: "18px", margin: 0 }}>
            {data.achievements.map((a, i) => (
              <li key={i}>{enhanceBulletPoint(a)}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NovaResume;
