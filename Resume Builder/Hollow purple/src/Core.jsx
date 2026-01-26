import React from "react";
import Headings from "./Headings";
import Section from "./Section";



const toTitleCase = (str = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const fixAbbreviations = (str = "") => {
  if (!str) return "";
  const fixes = {
    btech: "B.Tech",
    mtech: "M.Tech",
    bca: "BCA",
    mca: "MCA",
    bsc: "B.Sc",
    msc: "M.Sc",
    phd: "Ph.D",
    usa: "USA",
    uk: "UK",
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

  let result = str;
  Object.entries(fixes).forEach(([key, val]) => {
    result = result.replace(
      new RegExp(`\\b${key}\\b`, "gi"),
      val
    );
  });
  return result;
};

const normalizeSkill = (skill = "") => {
  const map = {
    js: "JavaScript",
    javascript: "JavaScript",
    ts: "TypeScript",
    typescript: "TypeScript",
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
  const cleaned = skill.toLowerCase().trim();
  return map[cleaned] || skill.trim();
};

const enhanceBulletPoint = (text = "") => {
  let t = text.trim().replace(/^[•\-*]\s*/, "");
  if (!t) return "";
  return t.charAt(0).toUpperCase() + t.slice(1);
};



const ATSResume = ({ data }) => {
  const skills = (data.skills || []).map(normalizeSkill);

  const skillCategories = {
    Technical: [],
    Software: [],
    "Core Competencies": [],
  };

  skills.forEach(skill => {
    if (skillCategories.Technical.length < 5) {
      skillCategories.Technical.push(skill);
    } else if (skillCategories.Software.length < 4) {
      skillCategories.Software.push(skill);
    } else {
      skillCategories["Core Competencies"].push(skill);
    }
  });

  const displaySummary =
    data.summary ||
    "Professional summary will appear here once you complete the onboarding process.";

  return (
    <div
      style={{
        maxWidth: "8.5in",
        minHeight: "11in",
        margin: "0 auto",
        // padding: "0.75in",
        background: "#fff",
        fontFamily: "Arial, sans-serif",
        fontSize: "11pt",
        lineHeight: "1.4",
        color: "#000",
      }}
    >
     
      <div style={{ marginBottom: "20px" }}>
        <Headings
          titleX={fixAbbreviations(
            toTitleCase(data.name || "Your Name")
          )}
        />

        <div style={{ fontSize: "10pt", lineHeight: "1.5" }}>
          {data.address && <div> Address : {data.address}</div>}
          {data.location && <div>{data.location}</div>}
          <div>
            {[data.phoneNumber, data.email]
              .filter(Boolean)
              .join(" | ")}
          </div>
          {data.linkedin && <div>LinkedIn: {data.linkedin}</div>}
          {data.github && <div>GitHub: {data.github}</div>}
        </div>
      </div>

     
      <Section title="Professional Summary" />
      <p style={{ margin: "0 0 12px 0", textAlign: "justify" }}>
        {displaySummary}
      </p>

     
      {data.experience?.length > 0 && (
        <>
          <Section title="Work Experience" />
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <strong>
                {fixAbbreviations(
                  toTitleCase(exp.title || exp.role)
                )}
              </strong>

              <div style={{ fontSize: "10pt", marginBottom: "6px" }}>
                {fixAbbreviations(toTitleCase(exp.company))}
                {exp.location && ` | ${exp.location}`}
                {exp.duration && ` | ${exp.duration}`}
              </div>

              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {(exp.points || []).map((p, idx) => (
                  <li key={idx}>{enhanceBulletPoint(p)}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

     
      {data.projects?.length > 0 && (
        <>
          <Section title="Projects" />
          {data.projects.map((p, i) => (
            <div key={i} style={{ marginBottom: "14px" }}>
              <strong>
                {fixAbbreviations(toTitleCase(p.title || p.name))}
              </strong>
              {p.technologies && (
                <span style={{ fontSize: "10pt" }}>
                  {" "}
                  | {fixAbbreviations(p.technologies)}
                </span>
              )}

              {p.date && (
                <div style={{ fontSize: "10pt" }}>{p.date}</div>
              )}

              {(p.desc || p.description) && (
                <p>{enhanceBulletPoint(p.desc || p.description)}</p>
              )}

              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {(p.points || []).map((pt, idx) => (
                  <li key={idx}>{enhanceBulletPoint(pt)}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      
      {data.education?.degree && (
        <>
          <Section title="Education" />
          <strong>
            {fixAbbreviations(toTitleCase(data.education.degree))}
            {data.education.major &&
              ` in ${fixAbbreviations(
                toTitleCase(data.education.major)
              )}`}
          </strong>
          <div style={{ fontSize: "10pt" }}>
            {fixAbbreviations(
              toTitleCase(
                data.education.college ||
                  data.education.university
              )
            )}
            {data.education.graduationYear &&
              ` | ${data.education.graduationYear}`}
          </div>
        </>
      )}


      {skills.length > 0 && (
        <>
          <Section title="Skills" />
          {Object.entries(skillCategories).map(
            ([cat, list]) =>
              list.length > 0 && (
                <div key={cat}>
                  <strong>{cat}:</strong> {list.join(", ")}
                </div>
              )
          )}
        </>
      )}

 
      {data.achievements?.length > 0 && (
        <>
          <Section title="Certifications & Achievements" />
          {data.achievements.map((a, i) => (
            <div key={i}>{enhanceBulletPoint(a)}</div>
          ))}
        </>
      )}
    </div>
  );
};

export default ATSResume;
