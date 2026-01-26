import React from "react";
import "./BasicInfoSlide.css";

const HasInternshipSlide = ({ data, setData, onNext, onBack }) => {

  const handleSelect = (value) => {
    setData(prev => ({ ...prev, hasInternship: value }));
    onNext(); // ✅ SAFE: only after click
  };

  return (
    <div className="slide-container">
      <h1 className="slide-title">Do you have any prior work or project experience?</h1>
      <p className="slide-subtitle">
        Experience helps strengthen your resume.
      </p>

      <div className="options-container">
        <button
          className="option-btn"
          onClick={() => handleSelect(true)}
        >
          Yes
        </button>

        <button
          className="option-btn"
          onClick={() => handleSelect(false)}
        >
          No
        </button>
      </div>

      {onBack && (
        <button className="back-btn" onClick={onBack}>
          Back
        </button>
      )}
    </div>
  );
};

export default HasInternshipSlide;
