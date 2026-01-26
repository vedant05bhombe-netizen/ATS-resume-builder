import React from 'react';
import Section from './Section';
import SectionX from './Headings';

// Helper functions
const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const fixAbbreviations = (str) => {
  if (!str) return "";
  const fixes = {
    'btech': 'B.Tech',
    'mtech': 'M.Tech',
    'bca': 'BCA',
    'mca': 'MCA',
    'bsc': 'B.Sc',
    'msc': 'M.Sc',
    'phd': 'Ph.D',
    'usa': 'USA',
    'uk': 'UK',
    'ai': 'AI',
    'ml': 'ML',
    'ui': 'UI',
    'ux': 'UX',
    'api': 'API',
    'html': 'HTML',
    'css': 'CSS',
    'js': 'JavaScript',
    'reactjs': 'React.js',
    'nodejs': 'Node.js'
  };
  let result = str;
  Object.keys(fixes).forEach(key => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    result = result.replace(regex, fixes[key]);
  });
  return result;
};

const normalizeSkill = (skill) => {
  const skillDictionary = {
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'ts': 'TypeScript',
    'typescript': 'TypeScript',
    'reactjs': 'React.js',
    'react': 'React.js',
    'nextjs': 'Next.js',
    'nodejs': 'Node.js',
    'node': 'Node.js',
    'html': 'HTML',
    'css': 'CSS',
    'python': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'mongodb': 'MongoDB',
    'mysql': 'MySQL',
    'git': 'Git',
    'docker': 'Docker',
    'aws': 'AWS'
  };
  const cleaned = skill.toLowerCase().trim();
  return skillDictionary[cleaned] || skill.trim();
};

const enhanceBulletPoint = (text) => {
  if (!text) return "";
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^[•\-\*]\s*/, '');
  cleaned = cleaned.replace(/^(i\s+have\s+)(\w+ed)\s+/gi, '$2 ');
  cleaned = cleaned.replace(/^i\s+(made|created|designed|developed|built)\s+/gi, '$1 ');
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return cleaned;
};

