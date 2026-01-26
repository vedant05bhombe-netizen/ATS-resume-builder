import React from "react";
import "./resume-global.css";

const Section = ({ title }) => {
  return (
    <h2 className="resume-section">
      {title}
    </h2>
  );
};

export default Section;
