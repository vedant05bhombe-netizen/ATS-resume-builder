import React, { useState } from "react";
import "./ProjectsSlide.css";

const ProjectsSlide = ({ data, setData, onNext, onBack }) => {
  const [current, setCurrent] = useState({ title: "", desc: "" });

  const addProject = () => {
    if (!current.title.trim() || !current.desc.trim()) return;

    setData(prev => ({
      ...prev,
      projects: [...prev.projects, current],
    }));

    setCurrent({ title: "", desc: "" });
  };

  return (
    <div className="slide-container">
      <h1 className="slide-title">Projects</h1>
      <p className="slide-subtitle">
        Add the projects you’ve worked on. You can add more than one.
      </p>

      {/* Input */}
      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={current.title}
            onChange={e => setCurrent({ ...current, title: e.target.value })}
          />
          <label>Project title</label>
        </div>
      </div>

      <div className="line-group">
        <div className="field">
          <input
            type="text"
            placeholder=" "
            value={current.desc}
            onChange={e => setCurrent({ ...current, desc: e.target.value })}
          />
          <label>Short description</label>
        </div>
      </div>

      <button className="add-project-btn" onClick={addProject}>
        + Add project
      </button>

      {/* Added projects */}
      {data.projects.length > 0 && (
        <div className="project-list">
          {data.projects.map((p, i) => (
            <div key={i} className="project-row">
              <div>
                <strong>{p.title}</strong>
                <p>{p.desc}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() =>
                  setData(prev => ({
                    ...prev,
                    projects: prev.projects.filter((_, idx) => idx !== i),
                  }))
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="nav-actions">
        {onBack && <button className="back-btn" onClick={onBack}>Back</button>}
        <button
          className="next-btn"
          disabled={data.projects.length === 0}
          onClick={onNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ProjectsSlide;
