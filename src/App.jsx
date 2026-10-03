import { useState, useEffect } from 'react';
import {
  FaArrowUpRightFromSquare,
  FaArrowRight,
  FaBrain,
  FaCertificate,
  FaCode,
  FaComments,
  FaEnvelope,
  FaEye,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileWord,
  FaGithub,
  FaJava,
  FaLinkedin,
  FaLinux,
  FaPaintbrush,
  FaPlug,
  FaPython,
  FaReact,
  FaRobot,
  FaServer,
  FaTrophy,
  FaVial,
  FaWandMagicSparkles,
  FaXmark,
} from 'react-icons/fa6';
import {
  SiCss,
  SiFastapi,
  SiFlask,
  SiGit,
  SiHtml5,
  SiHuggingface,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiSpringboot,
} from 'react-icons/si';
import laptopMockup from './assets/laptop-mockup.png';
import {
  CERT_CATEGORIES,
  certificationsData,
  computerCourses,
  honorsAndAwards,
  infosysBadges,
} from './data/certifications';

const educationImageAssets = import.meta.glob('./assets/{college-kietw,junior-college-mgr,school-ravindra}.*', {
  eager: true,
  query: '?url',
  import: 'default',
});

const educationImageUrl = (assetName) =>
  Object.entries(educationImageAssets).find(([path]) => path.includes(`/${assetName}.`))?.[1];

const skillCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Java', Icon: FaJava, color: '#ED8B00' },
      { name: 'Python', Icon: FaPython, color: '#3776AB' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'HTML', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', Icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React.js', Icon: FaReact, color: '#61DAFB' },
    ],
  },
  {
    name: 'Backend & APIs',
    skills: [
      { name: 'Spring Boot', Icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Flask', Icon: SiFlask, color: '#FFFFFF' },
      { name: 'FastAPI', Icon: SiFastapi, color: '#009688' },
      { name: 'REST APIs', Icon: FaServer, color: '#4F8CC9' },
      { name: 'API Integration', Icon: FaPlug, color: '#8A9BFF' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', Icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    name: 'AI & Machine Learning',
    skills: [
      { name: 'Machine Learning', Icon: FaBrain, color: '#E6A700' },
      { name: 'Generative AI', Icon: FaWandMagicSparkles, color: '#B277D6' },
      { name: 'Agentic AI', Icon: FaRobot, color: '#EF8354' },
      { name: 'NLP', Icon: FaComments, color: '#4DB6AC' },
      { name: 'Computer Vision', Icon: FaEye, color: '#E76F51' },
      { name: 'Hugging Face', Icon: SiHuggingface, color: '#FFD21E' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: FaGithub, color: '#F0F6FC' },
      { name: 'Linux', Icon: FaLinux, color: '#FCC624' },
      { name: 'VS Code', Icon: FaCode, color: '#007ACC' },
      { name: 'Manual Testing', Icon: FaVial, color: '#52A5C4' },
      { name: 'MS Excel', Icon: FaFileExcel, color: '#217346' },
      { name: 'MS Word', Icon: FaFileWord, color: '#2B579A' },
      { name: 'PowerPoint', Icon: FaFilePowerpoint, color: '#D24726' },
      { name: 'Canva', Icon: FaPaintbrush, color: '#00C4CC' },
    ],
  },
];

const internshipGroups = [
  {
    id: 'infosys',
    organization: 'Infosys Springboard',
    program: 'Virtual Internship 6.0',
    internships: [
      {
        title: 'Python Full Stack Developer',
        duration: 'Dec 2025 – Mar 2026',
        description: 'Developed a full-stack platform integrating real-time data for tracking, analytics, and visualization.',
        image: '/certificates/Infosys_i1.png',
      },
    ],
  },
  {
    id: 'swecha',
    organization: 'Swecha · IIIT Hyderabad',
    program: 'Summer of AI Internship Program',
    internships: [
      {
        title: 'Telugu LLM Data Contribution',
        duration: 'May 2024 – Jun 2024',
        description: 'Contributed Telugu language data for large language model development through a national datathon.',
        image: '/certificates/Swecha_i1.jpg',
      },
    ],
  },
  {
    id: 'apssdc',
    organization: 'Skill AP · APSSDC',
    program: 'Training delivered with Edunet Foundation',
    internships: [
      {
        title: 'Artificial Intelligence and Machine Learning',
        duration: 'May 2024 – Jun 2024',
        description: 'Implemented machine learning models in Python for practical applications.',
        image: '/certificates/APSSDC_i1.png',
      },
      {
        title: 'Cyber Security with Kali Linux',
        duration: 'May 2024 – Jun 2024',
        description: 'Completed cybersecurity training focused on Kali Linux and foundational security practices.',
        image: '/certificates/APSSDC_i2.png',
      },
      {
        title: 'Employability Skills',
        duration: 'May 2024 – Jun 2024',
        description: 'Strengthened communication, teamwork, and professional workplace skills.',
        image: '/certificates/APSSDC_i3.png',
      },
    ],
  },
  {
    id: 'aicte-eduskills',
    organization: 'EduSkills Academy · AICTE',
    program: 'Virtual Internship Programs',
    internships: [
      {
        title: 'Altair Data Science Master',
        duration: 'Oct – Dec 2024',
        description: 'Completed data analysis, visualization, and foundational machine learning activities using Altair data science tools.',
        image: '/certificates/AICTE_i1.png',
      },
      {
        title: 'Python Full Stack Developer',
        duration: 'Oct – Dec 2024',
        description: 'Built web applications using Python with frontend and backend integration.',
        image: '/certificates/AICTE_i2.png',
      },
      {
        title: 'Google AI-ML',
        duration: 'Jan – Mar 2025',
        description: 'Explored AI and machine learning tools and implemented foundational models for practical problems.',
        image: '/certificates/AICTE_i3.png',
      },
      {
        title: 'Web Full Stack Developer',
        duration: 'Apr – Jun 2025',
        description: 'Developed dynamic web applications with API integration and responsive user interfaces.',
        image: '/certificates/AICTE_i4.png',
      },
      {
        title: 'Java Full Stack Developer',
        duration: 'Jul – Sep 2025',
        description: 'Built full-stack applications with backend integration and responsive frontend design.',
        image: '/certificates/AICTE_i5.png',
      },
      {
        title: 'Google Android Developer',
        duration: 'Oct – Dec 2025',
        description: 'Developed Android applications with a focus on user interface and functionality.',
        image: '/certificates/AICTE_i6.png',
      },
    ],
  },
];

const CERTIFICATES_PER_PAGE = 9;

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);
  const [activeSkillsCategory, setActiveSkillsCategory] = useState('Programming Languages');

  const allSkills = skillCategories.flatMap((category) => category.skills);
  const selectedSkills = skillCategories.find((category) => category.name === activeSkillsCategory)?.skills ?? [];

  const [activeCertCategory, setActiveCertCategory] = useState('All');
  const [certPage, setCertPage] = useState(1);
  const [previewCert, setPreviewCert] = useState(null);
  const [activeInternshipGroup, setActiveInternshipGroup] = useState('infosys');
  const [activeOthersView, setActiveOthersView] = useState('computer-courses');
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);

  const filteredCertifications = certificationsData.filter(
    (cert) => activeCertCategory === 'All' || cert.category === activeCertCategory,
  );
  const certificatePageCount = Math.ceil(filteredCertifications.length / CERTIFICATES_PER_PAGE);
  const visibleCertifications = filteredCertifications.slice(
    (certPage - 1) * CERTIFICATES_PER_PAGE,
    certPage * CERTIFICATES_PER_PAGE,
  );
  const firstVisibleCertificate = filteredCertifications.length
    ? (certPage - 1) * CERTIFICATES_PER_PAGE + 1
    : 0;
  const lastVisibleCertificate = Math.min(
    certPage * CERTIFICATES_PER_PAGE,
    filteredCertifications.length,
  );

  const goToCertificatePage = (page) => {
    setCertPage(page);
    document.getElementById('certificates-grid')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPreviewCert(null);
        setSelectedBadge(null);
      }
    };
    if (previewCert || selectedBadge) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [previewCert, selectedBadge]);

  // Nav links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'My Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'others', label: 'Others' },
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

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setContactSubmitting(true);
    setContactStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Your message could not be saved. Please try again later.');
      }

      form.reset();
      setContactStatus({ type: 'success', message: 'Your message was saved successfully.' });
    } catch (error) {
      setContactStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your message could not be saved. Please try again later.',
      });
    } finally {
      setContactSubmitting(false);
    }
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
              <span>Hello, I'm</span>
            </div>
            <h1 className="hero-name">Illa Jyothi Bhavani</h1>
            <div className="hero-roles">
              <span className="hero-role-tag">
                <span>Aspiring Java Developer</span>
              </span>
              <span className="hero-role-tag">
                <span>AI Full Stack Developer</span>
              </span>
              <span className="hero-role-tag">
                <span>Building GenAI &amp; Agentic AI Applications</span>
              </span>
              <span className="hero-role-tag">
                <span>Ex-Intern @ Infosys Springboard</span>
              </span>
            </div>
            <p className="hero-bio">
              Passionate Computer Science graduate specializing in <strong>Artificial Intelligence &amp; Data Science</strong>. I build high-performance Java applications, intelligent GenAI &amp; Agentic systems, and intuitive full-stack web solutions.
            </p>
            <div className="hero-cta-row">
              <button className="cta-btn primary" onClick={() => scrollTo('projects')}>
                <span>View Projects</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <button className="cta-btn secondary" onClick={() => scrollTo('contact')}>
                <span>Contact Me</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
              </button>
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
              <h3 className="about-lead">I build thoughtful software that turns <span>ideas into impact.</span></h3>
              <p>
                I am a <strong>B.Tech graduate in Computer Science Engineering, specialising in
                  Artificial Intelligence &amp; Data Science</strong>. I enjoy turning complex problems into
                useful, maintainable digital products, from reliable backend services to intuitive interfaces.
              </p>
              <p>
                My toolkit spans <strong>Java, Python, React, FastAPI, Flask, and MySQL</strong>. I explore
                Generative AI and Agentic AI where they make a product more useful, with clean architecture,
                thoughtful APIs, and scalability always in view.
              </p>
              <p>
                Internships, hackathons, and personal projects have taught me to learn quickly and build
                collaboratively. I am growing my skills in backend development and system design, and I am
                open to opportunities to create dependable software with real-world value.
              </p>
              <div className="about-focus-list" aria-label="Areas of focus">
                <span>Backend systems</span>
                <span>AI applications</span>
                <span>Full-stack development</span>
              </div>
            </div>
            {/* ── Laptop Mockup & Profile Card ── */}
            <aside className="laptop-wrapper" aria-label="Developer profile">
              <div className="laptop-container">
                <div className="laptop-glow" aria-hidden="true" />
                <img
                  src={laptopMockup}
                  alt="Laptop mockup displaying developer profile"
                  className="laptop-mockup-img"
                />
                <div className="laptop-screen-overlay">
                  <div className="ls-titlebar">
                    <span className="ls-dot ls-dot-red" />
                    <span className="ls-dot ls-dot-yellow" />
                    <span className="ls-dot ls-dot-green" />
                    <span className="ls-titlebar-label">profile</span>
                  </div>
                  <div className="ls-profile-head">
                    <div className="ls-monogram" aria-hidden="true">JB</div>
                    <div className="ls-profile-info">
                      <p className="ls-label">DEVELOPER PROFILE</p>
                      <h3 className="ls-name">Illa Jyothi Bhavani</h3>
                      <p className="ls-role">Java Developer · AI Full Stack</p>
                    </div>
                  </div>
                  <div className="ls-info-grid">
                    <div className="ls-info-item">
                      <span className="ls-info-key">DEGREE</span>
                      <strong className="ls-info-val">B.Tech CSE (AI &amp; DS)</strong>
                    </div>
                    <div className="ls-info-item">
                      <span className="ls-info-key">COLLEGE</span>
                      <strong className="ls-info-val">KIETW, Kakinada</strong>
                    </div>
                    <div className="ls-info-item">
                      <span className="ls-info-key">CGPA</span>
                      <strong className="ls-info-val">8.28 / 10</strong>
                    </div>
                    <div className="ls-info-item">
                      <span className="ls-info-key">LOCATION</span>
                      <strong className="ls-info-val">Mummidivaram, AP</strong>
                    </div>
                  </div>
                  <div className="ls-email-row">
                    <span className="ls-info-key">EMAIL</span>
                    <a href="mailto:illajyothibhavani@gmail.com" className="ls-email">illajyothibhavani@gmail.com</a>
                  </div>
                  <p className="ls-availability">
                    <span className="ls-avail-dot" aria-hidden="true" />
                    Available for opportunities
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — EDUCATION
      ═══════════════════════════════════════════ */}
      <section id="education" className="page-section alt-bg">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Education</h2>
            <div className="section-divider" />
          </div>
          <div className="education-card-grid">
            <article className="education-card education-card-featured">
              <div className="education-copy">
                <p className="education-years">2022 - 2026</p>
                <h3 className="education-qualification">B.Tech, Computer Science Engineering</h3>
                <p className="education-specialization">Artificial Intelligence &amp; Data Science</p>
                <p className="education-institution">Kakinada Institute of Engineering and Technology for Women (KIETW)</p>
              </div>
              {educationImageUrl('college-kietw') && (
                <img className="education-image" src={educationImageUrl('college-kietw')} alt="KIETW college campus" loading="lazy" />
              )}
              <div className="education-score-row">
                <strong className="education-score">8.28</strong>
                <span className="education-score-label">CGPA / 10</span>
              </div>
            </article>
            <article className="education-card">
              <div className="education-copy">
                <p className="education-years">2020 - 2022</p>
                <h3 className="education-qualification">Intermediate, MPC</h3>
                <p className="education-specialization">Mathematics, Physics, Chemistry</p>
                <p className="education-institution">MGR Government Junior College</p>
              </div>
              {educationImageUrl('junior-college-mgr') && (
                <img className="education-image" src={educationImageUrl('junior-college-mgr')} alt="MGR Government Junior College campus" loading="lazy" />
              )}
              <div className="education-score-row">
                <strong className="education-score">81%</strong>
              </div>
            </article>
            <article className="education-card">
              <div className="education-copy">
                <p className="education-years">2019 - 2020</p>
                <h3 className="education-qualification">10th Standard, SSC</h3>
                <p className="education-specialization">General Sciences &amp; Mathematics</p>
                <p className="education-institution">Ravindra High School</p>
              </div>
              {educationImageUrl('school-ravindra') && (
                <img className="education-image" src={educationImageUrl('school-ravindra')} alt="Ravindra High School campus" loading="lazy" />
              )}
              <div className="education-score-row">
                <strong className="education-score">96%</strong>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — SKILLS
      ═══════════════════════════════════════════ */}
      <section id="skills" className="page-section">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">My Skills</h2>
            <div className="section-divider" />
          </div>
          <div className="skills-category-tabs" role="tablist" aria-label="Skill categories">
            {skillCategories.map((category) => (
              <button
                key={category.name}
                type="button"
                className={`skills-category-tab ${activeSkillsCategory === category.name ? 'active' : ''}`}
                id={`skills-tab-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                role="tab"
                aria-selected={activeSkillsCategory === category.name}
                aria-controls="skills-category-panel"
                onClick={() => setActiveSkillsCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div
            className="skills-category-panel"
            id="skills-category-panel"
            role="tabpanel"
            aria-labelledby={`skills-tab-${activeSkillsCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            key={activeSkillsCategory}
          >
            <div className="skills-card-grid">
              {selectedSkills.map(({ name, Icon, color }) => (
                <div className="skills-tech-card" key={name}>
                  <Icon className="skills-tech-icon" style={{ color }} aria-hidden="true" />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-marquee-section">
            <p className="skills-marquee-label">All Technologies</p>
            <div className="skills-marquee" aria-label="All technologies">
              <div className="skills-marquee-track">
                {[0, 1].map((copy) => (
                  <div className="skills-marquee-group" aria-hidden={copy === 1} key={copy}>
                    {allSkills.map(({ name, Icon, color }, index) => (
                      <span className="skills-marquee-item" key={`${name}-${index}`}>
                        <Icon style={{ color }} aria-hidden="true" />
                        <span>{name}</span>
                      </span>
                    ))}
                  </div>
                ))}
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
                  <a href="https://blood-donation-khaki-beta.vercel.app/" target="_blank" rel="noreferrer" className="proj-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3h7v7" /><path d="M10 14 21 3" /><path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" /></svg>
                    Live Demo
                  </a>
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
          <div className="internship-groups">
            {internshipGroups.map((group, index) => (
              <section
                className={`internship-group ${activeInternshipGroup === group.id ? 'is-open' : ''}`}
                key={group.id}
              >
                <button
                  type="button"
                  className="internship-group-toggle"
                  onClick={() => setActiveInternshipGroup((current) => current === group.id ? null : group.id)}
                  aria-expanded={activeInternshipGroup === group.id}
                  aria-controls={`internship-content-${group.id}`}
                >
                  <span className="internship-group-index">0{index + 1}</span>
                  <span className="internship-group-title">
                    <span className="internship-group-name">{group.organization}</span>
                    <span className="internship-group-program">{group.program}</span>
                  </span>
                  <span className="internship-group-count">
                    {String(group.internships.length).padStart(2, '0')} {group.internships.length === 1 ? 'CERTIFICATE' : 'CERTIFICATES'}
                  </span>
                  <span className="internship-group-chevron" aria-hidden="true" />
                </button>
                {activeInternshipGroup === group.id && (
                  <div className="internship-card-grid" id={`internship-content-${group.id}`}>
                    {group.internships.map((internship) => (
                      <article className="internship-card" key={internship.title}>
                        <button
                          type="button"
                          className="internship-certificate"
                          onClick={() => setPreviewCert({
                            title: internship.title,
                            issuer: group.organization,
                            image: internship.image,
                          })}
                          aria-label={`View ${internship.title} internship certificate`}
                        >
                          <img
                            src={internship.image}
                            alt={`${internship.title} internship certificate`}
                            loading="lazy"
                          />
                          <span className="internship-certificate-action">View certificate</span>
                        </button>
                        <div className="internship-card-content">
                          <span className="internship-duration">{internship.duration}</span>
                          <h4>{internship.title}</h4>
                          <p>{internship.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
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
            <h2 className="section-heading">Certificates &amp; Certifications</h2>
            <div className="section-divider" />
          </div>

          <div className="certs-section-wrap">
            {/* Filter Pills */}
            <div className="certs-filters-container">
              <div className="certs-filter-tabs" role="tablist" aria-label="Certificate filters">
                {CERT_CATEGORIES.map((cat) => {
                  const count =
                    cat.id === 'All'
                      ? certificationsData.length
                      : certificationsData.filter((c) => c.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`cert-filter-pill ${activeCertCategory === cat.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCertCategory(cat.id);
                        setCertPage(1);
                      }}
                    >
                      <span className="cert-pill-label">{cat.label}</span>
                      <span className="cert-pill-badge">{count}</span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Active Filter Info & Count */}
            <div className="cert-results-header">
              <p className="cert-results-text">
                Showing <strong>{firstVisibleCertificate}–{lastVisibleCertificate}</strong> of{' '}
                <strong>{filteredCertifications.length}</strong> credentials
                {activeCertCategory !== 'All' && <span> in <span className="highlight-tag">{activeCertCategory}</span></span>}
              </p>
              {activeCertCategory !== 'All' && (
                <button
                  type="button"
                  className="cert-reset-btn"
                  onClick={() => {
                    setActiveCertCategory('All');
                    setCertPage(1);
                  }}
                >
                  Show All
                </button>
              )}
            </div>

            {/* Certifications Grid */}
            {filteredCertifications.length > 0 ? (
              <>
                <div className="certs-modern-grid" id="certificates-grid">
                {visibleCertifications.map((c) => (
                  <div
                    className="cert-modern-card"
                    key={c.id}
                    onClick={() => setPreviewCert(c)}
                    role="button"
                    tabIndex={0}
                    title={`Click to view ${c.title}`}
                  >
                    {/* Media / Thumbnail preview */}
                    <div className="cert-card-media">
                      {c.image ? (
                        <img
                          src={c.image}
                          alt={c.title}
                          className="cert-card-img"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.cert-card-fallback');
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div
                        className="cert-card-fallback"
                        style={{ display: c.image ? 'none' : 'flex' }}
                      >
                        <div className="cert-fallback-icon-wrap">
                          <FaCertificate />
                        </div>
                        <span className="cert-fallback-title">{c.issuer}</span>
                        <span className="cert-fallback-hint">Click to view</span>
                      </div>
                    </div>

                    {/* Card Content - Clean & Compact */}
                    <div className="cert-card-content">
                      <h3 className="cert-card-title">{c.title}</h3>
                      <div className="cert-card-meta">
                        <span className={`cert-type-badge ${c.type === 'Certification' ? 'is-certification' : 'is-certificate'}`}>
                          {c.type}
                        </span>
                        <span className="cert-card-issuer">{c.issuer}</span>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
                {certificatePageCount > 1 && (
                  <nav className="cert-pagination" aria-label="Certificate pages">
                    <button
                      type="button"
                      className="cert-page-btn cert-page-direction"
                      onClick={() => goToCertificatePage(certPage - 1)}
                      disabled={certPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: certificatePageCount }, (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          className={`cert-page-btn ${certPage === pageNumber ? 'active' : ''}`}
                          onClick={() => goToCertificatePage(pageNumber)}
                          aria-label={`Page ${pageNumber}`}
                          aria-current={certPage === pageNumber ? 'page' : undefined}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      className="cert-page-btn cert-page-direction"
                      onClick={() => goToCertificatePage(certPage + 1)}
                      disabled={certPage === certificatePageCount}
                    >
                      Next
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className="cert-empty-box">
                <FaCertificate className="cert-empty-icon" />
                <h3>No certificates found in this filter</h3>
                <p>
                    Credentials for <strong>{activeCertCategory}</strong> are ready to be added.
                </p>
                <button
                  type="button"
                  className="cert-reset-btn"
                  onClick={() => {
                    setActiveCertCategory('All');
                    setCertPage(1);
                  }}
                >
                  Show All Credentials
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 8 — OTHERS
      ═══════════════════════════════════════════ */}
      <section id="others" className="page-section others-section">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Others</h2>
            <div className="section-divider" />
          </div>

          <div className="others-switcher" role="group" aria-label="Choose Others content">
            <button
              type="button"
              className={`others-switch-button ${activeOthersView === 'computer-courses' ? 'active' : ''}`}
              onClick={() => setActiveOthersView('computer-courses')}
              aria-pressed={activeOthersView === 'computer-courses'}
            >
              <span>Computer Courses</span>
              <span className="others-switch-count">{String(computerCourses.length).padStart(2, '0')}</span>
            </button>
            <button
              type="button"
              className={`others-switch-button ${activeOthersView === 'achievements' ? 'active' : ''}`}
              onClick={() => setActiveOthersView('achievements')}
              aria-pressed={activeOthersView === 'achievements'}
            >
              <span>Achievements</span>
              <span className="others-switch-count">{String(honorsAndAwards.length).padStart(2, '0')}</span>
            </button>
            <button
              type="button"
              className={`others-switch-button ${activeOthersView === 'badges' ? 'active' : ''}`}
              onClick={() => setActiveOthersView('badges')}
              aria-pressed={activeOthersView === 'badges'}
            >
              <span>Badges</span>
              <span className="others-switch-count">{String(infosysBadges.length).padStart(2, '0')}</span>
            </button>
          </div>

          <div className="others-panel" aria-live="polite">
            {activeOthersView === 'computer-courses' ? (
              <div className="others-block">
                <div className="others-block-heading">
                  <div>
                    <h3>Computer Courses</h3>
                  </div>
                  <span className="others-count">{computerCourses.length} courses</span>
                </div>
                <div className="others-achievement-grid">
                  {computerCourses.map((course) => (
                    <article className="others-award-card" key={course.id}>
                      <div className="others-award-topline">
                        <span className="others-award-icon"><FaCertificate aria-hidden="true" /></span>
                        <span className="others-award-badge">{course.badge}</span>
                      </div>
                      <h4>{course.title}</h4>
                      {course.issuer ? <p className="others-course-issuer">{course.issuer}</p> : null}
                      <p>{course.desc}</p>
                      {course.image ? (
                        <div className="others-course-preview-row">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="others-course-thumb"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            className="others-course-preview-btn"
                            onClick={() => setPreviewCert({
                              title: course.title,
                              issuer: course.badge,
                              image: course.image,
                            })}
                            aria-label={`View ${course.title} certificate`}
                          >
                            View certificate
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="others-course-preview-btn"
                          onClick={() => setPreviewCert({
                            title: course.title,
                            issuer: course.badge,
                            image: course.image,
                          })}
                          aria-label={`View ${course.title} certificate`}
                        >
                          View certificate
                        </button>
                      )}
                      <a href={course.link} target="_blank" rel="noreferrer" className="others-post-link">
                        View LinkedIn post <FaArrowUpRightFromSquare aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            ) : activeOthersView === 'achievements' ? (
              <div className="others-block">
                <div className="others-block-heading">
                  <div>
                    <h3>Achievements</h3>
                  </div>
                  <span className="others-count">{honorsAndAwards.length} highlights</span>
                </div>
                <div className="others-achievement-grid">
                  {honorsAndAwards.map((award) => (
                    <article className="others-award-card" key={award.id}>
                      <div className="others-award-topline">
                        <span className="others-award-icon"><FaTrophy aria-hidden="true" /></span>
                        <span className="others-award-badge">{award.badge}</span>
                      </div>
                      <h4>{award.title}</h4>
                      <p>{award.desc}</p>
                      <a href={award.link} target="_blank" rel="noreferrer" className="others-post-link">
                        View LinkedIn post <FaArrowUpRightFromSquare aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="others-block others-badges-block">
                <div className="others-block-heading">
                  <div>
                    <h3>Infosys Springboard badges</h3>
                  </div>
                  <span className="others-count">{infosysBadges.length} badges</span>
                </div>
                <div className="others-badge-grid">
                  {infosysBadges.map((badge) => (
                    <button
                      type="button"
                      className="others-badge-card"
                      key={badge.title}
                      onClick={() => setSelectedBadge(badge)}
                      aria-label={`View ${badge.title} badge`}
                    >
                      <span className="others-badge-art">
                        <img src={badge.image} alt={`${badge.title} Infosys Springboard badge`} loading="lazy" />
                      </span>
                      <span className="others-badge-title">{badge.title}</span>
                      <span className="others-badge-issuer">Infosys Springboard</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 9 — CONTACT
      ═══════════════════════════════════════════ */}
      <section id="contact" className="page-section">
        <div className="section-container">
          <div className="section-heading-wrap">
            <h2 className="section-heading">Get In Touch</h2>
            <div className="section-divider" />
            <p className="contact-intro">I'm open to full-time opportunities, internships, and collaborations. Feel free to reach out!</p>
          </div>
          <div className="contact-card">
            <div className="contact-social-links" aria-label="Contact links">
              <a
                href="https://www.linkedin.com/in/illa-jyothi-bhavani/"
                target="_blank"
                rel="noreferrer"
                className="contact-social-link"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin aria-hidden="true" />
              </a>
              <a
                href="https://github.com/IllaJyoCodingPro"
                target="_blank"
                rel="noreferrer"
                className="contact-social-link"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub aria-hidden="true" />
              </a>
              <a
                href="mailto:illajyothibhavani@gmail.com"
                className="contact-social-link"
                aria-label="Email"
                title="Email"
              >
                <FaEnvelope aria-hidden="true" />
              </a>
            </div>
            <a className="contact-location" href="mailto:illajyothibhavani@gmail.com">
              illajyothibhavani@gmail.com
            </a>
            <div className="contact-message-prompt">
              <h3>Send a Message</h3>
              <p>I'll reply within <strong>24 hours</strong>.</p>
            </div>
            <div className="contact-card-divider" />

            <form className="contact-card-form" onSubmit={handleContactSubmit}>
              <div className="contact-fields">
                <div className="contact-form-field">
                  <label htmlFor="cf-name">Your Name</label>
                  <input id="cf-name" name="name" type="text" placeholder="e.g. John Doe" autoComplete="name" maxLength={100} required />
                </div>
                <div className="contact-form-field">
                  <label htmlFor="cf-email">Email Address</label>
                  <input id="cf-email" name="email" type="email" placeholder="e.g. john@example.com" autoComplete="email" maxLength={254} required />
                </div>
                <div className="contact-form-field contact-message-field">
                  <label htmlFor="cf-msg">Message</label>
                  <textarea id="cf-msg" name="message" rows={4} placeholder="Your message or opportunity..." maxLength={5000} required />
                </div>
              </div>
              <div className="contact-form-trap" aria-hidden="true">
                <label htmlFor="cf-website">Leave this field empty</label>
                <input id="cf-website" name="website" type="text" tabIndex="-1" autoComplete="off" />
              </div>
              <button type="submit" className="contact-send-button" disabled={contactSubmitting}>
                {contactSubmitting ? 'Saving...' : 'Send Message'} <FaArrowRight aria-hidden="true" />
              </button>
              {contactStatus && (
                <p className={`contact-form-status ${contactStatus.type}`} role="status" aria-live="polite">
                  {contactStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-profile">
            <button className="footer-name" onClick={() => scrollTo('home')}>
              Illa Jyothi Bhavani
            </button>
            <p className="footer-sub">
              B.Tech graduate in AI &amp; Data Science, building useful AI applications and thoughtful full-stack experiences.
            </p>
          </div>
          <nav className="footer-navigation" aria-label="Footer navigation">
            <h2 className="footer-column-title">Explore</h2>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button type="button" className="footer-nav-link" onClick={() => scrollTo(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-connect">
            <h2 className="footer-column-title">Connect</h2>
            <div className="footer-social-links">
              <a href="https://www.linkedin.com/in/illa-jyothi-bhavani/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedin aria-hidden="true" />
              </a>
              <a href="https://github.com/IllaJyoCodingPro" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <FaGithub aria-hidden="true" />
              </a>
              <a href="mailto:illajyothibhavani@gmail.com" aria-label="Email" title="Email">
                <FaEnvelope aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Illa Jyothi Bhavani. All rights reserved.</p>
          <p className="footer-built">Made with React</p>
        </div>
      </footer>

      {/* ── Certificate Preview Modal / Lightbox ── */}
      {previewCert && (
        <div
          className="cert-modal-backdrop"
          onClick={() => setPreviewCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview of ${previewCert.title}`}
        >
          <div
            className="cert-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-modal-header">
              <div>
                <h3 className="cert-modal-title">{previewCert.title}</h3>
              </div>
              <button
                type="button"
                className="cert-modal-close"
                onClick={() => setPreviewCert(null)}
                aria-label="Close modal"
              >
                <FaXmark />
              </button>
            </div>

            <div className="cert-modal-body">
              <div className="cert-modal-img-container">
                {previewCert.image ? (
                  <img
                    src={previewCert.image}
                    alt={previewCert.title}
                    className="cert-modal-img"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.cert-modal-img-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="cert-modal-img-fallback"
                  style={{ display: previewCert.image ? 'none' : 'flex' }}
                >
                  <FaCertificate className="cert-modal-fallback-icon" />
                  <h4>Certificate Image Preview</h4>
                  <p>Move your certificate file into:</p>
                  <code>public/certificates/{previewCert.image ? previewCert.image.replace('/certificates/', '') : 'fmml.jpg'}</code>
                  <span className="cert-modal-fallback-sub">
                    Once placed in that folder, your certificate will display right here automatically.
                  </span>
                </div>
              </div>

            </div>

            <div className="cert-modal-footer">
              {previewCert.image && (
                <a
                  href={previewCert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-modal-link-btn"
                >
                  <FaArrowUpRightFromSquare /> Open Full Image
                </a>
              )}
              <button
                type="button"
                className="cert-modal-close-btn"
                onClick={() => setPreviewCert(null)}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedBadge && (
        <div
          className="badge-modal-backdrop"
          onClick={() => setSelectedBadge(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedBadge.title} badge`}
        >
          <div className="badge-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="badge-modal-header">
              <div>
                <span className="others-eyebrow">INFOSYS SPRINGBOARD</span>
                <h3>{selectedBadge.title}</h3>
              </div>
              <button
                type="button"
                className="cert-modal-close"
                onClick={() => setSelectedBadge(null)}
                aria-label="Close badge image"
              >
                <FaXmark />
              </button>
            </div>
            <div className="badge-modal-image-wrap">
              <img src={selectedBadge.image} alt={`${selectedBadge.title} Infosys Springboard badge`} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
