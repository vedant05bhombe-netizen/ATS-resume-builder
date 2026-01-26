import React, { useState } from "react";
import "./BasicInfoSlide.css";

const ExperienceSlide = ({ data, setData, onNext, onBack }) => {
  const [currentExp, setCurrentExp] = useState({ title: "", company: "", duration: "" });

  const addExp = () => {
    if (
      currentExp.title.trim() &&
      currentExp.company.trim() &&
      currentExp.duration.trim()
    ) {
      setData(prev => ({ ...prev, experience: [...prev.experience, currentExp] }));
      setCurrentExp({ title: "", company: "", duration: "" });
    }
  };

  const removeExp = i => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== i)
    }));
  };

  const canProceed = data.experience.length > 0;

  return (
    <div className="slide-container">
      <h1 className="slide-title">Work Experience</h1>
      <p className="slide-subtitle">Add your professional experience</p>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={currentExp.title}
            onChange={e => setCurrentExp(prev => ({ ...prev, title: e.target.value }))}
          />
          <label>Job title</label>
        </div>
      </div>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={currentExp.company}
            onChange={e => setCurrentExp(prev => ({ ...prev, company: e.target.value }))}
          />
          <label>Company</label>
        </div>
      </div>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={currentExp.duration}
            onChange={e => setCurrentExp(prev => ({ ...prev, duration: e.target.value }))}
          />
          <label>Duration</label>
        </div>
      </div>

      <button className="next-btn" onClick={addExp}>+ Add Experience</button>

      <div className="tags-container">
        {data.experience.map((exp, i) => (
          <div key={i} className="tag">
            {exp.title} @ {exp.company} <span onClick={() => removeExp(i)}>×</span>
          </div>
        ))}
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

export default ExperienceSlide;
