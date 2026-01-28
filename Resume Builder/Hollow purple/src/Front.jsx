import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from "react-router-dom";
import './Front.css';
import image1 from './Gemini_Generated_Image_bqn339bqn339bqn3-removebg-preview.png';
import image2 from './Gemini_Generated_Image_3731hv3731hv3731-removebg-preview.png';
import image3 from './Gemini_Generated_Image_fttc7qfttc7qfttc-removebg-preview.png';
import image4 from './Gemini_Generated_Image_28zhnl28zhnl28zh__1_-removebg-preview.png';
import { trackEvent } from "./Analytics/ga4";
const FAQSection = lazy(() => Promise.resolve({ default: FAQSectionComponent }));

function FAQSectionComponent({ faqData }) {
  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqData.map((faq, index) => (
            <div className="faq-item" key={index}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Front() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Free ATS-Friendly Resume Builder to Build a Professional Resume';
  const [currentIndex, setCurrentIndex] = useState(0);

  const faqData = [
    {
      question: "Is Hollow Purple resume builder really free?",
      answer: "Yes, our resume builder is completely free to use. You can create, customize, and download your resume in PDF format without any cost. There are no hidden fees or premium features."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account is required to start building your resume. You can begin creating immediately. However, creating an account allows you to save your progress and return to edit your resume later."
    },
    {
      question: "What format can I download my resume in?",
      answer: "You can download your resume as a PDF file. PDF is the most widely accepted format for job applications and ensures your formatting stays consistent across all devices."
    },
    {
      question: "Are the templates ATS-friendly?",
      answer: "Yes, all our templates are designed to pass Applicant Tracking Systems (ATS). We use simple formatting, standard fonts, and clear section headers that ATS software can easily parse."
    },
    {
      question: "Is my data safe and private?",
      answer: "Yes, your data is completely safe. We don't save or store any of your personal information on our servers. Everything you enter stays in your browser, giving you complete privacy and control over your data."
    },
    {
      question: "Can I make changes to my resume?",
      answer: "Yes. You can make changes to your resume during the same session. We don't use accounts or save data on our servers, so once the page is closed, your information is cleared for privacy reasons."
    },
    {
      question: "How many resume templates are available?",
      answer: "We offer multiple professional resume templates suitable for different industries and career levels. All templates are modern, clean, and ATS-compatible."
    },
    {
      question: "What sections can I add to my resume?",
      answer: "You can add standard sections like Work Experience, Education, Skills, and Contact Information. You can also include optional sections like Projects, Certifications, Volunteering, and Languages."
    },
    {
      question: "Can I use this for different types of jobs?",
      answer: "Absolutely! You can create multiple versions of your resume and customize each one for different job applications. This helps you tailor your resume to match specific job requirements."
    },
    {
      question: "What if I need help building my resume?",
      answer: "Our builder includes helpful tips and examples throughout the process. If you need additional help, you can contact our support team through the Help Center."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <>
      <title>Free ATS-Friendly Resume Builder | Hollow Purple</title>
      <meta
        name="description"
        content="Create a professional ATS-friendly resume for free. Choose modern templates, customize easily, and download instantly in PDF. No credit card required."
      />
      <meta
        name="keywords"
        content="free resume builder, ATS resume, resume templates, resume builder PDF, professional resume, ATS-friendly resume"
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://yourdomain.com/" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }} />

      <div className="resume-builder">
        <header className={scrollY > 50 ? 'header scrolled' : 'header'}>
          <nav className="nav-container">
            <div className="logo">Hollow Purple</div>
            <ul className="nav-links">
              <li><a className='anchor1' onClick={() => navigate('/templateinfo')}>Templates</a></li>
              <li><a href="#features">Features</a></li>
              <li><a onClick={() => navigate('/help')}>Help</a></li>
            </ul>
           <div
  className="btn-primary"
  onClick={() => {
    trackEvent("CTA", "click", "get_started_home");
    navigate("/onboarding");
  }}
>
  Get Started
  <span className="icon">→</span>
</div>
          </nav>
        </header>

        <main>
          <section className="hero" id="hero">
            <div className="hero-bg"></div>
            <div className="hero-content">
              <h1 className="hero-title">
                {typewriterText}
                <span className="cursor">|</span>
              </h1>
              <p className="hero-subtitle">
                Create a standout resume with our easy-to-use builder. Choose from{' '}
                <a onClick={() => navigate('/templateinfo')}>professional templates</a>, customize your content, and download instantly.
              </p>
            <div
  className="cta-button"
  onClick={() => {
    trackEvent("CTA", "click", "Create Resume - Home");
    navigate("/onboarding");
  }}
>
  Create My Resume - It's Free
  <span className="icon">→</span>
</div>
              <p className="hero-note">No Login required • Always free • We won't save your personal data</p>
              
              <div className="trust-grid">
                <div className="trust-card">
                  <div className="trust-icon" aria-hidden="true"><img src={image1} alt="" /></div>
                  <span className="sr-only">Multiple resume templates icon</span>
                  <div className="trust-label">Multiple Templates</div>
                  <div className="trust-desc">Professional designs</div>
                </div>
                <div className="trust-card">
                  <div className="trust-icon" aria-hidden="true"><img src={image2} alt="" /></div>
                  <span className="sr-only">Instant download icon</span>
                  <div className="trust-label">Instant Download</div>
                  <div className="trust-desc">PDF format</div>
                </div>
                <div className="trust-card">
                  <div className="trust-icon" aria-hidden="true"><img src={image4} alt="" /></div>
                  <span className="sr-only">ATS-friendly icon</span>
                  <div className="trust-label">ATS-Friendly</div>
                  <div className="trust-desc">Pass applicant systems</div>
                </div>
                <div className="trust-card">
                  <div className="trust-icon" aria-hidden="true"><img src={image3} alt="" /></div>
                  <span className="sr-only">Quick and easy icon</span>
                  <div className="trust-label">Quick & Easy</div>
                  <div className="trust-desc">Build in minutes</div>
                </div>
              </div>
            </div>
          </section>

          <section className="features-section" id="features">
            <div className="section-container">
              <h2 className="section-title">Everything You Need to Get Hired with Our Free Resume Builder</h2>
              <p className="section-subtitle">Our resume builder provides all the tools you need to create a professional resume that stands out</p>
        
              <div className="features-grid">
                <article className="feature-card">
                  <div className="feature-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Quick & Easy</h3>
                  <p>Build your resume in minutes with our intuitive interface. No design skills needed - just fill in your information.</p>
                </article>
                <article className="feature-card">
                  <div className="feature-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3>Professional Templates</h3>
                  <p>Choose from multiple <a onClick={() => navigate('/templateinfo')}>professionally designed templates</a>. All templates are clean, modern, and ATS-compatible.</p>
                </article>
                <article className="feature-card">
                  <div className="feature-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      <path d="M5 20h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3>PDF Download</h3>
                  <p>Download your resume in PDF format. Print-ready and optimized for online job applications.</p>
                </article>
                <article className="feature-card">
                  <div className="feature-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                    </svg>
                  </div>
                  <h3>ATS-Optimized</h3>
                  <p>Our templates pass <a href="#ats">Applicant Tracking Systems</a> used by companies to filter candidates automatically.</p>
                </article>
                <article className="feature-card">
                  <div className="feature-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Customizable</h3>
                  <p>Customize fonts, colors, and layouts to match your style while maintaining professional standards.</p>
                </article>
                <article className="feature-card">
                  <div className="feature-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3>Multiple Sections</h3>
                  <p>Add work experience, education, skills, projects, and more. Organize your information effectively.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="how-it-works" id="how-it-works">
            <div className="section-container">
              <h2 className="section-title">How Our Free Resume Builder Works</h2>
              <p className="section-subtitle">Three simple steps to your perfect resume</p>

              <div className="steps-grid">
                <article className="step">
                  <div className="step-number">1</div>
                  <h3>Choose a Template</h3>
                  <p>Select from our collection of professional, ATS-friendly templates designed for various industries and career levels.</p>
                </article>
                <article className="step">
                  <div className="step-number">2</div>
                  <h3>Fill in Your Info</h3>
                  <p>Add your work experience, education, skills, and achievements. Our form guides you through each section.</p>
                </article>
                <article className="step">
                  <div className="step-number">3</div>
                  <h3>Download & Apply</h3>
                  <p>Download your polished resume in PDF format and start applying to jobs immediately. Update anytime.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="ats-section" id="ats">
            <div className="section-container">
              <h2 className="section-title">Understanding ATS (Applicant Tracking Systems)</h2>
              <p className="section-subtitle">Over 90% of large companies use Applicant Tracking Systems to screen resumes. Here's what you need to know.</p>

              <div className="ats-grid">
                <article className="ats-card">
                  <h3>What is an ATS?</h3>
                  <p>An ATS (Applicant Tracking System) is software that companies use to manage job applications. It automatically scans and filters resumes before a human ever sees them.</p>
                  <p>The ATS looks for keywords, job titles, skills, and formatting. If your resume isn't formatted correctly or doesn't match the job requirements, it might get rejected automatically.</p>
                </article>
                <article className="ats-card">
                  <h3>Why ATS-Friendly Matters</h3>
                  <p>Even if you're perfectly qualified for a job, an ATS can reject your resume if it can't read the formatting properly. This means you never get a chance to interview.</p>
                  <p>ATS-friendly resumes use simple formatting, standard fonts, and clear section headers that the software can easily parse and understand.</p>
                </article>
              </div>
              
              <div className='checkX'>Check your ATS score for free</div>
             <div className="check">
  <button
    className="cta-button"
    onClick={() => {
      trackEvent("ATS", "click", "check_ats_score");
      navigate("/ats");
    }}
  >
    Check ATS Score
  </button>
</div>
              <div className="ats-features">
                <h3>How Our Templates Pass ATS</h3>
                <div className="ats-features-grid">
                  <article className="ats-feature">
                    <div className="ats-feature-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h4>Simple Formatting</h4>
                    <p>We avoid complex layouts, tables, and graphics that confuse ATS software.</p>
                  </article>
                  <article className="ats-feature">
                    <div className="ats-feature-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                      </svg>
                    </div>
                    <h4>Standard Fonts</h4>
                    <p>We use common fonts like Arial, Calibri, and Times New Roman that ATS can read.</p>
                  </article>
                  <article className="ats-feature">
                    <div className="ats-feature-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                        <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h4>Clear Sections</h4>
                    <p>Standard section headers like "Work Experience" and "Education" that ATS recognizes.</p>
                  </article>
                  <article className="ats-feature">
                    <div className="ats-feature-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4l2.2 4.5 5 .7-3.6 3.5.8 5-4.4-2.3-4.4 2.3.8-5L4.8 9.2l5-.7L12 4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4>Keyword Optimized</h4>
                    <p>Space for relevant keywords and skills that match job descriptions.</p>
                  </article>
                  <article className="ats-feature">
                    <div className="ats-feature-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                        <path d="M5 20h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h4>PDF Format</h4>
                    <p>We export in clean PDF format that preserves formatting for ATS parsing.</p>
                  </article>
                  <article className="ats-feature">
                    <div className="ats-feature-icon" aria-hidden="true">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4>No Hidden Text</h4>
                    <p>Transparent formatting with no hidden elements that trigger ATS red flags.</p>
                  </article>
                </div>
              </div>
            </div>
          </section>

          <section className="content-section" id="guide">
            <div className="section-container">
              <h2 className="section-title">How to Create an ATS-Friendly Resume in 2026</h2>
              
              <article className="content-article">
                <p>Creating an ATS-friendly resume is essential in today's job market. With most companies using automated systems to filter applications, your resume needs to be optimized for both humans and machines. Our <a onClick={() => navigate('/onboarding')}>free resume builder</a> helps you create resumes that pass these systems while still looking professional.</p>

                <h3>Understanding Resume Formatting for ATS</h3>
                <p>The foundation of an ATS-friendly resume starts with proper formatting. Avoid using tables, text boxes, headers, footers, or complex graphics. Instead, use a simple, clean layout with clear section headings. Our <a onClick={() => navigate('/templateinfo')}>professional resume templates</a> are specifically designed with these requirements in mind, ensuring your resume gets through automated screening.</p>

                <h3>Choosing the Right Resume Template</h3>
                <p>When selecting a resume template, prioritize simplicity and readability. The best ATS-friendly templates use standard fonts like Arial, Calibri, or Times New Roman in 10-12 point size. They include clear section headers such as "Work Experience," "Education," and "Skills" that ATS software can easily identify and categorize.</p>

                <h3>Optimizing Your Resume Content</h3>
                <p>Content optimization is just as important as formatting. Use keywords from the job description throughout your resume, particularly in your skills section and work experience. However, avoid keyword stuffing—your resume should still read naturally to human recruiters who review it after it passes the ATS.</p>

                <h3>Resume Sections That Matter Most</h3>
                <p>Every professional resume should include contact information, a professional summary or objective, work experience, education, and skills. Optional sections like certifications, projects, volunteer work, and languages can help you stand out but should only be included if they're relevant to the position you're applying for.</p>

                <h3>Common ATS Resume Mistakes to Avoid</h3>
                <p>Many job seekers unknowingly sabotage their applications with ATS-unfriendly formatting choices. Never use images, charts, or graphics in your resume content. Avoid fancy fonts, creative layouts, or unconventional section names. Don't submit your resume as a .jpg, .png, or other image format—always use PDF or Word documents.</p>

                <h3>Tailoring Your Resume for Each Application</h3>
                <p>One of the most effective strategies for getting past ATS is customizing your resume for each job application. Review the job posting carefully and incorporate relevant keywords and phrases into your resume. Our resume builder makes it easy to create multiple versions of your resume, each optimized for different roles or industries.</p>

                <h3>The Importance of Professional Resume Design</h3>
                <p>While ATS compatibility is crucial, your resume also needs to impress human recruiters. A well-designed resume balances ATS requirements with visual appeal. It should be easy to scan, with clear hierarchies, appropriate white space, and logical organization. This ensures that once your resume passes the ATS, it makes a strong impression on hiring managers.</p>
              </article>
            </div>
          </section>

          <Suspense fallback={<div className="section-container">Loading FAQs...</div>}>
            <FAQSection faqData={faqData} />
          </Suspense>

          <section className="cta-section" id="cta">
            <div className="cta-content">
              <h2>Ready to Build Your Professional Resume?</h2>
              <p>Start creating your resume now - it's completely free and takes just minutes</p>
             <div
  className="cta-button-large"
  onClick={() => {
    trackEvent("CTA", "click", "start_building_now");
    navigate("/onboarding");
  }}
>
  Start Building Now
  <span className="icon">→</span>
</div>
              <p className="cta-note">No registration required • Free forever • No credit card needed</p>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-column">
              <div className="footer-logo">Hollow Purple</div>
              <p>Create professional resumes that help you get hired.</p>
            </div>
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li><a onClick={() => navigate('/templateinfo')}>Templates</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Hollow Purple. All rights reserved. Built by Vedant. No data collected</p>
          </div>
        </footer>
      </div>
    </>
  );
}