const ATSResume = ({ data }) => {
  const normalizedSkills = (data.skills || []).map(s => normalizeSkill(s));
  
  // Group skills by category
  const skillCategories = {
    'Technical': [],
    'Software': [],
    'Core Competencies': []
  };

  normalizedSkills.forEach(skill => {
    if (skillCategories['Technical'].length < 5) {
      skillCategories['Technical'].push(skill);
    } else if (skillCategories['Software'].length < 4) {
      skillCategories['Software'].push(skill);
    } else {
      skillCategories['Core Competencies'].push(skill);
    }
  });

  // Use data.summary directly
  const displaySummary = data.summary || "Professional summary will appear here once you complete the onboarding process.";

  return (
    <div style={{
      maxWidth: '8.5in',
      minHeight: '11in',
      margin: 0,
      padding: 0,
      backgroundColor: 'white',
      fontFamily: 'Arial, sans-serif',
      fontSize: '11pt',
      lineHeight: '1.4',
      color: '#000'
    }}>
      {/* Header */}
    <div style={{ textAlign: "left", marginBottom: "20px" }}>
  <SectionX
    titleX={
      fixAbbreviations(toTitleCase(data.name)) || "YOUR NAME"
    }
  />

  <div style={{ fontSize: "10pt", lineHeight: "1.5" }}>
    {/* Location */}
    {data.location && <div>{data.location}</div>}

    {/* Phone | Email */}
    {(data.phoneNumber || data.email) && (
      <div>
        {[data.phoneNumber, data.email]
          .filter(Boolean)
          .join(" | ")}
      </div>
    )}

    {/* LinkedIn */}
    {data.linkedin && (
      <div>LinkedIn: {data.linkedin}</div>
    )}

    {/* GitHub */}
    {data.github && (
      <div>GitHub: {data.github}</div>
    )}
  </div>
</div>


      {/* Professional Summary */}
      <Section title="PROFESSIONAL SUMMARY" />
      <p style={{ margin: '0 0 12px 0', textAlign: 'justify' }}>
        {displaySummary}
      </p>

      {/* Work Experience */}
      {data.experience?.length > 0 && (
        <>
          <Section title="WORK EXPERIENCE" />
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ marginBottom: '4px' }}>
                <strong style={{ fontSize: '11pt' }}>
                  {fixAbbreviations(toTitleCase(exp.title || exp.role || "Job Title"))}
                </strong>
              </div>
              <div style={{ fontSize: '10pt', marginBottom: '6px' }}>
                {fixAbbreviations(toTitleCase(exp.company || "Company Name"))} | {exp.location || "City, State"} | {exp.duration || `${exp.startDate || "Start"} - ${exp.endDate || "Present"}`}
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {exp.points?.length > 0 ? (
                  exp.points.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {enhanceBulletPoint(point)}
                    </li>
                  ))
                ) : (
                  <>
                    <li style={{ marginBottom: '4px' }}>
                      Deliver [key responsibility] for [department/clients], achieving [result]
                    </li>
                    <li style={{ marginBottom: '4px' }}>
                      Implement [solution/process] that improved [metric] by X%
                    </li>
                    <li style={{ marginBottom: '4px' }}>
                      Collaborate with [stakeholders] to [accomplish goal]
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <>
          <Section title="PROJECTS" />
          {data.projects.map((project, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ marginBottom: '4px' }}>
                <strong style={{ fontSize: '11pt' }}>
                  {fixAbbreviations(toTitleCase(project.title || `Project ${i + 1}`))}
                </strong>
                {project.technologies && (
                  <span style={{ fontSize: '10pt' }}> | {fixAbbreviations(project.technologies)}</span>
                )}
              </div>
              {project.date && (
                <div style={{ fontSize: '10pt', marginBottom: '6px' }}>
                  {project.date}
                </div>
              )}
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {project.desc && (
                  <li style={{ marginBottom: '4px' }}>
                    {enhanceBulletPoint(project.desc || project.description)}
                  </li>
                )}
                {project.points?.map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>
                    {enhanceBulletPoint(point)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {data.education?.degree && (
        <>
          <Section title="EDUCATION" />
          <div style={{ marginBottom: '14px' }}>
            <div style={{ marginBottom: '4px' }}>
              <strong style={{ fontSize: '11pt' }}>
                {fixAbbreviations(toTitleCase(data.education.degree))}
                {data.education.major && ` in ${fixAbbreviations(toTitleCase(data.education.major))}`}
              </strong>
            </div>
            <div style={{ fontSize: '10pt', marginBottom: '4px' }}>
              {fixAbbreviations(toTitleCase(data.education.college || data.education.university || "University Name"))} | {data.education.location || "City, State"} | Graduated {data.education.graduationYear || data.education.year || "May 2025"}
            </div>
            {data.education.cgpa && (
              <div style={{ fontSize: '10pt' }}>
                GPA: {data.education.cgpa}
              </div>
            )}
          </div>
        </>
      )}

      {/* Skills */}
      {normalizedSkills.length > 0 && (
        <>
          <Section title="SKILLS" />
          {Object.entries(skillCategories).map(([category, skills]) => 
            skills.length > 0 && (
              <div key={category} style={{ marginBottom: '6px' }}>
                <strong>{category}:</strong> {skills.join(', ')}
              </div>
            )
          )}
          
          <div style={{ marginBottom: '6px' }}>
            <strong>Core Competencies:</strong> Leadership, Communication, Problem Solving, Team Collaboration
          </div>
        </>
      )}

      {/* Certifications */}
      {data.achievements?.length > 0 && (
        <>
          <Section title="ACHIEVEMENTS & CERTIFICATIONS" />
          {data.achievements.map((achievement, i) => (
            <div key={i} style={{ marginBottom: '4px' }}>
              {enhanceBulletPoint(achievement)}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ATSResume;