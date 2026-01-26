import React from "react";
import "./BasicInfoSlide.css";

const SummarySlide = ({ data, setData, onNext, onBack }) => {
  const canProceed = data.summary?.trim();

  return (
    <div className="slide-container">
      <h1 className="slide-title">Professional Summary</h1>
      <p className="slide-subtitle">A short paragraph that highlights your experience</p>

      <div className="line-group">
        <div className="field">
          <textarea
            value={data.summary || ""}
            onChange={e => setData(prev => ({ ...prev, summary: e.target.value }))}
            placeholder=" "
            rows={4}
          />
          <label>Summary</label>
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

export default SummarySlide;
