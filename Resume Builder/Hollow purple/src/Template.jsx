import React, { useState } from 'react';
import './Template.css';

const templates = [
  {
    name: 'Default',
    badge: 'Universal',
    description: 'A clean, balanced resume designed for all roles. Ideal if you want a safe, ATS-friendly layout that works everywhere without customization.',
    industries: 'All sectors including manufacturing, retail, hospitality, logistics, education, non-profit, public sector, and general business administration.',
    positions: 'Operations Manager, Project Coordinator, Business Analyst, HR Specialist, Account Manager, Administrative roles, mid-level positions across all functions.'
  },
  {
    name: 'Atlas',
    badge: 'Professional',
    description: 'A modern professional template built for strong first impressions. Best for software engineers, analysts, and candidates applying to structured companies.',
    industries: 'Technology, software development, data science, financial services, consulting firms, telecommunications, SaaS companies, enterprise software, cloud computing.',
    positions: 'Software Engineer, Data Analyst, Business Intelligence Analyst, Systems Engineer, Technical Consultant, Solutions Architect, Product Analyst, Database Administrator.'
  },
  {
    name: 'Nova',
    badge: 'Minimal',
    description: 'A minimal, sharp layout with emphasis on clarity and hierarchy. Perfect for freshers and early-career professionals who want a polished look without clutter.',
    industries: 'Entry-level positions across tech, marketing, sales, customer service, retail management, hospitality, media, e-commerce, and digital agencies.',
    positions: 'Associate Software Engineer, Junior Analyst, Marketing Coordinator, Sales Representative, Customer Success Associate, Content Writer, Social Media Coordinator, Trainee positions.'
  },
  {
    name: 'Core',
    badge: 'ATS-Optimized',
    description: 'A straightforward, content-focused resume for serious hiring pipelines. Designed for maximum ATS compatibility and fast recruiter scanning.',
    industries: 'Fortune 500 companies, corporate banking, insurance, pharmaceuticals, aerospace, defense contractors, government agencies, healthcare systems, large-scale manufacturing.',
    positions: 'Compliance Officer, Risk Analyst, Quality Assurance Manager, Regulatory Affairs Specialist, Supply Chain Manager, Financial Analyst, Operations Director, Program Manager.'
  },
  {
    name: 'Origin',
    badge: 'Academic',
    description: 'A simple academic-friendly template highlighting education and projects. Ideal for students, interns, and first-time job seekers.',
    industries: 'Academic research, universities, educational institutions, research labs, think tanks, scientific organizations, NGOs, internship programs, graduate programs.',
    positions: 'Research Assistant, Lab Technician, Teaching Assistant, Graduate Researcher, Intern, Summer Analyst, Co-op Student, Academic Program Coordinator, Postdoctoral Fellow.'
  },
  {
    name: 'Stack',
    badge: 'Technical',
    description: 'A skills-first resume optimized for technical roles. Great for developers and engineers who want their tech stack to stand out instantly.',
    industries: 'Software development, web development, mobile app development, DevOps, cybersecurity, game development, blockchain, AI/ML companies, tech startups, platform engineering.',
    positions: 'Full Stack Developer, Backend Engineer, Frontend Developer, DevOps Engineer, Cloud Engineer, Security Engineer, Mobile Developer, Platform Engineer, Site Reliability Engineer.'
  },
  {
    name: 'Byte',
    badge: 'Compact',
    description: 'A compact, efficient layout built for fast-moving tech roles. Best for candidates with multiple projects or short-term experiences.',
    industries: 'Freelance consulting, contract work, agency environments, digital marketing, web design, app development, startup ecosystems, gig economy platforms.',
    positions: 'Freelance Developer, Contract Engineer, Independent Consultant, Digital Marketing Specialist, UX/UI Designer, Technical Writer, QA Tester, Automation Engineer.'
  },
  {
    name: 'Apex',
    badge: 'Executive',
    description: 'An executive-level resume designed for leadership and senior roles. Focuses on impact, experience, and strategic achievements.',
    industries: 'Executive leadership across all sectors, corporate C-suite, investment banking, private equity, venture capital, strategy consulting, multinational corporations.',
    positions: 'Chief Technology Officer, VP of Engineering, Director of Operations, Chief Financial Officer, Managing Director, Senior Vice President, General Manager, Head of Product.'
  },
  {
    name: 'Pulse',
    badge: 'Modern',
    description: 'A modern, flexible template that balances personality with professionalism. Ideal for startups, creative tech roles, and dynamic teams.',
    industries: 'Tech startups, fintech, e-commerce platforms, SaaS startups, product-led companies, growth-stage ventures, innovation labs, digital transformation teams.',
    positions: 'Product Manager, Growth Manager, Product Marketing Manager, Startup Founder, Innovation Lead, Agile Coach, Scrum Master, Customer Success Manager, Growth Hacker.'
  }
];

