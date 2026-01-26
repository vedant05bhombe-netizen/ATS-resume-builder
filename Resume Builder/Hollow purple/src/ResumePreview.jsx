import React, { useState } from "react";


// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

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

// ============================================================================
// SKILL NORMALIZATION
// ============================================================================

const skillDictionary = {
  'js': 'JavaScript (ES6+)',
  'javascript': 'JavaScript (ES6+)',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'reactjs': 'React.js',
  'react': 'React.js',
  'nextjs': 'Next.js',
  'next': 'Next.js',
  'vuejs': 'Vue.js',
  'vue': 'Vue.js',
  'angular': 'Angular',
  'html': 'HTML5',
  'html5': 'HTML5',
  'css': 'CSS3',
  'css3': 'CSS3',
  'sass': 'SASS/SCSS',
  'scss': 'SASS/SCSS',
  'tailwind': 'Tailwind CSS',
  'bootstrap': 'Bootstrap',
  'nodejs': 'Node.js',
  'node': 'Node.js',
  'express': 'Express.js',
  'expressjs': 'Express.js',
  'django': 'Django',
  'flask': 'Flask',
  'fastapi': 'FastAPI',
  'mongodb': 'MongoDB',
  'mongo': 'MongoDB',
  'mysql': 'MySQL',
  'postgresql': 'PostgreSQL',
  'postgres': 'PostgreSQL',
  'redis': 'Redis',
  'firebase': 'Firebase',
  'python': 'Python',
  'java': 'Java',
  'cpp': 'C++',
  'c++': 'C++',
  'docker': 'Docker',
  'kubernetes': 'Kubernetes',
  'k8s': 'Kubernetes',
  'aws': 'AWS',
  'git': 'Git',
  'github': 'GitHub'
};

const normalizeSkill = (skill) => {
  const cleaned = skill.toLowerCase().trim();
  return skillDictionary[cleaned] || skill.trim();
};

const skillCategories = {
  frontend: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Vue.js', 'Angular', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'SASS/SCSS'],
  backend: ['Node.js', 'Express.js', 'Django', 'Flask', 'FastAPI', 'Python', 'Java'],
  databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase'],
  tools: ['Docker', 'Kubernetes', 'AWS', 'Git', 'GitHub']
};

const categorizeSkills = (skills) => {
  const categorized = {
    frontend: [],
    backend: [],
    databases: [],
    tools: [],
    other: []
  };

  skills.forEach(skill => {
    const normalized = normalizeSkill(skill);
    let placed = false;

    for (const [category, categorySkills] of Object.entries(skillCategories)) {
      if (categorySkills.includes(normalized)) {
        if (!categorized[category].includes(normalized)) {
          categorized[category].push(normalized);
        }
        placed = true;
        break;
      }
    }

    if (!placed && !categorized.other.includes(normalized)) {
      categorized.other.push(normalized);
    }
  });

  return categorized;
};

// ============================================================================
// ACTION VERBS & ENHANCEMENT
// ============================================================================

const actionVerbs = {
  development: ["Developed", "Built", "Engineered", "Implemented", "Created", "Designed", "Programmed", "Coded"],
  optimization: ["Optimized", "Enhanced", "Improved", "Streamlined", "Accelerated", "Refined"],
  leadership: ["Led", "Managed", "Coordinated", "Directed", "Spearheaded", "Supervised"],
  collaboration: ["Collaborated", "Partnered", "Worked with", "Coordinated with", "Engaged"],
  deployment: ["Deployed", "Launched", "Released", "Delivered", "Published", "Rolled out"],
  analysis: ["Analyzed", "Evaluated", "Assessed", "Investigated", "Researched"],
  achievement: ["Achieved", "Accomplished", "Attained", "Completed", "Secured"]
};

const getAllActionVerbs = () => {
  return Object.values(actionVerbs).flat();
};

const profanityList = ['fuck', 'fucking', 'shit', 'damn', 'ass', 'bitch', 'bastard', 'crap', 'piss'];

const cleanProfanity = (text) => {
  if (!text) return text;
  let cleaned = text;
  profanityList.forEach(word => {
    const regex = new RegExp(`\\b${word}(ing|ed|s)?\\b`, 'gi');
    cleaned = cleaned.replace(regex, (match) => {
      return match.charAt(0) + '*'.repeat(match.length - 1);
    });
  });
  return cleaned;
};

