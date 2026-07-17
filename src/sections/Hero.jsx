import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, GraduationCap, MessageSquare, Download, Terminal as TermIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import './Hero.css';

const GithubIcon = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const roles = [
  "Senior Software Engineer",
  "React.js Specialist",
  "React Native Engineer",
  "Node.js & TypeScript Developer",
  "Full-Stack Architect"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "System ready. Welcome to Jiten's workspace console.", type: "system" },
    { text: "Type 'help' to explore his stack and experience.", type: "system" }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalBodyRef = useRef(null);

  // Role cycler typwriter effect
  useEffect(() => {
    let timer;
    const currentFullRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedRole(prev => prev.substring(0, prev.length - 1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.substring(0, displayedRole.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedRole === currentFullRole) {
      // Pause on finished word
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedRole === '') {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  // Handle CLI Terminal command submission
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    const historyUpdate = [...terminalHistory, { text: `jiten-workspace$ ${terminalInput}`, type: "user" }];

    switch (cmd) {
      case 'help':
        historyUpdate.push({ text: "Available commands:\n  about      - Display brief professional summary\n  skills     - View primary technology skillset\n  experience - Current workspace details\n  clear      - Clear terminal screen\n  confetti   - Fire particle celebration!", type: "response" });
        break;
      case 'about':
        historyUpdate.push({ text: "Jiten Gudhka is a dynamic full-stack developer with nearly 8 years of experience building scalable web and mobile applications with React.js, React Native, Node.js and TypeScript.", type: "response" });
        break;
      case 'skills':
        historyUpdate.push({ text: "Primary Stack:\n  • React.js, React Native\n  • Node.js, Express.js\n  • TypeScript, GraphQL, REST APIs\n  • MongoDB, SQL, Docker, CI/CD", type: "response" });
        break;
      case 'experience':
        historyUpdate.push({ text: "Currently serving as a Senior Software Engineer at MathesisLabs Technologies, building scalable full-stack applications with React.js, React Native, Node.js and Express.js.", type: "response" });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'confetti':
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
        historyUpdate.push({ text: "Party triggered!", type: "response" });
        break;
      default:
        historyUpdate.push({ text: `Command not found: '${cmd}'. Type 'help' for options.`, type: "error" });
    }

    setTerminalHistory(historyUpdate);
    setTerminalInput('');
  };

  // Auto scroll terminal to bottom
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Card mouse movement reflections and tilt
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 25;
    const rotateY = (x - xc) / 25;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section id="about" className="section hero-section" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* 3D Orbiting HUD Canvas behind profile */}
      <div className="hud-ring-container">
        <div className="hud-ring hud-ring-1" />
        <div className="hud-ring hud-ring-2" />
        <div className="hud-ring hud-ring-3" />
      </div>

      <div className="container">
        <div className="hero-grid">

          {/* Left: Text intro & typwriter */}
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-badge glass-panel"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <span className="badge-dot" style={{ backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }}></span>
              Available for Opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-title"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900, letterSpacing: '-0.02em' }}
            >
              Hi, I'm <span className="text-gradient-accent">Jiten Gudhka</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hero-subtitle text-glow"
              style={{ fontWeight: 600, color: '#38BDF8', height: '40px', display: 'flex', alignItems: 'center' }}
            >
              <span>{displayedRole}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                style={{ marginLeft: '4px', background: '#38BDF8', width: '3px', height: '28px' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hero-description"
              style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: '16px 0 32px' }}
            >
              Dynamic full-stack developer with nearly 8 years of experience building scalable web and mobile applications using React.js, React Native, Node.js, and TypeScript — delivering high-performance solutions across MathesisLabs and Daynil Group.
            </motion.p>

            {/* Core details rows */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-details-list"
            >
              {/* <div className="hero-detail-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin className="detail-icon" size={18} style={{ color: '#38BDF8' }} />
                <span style={{ color: 'var(--text-secondary)' }}>602, Synergy Business Park, Mumbai</span>
              </div> */}
              <div className="hero-detail-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Briefcase className="detail-icon" size={18} style={{ color: '#60A5FA' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Senior Software Engineer at MathesisLabs Technologies</span>
              </div>
              <div className="hero-detail-item" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <GraduationCap className="detail-icon" size={18} style={{ color: '#3B82F6' }} />
                <span style={{ color: 'var(--text-secondary)' }}>B.E. Computer Engineering, Universal College of Engineering (2017)</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hero-actions"
            >
              <button
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary-glow clickable"
              >
                View Showcase
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-glass clickable"
              >
                Hire Me
              </button>
            </motion.div>

            {/* Social connections */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hero-socials"
            >
              <a href="mailto:jitengudhka07@gmail.com" className="social-btn glass-panel clickable" title="Email"><Mail size={18} /></a>
              <a href="https://www.linkedin.com/in/jiten-gudhka/" target="_blank" rel="noopener noreferrer" className="social-btn glass-panel clickable" title="LinkedIn"><LinkedinIcon size={18} /></a>
            </motion.div>
          </div>

          {/* Right: Masterpiece professional card with 3D Tilt perspective */}
          <div className="hero-image-wrapper perspective-container" style={{ display: 'flex', justifyContent: 'center' }}>

            {/* Independent Orbiting tech badges around card */}
            <div className="floating-tech-badge badge-react clickable"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" /><span>React</span></div>
            <div className="floating-tech-badge badge-node clickable"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node" /><span>Node</span></div>
            <div className="floating-tech-badge badge-ts clickable"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TS" /><span>TypeScript</span></div>
            <div className="floating-tech-badge badge-aws clickable"><img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" /><span>AWS</span></div>
            <div className="floating-tech-badge badge-docker clickable"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" alt="Docker" /><span>Docker</span></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="tilt-card glass-panel"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '24px',
                background: 'rgba(15, 23, 42, 0.55)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '30px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            >
              <div className="shine-effect" />

              {/* Profile Image Wrap */}
              <div className="tilt-inner" style={{ position: 'relative', marginBottom: '20px' }}>
                <div
                  className="profile-image-inner glass-panel"
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1.5px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <img
                    src="/img/avatars/me.jpg"
                    alt="Jiten Gudhka"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                </div>

                {/* Available status & Online indicators */}
                <div
                  className="glass-panel"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: 'rgba(5, 6, 10, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
                  Online
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="tilt-inner" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                    Jiten Gudhka
                  </h3>
                </div>

                <div
                  className="glass-panel"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div>💻 <strong>Current:</strong> Available for Opportunities</div>
                  <div>⚡ <strong>Status:</strong> Active Archiving</div>
                  <div>📍 <strong>Location:</strong> Mumbai, India</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '#';
                      link.setAttribute('download', 'Jiten_Gudhka_CV.pdf');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      confetti({ particleCount: 60, spread: 40 });
                    }}
                    className="btn-primary-glow clickable"
                    style={{ fontSize: '0.8rem', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Download size={14} /> Resume
                  </button>
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-glass clickable"
                    style={{ fontSize: '0.8rem', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Mail size={14} /> Contact
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Console CLI Terminal at bottom of Hero */}
        <div className="terminal-widget-container" style={{ marginTop: '48px' }}>
          <div className="terminal-header">
            <div style={{ display: 'flex', gap: '6px' }}>
              <div className="terminal-dot red" />
              <div className="terminal-dot yellow" />
              <div className="terminal-dot green" />
            </div>
            <div className="terminal-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TermIcon size={12} /> terminal_console.sh
            </div>
          </div>
          <div
            ref={terminalBodyRef}
            className="terminal-body"
          >
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="terminal-line" style={{
                color: item.type === 'system' ? '#64748b' :
                  item.type === 'user' ? '#f8fafc' :
                    item.type === 'error' ? '#ef4444' : '#38BDF8',
                marginBottom: '4px',
                whiteSpace: 'pre-wrap'
              }}>
                {item.text}
              </div>
            ))}

            <form onSubmit={handleTerminalSubmit} className="terminal-input-line" style={{ marginTop: '6px' }}>
              <span className="terminal-prompt">jiten-workspace$</span>
              <input
                type="text"
                className="terminal-input"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type help..."
              />
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