const themes = [
  {
    name: 'Black',
    colorClass: 'hollow-theme-black',
    description: 'The safest and most universally accepted theme. Recommended for corporate, government, and high-volume ATS systems.',
    industries: 'Government agencies, law firms, accounting firms, banking, insurance, healthcare administration, pharmaceuticals, defense contractors, public sector.',
    companies: 'Fortune 500 corporations, federal agencies, Big Four accounting firms, traditional law practices, regulatory bodies, established financial institutions.'
  },
  {
    name: 'Blue',
    colorClass: 'hollow-theme-blue',
    description: 'A professional and trustworthy accent used widely in corporate hiring. Works well for engineering, finance, and consulting roles.',
    industries: 'Engineering firms, financial services, management consulting, technology companies, telecommunications, aerospace, automotive, corporate banking, enterprise software.',
    companies: 'IBM, McKinsey, Goldman Sachs, Boeing, AT&T, Ford, General Electric, JPMorgan Chase, Deloitte, Cisco Systems.'
  },
  {
    name: 'Navy',
    colorClass: 'hollow-theme-navy',
    description: 'A refined alternative to black with a more premium feel. Suitable for senior roles and traditional organizations.',
    industries: 'Investment banking, private equity, venture capital, executive leadership, strategy consulting, wealth management, corporate law, luxury brands.',
    companies: 'Morgan Stanley, Bain & Company, BlackRock, Harvard Business School, prestigious MBA programs, elite consulting firms, C-suite executive searches.'
  },
  {
    name: 'Slate',
    colorClass: 'hollow-theme-slate',
    description: 'A modern neutral tone that feels clean and contemporary. Ideal for tech companies and modern workplaces.',
    industries: 'Software companies, digital agencies, tech startups, SaaS platforms, cloud computing, e-commerce, fintech, product design, UX/UI firms.',
    companies: 'Stripe, Shopify, Atlassian, Slack, Zoom, modern tech companies, Y Combinator startups, product-led growth companies, remote-first organizations.'
  },
  {
    name: 'Burgundy',
    colorClass: 'hollow-theme-burgundy',
    description: 'A subtle executive accent that adds authority without distraction. Best used for leadership and experienced professionals.',
    industries: 'Higher education, academic research, university administration, publishing, museums, foundations, non-profit leadership, think tanks, policy organizations.',
    companies: 'Stanford University, MIT, Ivy League institutions, Brookings Institution, Ford Foundation, major research universities, academic presses.'
  },
  {
    name: 'Forest',
    colorClass: 'hollow-theme-forest',
    description: 'A calm, grounded tone that signals stability and maturity. Works well for long-term roles and research-oriented positions.',
    industries: 'Environmental organizations, sustainability consulting, renewable energy, healthcare, biotechnology, scientific research, agricultural technology, green tech.',
    companies: 'Environmental Defense Fund, Patagonia, Tesla Energy, research hospitals, Cleveland Clinic, Mayo Clinic, conservation organizations, clean energy firms.'
  },
  {
    name: 'Steel',
    colorClass: 'hollow-theme-steel',
    description: 'A muted professional gray-blue for modern resumes. Perfect for engineers, architects, and system-focused roles.',
    industries: 'Civil engineering, architecture, construction management, manufacturing, industrial design, infrastructure, automotive engineering, mechanical systems.',
    companies: 'AECOM, Bechtel, Jacobs Engineering, Siemens, Caterpillar, construction firms, architectural practices, infrastructure development companies.'
  },
  {
    name: 'Indigo',
    colorClass: 'hollow-theme-indigo',
    description: 'A confident but restrained accent with a modern edge. Great for startups and tech-forward companies while remaining ATS-safe.',
    industries: 'Tech startups, venture-backed companies, product management, growth marketing, mobile apps, AI/ML companies, blockchain, crypto, innovation labs.',
    companies: 'Y Combinator companies, Sequoia-backed startups, Andreessen Horowitz portfolio, seed-stage ventures, Series A-C companies, innovation divisions.'
  }
];