const isWellFormed = (text) => {
  if (!text || text.trim().length < 10) return false;
  const trimmed = text.trim();
  const startsWithActionVerb = getAllActionVerbs().some(verb => 
    trimmed.toLowerCase().startsWith(verb.toLowerCase())
  );
  const hasBasicStructure = /^[A-Z][a-z]+\s+\w+/.test(trimmed);
  const hasBrokenPatterns = /^(i\s+)|(have\s+)|(\w+ed\s+i\s+)|(\w+ed\s+have\s+)/i.test(trimmed);
  return (startsWithActionVerb || hasBasicStructure) && !hasBrokenPatterns;
};

const cleanUserInput = (text) => {
  if (!text) return "";
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^[•\-\*]\s*/, '');
  cleaned = cleaned.replace(/^(i\s+have\s+)(\w+ed)\s+/gi, '$2 ');
  cleaned = cleaned.replace(/^(have\s+)(\w+ed)\s+/gi, '$2 ');
  cleaned = cleaned.replace(/^i\s+(made|created|designed|developed|built|implemented)\s+/gi, '$1 ');
  cleaned = cleaned.replace(/^i\s+am\s+/gi, '');
  cleaned = cleaned.replace(/\s+/g, ' ');
  cleaned = cleaned.replace(/\ban\s+([bcdfghjklmnpqrstvwxyz])/gi, 'a $1');
  cleaned = cleaned.replace(/\ba\s+([aeiou])/gi, 'an $1');
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  return cleaned;
};

const enhanceBulletPoint = (text) => {
  if (!text) return "";
  let cleaned = cleanProfanity(text);
  cleaned = cleanUserInput(cleaned);
  if (isWellFormed(cleaned)) {
    return cleaned;
  }
  const startsWithActionVerb = getAllActionVerbs().some(verb => 
    cleaned.toLowerCase().startsWith(verb.toLowerCase())
  );
  if (startsWithActionVerb) {
    return cleaned;
  }
  if (cleaned.length < 50) {
    const lower = cleaned.toLowerCase();
    let verb = "Developed";
    if (lower.includes('design') || lower.includes('architect')) verb = "Designed";
    else if (lower.includes('build') || lower.includes('construct')) verb = "Built";
    else if (lower.includes('create')) verb = "Created";
    else if (lower.includes('implement')) verb = "Implemented";
    else if (lower.includes('optimi') || lower.includes('improv')) verb = "Optimized";
    else if (lower.includes('deploy') || lower.includes('launch')) verb = "Deployed";
    else if (lower.includes('integrat')) verb = "Integrated";
    else if (lower.includes('manag') || lower.includes('lead')) verb = "Led";
    else if (lower.includes('collaborat')) verb = "Collaborated with";
    else if (lower.includes('test')) verb = "Tested";
    else if (lower.includes('debug') || lower.includes('fix')) verb = "Debugged";
    cleaned = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
    return `${verb} ${cleaned}`;
  }
  return cleaned;
};




const validateLink = (link, type) => {
  if (!link) return null;
  const inappropriate = ['pornhub', 'xxx', 'adult', 'nsfw', 'xvideos', 'xhamster'];
  if (inappropriate.some(word => link.toLowerCase().includes(word))) {
    console.warn(`⚠️ Inappropriate ${type} link detected. Using placeholder.`);
    return type === "LinkedIn" ? "linkedin.com/in/yourprofile" : "github.com/yourprofile";
  }
  return link;
};


