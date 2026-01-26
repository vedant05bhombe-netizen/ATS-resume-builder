import React, { useState } from "react";
import "./BasicInfoSlide.css";

const AchievementsSlide = ({ data, setData, onNext, onBack }) => {
  const [text, setText] = useState("");

  const addAchievement = () => {
    if (!text.trim()) return;

    setData(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), text]
    }));

    setText("");
  };

  const removeAchievement = (index) => {
    setData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="slide-container">
      <h1 className="slide-title">Achievements</h1>
      <p className="slide-subtitle">
        Certifications, awards, or notable accomplishments (optional)
      </p>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <label>Achievement</label>
        </div>
      </div>

      <button className="next-btn" onClick={addAchievement}>
        + Add
      </button>

      <div className="tags-container">
        {(data.achievements || []).map((item, i) => (
          <div key={i} className="tag">
            {item}
            <span onClick={() => removeAchievement(i)}>×</span>
          </div>
        ))}
      </div>

      <div className="nav-actions">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            Back
          </button>
        )}

        {/* Optional slide → always allow continue */}
        <button className="next-btn" onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default AchievementsSlide;
