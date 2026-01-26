import React from "react";
import Headings from "./Headings";
import Section from "./Section";



const title = (s = "") =>
  s
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const fix = (s = "") => {
  const map = {
    ceo: "CEO",
    cto: "CTO",
    cfo: "CFO",
    coo: "COO",
    ai: "AI",
    ml: "ML",
    api: "API",
    js: "JavaScript",
    reactjs: "React.js",
    nodejs: "Node.js",
  };
  let out = s;
  Object.keys(map).forEach((k) => {
    out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), map[k]);
  });
  return out;
};

const clean = (t = "") => t.replace(/^[•\-*]\s*/, "").trim();



const Apex = ({ data }) => {
const displaySummary = data.summary || "Professional summary will appear here once you complete the onboarding process.";

  return (
    <div
      style={{
        maxWidth: "8.5in",
        margin: "0 auto",
        // padding: "0.9in",
        background: "#fff",
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "11.2pt",
        lineHeight: 1.45,
        color: "#000",
      }}
    >
      {/* HEADER */}
      <header style={{ marginBottom: "18pt" }}>
        <Headings titleX={fix(title(data.name || "Your Name"))} />

        <div style={{ fontSize: "10.5pt" }}>
          {[data.location, data.email, data.phoneNumber]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div style={{ fontSize: "10.5pt" }}>
          {[data.linkedin, data.github].filter(Boolean).join(" | ")}
        </div>
      </header>

   
      <section>
        <Section title="Executive Profile" />
        <p style={{ marginTop: "6pt", textAlign: "justify" }}>
          {displaySummary}
        </p>
      </section>

      
      {data.experience?.length > 0 && (
        <section>
          <Section title="Professional Experience" />
          {data.experience.map((e, i) => (
            <div key={i} style={{ marginBottom: "16pt" }}>
              <Row>
                <strong>{fix(title(e.title || e.role || "Role Title"))}</strong>
                <span>{e.duration}</span>
              </Row>
              <div style={{ fontSize: "10.5pt", marginBottom: "6pt" }}>
                {fix(title(e.company || "Company"))}
                {e.location && ` | ${e.location}`}
              </div>
              <ul style={{ marginLeft: "18pt" }}>
                {(e.points || []).map((p, idx) => (
                  <li key={idx} style={{ marginBottom: "4pt" }}>
                    {clean(p)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <section>
          <Section title="Strategic Projects" />
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "10pt" }}>
              <Row>
                <strong>{fix(title(p.title || "Project Title"))}</strong>
                {p.date && <span>{p.date}</span>}
              </Row>
              {p.organization && (
                <div style={{ fontSize: "10.5pt", marginBottom: "4pt" }}>
                  {fix(title(p.organization))}
                </div>
              )}
              <ul style={{ marginLeft: "18pt" }}>
                {(p.points || p.desc ? [].concat(p.points || p.desc) : [])
                  .slice(0, 2)
                  .map((pt, idx) => (
                    <li key={idx} style={{ marginBottom: "4pt" }}>
                      {clean(pt)}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* KEY SKILLS */}
      {data.skills?.length > 0 && (
        <section>
          <Section title="Key Competencies" />
          <p>{data.skills.map(fix).join(" • ")}</p>
        </section>
      )}

      {/* EDUCATION */}
      {data.education?.degree && (
        <section>
          <Section title="Education" />
          <div>
            <strong>
              {fix(title(data.education.degree))}
              {data.education.major && ` in ${fix(title(data.education.major))}`}
            </strong>
          </div>
          <div style={{ fontSize: "10.5pt" }}>
            {fix(
              title(
                data.education.college || data.education.university || "University"
              )
            )}
            {data.education.graduationYear && ` | ${data.education.graduationYear}`}
          </div>
        </section>
      )}

      {/* CERTIFICATIONS / ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <section>
          <Section title="Certifications & Achievements" />
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

export default Apex;
