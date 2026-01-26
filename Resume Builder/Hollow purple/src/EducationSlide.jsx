import React from "react";
import "./BasicInfoSlide.css";

const EducationSlide = ({ data, setData, onNext, onBack }) => {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      education: { ...prev.education, [field]: value }
    }));
  };

  const { degree = "", college = "", year = "" } = data.education;

  const canProceed = degree.trim() && college.trim() && year.trim();

  return (
    <div className="slide-container">
      <h1 className="slide-title">Education</h1>
      <p className="slide-subtitle">Add your highest or relevant education.</p>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={degree}
            onChange={e => update("degree", e.target.value)}
            placeholder=" "
          />
          <label>Degree</label>
        </div>
      </div>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={college}
            onChange={e => update("college", e.target.value)}
            placeholder=" "
          />
          <label>College / University</label>
        </div>
      </div>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={year}
            onChange={e => update("year", e.target.value)}
            placeholder=" "
          />
          <label>Graduation Year</label>
        </div>
      </div>

      <div className="nav-actions">
        {onBack && <button className="back-btn" onClick={onBack}>Back</button>}
        <button className="next-btn" disabled={!canProceed} onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default EducationSlide;
