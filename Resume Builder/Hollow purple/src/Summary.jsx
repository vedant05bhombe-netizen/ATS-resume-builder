import React, { useState, useEffect } from 'react';

const summaryTemplates = {
  professional: {
    label: "Professional (Recommended)",
    useCase: "All roles, corporate, first-time users",
    text: "Results-oriented professional with experience in delivering high-quality work across cross-functional teams. Strong foundation in problem-solving, communication, and industry-relevant skills. Proven ability to adapt quickly, meet deadlines, and contribute effectively to organizational goals."
  },
  technical: {
    label: "Technical (Tech Roles)",
    useCase: "Software engineers, IT, developers",
    text: "Detail-oriented software professional with hands-on experience in designing, developing, and maintaining scalable applications. Proficient in modern programming languages, frameworks, and tools with a strong focus on performance, clean code, and maintainability. Experienced in collaborating with teams to deliver reliable technical solutions."
  },
  experienceDriven: {
    label: "Experience-Driven",
    useCase: "2+ years experience, mid/senior roles",
    text: "Experienced professional with a strong track record of delivering measurable results in fast-paced environments. Demonstrated expertise in driving projects from concept to completion while improving efficiency and quality. Known for ownership, accountability, and consistent performance across roles."
  },
  projectFocused: {
    label: "Project-Focused (Students)",
    useCase: "Freshers, interns, students",
    text: "Motivated graduate with hands-on experience gained through academic and personal projects. Strong understanding of core concepts and practical application of skills in real-world scenarios. Eager to apply technical knowledge, learn quickly, and contribute to team success in an entry-level role."
  },
  leadership: {
    label: "Leadership (Senior Roles)",
    useCase: "Team leads, managers, senior roles",
    text: "Leadership-focused professional with experience guiding teams, managing priorities, and delivering business-aligned outcomes. Skilled in mentoring, stakeholder communication, and decision-making while maintaining high standards of execution. Proven ability to balance technical and strategic responsibilities."
  },
  careerSwitcher: {
    label: "Career Switcher",
    useCase: "Domain switch, tech switch, non-linear careers",
    text: "Adaptable professional transitioning into a new role with a strong foundation in transferable skills and hands-on learning. Demonstrated ability to quickly acquire new knowledge, apply it effectively, and deliver results. Brings a fresh perspective, strong work ethic, and commitment to continuous growth."
  },
  concise: {
    label: "Concise (Short & Sharp)",
    useCase: "Byte template, one-page resumes, startup hiring",
    text: "Results-driven professional with strong skills in problem-solving, collaboration, and execution. Experienced in delivering quality work efficiently and adapting to dynamic environments."
  }
};

const Summary = ({ data, setData, onNext, onBack }) => {
  const [selectedSummary, setSelectedSummary] = useState('professional');
  const [customSummary, setCustomSummary] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const currentTemplate = summaryTemplates[selectedSummary];
  const displaySummary = useCustom ? customSummary : currentTemplate.text;


  useEffect(() => {
    if (setData) {
      setData(prev => ({ ...prev, summary: displaySummary }));
    }
  }, [displaySummary, setData]);

  
  useEffect(() => {
    if (setData && !data?.summary) {
      setData(prev => ({ ...prev, summary: summaryTemplates.professional.text }));
    }
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Summary Style Selector */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: '600', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
            Summary Style
          </label>
          <select 
            value={selectedSummary} 
            onChange={(e) => {
              setSelectedSummary(e.target.value);
              setUseCustom(false);
            }}
            disabled={useCustom}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '14px',
              cursor: useCustom ? 'not-allowed' : 'pointer',
              backgroundColor: useCustom ? '#f5f5f5' : 'white',
              opacity: useCustom ? 0.6 : 1
            }}
          >
            {Object.entries(summaryTemplates).map(([key, template]) => (
              <option key={key} value={key}>
                {template.label}
              </option>
            ))}
          </select>
          
          {/* Use Case Description */}
          {!useCustom && (
            <div style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              fontSize: '12px',
              color: '#666'
            }}>
              <strong style={{ color: '#333' }}>Use case:</strong> {currentTemplate.useCase}
            </div>
          )}
          
          <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', marginBottom: 0 }}>
            Summaries are auto-optimized for ATS.
          </p>
        </div>

        {/* Custom Summary Option */}
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '10px'
          }}>
            <input 
              type="checkbox"
              checked={useCustom}
              onChange={(e) => {
                setUseCustom(e.target.checked);
                if (e.target.checked && !customSummary) {
                  setCustomSummary(currentTemplate.text);
                }
              }}
              style={{ cursor: 'pointer' }}
            />
            Write Custom Summary
          </label>
          
          {useCustom && (
            <div>
              <textarea
                value={customSummary}
                onChange={(e) => setCustomSummary(e.target.value)}
                placeholder="Write your own professional summary here..."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  lineHeight: '1.6',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '8px',
                fontSize: '12px',
                color: '#666'
              }}>
                <span>{customSummary.length} characters</span>
                <button
                  onClick={() => setCustomSummary(currentTemplate.text)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '12px',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Use Template
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: '600', 
          marginTop: 0,
          marginBottom: '12px',
          color: '#333'
        }}>
          Professional Summary Preview
        </h3>
        <p style={{ 
          fontSize: '14px', 
          lineHeight: '1.6', 
          color: '#333',
          margin: 0
        }}>
          {displaySummary}
        </p>
      </div>

      {/* Navigation Buttons */}
      {onNext && onBack && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <button
            onClick={onBack}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Helper Info */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e8f4f8',
        borderRadius: '6px',
        fontSize: '13px',
        color: 'black',
        border: '1px solid #b3d9ed'
      }}>
        <strong> Tip:</strong> Keep your summary between 2-4 lines. Focus on your role, key skills, and what you bring to the position. Avoid buzzwords and be specific.
      </div>
    </div>
  );
};

export default Summary;