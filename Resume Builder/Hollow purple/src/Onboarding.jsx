import React, { useState, useMemo } from "react";
import "./Onboarding.css";
import { useMediaQuery } from "react-responsive";

import ProfileTypeSlide from "./ProfileTypeSlide";
import BasicInfoSlide from "./BasicInfoSlide";
import TargetRoleSlide from "./TargetRoleSlide";
import SkillsSlide from "./SkillsSlide";
import HasProjectsSlide from "./HasProjectsSlide";
import ProjectsSlide from "./ProjectsSlide";
import EducationSlide from "./EducationSlide";
import HasInternshipSlide from "./HasInternshipSlide";
import InternshipSlide from "./InternshipSlide";
import AchievementsSlide from "./AchievementsSlide";
import Summary from "./Summary";
import ExperienceSlide from "./ExperienceSlide";
import ResumePreview from "./ResumePreview";
import FinaleSlide from "./FinaleSlide";


const slideComponentMap = {
  profileType: ProfileTypeSlide,
  summary: Summary,
  basicInfo: BasicInfoSlide,
  targetRole: TargetRoleSlide,

  skills: SkillsSlide,
  hasProjects: HasProjectsSlide,
  projects: ProjectsSlide,
  education: EducationSlide,
  hasInternship: HasInternshipSlide,
  internship: InternshipSlide,
  achievements: AchievementsSlide,

 
  experience: ExperienceSlide,
  finale: FinaleSlide,
};

const Onboarding = () => {
  const [data, setData] = useState({
    profileType: "",
    name: "",
    email: "",
    targetRole: "",
    skills: [],
    summary: "",
    hasProjects: null,
    hasInternship: null,
    projects: [],
    experience: [],
    education: {},
  });
 

  const [currentIndex, setCurrentIndex] = useState(0);
  const [switches , setswitches] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });


  // ----------------------------
  // Generate slides dynamically based on data
  // ----------------------------
  const slides = useMemo(() => {
    const base = [
      { id: "profileType" },
      { id: "basicInfo" },
      { id: "summary" },
      { id: "targetRole" },
    ];

    if (!data.profileType) return base;

    if (data.profileType === "fresher") {
      return [
        ...base,
        { id: "skills" },
        { id: "hasProjects" },
        ...(data.hasProjects ? [{ id: "projects" }] : []),
        { id: "education" },
        { id: "hasInternship" },
        ...(data.hasInternship ? [{ id: "internship" }] : []),
        { id: "achievements" },
        { id: "finale" },
      ];
    }

    if (data.profileType === "experienced") {
      return [
        ...base,
        { id: "summary" },
        { id: "experience" },
        { id: "skills" },
        { id: "hasProjects" },
        ...(data.hasProjects ? [{ id: "projects" }] : []),
        { id: "education" },
        { id: "achievements" },
        { id: "finale" },
      ];
    }

    if (data.profileType === "switcher") {
      return [
        ...base,
        { id: "skills" },
        { id: "projects" },
        { id: "finale" },
      ];
    }

    return base;
  }, [data.profileType, data.hasProjects, data.hasInternship]);

  const currentSlide = slides[currentIndex];
  const CurrentSlideComponent = slideComponentMap[currentSlide?.id];
  const isFinalSlide = currentSlide?.id === "finale";

  // ----------------------------
  // Navigation
  // ----------------------------
  const next = () => setCurrentIndex(i => Math.min(i + 1, slides.length - 1));
  const back = () => setCurrentIndex(i => Math.max(i - 1, 0));

  // ----------------------------
  // Reset slides when profile type changes
  // ----------------------------
  const handleProfileSelect = type => {
    setData(prev => ({
      ...prev,
      profileType: type,
      hasProjects: null,
      hasInternship: null,
      projects: [],
      experience: [],
    }));
    setCurrentIndex(1); // move to BasicInfo
  };

  // ----------------------------
  // Dummy download handlers
  // ----------------------------
  const downloadPDF = () => alert("Download PDF");
  const downloadDOCX = () => alert("Download DOCX");

  // ----------------------------
  // Render
  // ----------------------------
  return (
      <div>
    {!isFinalSlide ? (
      <div className="main-wrapper">
        {
          isMobile && ( <div className="Dimx">
          <button  onClick={() => setswitches(!switches)
          } className="preview"> {switches? "Back to onboarding" : "See Preview"} 
                     <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M5 12H19M19 12L13 6M19 12L13 18"
    stroke="#7C3AED"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
          </button>


          </div>)
        }
       {
        (!isMobile || !switches ) && (
        <div className="onboarding-wrapper">
          {CurrentSlideComponent && (
            <CurrentSlideComponent
              data={data}
              setData={setData}
              onNext={next}
              onBack={back}
              onSelectProfile={handleProfileSelect}
            />
          )}
        </div>
        )
       }
        
        {
          (!isMobile || switches )  && (<div className="live-preview-wrapper">
          <ResumePreview data={data}  />
        </div>)
        }
        
      </div>
    ) : (
      <FinaleSlide data={data} /> 
    )}
  </div>

  );
};

export default Onboarding;
