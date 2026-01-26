import { useState, useRef, useEffect } from "react";
import { ALL_SKILLS } from "./data/SkillsList";
import "./SkillsSlide.css";

const SkillsSlide = ({ data = { skills: [] }, setData, onNext, onBack }) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);



  const valid = input.trim() === "";

  const inputRef = useRef(null);
  const suggestionRef = useRef(null);


  const filteredSkills = ALL_SKILLS
    .filter(
      skill =>
        skill.toLowerCase().includes(input.toLowerCase()) &&
        !data.skills.includes(skill)
    )
    .slice(0, 8);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addSkill = (skill) => {
    if (!skill.trim()) return;

    const skillToAdd = skill.trim();



    if (
      data.skills.some(
        s => s.toLowerCase() === skillToAdd.toLowerCase()
      )
    ) return;

    setData(prev => ({
      ...prev,
      skills: [...prev.skills, skillToAdd],
    }));

    setInput("");
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const removeSkill = (index) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredSkills[selectedIndex]) {
        addSkill(filteredSkills[selectedIndex]);
      } else {
        addSkill(input);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i =>
        i < filteredSkills.length - 1 ? i + 1 : i
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => (i > 0 ? i - 1 : -1));
    }

    if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="slide-container">
      <h1 className="slide-title">Skills</h1>
      <p className="slide-subtitle">Type to add skills</p>

      {/* FLOATING LABEL INPUT */}
      <div className="autocomplete" ref={inputRef}>
        <div className="field">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(true);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => input && setShowSuggestions(true)}
            placeholder=" "
            autoComplete="off"
          />
          <label>Add Skill</label>
        </div>
        <div onClick={() =>  addSkill(input)
        }><button className="add">Add Skill</button></div>

        {showSuggestions && filteredSkills.length > 0 && (
          <div className="suggestion-box" ref={suggestionRef}>
            {filteredSkills.map((skill, index) => (
              <div
                key={skill}
                className={`suggestion-item ${
                  index === selectedIndex ? "selected" : ""
                }`}
                onClick={() => addSkill(skill)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TAGS */}
      <div className="tags-container">
        {data.skills.map((skill, i) => (
          <span key={i} className="tag">
            {skill}
            <span onClick={() => removeSkill(i)}>×</span>
          </span>
        ))}
      </div>

      {/* NAV */}
      <div className="nav-actions">
        {onBack && <button className="back-btn" onClick={onBack}>Back</button>}
        <button disabled={valid}  className="next-btn" onClick={onNext}>Continue</button>
      </div>
    </div>
  );
};

export default SkillsSlide;
