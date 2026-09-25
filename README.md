# ATS Resume Builder

A modern, interactive **ATS-friendly Resume Builder and Resume Analyzer** built with React and Vite.

The application guides users through a structured resume-building process, provides professionally formatted resume templates, and includes an **AI-powered ATS analysis feature** that evaluates an uploaded resume against a target job description.

## ✨ Features

### 📝 Interactive Resume Builder

Build a resume through a step-by-step onboarding experience.

The builder collects:

* Profile type
* Personal information
* Professional summary
* Target role
* Technical skills
* Projects
* Education
* Internships
* Work experience
* Achievements

The onboarding flow dynamically changes based on whether the user is a:

* **Fresher**
* **Experienced professional**
* **Career switcher**

### 🎨 Resume Templates

The application provides professionally structured resume previews designed for readability and ATS compatibility.

Resume formatting includes:

* Professional summary
* Experience
* Projects
* Education
* Skills
* Contact information
* Achievements

The application also normalizes common technical skills and abbreviations such as:

`React → React.js`

`JS → JavaScript`

`Node → Node.js`

`B.Tech → B.Tech`

### 🤖 AI-Powered ATS Analyzer

Users can upload a resume and provide a target job description.

The ATS analyzer evaluates the resume and provides:

* ATS score
* Resume analysis
* Job-description alignment
* Missing or relevant keywords
* Improvement suggestions
* Resume feedback

The frontend communicates with a dedicated backend API for resume analysis.

### 📄 Resume Export

The project includes client-side functionality and libraries for generating/exporting resumes in common document formats.

Technologies used for document generation include:

* `jsPDF`
* `html2pdf.js`
* `html2canvas`
* `docx`
* `html-docx-js`
* `@turbodocx/html-to-docx`
* `react-to-print`

### 📱 Responsive Interface

The application adapts its onboarding and preview experience for mobile and desktop screens.

Mobile users can switch between the onboarding interface and resume preview.

### 📊 Analytics

Google Analytics 4 integration is included for tracking application page views and user navigation.

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* JavaScript
* React Router
* CSS
* Responsive Design
* Lucide React
* Motion

### Resume & Document Processing

* jsPDF
* html2pdf.js
* html2canvas
* DOCX
* HTML → DOCX conversion
* PDF.js
* Mammoth

### Backend Integration

The ATS analysis feature communicates with a backend REST API.

```text
React Frontend
      │
      ▼
Resume Upload + Job Description
      │
      ▼
ATS Analysis API
      │
      ▼
Resume Analysis
      │
      ▼
Score + Feedback + Suggestions
```

### Analytics

* Google Analytics 4

### Deployment

The project is configured for Vite-based production deployment and includes Netlify configuration.

---

## 📂 Project Structure

```text
Hollow purple/
│
├── public/
│   ├── _redirects
│   ├── sitemap.xml
│   └── ...
│
├── src/
│   │
│   ├── Analytics/
│   │   └── ga4.js
│   │
│   ├── data/
│   │   ├── SkillsList.js
│   │   └── Theme.js
│   │
│   ├── App.jsx
│   ├── Front.jsx
│   ├── Onboarding.jsx
│   │
│   ├── ProfileTypeSlide.jsx
│   ├── BasicInfoSlide.jsx
│   ├── SummarySlide.jsx
│   ├── TargetRoleSlide.jsx
│   ├── SkillsSlide.jsx
│   ├── ProjectsSlide.jsx
│   ├── EducationSlide.jsx
│   ├── InternshipSlide.jsx
│   ├── ExperienceSlide.jsx
│   ├── AchievementsSlide.jsx
│   │
│   ├── ResumePreview.jsx
│   ├── NovaPreview.jsx
│   ├── Template.jsx
│   │
│   ├── ATS.jsx
│   ├── Help.jsx
│   │
│   ├── App.css
│   ├── index.css
│   └── resume-global.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd "Hollow purple"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at the local Vite development URL.

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## 🧭 Application Routes

| Route           | Purpose                     |
| --------------- | --------------------------- |
| `/`             | Landing page                |
| `/onboarding`   | Interactive resume builder  |
| `/templateinfo` | Resume template information |
| `/help`         | Help and support            |
| `/ats`          | ATS resume analyzer         |

---

## 🔍 ATS Analyzer

The ATS analyzer accepts:

1. Resume file
2. Target job description

The frontend sends the analysis request to the backend:

```text
POST /api/resume/analyze
```

The backend processes the resume and returns the analysis used to display the ATS results.

> **Note:** ATS scores are estimates and should not be treated as an exact representation of how every company's applicant tracking system will evaluate a resume.

---

## 🧠 Resume Intelligence

The resume builder includes several client-side text-processing utilities to improve resume consistency.

Examples include:

* Skill normalization
* Abbreviation correction
* Title-case formatting
* Action-verb detection
* Bullet-point enhancement
* Profanity filtering
* Skill categorization
* Resume section formatting

Technical skills are automatically categorized into groups such as:

```text
Frontend
Backend
Databases
Tools
Other
```

---

## 📱 Responsive Design

The builder is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

On smaller screens, users can switch between:

```text
Resume Builder
      ↕
Resume Preview
```

This keeps the resume preview accessible without compromising the onboarding experience.

---

## 📈 Analytics

Google Analytics 4 is integrated into the application.

Page navigation is tracked through the application's routing system, allowing usage patterns to be monitored across different sections of the application.

---

## 🔐 Privacy & Security

The frontend does not require users to expose API keys directly in the UI.

The ATS analysis request is handled through a backend API rather than directly exposing an AI provider key inside the React application.

When deploying your own instance, ensure that:

* API keys remain server-side
* Sensitive credentials are stored as environment variables
* Uploaded resumes are handled securely
* User data is not logged unnecessarily

---

## ⚡ Performance Considerations

The application uses:

* Vite for fast development and optimized production builds
* Component-based React architecture
* Dynamic onboarding flows
* Client-side document generation
* Responsive rendering
* Lazy/conditional rendering patterns where appropriate

---

## 🧪 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

---

## 🗺️ Future Improvements

Potential improvements include:

* More resume templates
* Better ATS keyword matching
* Resume version management
* Job-specific resume customization
* Authentication and user accounts
* Cloud resume storage
* More export formats
* Advanced AI-powered resume rewriting
* Resume history and comparison
* Improved accessibility
* Automated resume quality checks

---

## 👨‍💻 Author

**Vedant Bhombe**

B.Tech Information Technology

Interested in:

* Full-Stack Development
* Java & Spring Boot
* Artificial Intelligence
* Generative AI
* Backend Engineering
* System Design

---

## ⭐ Project Goal

The goal of ATS Resume Builder is to simplify the process of creating a professional, structured, and ATS-friendly resume while helping candidates understand how well their resume aligns with a specific job description.

Built with **React + Vite**, with an integrated backend-powered ATS analysis workflow.
