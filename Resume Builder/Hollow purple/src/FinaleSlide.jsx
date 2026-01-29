import React, { useState } from "react";
import * as docx from "docx";
import { saveAs } from "file-saver";
import { useMediaQuery } from "react-responsive";

import ResumePreview from "./ResumePreview";
import Atlas from "./Atlas";
import Nova from "./NovaPreview";
import Core from "./Core";
import Launch from "./Launch";
import Origin from "./Origin";
import Stack from "./Stack";
import Byte from "./Byte";
import Apex from "./Apex";
import Pulse from "./Pulse";

import { trackEvent } from "./Analytics/ga4";
import { THEMES } from "./data/Theme";

import "./FinalSlide.css";
import "./resume-global.css";

const TEMPLATE_IDS = [
  "default",
  "Atlas",
  "Nova",
  "Core",
  "Launch",
  "Origin",
  "Stack",
  "Byte",
  "Apex",
  "Pulse",
];

const TEMPLATE_COMPONENTS = {
  default: ResumePreview,
  Atlas,
  Nova,
  Core,
  Launch,
  Origin,
  Stack,
  Byte,
  Apex,
  Pulse,
};

const TEMPLATE_DEFAULT_THEME = {
  default: "black",
  Atlas: "black",
  Nova: "black",
  Core: "black",
  Launch: "black",
  Origin: "black",
  Stack: "black",
  Byte: "black",
  Apex: "black",
  Pulse: "black",
};

const FinaleSlide = ({ data, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("default");
  const [selectedTheme, setSelectedTheme] = useState("black");
  const [switches, setSwitches] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const safeTheme = THEMES[selectedTheme] ? selectedTheme : "black";

  const SelectedTemplateComponent =
    TEMPLATE_COMPONENTS[selectedTemplate];

  const handleTemplateChange = (id) => {
    setSelectedTemplate(id);
    setSelectedTheme(TEMPLATE_DEFAULT_THEME[id] || "black");
  };

 const downloadPDF = () => {
  trackEvent("Export", "click", "resume_pdf_export");

  // Mobile browsers REQUIRE the content to be visible
  if (isMobile && !switches) {
    setSwitches(true);

    // Wait one frame for DOM + layout
    setTimeout(() => {
      window.print();
    }, 350);
  } else {
    window.print();
  }
};


  const downloadDoc = async () => {
    if (!data) return;

    const sections = [];
    trackEvent("Export", "click", "resume_doc_export");

    if (data.name) {
      sections.push(
        new docx.Paragraph({
          text: data.name,
          heading: docx.HeadingLevel.HEADING_1,
          alignment: docx.AlignmentType.CENTER,
          spacing: { after: 200 },
        })
      );
    }

    if (
      data.email ||
      data.phone ||
      data.location ||
      data.linkedin ||
      data.website
    ) {
      const contactInfo = [];
      if (data.email) contactInfo.push(data.email);
      if (data.phone) contactInfo.push(data.phone);
      if (data.location) contactInfo.push(data.location);

      sections.push(
        new docx.Paragraph({
          text: contactInfo.join(" | "),
          alignment: docx.AlignmentType.CENTER,
          spacing: { after: 100 },
        })
      );

      const links = [];
      if (data.linkedin) links.push(data.linkedin);
      if (data.website) links.push(data.website);

      if (links.length) {
        sections.push(
          new docx.Paragraph({
            text: links.join(" | "),
            alignment: docx.AlignmentType.CENTER,
            spacing: { after: 300 },
          })
        );
      }
    }

    if (data.summary) {
      sections.push(
        new docx.Paragraph({
          text: "SUMMARY",
          heading: docx.HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: "000000",
              style: docx.BorderStyle.SINGLE,
              size: 6,
            },
          },
        }),
        new docx.Paragraph({
          text: data.summary,
          spacing: { after: 300 },
        })
      );
    }

    const doc = new docx.Document({
      sections: [{ children: sections }],
    });

    const blob = await docx.Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  return (
    <div className="finale-container">
      {/* LEFT / CONTROLS PANEL */}
      <div
        className="first"
        style={{
          display: !isMobile || !switches ? "block" : "none",
        }}
      >
      {onBack && (
  <div className="bix">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>

    <button className="back-btnx" onClick={onBack}>
      Back
    </button>
  </div>
)}


        <h2 className="finale-title">Your Resume is Ready</h2>

        {isMobile && (
          <button
            className="preview"
            onClick={() => setSwitches(true)}
          >
            See Resume
          </button>
        )}

        <div className="templates-panel">
          <h3>Choose a Template</h3>
          <div className="template-grid">
            {TEMPLATE_IDS.map((id) => (
              <div
                key={id}
                className={`template-box ${
                  selectedTemplate === id ? "selected" : ""
                }`}
                onClick={() => handleTemplateChange(id)}
              >
                {id}
              </div>
            ))}
          </div>
        </div>

        <div className="themes-panel">
          <h3>Select Theme</h3>
          <div className="theme-grid">
            {Object.keys(THEMES).map((key) => (
              <button
                key={key}
                className={safeTheme === key ? "active" : ""}
                onClick={() => setSelectedTheme(key)}
                style={{ "--theme-color": THEMES[key].accent }}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        <section className="download-section">
          <p>Click "Save as PDF" in print dialog</p>
          <div className="xene">
            <button className="bu" onClick={downloadPDF}>
              Download PDF
            </button>
            <button className="bu" onClick={downloadDoc}>
              Download Word
            </button>
          </div>
        </section>
      </div>

      {/* PREVIEW PANEL (ALWAYS MOUNTED) */}
      <section
        className="template-selection-section"
        style={{
          display: !isMobile || switches ? "block" : "none",
        }}
      >
        {isMobile && (
          <button
            className="preview"
            onClick={() => setSwitches(false)}
          >
            Go back
          </button>
        )}

        <div className="preview-panel">
          <div className="roman">
            <h3>Preview: {selectedTemplate}</h3>
            <button className="export" onClick={downloadPDF}>
              Export
            </button>
          </div>

          <div
            id="resume-documentX"
            className="resume-root"
            style={{ "--accent": THEMES[safeTheme].accent }}
          >
            {SelectedTemplateComponent && (
              <SelectedTemplateComponent data={data} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FinaleSlide;