export default function ResumeTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  return (
    <div className="hollow-container">
      <header className="hollow-head">
        <div className="hollow-nav">
          <div className="hollow-logo">Hollow Purple</div>
        </div>
      </header>
      
      <div className="hollow-header">
        <h1>Resume Templates & Color Themes</h1>
        <p>Industry-specific templates and color schemes optimized for different sectors and career levels</p>
      </div>

      <div className="hollow-wrapper">
        {/* Templates Section */}
        <div className="hollow-section">
          <div className="hollow-section-header">
            
            <p className="hollow-section-subtitle">Each template is optimized for specific industries, company types, and hiring practices</p>
          </div>

          <div className="hollow-templates-grid">
            {templates.map((template) => (
              <div
                key={template.name}
                className={`hollow-template-card ${selectedTemplate === template.name ? 'hollowx-selected' : ''}`}
                onClick={() => setSelectedTemplate(selectedTemplate === template.name ? null : template.name)}
              >
                <div className="hollow-template-preview">
                  <div className="hollow-template-name">{template.name}</div>
                </div>
                <div className="hollow-template-content">
                  <span className="hollow-badge">{template.badge}</span>
                  <h3 className="hollow-template-title">{template.name}</h3>
                  <p className="hollow-template-description">{template.description}</p>
                  <div className="hollow-template-industries">
                    <strong>Industries:</strong>
                    <p>{template.industries}</p>
                  </div>
                  <div className="hollow-template-positions">
                    <strong>Typical Positions:</strong>
                    <p>{template.positions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hollow-info-box">
          <h3>Industry-Specific Template Selection</h3>
          <p><strong>Traditional Corporate Environments:</strong> Use Core or Atlas for maximum compatibility with established ATS systems and conservative hiring practices.</p>
          <p><strong>Tech Industry:</strong> Stack and Atlas are optimized for technical screening. Pulse works well for product and growth roles at startups.</p>
          <p><strong>Entry-Level Candidates:</strong> Nova and Origin emphasize education and projects, which matter more than extensive work history for early-career positions.</p>
          <p><strong>Senior Leadership:</strong> Apex is specifically formatted to highlight executive impact, board experience, and strategic achievements rather than technical details.</p>
          <p><strong>Multiple Short-Term Roles:</strong> Byte efficiently handles numerous projects and contract positions without appearing cluttered or unfocused.</p>
        </div>

        {/* Themes Section */}
        <div className="hollow-section">
          <div className="hollow-section-header">
            <h2 className="hollow-section-title">ATS-Friendly Color Themes</h2>
            <p className="hollow-section-subtitle">Professional color schemes aligned with industry standards and corporate branding expectations</p>
          </div>

          <div className="hollow-themes-grid">
            {themes.map((theme) => (
              <div
                key={theme.name}
                className={`hollow-theme-card ${selectedTheme === theme.name ? 'hollowx-selected' : ''}`}
                onClick={() => setSelectedTheme(selectedTheme === theme.name ? null : theme.name)}
              >
                <div className={`hollow-theme-preview ${theme.colorClass}`}>
                  <div className="hollow-theme-color-label">{theme.name}</div>
                </div>
                <div className="hollow-theme-content">
                  <h3 className="hollow-theme-name">{theme.name}</h3>
                  <p className="hollow-theme-description">{theme.description}</p>
                  <div className="hollow-theme-industries">
                    <strong>Industries:</strong> {theme.industries}
                  </div>
                  <div className="hollow-theme-companies">
                    <strong>Company Types:</strong> {theme.companies}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hollow-info-box">
          <h3>Color Theme Selection by Industry</h3>
          <p><strong>Conservative Industries:</strong> Law, government, banking, insurance, and healthcare should use Black or Navy. These sectors prioritize formality and traditional presentation.</p>
          <p><strong>Corporate Finance and Consulting:</strong> Blue and Navy are standard. These colors align with corporate branding of major firms like McKinsey, Deloitte, JPMorgan, and Goldman Sachs.</p>
          <p><strong>Technology Sector:</strong> Slate and Indigo work well for modern tech companies. Blue is universally safe for large tech corporations like Microsoft, IBM, and Intel.</p>
          <p><strong>Engineering and Manufacturing:</strong> Steel and Blue are appropriate for technical roles. These colors convey precision and professionalism without being overly formal.</p>
          <p><strong>Academic and Research:</strong> Burgundy and Forest signal intellectual authority and research credibility, aligning with university and research institution aesthetics.</p>
          <p><strong>Startups and Growth Companies:</strong> Indigo and Slate demonstrate modernity while maintaining professionalism. Avoid these for traditional corporate environments.</p>
          <p><strong>When Uncertain:</strong> Black is acceptable in every industry and passes all ATS systems without issues. Blue is the second-safest universal choice.</p>
        </div>
      </div>
    </div>
  );
}