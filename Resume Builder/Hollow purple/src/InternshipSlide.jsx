import React, { useState } from "react";
import "./BasicInfoSlide.css";

// ============================================================================
// BIG TECH COMPANIES LIST
// ============================================================================
const bigTechCompanies = [
  'google', 'microsoft', 'apple', 'amazon', 'meta', 'facebook',
  'netflix', 'tesla', 'nvidia', 'intel', 'oracle', 'salesforce',
  'adobe', 'ibm', 'cisco', 'qualcomm', 'paypal', 'uber', 'airbnb',
  'spotify', 'twitter', 'linkedin', 'snap', 'dropbox', 'zoom',
  'shopify', 'stripe', 'atlassian', 'servicenow', 'workday',
  'red hat', 'vmware', 'dell', 'hp', 'samsung', 'sony',
  'tcs', 'infosys', 'wipro', 'hcl', 'tech mahindra', 'cognizant',
  'accenture', 'capgemini', 'deloitte', 'pwc', 'ey', 'kpmg'
];

const isBigTechCompany = (company) => {
  if (!company) return false;
  const lower = company.toLowerCase().trim();
  return bigTechCompanies.some(tech => lower.includes(tech));
};

const validateDuration = (duration) => {
  if (!duration) return { valid: true, warning: null };
  
  const warnings = [];
  
  // Check for very short durations
  const shortPeriodPatterns = [
    /\b(1\s*week|2\s*week|3\s*week)\b/i,
    /\b(1\s*day|2\s*day|3\s*day)\b/i
  ];
  
  if (shortPeriodPatterns.some(pattern => pattern.test(duration))) {
    warnings.push("Very short duration detected. Consider if this adds value to your resume.");
  }
  
  // Check for "present" in internship
  if (/present/i.test(duration)) {
    warnings.push("Internships are typically for fixed periods. Consider using an end date.");
  }
  
  return {
    valid: true,
    warning: warnings.length > 0 ? warnings[0] : null
  };
};

