import React from "react";
import "./BasicInfoSlide.css";

const HasProjectsSlide = ({ data, setData, onNext, onBack }) => {
  const selectOption = (value) => {
    setData(prev => ({
      ...prev,
      hasProjects: value
    }));

    // move AFTER state is queued
    setTimeout(onNext, 0);
  };

  return (
    <div className="slide-container">
      <h1 className="slide-title">Do you have projects?</h1>
      <p className="slide-subtitle">
        Let’s add your projects to make your resume shine.
      </p>

      <div className="options-container">
        <button
          className={`option-btn ${data.hasProjects === true ? "active" : ""}`}
          onClick={() => selectOption(true)}
        >
          Yes
        </button>

        <button
          className={`option-btn ${data.hasProjects === false ? "active" : ""}`}
          onClick={() => selectOption(false)}
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

export default HasProjectsSlide;
