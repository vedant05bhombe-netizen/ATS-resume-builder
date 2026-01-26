import React, { useState } from 'react';
import './HelpPage.css';

export default function Help() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mpwylpob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setFeedbackSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setFeedbackSubmitted(false);
        }, 5000);
      } else {
        alert('There was an error submitting your feedback. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="hollow-help-page">
      {/* Header */}
      <header className="hollow-help-header">
        <div className="hollow-help-nav">
          <div className="hollow-help-logo">Hollow Purple</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hollow-help-hero">
        <h1 className="hollow-help-hero-title">Help & Support Center</h1>
        <p className="hollow-help-hero-subtitle">
          Find answers to common questions, browse helpful resources, and get the support you need
        </p>
      </section>

      {/* FAQ Section */}
      <section className="hollow-help-section">
        <div className="hollow-help-container">
          <h2 className="hollow-help-section-title">Frequently Asked Questions</h2>
          <p className="hollow-help-section-subtitle">
            Quick answers to questions you may have
          </p>

          <div className="hollow-help-faq-grid">
            <div className="hollow-help-faq-item">
              <h3>How do I create a resume?</h3>
              <p>
                Click on Create Resume on the homepage. Fill in your personal details, work experience, education, and skills. Choose from professionally designed, ATS-friendly templates that follow standard formatting. Preview your resume and download it instantly — no signup required.
              </p>
            </div>

            <div className="hollow-help-faq-item">
              <h3>Is my data secure?</h3>
              <p>
                Your data stays on your device. We don't require login or signup, and we don't store your resume or personal information on our servers. Everything you create remains private and under your control.
              </p>
            </div>

            <div className="hollow-help-faq-item">
              <h3>Can I download my resume in different formats?</h3>
              <p>
                Absolutely! You can download your resume in PDF, Word (DOCX), and plain text formats. All formats are optimized for ATS compatibility. PDF is recommended for most job applications as it preserves formatting across all devices.
              </p>
            </div>

            <div className="hollow-help-faq-item">
              <h3>What is ATS optimization?</h3>
              <p>
                ATS (Applicant Tracking System) optimization ensures your resume can be properly read by automated systems that many companies use to screen candidates. Our tool automatically formats your resume with proper heading hierarchy, standard section names, and clean formatting to pass these systems and reach human recruiters.
              </p>
            </div>

            <div className="hollow-help-faq-item">
              <h3>Can I make changes to my resume?</h3>
              <p>
                You can make changes while filling out the form, and the resume preview updates instantly. Once you download the resume, further changes require creating it again.
              </p>
            </div>

            <div className="hollow-help-faq-item">
              <h3>Do you offer templates?</h3>
              <p>
                Yes, we offer a variety of professional resume templates designed for different industries and career levels. All templates are ATS-friendly and fully customizable. You can change colors, fonts, section order, and layouts to match your personal brand.
              </p>
            </div>

            <div className="hollow-help-faq-item">
              <h3>How much does it cost?</h3>
              <p>
                Our resume builder is 100% free to use. There are no premium plans, subscriptions, or paywalls. Simply fill in your details, choose an ATS-friendly template, and download your resume — no signup required.
              </p>
            </div>
          </div>

          {/* Contact Options */}
          <h2 className="hollow-help-section-title hollow-help-contact-title">Get in Touch</h2>
          <p className="hollow-help-section-subtitle">
            Choose the best way to reach us
          </p>
          <div className="hollow-help-contact-grid">
            <div className="hollow-help-contact-card">
              <div className="hollow-help-contact-icon">📧</div>
              <h3>Email Support</h3>
              <p>hollowpurple001x@gmail.com</p>
              <p className="hollow-help-contact-response">Response within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="hollow-help-resources-section">
        <div className="hollow-help-container">
          <h2 className="hollow-help-section-title">Helpful Resources</h2>
          <p className="hollow-help-section-subtitle">
            Guides and tutorials to help you create the perfect resume
          </p>

          <div className="hollow-help-resources-grid">
            <div className="hollow-help-resource-card">
              <div className="hollow-help-resource-icon">📝</div>
              <h3>Resume Writing Guide</h3>
              <p>
                Learn best practices for writing compelling resume content that gets noticed by recruiters and passes ATS screening.
              </p>
              <a href="#" className="hollow-help-resource-link">Read Guide →</a>
            </div>

            <div className="hollow-help-resource-card">
              <div className="hollow-help-resource-icon">🎨</div>
              <h3>Design Tips</h3>
              <p>
                Discover how to choose the right template, colors, and formatting to make your resume stand out while staying professional.
              </p>
              <a href="#" className="hollow-help-resource-link">View Tips →</a>
            </div>

            <div className="hollow-help-resource-card">
              <div className="hollow-help-resource-icon">💼</div>
              <h3>Industry Examples</h3>
              <p>
                Browse resume examples tailored to different industries and job roles to get inspiration for your own resume.
              </p>
              <a href="#" className="hollow-help-resource-link">See Examples →</a>
            </div>

            <div className="hollow-help-resource-card">
              <div className="hollow-help-resource-icon">🎥</div>
              <h3>Video Tutorials</h3>
              <p>
                Watch step-by-step video guides on using our resume builder and creating effective resumes for your career level.
              </p>
              <a href="#" className="hollow-help-resource-link">Watch Videos →</a>
            </div>

            <div className="hollow-help-resource-card">
              <div className="hollow-help-resource-icon">✉️</div>
              <h3>Cover Letter Guide</h3>
              <p>
                Learn how to write compelling cover letters that complement your resume and increase your chances of getting interviews.
              </p>
              <a href="#" className="hollow-help-resource-link">Read More →</a>
            </div>

            <div className="hollow-help-resource-card">
              <div className="hollow-help-resource-icon">🔍</div>
              <h3>Job Search Tips</h3>
              <p>
                Get expert advice on job searching, networking, interview preparation, and salary negotiation to advance your career.
              </p>
              <a href="#" className="hollow-help-resource-link">Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="hollow-help-troubleshooting-section">
        <div className="hollow-help-container">
          <h2 className="hollow-help-section-title">Troubleshooting</h2>
          <p className="hollow-help-section-subtitle">
            Solutions to common technical issues
          </p>

          <div className="hollow-help-troubleshooting-grid">
            <div className="hollow-help-troubleshooting-item">
              <h3>Resume won't save or update</h3>
              <h4>Try these solutions:</h4>
              <ul>
                <li>Check your internet connection</li>
                <li>Clear your browser cache and cookies</li>
                <li>Try using a different browser (Chrome, Firefox, or Safari)</li>
                <li>Disable browser extensions that might interfere</li>
                <li>Log out and log back in to your account</li>
              </ul>
            </div>

            <div className="hollow-help-troubleshooting-item">
              <h3>Download not working</h3>
              <h4>Common fixes:</h4>
              <ul>
                <li>Ensure pop-ups are enabled for our website</li>
                <li>Check your browser's download settings</li>
                <li>Try a different file format (PDF vs DOCX)</li>
                <li>Disable any download manager extensions</li>
                <li>Try downloading from a different browser</li>
              </ul>
            </div>

            <div className="hollow-help-troubleshooting-item">
              <h3>Formatting looks incorrect</h3>
              <h4>How to fix:</h4>
              <ul>
                <li>Use the preview feature before downloading</li>
                <li>Check that your text fits within section limits</li>
                <li>Try a different template if layout issues persist</li>
                <li>Ensure you're using supported fonts</li>
                <li>Remove any special characters or symbols</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="hollow-help-feedback-section">
        <div className="hollow-help-container">
          <h2 className="hollow-help-section-title">Send Us Your Feedback</h2>
          <p className="hollow-help-section-subtitle">
            We'd love to hear from you. Share your thoughts, suggestions, or report any issues.
          </p>

          <div className="hollow-help-feedback-form">
            {feedbackSubmitted && (
              <div className="hollow-help-success-message">
                ✓ Thank you for your feedback! We'll get back to you soon.
              </div>
            )}

            <div className="hollow-help-form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                disabled={isSubmitting}
              />
            </div>

            <div className="hollow-help-form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="hollow-help-form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
                <option value="billing">Billing Question</option>
                <option value="technical">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="hollow-help-form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Please describe your feedback or issue in detail..."
                disabled={isSubmitting}
              />
            </div>

            <button 
              onClick={handleSubmit}
              className="hollow-help-submit-btn"
              disabled={feedbackSubmitted || isSubmitting}
            >
              {isSubmitting ? 'Sending...' : feedbackSubmitted ? 'Sent!' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      </section>

      <footer className="hollow-help-footer">
        <p>&copy; 2024 Hollow Purple. All rights reserved.</p>
      </footer>
    </div>
  );
}