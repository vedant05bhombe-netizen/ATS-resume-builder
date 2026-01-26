import React, { useState, useRef, useEffect } from "react";
import "./BasicInfoSlide.css";
import { ALL_JOBSROLES } from "./data/SkillsList";

const TargetRoleSlide = ({ data, setData, onNext, onBack }) => {
  const update = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  const canProceed = data.targetRole?.trim();

  const filteredRoles = ALL_JOBSROLES.filter(role =>
    role.toLowerCase().includes((data.targetRole || "").toLowerCase())
  ).slice(0, 8);

  const selectRole = (role) => {
    update("targetRole", role);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    setShowSuggestions(
      Boolean(data.targetRole?.trim() && filteredRoles.length)
    );
  }, [data.targetRole, filteredRoles.length]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="slide-container">
      <h1 className="slide-title">Target role</h1>
      <p className="slide-subtitle">
        This helps us tailor your resume to the right job.
      </p>

      <div className="line-group role-autocomplete">
        <div className="field">
          <input
            type="text"
            value={data.targetRole || ""}
            onChange={e => update("targetRole", e.target.value)}
            placeholder=" "
            required
          />
          <label>Target job title</label>
        </div>

        {showSuggestions && (
          <div className="role-dropdown" ref={dropdownRef}>
            {filteredRoles.map((role, index) => (
              <div
                key={role}
                className={`role-option ${
                  index === selectedIndex ? "active" : ""
                }`}
                onClick={() => selectRole(role)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {role}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={data.targetCompany || ""}
            onChange={e => update("targetCompany", e.target.value)}
            placeholder=" "
          />
          <label>Target company (optional)</label>
        </div>
      </div>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={data.location || ""}
            onChange={e => update("location", e.target.value)}
            placeholder=" "
          />
          <label>Preferred location (optional)</label>
        </div>
      </div>

      <div className="nav-actions">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            Back
          </button>
        )}
        <button className="next-btn" disabled={!canProceed} onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default TargetRoleSlide;