const ResumePreview = ({ data }) => {
  const displaySummary = data.summary || "Professional summary will appear here once you select a style.";

  const profileType = data.profileType || "fresher"; 
  const cleanLinkedIn = validateLink(data.linkedin, "LinkedIn");
  const cleanGitHub = validateLink(data.github, "GitHub");

  const normalizedSkills = (data.skills || []).map(s => normalizeSkill(s));
  const categorized = categorizeSkills(normalizedSkills);

  return (
    <div>

      {/* Resume Document - THIS is what gets downloaded */}
      <div 
        id=""
        style={{
          backgroundColor: 'white',
          padding: '30px',
       
          lineHeight: '1.6',
          color: '#333'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '3px solid #3b82f6' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
            {fixAbbreviations(toTitleCase(data.name)) || "Your Name"}
          </h1>
          {data.targetRole && (
            <div style={{ fontSize: '16px', color: '#3b82f6', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {fixAbbreviations(toTitleCase(data.targetRole))}
            </div>
          )}
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            {data.email || "your.email@example.com"}
            {data.phone && ` • ${data.phone}`}
            {cleanLinkedIn && ` • ${cleanLinkedIn}`}
            {cleanGitHub && ` • ${cleanGitHub}`}
            {data.location && ` • ${fixAbbreviations(toTitleCase(data.location))}`}
          </div>
        </div>

        {/* Professional Summary */}
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px' }}>
            Professional Summary
          </h2>
          <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.7', textAlign: 'justify' }}>{displaySummary}</p>
        </div>

        {/* Technical Skills */}
        {normalizedSkills.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px' }}>
              Technical Skills
            </h2>
            <div>
              {Object.entries(categorized).map(([category, skills]) => 
                skills.length > 0 && (
                  <div key={category} style={{ marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: '#374151', minWidth: '100px', display: 'inline-block' }}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' / ')}:
                    </strong>{' '}
                    <span style={{ color: '#4b5563' }}>{skills.join(", ")}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {data.experience?.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px' }}>
              Professional Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <div>
                    <strong style={{ fontSize: '15px', color: '#1f2937' }}>
                      {fixAbbreviations(toTitleCase(exp.title || exp.role || "Software Engineer"))}
                    </strong>
                    <span style={{ fontSize: '15px', color: '#374151' }}>
                      {' - '}
                      {fixAbbreviations(toTitleCase(exp.company || "Company Name"))}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>
                    {exp.duration || `${exp.startDate || "Start"} - ${exp.endDate || "Present"}`}
                  </div>
                </div>
                {exp.location && (
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                    {fixAbbreviations(toTitleCase(exp.location))}
                  </div>
                )}
                <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                  {exp.points?.length > 0 ? (
                    exp.points.map((point, idx) => (
                      <li key={idx} style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px', lineHeight: '1.6' }}>
                        {enhanceBulletPoint(point)}
                      </li>
                    ))
                  ) : (
                    <>
                      <li style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px' }}>
                        Developed and maintained scalable web applications using modern frameworks
                      </li>
                      <li style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px' }}>
                        Collaborated with cross-functional teams to deliver high-quality features on schedule
                      </li>
                      <li style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px' }}>
                        Implemented efficient algorithms and optimized code architecture
                      </li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px' }}>
              {profileType === "fresher" ? "Academic Projects" : "Key Projects"}
            </h2>
            {data.projects.map((project, i) => {
              const title = fixAbbreviations(toTitleCase(cleanProfanity(project.title || `Project ${i + 1}`)));
              const tech = project.technologies ? ` | ${fixAbbreviations(project.technologies)}` : "";
              return (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div>
                      <strong style={{ fontSize: '15px', color: '#1f2937' }}>{title}</strong>
                      <span style={{ fontSize: '13px', color: '#6b7280' }}>{tech}</span>
                    </div>
                    {project.date && (
                      <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>
                        {project.date}
                      </div>
                    )}
                  </div>
                  <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                    {project.desc && (
                      <li style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px', lineHeight: '1.6' }}>
                        {enhanceBulletPoint(project.desc || project.description)}
                      </li>
                    )}
                    {project.points?.map((point, idx) => (
                      <li key={idx} style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px', lineHeight: '1.6' }}>
                        {enhanceBulletPoint(point)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Education */}
        {data.education?.degree && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px' }}>
              Education
            </h2>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div>
                  <strong style={{ fontSize: '15px', color: '#1f2937' }}>
                    {fixAbbreviations(toTitleCase(data.education.degree))}
                  </strong>
                  {data.education.major && (
                    <span style={{ fontSize: '15px', color: '#374151' }}>
                      {` in ${fixAbbreviations(toTitleCase(data.education.major))}`}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic' }}>
                  {data.education.graduationYear || data.education.endYear || data.education.year || "Expected 2025"}
                </div>
              </div>
              <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px' }}>
                {fixAbbreviations(toTitleCase(data.education.college || data.education.university || "University Name"))}
                {data.education.location && `, ${fixAbbreviations(toTitleCase(data.education.location))}`}
              </div>
              {data.education.cgpa && (
                <div style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px' }}>
                  CGPA: {data.education.cgpa}
                </div>
              )}
              {data.education.details?.length > 0 && (
                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '5px' }}>
                  <strong>Relevant Coursework:</strong> {data.education.details.map(d => fixAbbreviations(toTitleCase(d))).join(", ")}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Certifications & Achievements */}
        {data.achievements?.length > 0 && (
          <div style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1f2937', marginBottom: '10px', textTransform: 'uppercase', borderBottom: '2px solid #e5e7eb', paddingBottom: '5px' }}>
              Certifications & Achievements
            </h2>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {data.achievements.map((achievement, i) => (
                <li key={i} style={{ fontSize: '14px', color: '#4b5563', marginBottom: '5px', lineHeight: '1.6' }}>
                  {enhanceBulletPoint(achievement)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;