import React from "react";
import "./BasicInfoSlide.css";

const BasicInfoSlide = ({ data, setData, onNext, onBack }) => {
  const update = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value ?? ""
    }));
  };

  const canProceed =
    (data.name || "").trim() &&
    (data.email || "").trim() &&
    (data.phoneNumber || "").trim() &&
     (data.phoneNumber.length === 10) &&
    (data.address || "").trim();

  return (
    <div className="slide-container">
      <h1 className="slide-title">Basic Information</h1>
      <p className="slide-subtitle">
        This information appears at the top of your resume.
      </p>

      {/* FULL NAME */}
      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={data.name || ""}
            onChange={e => update("name", e.target.value)}
            required
            placeholder=" "
          />
          <label>Full Name</label>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={data.address || ""}
            onChange={e => update("address", e.target.value)}
            required
            placeholder=" "
          />
          <label>Address</label>
        </div>
      </div>

      {/* EMAIL */}
      <div className="line-group">
        <div className="field">
          <input
            type="email"
            value={data.email || ""}
            onChange={e => update("email", e.target.value)}
            required
            placeholder=" "
          />
          <label>Email Address</label>
        </div>
      </div>

      {/* PHONE */}
      <div className="line-group">
        <div className="field">
          <input
            type="tel"
            minLength={10}
            value={data.phoneNumber || ""}
            onChange={e =>
  update("phoneNumber", e.target.value.replace(/\D/g, "").slice(0, 10))
}

            required
            placeholder=" "
          />
          <label>Phone Number</label>
        </div>
      </div>

      {/* LINKEDIN */}
      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={data.linkedin || ""}
            onChange={e => update("linkedin", e.target.value)}
            placeholder=" "
          />
          <label>LinkedIn (optional)</label>
        </div>
      </div>

      {/* GITHUB */}
      <div className="line-group">
        <div className="field">
          <input
            type="text"
            value={data.github || ""}
            onChange={e => update("github", e.target.value)}
            placeholder=" "
          />
          <label>GitHub (optional)</label>
        </div>
      </div>

      {/* NAV */}
      <div className="nav-actions">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            Back
          </button>
        )}
        <button
          className="next-btn"
          disabled={!canProceed}
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BasicInfoSlide;
