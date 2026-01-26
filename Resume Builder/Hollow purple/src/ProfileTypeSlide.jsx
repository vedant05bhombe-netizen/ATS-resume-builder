import React from "react";
import "./ProfileTypeSlide.css";

const ProfileTypeSlide = ({ data, onSelectProfile }) => {
  return (
    <div className="slide-container">
      <h1 className="slide-title">Tell us about your career stage</h1>
      <p className="slide-subtitle">
        This helps us structure your resume correctly.
      </p>

      <div className="profile-options">
        <button
          className={`profile-card ${data.profileType === "fresher" ? "active" : ""}`}
          onClick={() => onSelectProfile("fresher")}
        >
          <h3>Fresher</h3>
          <p>Students or recent graduates</p>
        </button>

        <button
          className={`profile-card ${data.profileType === "experienced" ? "active" : ""}`}
          onClick={() => onSelectProfile("experienced")}
        >
          <h3>Experienced</h3>
          <p>Professionals with work experience</p>
        </button>

        <button
          className={`profile-card ${data.profileType === "switcher" ? "active" : ""}`}
          onClick={() => onSelectProfile("switcher")}
        >
          <h3>Career Switcher</h3>
          <p>Changing roles or domains</p>
        </button>
      </div>
    </div>
  );
};

export default ProfileTypeSlide;