// ============================================================================
// EXPERIENCE TYPE
// ============================================================================
const experienceTypes = [
  { value: 'internship', label: 'Internship', requiresCompany: true },
  { value: 'full-time', label: 'Full-time', requiresCompany: true },
  { value: 'freelance', label: 'Freelance', requiresCompany: false },
  { value: 'personal', label: 'Personal Project', requiresCompany: false },
  { value: 'academic', label: 'Academic Project', requiresCompany: false }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const InternshipSlide = ({ data, setData, onNext, onBack }) => {
  const [currentInternship, setCurrentInternship] = useState({
    title: "",
    company: "",
    duration: "",
    type: "internship"
  });

  const [warnings, setWarnings] = useState({
    company: null,
    duration: null
  });

  const [showWarningModal, setShowWarningModal] = useState(false);
  const [pendingInternship, setPendingInternship] = useState(null);

  // Get current experience type info
  const currentTypeInfo = experienceTypes.find(t => t.value === currentInternship.type);
  const requiresCompany = currentTypeInfo?.requiresCompany ?? true;

  // Handle experience type change
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setCurrentInternship(prev => ({ 
      ...prev, 
      type: newType,
      company: experienceTypes.find(t => t.value === newType)?.requiresCompany ? prev.company : ""
    }));
    // Clear company warning when switching to non-company type
    if (!experienceTypes.find(t => t.value === newType)?.requiresCompany) {
      setWarnings(prev => ({ ...prev, company: null }));
    }
  };

  // Handle company input change with validation
  const handleCompanyChange = (e) => {
    const company = e.target.value;
    setCurrentInternship(prev => ({ ...prev, company }));

    // Check for big tech companies
    if (isBigTechCompany(company)) {
      setWarnings(prev => ({
        ...prev,
        company: `⚠️ "${company}" is a well-known company. Recruiters verify these claims. Continue only if accurate.`
      }));
    } else {
      setWarnings(prev => ({ ...prev, company: null }));
    }
  };

  // Handle duration input change with validation
  const handleDurationChange = (e) => {
    const duration = e.target.value;
    setCurrentInternship(prev => ({ ...prev, duration }));

    const validation = validateDuration(duration);
    setWarnings(prev => ({
      ...prev,
      duration: validation.warning
    }));
  };

  // Add internship with validation
  const addInternship = () => {
    const titleValid = currentInternship.title.trim();
    const companyValid = requiresCompany ? currentInternship.company.trim() : true;
    const durationValid = currentInternship.duration.trim();

    if (titleValid && companyValid && durationValid) {
      // If there's a company warning, show confirmation modal
      if (warnings.company && requiresCompany) {
        setPendingInternship(currentInternship);
        setShowWarningModal(true);
      } else {
        // Add directly if no warnings
        confirmAddInternship(currentInternship);
      }
    }
  };

  // Confirm and add internship
  const confirmAddInternship = (internship) => {
    setData(prev => ({
      ...prev,
      experience: [...prev.experience, internship]
    }));
    setCurrentInternship({ title: "", company: "", duration: "", type: "internship" });
    setWarnings({ company: null, duration: null });
    setShowWarningModal(false);
    setPendingInternship(null);
  };

  // Cancel adding internship
  const cancelAddInternship = () => {
    setShowWarningModal(false);
    setPendingInternship(null);
  };

  const removeInternship = index => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const canProceed = data.experience.length > 0;

  // Get placeholder text based on experience type
  const getTitlePlaceholder = () => {
    switch (currentInternship.type) {
      case 'personal':
        return 'Project Title (e.g., E-commerce Website, Mobile App)';
      case 'academic':
        return 'Project Title (e.g., Machine Learning Model, Web Application)';
      case 'freelance':
        return 'Project/Role Title';
      default:
        return 'Job Title / Role';
    }
  };

  const getDurationPlaceholder = () => {
    switch (currentInternship.type) {
      case 'personal':
      case 'academic':
        return 'Duration (e.g., Sep 2023 - Dec 2023 or Fall 2023)';
      default:
        return 'Duration (e.g., Jan 2023 - Mar 2023)';
    }
  };

  return (
    <div className="slide-container">
      <h1 className="slide-title">Professional Experience</h1>
      <p className="slide-subtitle">Add your work experience, internships, and projects</p>

      {/* Experience Type Selector */}
      <div className="line-group">
        <div className="field">
          <select
            value={currentInternship.type}
            onChange={handleTypeChange}
            style={selectStyles}
          >
            {experienceTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <label style={selectLabelStyles}>Experience Type</label>
        </div>
      </div>

      {/* Info box for project types */}
      {!requiresCompany && (
        <div style={infoBoxStyles}>
           <strong>Tip:</strong> For personal and academic projects, focus on what you built and the technologies used. Company field is optional.
        </div>
      )}

      {/* Job Title / Project Title */}
      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={currentInternship.title}
            onChange={e => setCurrentInternship(prev => ({ ...prev, title: e.target.value }))}
          />
          <label>{requiresCompany ? 'Job Title / Role' : 'Project Title'}</label>
        </div>
      </div>

      {/* Company Name with Warning (conditional) */}
      {requiresCompany ? (
        <div className="line-group">
          <div className="field">
            <input
              type="text"
              placeholder=" "
              value={currentInternship.company}
              onChange={handleCompanyChange}
              style={warnings.company ? { borderColor: '#f59e0b', borderWidth: '2px' } : {}}
            />
            <label>Company</label>
          </div>
          {warnings.company && (
            <div style={warningStyles}>
              {warnings.company}
            </div>
          )}
        </div>
      ) : (
        <div className="line-group">
          <div className="field">
            <input
              type="text"
              placeholder=" "
              value={currentInternship.company}
              onChange={e => setCurrentInternship(prev => ({ ...prev, company: e.target.value }))}
            />
            <label>Organization/Institution (Optional)</label>
          </div>
        </div>
      )}

      {/* Duration */}
      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={currentInternship.duration}
            onChange={handleDurationChange}
            style={warnings.duration ? { borderColor: '#f59e0b', borderWidth: '2px' } : {}}
          />
          <label>Duration (e.g., Jan 2023 - Mar 2023)</label>
        </div>
        {warnings.duration && (
          <div style={warningStyles}>
            ⚠️ {warnings.duration}
          </div>
        )}
      </div>

      {/* Hint */}
      <div style={hintStyles}>
        <strong>Pro tip:</strong> {
          requiresCompany 
            ? 'Use format like "Jan 2023 - Mar 2023" or "Summer 2023"'
            : 'Include the timeframe you worked on this project'
        }
      </div>

      <button className="next-btn" onClick={addInternship}>
        + Add Experience
      </button>

      {/* Tags Container */}
      <div className="tags-container">
        {data.experience.map((exp, i) => (
          <div key={i} className="tag" style={tagStyles}>
            <span style={tagTypeStyles}>
              {experienceTypes.find(t => t.value === exp.type)?.label || 'Internship'}
            </span>
            {exp.title}
            {exp.company && ` @ ${exp.company}`}
            <span onClick={() => removeInternship(i)} style={removeIconStyles}>×</span>
          </div>
        ))}
      </div>

      {/* Warning Modal */}
      {showWarningModal && (
        <div style={modalOverlayStyles} onClick={cancelAddInternship}>
          <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitleStyles}>⚠️ Verification Alert</h2>
            <p style={modalTextStyles}>
              You're adding experience at <strong>{pendingInternship?.company}</strong>, 
              which is a well-known company that recruiters actively verify.
            </p>
            <p style={modalTextStyles}>
              Only proceed if this information is accurate and verifiable. False claims can:
            </p>
            <ul style={modalListStyles}>
              <li>Damage your professional reputation</li>
              <li>Result in immediate rejection</li>
              <li>Get you blacklisted from opportunities</li>
            </ul>
            <div style={modalActionsStyles}>
              <button 
                style={cancelButtonStyles} 
                onClick={cancelAddInternship}
              >
                Cancel
              </button>
              <button 
                style={confirmButtonStyles} 
                onClick={() => confirmAddInternship(pendingInternship)}
              >
                Yes, This is Accurate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="nav-actions">
        {onBack && <button className="back-btn" onClick={onBack}>Back</button>}
        <button className="next-btn" disabled={!canProceed} onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const selectStyles = {
  width: '100%',
  padding: '12px 15px',
  fontSize: '16px',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  backgroundColor: 'white',
  cursor: 'pointer',
  outline: 'none'
};

const selectLabelStyles = {
  position: 'absolute',
  top: '-10px',
  left: '12px',
  backgroundColor: 'white',
  padding: '0 8px',
  fontSize: '12px',
  fontWeight: '600',
  color: '#6b7280'
};

const infoBoxStyles = {
  marginBottom: '20px',
  padding: '12px 16px',
  backgroundColor: '#f0fdf4',
  border: '1px solid #86efac',
  borderRadius: '8px',
  fontSize: '13px',
  color: '#166534',
  lineHeight: '1.5'
};

const warningStyles = {
  marginTop: '8px',
  padding: '12px 16px',
  backgroundColor: '#fffbeb',
  border: '1px solid #f59e0b',
  borderRadius: '8px',
  fontSize: '13px',
  color: '#92400e',
  lineHeight: '1.5'
};

const hintStyles = {
  marginBottom: '20px',
  padding: '12px 16px',
  backgroundColor: '#eff6ff',
  border: '1px solid #3b82f6',
  borderRadius: '8px',
  fontSize: '13px',
  color: '#1e40af',
  lineHeight: '1.5'
};

const tagStyles = {
  position: 'relative',
  paddingLeft: '8px'
};

const tagTypeStyles = {
  display: 'inline-block',
  padding: '2px 8px',
  marginRight: '8px',
  backgroundColor: '#3b82f6',
  color: 'white',
  borderRadius: '4px',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase'
};

const removeIconStyles = {
  marginLeft: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '18px'
};

const modalOverlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '12px',
  maxWidth: '500px',
  width: '90%',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
};

const modalTitleStyles = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#dc2626',
  marginBottom: '16px'
};

const modalTextStyles = {
  fontSize: '15px',
  color: '#374151',
  marginBottom: '12px',
  lineHeight: '1.6'
};

const modalListStyles = {
  marginLeft: '20px',
  marginBottom: '24px',
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.8'
};

const modalActionsStyles = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'flex-end'
};

const cancelButtonStyles = {
  padding: '10px 20px',
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
  backgroundColor: '#f3f4f6',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const confirmButtonStyles = {
  padding: '10px 20px',
  fontSize: '14px',
  fontWeight: '600',
  color: 'white',
  backgroundColor: '#dc2626',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

export default InternshipSlide;