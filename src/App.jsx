import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);

  // Nav links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  // Track scroll for navbar shadow & active section highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = navLinks.map((l) => l.id);
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio-root">

      {/* ── Fixed Side Social Dock ── */}
      <aside className="fixed-social-dock" aria-label="Social links">
        <a href="https://www.linkedin.com/in/illa-jyothi-bhavani/" target="_blank" rel="noreferrer" className="social-dock-link" aria-label="LinkedIn">
          <span className="social-dock-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" />
            </svg>
          </span>
          <span className="social-dock-label">LinkedIn</span>
        </a>
        <a href="https://github.com/IllaJyoCodingPro" target="_blank" rel="noreferrer" className="social-dock-link" aria-label="GitHub">
          <span className="social-dock-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </span>
          <span className="social-dock-label">GitHub</span>
        </a>
        <a href="mailto:illajyothibhavani@gmail.com" className="social-dock-link" aria-label="Email">
          <span className="social-dock-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </span>
          <span className="social-dock-label">Mail</span>
        </a>
      </aside>

      {/* ── Fixed Top Navbar ── */}
      <nav className={`top-navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => scrollTo('home')}>
            <span className="nav-logo-name">Illa Jyothi Bhavani</span>
          </button>

          {/* Desktop Links */}
          <ul className="nav-links-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link-btn ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <button key={link.id} className={`mobile-nav-btn ${activeSection === link.id ? 'active' : ''}`} onClick={() => scrollTo(link.id)}>
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section id="home" className="hero-section">
        <div className="hero-bg-glow" />
        <div className="hero-container">
          <div className="hero-text-col">
            <div className="hero-greeting-badge">
              <span className="greeting-sparkle">✨</span>
              <span>Hello, I'm</span>
            </div>
            <h1 className="hero-name">Illa Jyothi Bhavani</h1>
            <div className="hero-roles">
              <span className="hero-role-tag">
                <span className="tag-icon">☕</span>
                <span>Aspiring Java Developer</span>
              </span>
              <span className="hero-role-tag">
                <span className="tag-icon">💻</span>
                <span>AI Full Stack Developer</span>
              </span>
              <span className="hero-role-tag">
                <span className="tag-icon">🤖</span>
                <span>Building GenAI &amp; Agentic AI Applications</span>
              </span>
              <span className="hero-role-tag">
                <span className="tag-icon">🏢</span>
                <span>Ex-Intern @ Infosys Springboard</span>
              </span>
            </div>
            <p className="hero-bio">
              Passionate Computer Science graduate specializing in <strong>Artificial Intelligence &amp; Data Science</strong>. I build high-performance Java applications, intelligent GenAI &amp; Agentic systems, and intuitive full-stack web solutions.
            </p>
            <div className="hero-cta-row">
              <button className="cta-btn primary" onClick={() => scrollTo('projects')}>
                <span>View Projects</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="cta-btn secondary" onClick={() => scrollTo('contact')}>
                <span>Contact Me</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              </button>
            </div>
          </div>
          <div className="hero-avatar-col">
            <div className="hero-avatar-ring">
              <div className="hero-avatar-inner">
                <span className="hero-avatar-emoji">👩‍💻</span>
              </div>
            </div>
            <div className="hero-available-badge">
              <span className="pulse-dot"></span>
              <span>Open to Opportunities</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint" onClick={() => scrollTo('about')}>
          <span>Scroll Down</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — ABOUT ME
      ═══════════════════════════════════════════ */}
      <section id="about" className="page-section">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">About Me</h2>
            <div className="section-divider" />
          </div>
          <div className="about-layout">
            <div className="about-card">
              <h3 className="about-card-title">Who I Am</h3>
              <p>
                I'm a <strong>B.Tech graduate in Computer Science Engineering</strong> specialising in
                <strong> Artificial Intelligence &amp; Data Science</strong> from Kakinada Institute of
                Engineering and Technology for Women (KIETW).
              </p>
              <p style={{ marginTop: '14px' }}>
                I enjoy developing scalable software applications, working with AI/ML models, and
                building clean, functional web interfaces. I adapt quickly and love tackling
                real-world problems with technology.
              </p>
              <p style={{ marginTop: '14px' }}>
                Currently <strong style={{ color: 'var(--cyan)' }}>open to full-time roles</strong> in
                Software Engineering, Full Stack Development, or AI &amp; Data Science.
              </p>
            </div>
            <div className="about-info-grid">
              <div className="about-info-item"><span className="info-lbl">Name</span><span className="info-val">Illa Jyothi Bhavani</span></div>
              <div className="about-info-item"><span className="info-lbl">Degree</span><span className="info-val">B.Tech CSE (AI &amp; DS)</span></div>
              <div className="about-info-item"><span className="info-lbl">College</span><span className="info-val">KIETW, Kakinada</span></div>
              <div className="about-info-item"><span className="info-lbl">CGPA</span><span className="info-val">8.28 / 10</span></div>
              <div className="about-info-item"><span className="info-lbl">Location</span><span className="info-val">Mummidivaram, AP</span></div>
              <div className="about-info-item"><span className="info-lbl">Email</span><span className="info-val"><a href="mailto:illajyothibhavani@gmail.com">illajyothibhavani@gmail.com</a></span></div>
              <div className="about-info-item"><span className="info-lbl">Status</span><span className="info-val available">✅ Available for Hire</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — EDUCATION TIMELINE
      ═══════════════════════════════════════════ */}
      <section id="education" className="page-section alt-bg">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Education Timeline</h2>
            <div className="section-divider" />
          </div>
          <div className="edu-timeline">

            {/* ── B.Tech ── */}
            <div className="edu-item">
              <div className="edu-connector">
                <div className="edu-node btech">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 8.55L4.74 9 12 5.05 19.26 9 12 11.55zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" /></svg>
                </div>
                <div className="edu-line" />
              </div>
              <div className="edu-card">
                <div className="edu-card-header">
                  <div>
                    <h3 className="edu-degree">B.Tech — Computer Science Engineering</h3>
                    <p className="edu-spec">Artificial Intelligence &amp; Data Science</p>
                  </div>
                  <span className="edu-badge graduated">✓ Graduated</span>
                </div>
                <p className="edu-institute">Kakinada Institute of Engineering and Technology for Women (KIETW)</p>
                <div className="edu-meta">
                  <span className="edu-year">📅 2022 – 2026</span>
                  <span className="edu-score">📈 CGPA: 8.28</span>
                </div>
              </div>
            </div>

            {/* ── Intermediate ── */}
            <div className="edu-item">
              <div className="edu-connector">
                <div className="edu-node inter">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L2 6v2h20V6L12 1zm-8 7v10h3V8H4zm6 0v10h3V8h-3zm6 0v10h3V8h-3zm-14 12v2h20v-2H2z" /></svg>
                </div>
                <div className="edu-line" />
              </div>
              <div className="edu-card">
                <div className="edu-card-header">
                  <div>
                    <h3 className="edu-degree">Intermediate — MPC</h3>
                    <p className="edu-spec">Mathematics, Physics, Chemistry</p>
                  </div>
                  <span className="edu-badge completed">✓ Completed</span>
                </div>
                <p className="edu-institute">MGR Government Junior College</p>
                <div className="edu-meta">
                  <span className="edu-year">📅 2020 – 2022</span>
                  <span className="edu-score">📈 81% — Grade: A</span>
                </div>
              </div>
            </div>

            {/* ── 10th Standard ── */}
            <div className="edu-item no-line">
              <div className="edu-connector">
                <div className="edu-node ssc">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 7v2h1v11h4v-7h4v7h10V9h1V7L12 2zm-1 9H9V9h2v2zm4 0h-2V9h2v2zm0 4h-2v-2h2v2z" /></svg>
                </div>
              </div>
              <div className="edu-card">
                <div className="edu-card-header">
                  <div>
                    <h3 className="edu-degree">10th Standard — SSC</h3>
                    <p className="edu-spec">General Sciences &amp; Mathematics</p>
                  </div>
                  <span className="edu-badge completed">✓ Completed</span>
                </div>
                <p className="edu-institute">Ravindra High School</p>
                <div className="edu-meta">
                  <span className="edu-year">📅 2019 – 2020</span>
                  <span className="edu-score">📈 96% — Grade: A (High Academic Distinction)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — SKILLS
      ═══════════════════════════════════════════ */}
      <section id="skills" className="page-section">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Technical &amp; Professional Skills</h2>
            <div className="section-divider" />
          </div>
          <div className="skills-grid">

            <div className="skill-card">
              <div className="skill-card-icon">💻</div>
              <h3>Programming Languages</h3>
              <div className="tags">
                <span>Python</span><span>C</span><span>Java (Basics)</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">🌐</div>
              <h3>Web Development</h3>
              <div className="tags">
                <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>React.js</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">⚙️</div>
              <h3>Backend &amp; APIs</h3>
              <div className="tags">
                <span>FastAPI</span><span>Flask</span><span>RESTful APIs</span><span>JWT Auth</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">🗄️</div>
              <h3>Databases &amp; Storage</h3>
              <div className="tags">
                <span>MySQL</span><span>Data Modeling</span><span>Excel Datasets</span>
              </div>
            </div>

            <div className="skill-card highlight-card">
              <div className="skill-card-icon">🤖</div>
              <h3>AI &amp; Emerging Tech</h3>
              <div className="tags">
                <span>Artificial Intelligence</span><span>Machine Learning</span>
                <span>Generative AI</span><span>Agentic AI</span>
                <span>Hugging Face APIs</span><span>Gemini API</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">🛠️</div>
              <h3>Dev Tools</h3>
              <div className="tags">
                <span>Git</span><span>GitHub</span><span>VS Code</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">🎨</div>
              <h3>Productivity &amp; Creative</h3>
              <div className="tags">
                <span>MS Excel</span><span>MS Word</span><span>PowerPoint</span>
                <span>Canva</span><span>Adobe Photoshop</span>
              </div>
            </div>

            <div className="skill-card">
              <div className="skill-card-icon">🤝</div>
              <h3>Interpersonal Skills</h3>
              <div className="tags">
                <span>Leadership</span><span>Team Management</span><span>Adaptability</span>
                <span>Communication</span><span>Public Speaking</span><span>Creativity</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — PROJECTS
      ═══════════════════════════════════════════ */}
      <section id="projects" className="page-section alt-bg">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Featured Projects</h2>
            <div className="section-divider" />
          </div>
          <div className="projects-list">

            {/* Project 1 */}
            <div className="project-card">
              <div className="project-number">01</div>
              <div className="project-body">
                <div className="project-top-row">
                  <h3 className="project-name">OmniGenAI – All-in-One Generative AI Platform</h3>
                  <span className="project-type-badge">Gen AI &amp; Full Stack</span>
                </div>
                <p className="project-stack"><strong>Tech:</strong> Python · Flask · Hugging Face APIs · Gemini API · HTML · CSS · JavaScript</p>
                <ul className="project-points">
                  <li>Built a full-stack AI platform integrating generative models for text, image, and video generation.</li>
                  <li>Developed RESTful APIs using Flask to handle user requests and manage AI model responses.</li>
                  <li>Integrated Hugging Face &amp; Gemini APIs for real-time AI content generation.</li>
                  <li>Designed a responsive frontend; optimized API handling for better system efficiency.</li>
                </ul>
                <div className="project-links">
                  <a href="https://github.com/IllaJyoCodingPro/OmniGenAI" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/posts/illa-jyothibhavani-ba9ba1288_ai-machinelearning-huggingface-activity-7315683614338269186-WCfc" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" /></svg>
                    LinkedIn Post
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-number">02</div>
              <div className="project-body">
                <div className="project-top-row">
                  <h3 className="project-name">KIET Jira Clone – Project Management Platform</h3>
                  <span className="project-type-badge">Enterprise Web App</span>
                </div>
                <p className="project-stack"><strong>Tech:</strong> Python · FastAPI · React.js · MySQL · JWT Authentication</p>
                <ul className="project-points">
                  <li>Jira-like platform for 50+ users — task tracking, assignment workflows, real-time status updates.</li>
                  <li>Scalable RESTful APIs with FastAPI; average response time below 250ms.</li>
                  <li>JWT-based authentication with Role-Based Access Control (Admin, Manager, Developer).</li>
                  <li>Reduced page load time by 35% and authentication latency by 40%.</li>
                </ul>
                <div className="project-links">
                  <a href="https://github.com/IllaJyoCodingPro/jira_final_frontend" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    Frontend
                  </a>
                  <a href="https://github.com/IllaJyoCodingPro/jira_final_backend" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    Backend
                  </a>
                  <a href="https://www.linkedin.com/posts/illa-jyothibhavani-ba9ba1288_from-learning-concepts-to-building-at-an-activity-7454566537220247552-K7Nb" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" /></svg>
                    LinkedIn Post
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card award-project">
              <div className="project-number award-num">03</div>
              <div className="project-body">
                <div className="project-top-row">
                  <h3 className="project-name">Blood Donation Management System</h3>
                  <span className="project-type-badge award-badge">🏆 1st Prize Hackathon</span>
                </div>
                <p className="project-stack"><strong>Tech:</strong> HTML · CSS · JavaScript · Excel</p>
                <ul className="project-points">
                  <li>Web app to connect blood donors with recipients and manage donor information efficiently.</li>
                  <li>Responsive UI with HTML, CSS &amp; JavaScript — easy navigation and accessibility.</li>
                  <li>Form validation and data handling for accurate, reliable user input.</li>
                  <li>Quick donor lookup by blood group and availability for fast retrieval.</li>
                </ul>
                <div className="project-links">
                  <a href="https://github.com/IllaJyoCodingPro/Blood_Donation" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/posts/illa-jyothibhavani-ba9ba1288_excited-to-share-my-project-blood-donation-activity-7373662936927694848-UKNF" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z" /></svg>
                    LinkedIn Post
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — EXPERIENCE / INTERNSHIPS
      ═══════════════════════════════════════════ */}
      <section id="experience" className="page-section">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Internship Experience</h2>
            <div className="section-divider" />
          </div>
          <div className="exp-timeline">

            {[
              { role: 'Python Full Stack Developer', org: 'Infosys Springboard Virtual Internship 6.0', date: 'Dec 2025 – Mar 2026', desc: 'Developed a full-stack web platform integrating real-time data for tracking, analytics, and visualization.' },
              { role: 'Java Full Stack Developer', org: 'AICTE Virtual Internship', date: 'Jul 2025 – Sep 2025', desc: 'Built full-stack applications with backend integration and responsive frontend design.' },
              { role: 'Web Full Stack Developer', org: 'AICTE Virtual Internship', date: 'Apr 2025 – Jun 2025', desc: 'Developed dynamic web applications with API integration and responsive UI.' },
              { role: 'AI & ML', org: 'AICTE Virtual Internship', date: 'Jan 2025 – Mar 2025', desc: 'Applied machine learning techniques for data processing, model building, and evaluation.' },
              { role: 'Google AI & ML', org: 'AICTE Virtual Internship', date: 'Jan 2025 – Mar 2025', desc: 'Explored AI/ML tools and implemented basic models for real-world problem-solving.' },
              { role: 'Python Full Stack Developer', org: 'AICTE Virtual Internship', date: 'Oct 2024 – Dec 2024', desc: 'Built web applications using Python with frontend-backend integration.' },
              { role: 'Data Science Master', org: 'AICTE Virtual Internship', date: 'Oct 2024 – Dec 2024', desc: 'Performed data analysis, visualization, and basic machine learning tasks.' },
              { role: 'Google Android Developer', org: 'AICTE Virtual Internship', date: 'Oct 2024 – Dec 2024', desc: 'Developed basic Android applications with focus on UI and functionality.' },
              { role: 'AI & Machine Learning', org: 'APSSDC Internship', date: 'May 2024 – Jun 2024', desc: 'Implemented machine learning models using Python for practical applications.' },
              { role: 'Employment Skills', org: 'APSSDC Internship', date: 'May 2024 – Jun 2024', desc: 'Enhanced communication, teamwork, and professional workplace skills.' },
              { role: 'Telugu LLM Data Contribution', org: 'SWECHA Internship (IIIT-Hyderabad)', date: 'May 2024 – Jun 2024', desc: 'Contributed to dataset annotation for Telugu LLM development in a national datathon.' },
            ].map((item, i) => (
              <div className="exp-item" key={i}>
                <div className="exp-dot" />
                <div className="exp-card">
                  <div className="exp-card-top">
                    <div>
                      <h3 className="exp-role">{item.role}</h3>
                      <p className="exp-org">{item.org}</p>
                    </div>
                    <span className="exp-date">{item.date}</span>
                  </div>
                  <p className="exp-desc">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 7 — CERTIFICATIONS & ACHIEVEMENTS
      ═══════════════════════════════════════════ */}
      <section id="certifications" className="page-section alt-bg">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Certifications &amp; Achievements</h2>
            <div className="section-divider" />
          </div>
          <div className="certs-layout">

            <div className="certs-col">
              <h3 className="certs-col-title">📜 Verified Certifications</h3>
              <div className="cert-list">
                {[
                  { name: 'Foundations of Modern Machine Learning', issuer: 'IIIT Hyderabad', period: 'Aug 2023 – May 2024' },
                  { name: 'Applied Artificial Intelligence', issuer: 'TechSaksham (Microsoft & SAP CSR Initiative)', period: '2024–25' },
                  { name: 'Python Foundation Certification', issuer: 'Infosys Springboard', period: '' },
                  { name: 'Artificial Intelligence Foundation Certification', issuer: 'Infosys', period: '' },
                  { name: 'Data Science Foundation Certification', issuer: 'Infosys', period: '' },
                ].map((c, i) => (
                  <div className="cert-card" key={i}>
                    <div className="cert-icon">🎓</div>
                    <div>
                      <p className="cert-name">{c.name}</p>
                      <p className="cert-issuer">{c.issuer}{c.period ? ` · ${c.period}` : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="certs-col">
              <h3 className="certs-col-title">🏆 Honors &amp; Awards</h3>
              <div className="award-list">
                <div className="award-card">
                  <div className="award-icon">🥇</div>
                  <div>
                    <p className="award-name">1st Prize — College Hackathon (2nd Year)</p>
                    <p className="award-desc">Awarded for designing and building the Blood Donation Management System.</p>
                  </div>
                </div>
                <div className="award-card">
                  <div className="award-icon">⭐</div>
                  <div>
                    <p className="award-name">Best Performer Recognition</p>
                    <p className="award-desc">Recognized as Best Performer among 300+ participants in an intensive Agentic AI Workshop.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — CONTACT
      ═══════════════════════════════════════════ */}
      <section id="contact" className="page-section">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Get In Touch</h2>
            <div className="section-divider" />
            <p className="contact-intro">I'm open to full-time opportunities, internships, and collaborations. Feel free to reach out!</p>
          </div>
          <div className="contact-layout">

            <div className="contact-info-col">
              <a href="mailto:illajyothibhavani@gmail.com" className="contact-item">
                <div className="contact-item-icon">✉️</div>
                <div>
                  <p className="contact-item-label">Email</p>
                  <p className="contact-item-value">illajyothibhavani@gmail.com</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/illa-jyothi-bhavani/" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item-icon">💼</div>
                <div>
                  <p className="contact-item-label">LinkedIn</p>
                  <p className="contact-item-value">illa-jyothi-bhavani</p>
                </div>
              </a>
              <a href="https://github.com/IllaJyoCodingPro" target="_blank" rel="noreferrer" className="contact-item">
                <div className="contact-item-icon">🐙</div>
                <div>
                  <p className="contact-item-label">GitHub</p>
                  <p className="contact-item-value">IllaJyoCodingPro</p>
                </div>
              </a>
              <div className="contact-item no-hover">
                <div className="contact-item-icon">📍</div>
                <div>
                  <p className="contact-item-label">Location</p>
                  <p className="contact-item-value">Mummidivaram, Andhra Pradesh, 533216</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="cf-name">Your Name</label>
                <input id="cf-name" type="text" placeholder="e.g. John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="cf-email">Email Address</label>
                <input id="cf-email" type="email" placeholder="e.g. john@example.com" />
              </div>
              <div className="form-group">
                <label htmlFor="cf-msg">Message</label>
                <textarea id="cf-msg" placeholder="Your message or opportunity..." />
              </div>
              <button type="submit" className="cta-btn primary full-width">Send Message ➔</button>
            </form>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <p className="footer-name">Illa Jyothi Bhavani</p>
        <p className="footer-sub">B.Tech Graduate · AI &amp; Data Science · Full Stack Developer</p>
        <div className="footer-links">
          <a href="mailto:illajyothibhavani@gmail.com">Email</a>
          <span>·</span>
          <a href="https://github.com/IllaJyoCodingPro" target="_blank" rel="noreferrer">GitHub</a>
          <span>·</span>
          <a href="https://www.linkedin.com/in/illa-jyothi-bhavani/" target="_blank" rel="noreferrer">LinkedIn</a>

        </div>
        <p className="footer-copy">© 2026 Illa Jyothi Bhavani. All rights reserved.</p>
      </footer>

    </div>
  );
}
