import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Info } from 'lucide-react';

const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .ats-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%);
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .ats-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .ats-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .ats-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .ats-subtitle {
    font-size: 1.125rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
  }

  .ats-disclaimer {
    background: #f3e8ff;
    border: 1px solid #e9d5ff;
    border-radius: 12px;
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }

  .ats-disclaimer-icon {
    color: #9333ea;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .ats-disclaimer-title {
    font-size: 0.875rem;
    color: #581c87;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .ats-disclaimer-text {
    font-size: 0.75rem;
    color: #6b21a8;
    line-height: 1.5;
  }

  .ats-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    margin-bottom: 1.5rem;
  }

  .ats-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .ats-upload-area {
    border: 2px dashed #d1d5db;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .ats-upload-area:hover {
    border-color: #a855f7;
    background: #faf5ff;
  }

  .ats-upload-input {
    display: none;
  }

  .ats-upload-icon {
    color: #9ca3af;
    margin: 0 auto 1rem;
  }

  .ats-upload-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }

  .ats-upload-hint {
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .ats-textarea {
    width: 100%;
    min-height: 120px;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.875rem;
    font-family: inherit;
    resize: vertical;
    transition: all 0.2s ease;
  }

  .ats-textarea:focus {
    outline: none;
    border-color: #a855f7;
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
  }

  .ats-textarea-hint {
    font-size: 0.75rem;
    color: #9ca3af;
    margin-top: 0.25rem;
  }

  .ats-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .ats-error-icon {
    color: #dc2626;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .ats-error-text {
    font-size: 0.875rem;
    color: #991b1b;
  }

  .ats-info-message {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .ats-info-icon {
    color: #2563eb;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .ats-info-text {
    font-size: 0.875rem;
    color: #1e40af;
  }

  .ats-button {
    width: 100%;
    background: #9333ea;
    color: white;
    font-weight: 600;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .ats-button:hover:not(:disabled) {
    background: #7e22ce;
  }

  .ats-button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  .ats-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .ats-score-container {
    text-align: center;
    margin-bottom: 2rem;
  }

  .ats-score-circle {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .ats-score-circle.excellent {
    background: #dcfce7;
  }

  .ats-score-circle.good {
    background: #dbeafe;
  }

  .ats-score-circle.decent {
    background: #fef3c7;
  }

  .ats-score-circle.poor {
    background: #fee2e2;
  }

  .ats-score-number {
    font-size: 3rem;
    font-weight: 700;
  }

  .ats-score-number.excellent {
    color: #16a34a;
  }

  .ats-score-number.good {
    color: #2563eb;
  }

  .ats-score-number.decent {
    color: #ca8a04;
  }

  .ats-score-number.poor {
    color: #dc2626;
  }

  .ats-score-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .ats-score-description {
    color: #6b7280;
  }

  .ats-section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .ats-category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .ats-category-card {
    background: #f9fafb;
    border-radius: 8px;
    padding: 1rem;
  }

  .ats-category-name {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
    text-transform: capitalize;
  }

  .ats-category-score {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .ats-list {
    list-style: none;
    margin-bottom: 1.5rem;
  }

  .ats-list-item {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    align-items: flex-start;
  }

  .ats-list-marker {
    flex-shrink: 0;
    margin-top: 4px;
    font-weight: 600;
  }

  .ats-list-marker.strength {
    color: #16a34a;
  }

  .ats-list-marker.weakness {
    color: #dc2626;
  }

  .ats-list-marker.suggestion {
    color: #2563eb;
  }

  .ats-list-text {
    color: #374151;
    line-height: 1.5;
  }

  .ats-keyword-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .ats-keyword {
    background: #fed7aa;
    color: #9a3412;
    padding: 0.375rem 0.75rem;
    border-radius: 999px;
    font-size: 0.875rem;
  }

  .ats-summary {
    background: #f9fafb;
    border-radius: 8px;
    padding: 1rem;
  }

  .ats-summary-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .ats-summary-text {
    color: #374151;
    line-height: 1.6;
  }

  .ats-reset-container {
    text-align: center;
    margin-top: 2rem;
  }

  .ats-reset-button {
    background: #6b7280;
    color: white;
    font-weight: 600;
    padding: 0.875rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ats-reset-button:hover {
    background: #4b5563;
  }

  .ats-footer {
    text-align: center;
    margin-top: 2rem;
    color: #6b7280;
    font-size: 0.875rem;
  }

  .ats-footer-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .ats-footer-text {
    font-size: 0.75rem;
    color: #9ca3af;
  }
`;

export default function ATSResumeChecker() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      if (!selectedFile.name.match(/\.(pdf|docx)$/i)) {
        setError('Only PDF and DOCX files are supported');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume first');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setShowSlowMessage(false);

    // Show slow message after 8 seconds
    const slowMessageTimer = setTimeout(() => {
      setShowSlowMessage(true);
    }, 8000);

    const formData = new FormData();
    formData.append('file', file);
    if (jobDescription.trim()) {
      formData.append('jobDescription', jobDescription);
    }

    try {
      const response = await fetch('https://ats-resume-builder-3gn5.onrender.com/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze resume. Please try again.');
    } finally {
      clearTimeout(slowMessageTimer);
      setLoading(false);
      setShowSlowMessage(false);
    }
  };

  const getScoreClass = (score) => {
    if (score >= 85) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 55) return 'decent';
    return 'poor';
  };

  const getScoreDescription = (score) => {
    if (score >= 85) return 'Excellent! Your resume is highly optimized for ATS systems.';
    if (score >= 70) return 'Good resume with competitive ATS compatibility.';
    if (score >= 55) return 'Decent resume, but improvements needed for better results.';
    return 'Your resume needs significant improvements to pass ATS filters.';
  };

  return (
    <>
      <style>{styles}</style>
      <div className="ats-container">
        <div className="ats-content">
          {/* Header */}
          <div className="ats-header">
            <h1 className="ats-title">ATS Resume Checker</h1>
            <p className="ats-subtitle">
              Get an honest, professional assessment of your resume's ATS compatibility
            </p>
            
            <div className="ats-disclaimer">
              <Info className="ats-disclaimer-icon" size={20} />
              <div>
                <p className="ats-disclaimer-title">
                  Important: Your score reflects resume quality, not our tool
                </p>
                <p className="ats-disclaimer-text">
                  This analysis evaluates how well YOUR resume is built - including your skills, experience, 
                  achievements, and formatting. A lower score means your resume needs improvement, not that our 
                  checker is flawed. Professionals with more experience and better-presented qualifications 
                  naturally score higher. Use the feedback to strengthen your resume!
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="ats-card">
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="ats-label">Upload Resume (PDF or DOCX)</label>
              <div className="ats-upload-area">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="ats-upload-input"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" style={{ cursor: 'pointer', display: 'block' }}>
                  <Upload className="ats-upload-icon" size={48} style={{ display: 'block', margin: '0 auto 1rem' }} />
                  <div className="ats-upload-text">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </div>
                  <div className="ats-upload-hint">Maximum file size: 10MB</div>
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="ats-label">Job Description (Optional)</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here to get keyword matching analysis..."
                className="ats-textarea"
              />
              <div className="ats-textarea-hint">
                Adding a job description helps identify missing keywords and improves accuracy
              </div>
            </div>

            {error && (
              <div className="ats-error">
                <AlertCircle className="ats-error-icon" size={20} />
                <p className="ats-error-text">{error}</p>
              </div>
            )}

            {loading && showSlowMessage && (
              <div className="ats-info-message">
                <Info className="ats-info-icon" size={20} />
                <p className="ats-info-text">
                  This is taking longer than usual... Resume analysis can take 10–15 seconds.
                </p>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading || !file}
              className="ats-button"
            >
              {loading ? (
                <>
                  <div className="ats-spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText size={20} />
                  Analyze Resume
                </>
              )}
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <div className="ats-card">
              <div className="ats-score-container">
                <div className={`ats-score-circle ${getScoreClass(result.overallScore)}`}>
                  <span className={`ats-score-number ${getScoreClass(result.overallScore)}`}>
                    {result.overallScore}
                  </span>
                </div>
                <h2 className="ats-score-title">Overall ATS Score</h2>
                <p className="ats-score-description">
                  {getScoreDescription(result.overallScore)}
                </p>
              </div>

              {/* Category Scores */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 className="ats-section-title">Category Breakdown</h3>
                <div className="ats-category-grid">
                  {Object.entries(result.scores).map(([category, score]) => (
                    <div key={category} className="ats-category-card">
                      <div className="ats-category-name">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className={`ats-category-score ${getScoreClass(score)}`}>
                        {score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths */}
              {result.strengths && result.strengths.length > 0 && (
                <div>
                  <h3 className="ats-section-title">
                    <CheckCircle size={20} style={{ color: '#16a34a' }} />
                    Strengths
                  </h3>
                  <ul className="ats-list">
                    {result.strengths.map((strength, idx) => (
                      <li key={idx} className="ats-list-item">
                        <span className="ats-list-marker strength">✓</span>
                        <span className="ats-list-text">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Weaknesses */}
              {result.weaknesses && result.weaknesses.length > 0 && (
                <div>
                  <h3 className="ats-section-title">
                    <AlertCircle size={20} style={{ color: '#dc2626' }} />
                    Areas for Improvement
                  </h3>
                  <ul className="ats-list">
                    {result.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="ats-list-item">
                        <span className="ats-list-marker weakness">✗</span>
                        <span className="ats-list-text">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div>
                  <h3 className="ats-section-title">
                    <TrendingUp size={20} style={{ color: '#2563eb' }} />
                    Improvement Suggestions
                  </h3>
                  <ul className="ats-list">
                    {result.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="ats-list-item">
                        <span className="ats-list-marker suggestion">→</span>
                        <span className="ats-list-text">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing Keywords */}
              {result.missingKeywords && result.missingKeywords.length > 0 && (
                <div>
                  <h3 className="ats-section-title">Missing Keywords</h3>
                  <div className="ats-keyword-container">
                    {result.missingKeywords.map((keyword, idx) => (
                      <span key={idx} className="ats-keyword">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {result.summary && (
                <div className="ats-summary">
                  <h3 className="ats-summary-title">Summary</h3>
                  <p className="ats-summary-text">{result.summary}</p>
                </div>
              )}

              {/* Reset Button */}
              <div className="ats-reset-container">
                <button
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                    setJobDescription('');
                  }}
                  className="ats-reset-button"
                >
                  Analyze Another Resume
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="ats-footer">
            <p className="ats-footer-title">
              Score Guide: 85+ Excellent • 70-84 Good • 55-69 Decent • 40-54 Below Average • 0-39 Poor
            </p>
            <p className="ats-footer-text">
              This tool analyzes YOUR resume content and structure. Better qualifications, clearer formatting, 
              and stronger achievements lead to higher scores.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}