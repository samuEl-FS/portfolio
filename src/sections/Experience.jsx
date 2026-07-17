import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import './Experience.css';

const experiences = [
  {
    company: 'Accenture',
    role: 'Software Engineer Team Lead',
    period: 'Oct 2024 - Present',
    location: 'Mumbai, Maharashtra',
    points: [
      'Guiding a high-performing development team to build next-generation enterprise frontend modules.',
      'Architecting and implementing scalable React dashboards and styling design systems.',
      'Leading codebase optimizations, code reviews, and aligning architectural goals with product stakeholders.',
      'Resolving business-critical system requirements and ensuring high-quality software delivery standards.'
    ],
    tech: [
      { name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
      { name: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg' },
      { name: 'TypeScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' }
    ]
  },
  {
    company: 'Privacera, Inc.',
    role: 'Senior Software Engineer',
    period: 'Nov 2020 - Oct 2024',
    location: 'Mumbai, Maharashtra',
    points: [
      'Led the frontend architecture upgrade of a large-scale React application from React 15 to React 17 with modern Hooks.',
      'Implemented Webpack tree shaking and bundle optimization, resulting in a substantial reduction in initial bundle size.',
      'Successfully migrated the UI framework from Bootstrap to Material-UI, creating custom responsive design components.',
      'Wrote custom Babel automation scripts to scrub legacy code blocks and deprecated libraries from the codebase.',
      'Developed reusable generic UI component libraries that reduced dashboard page loading delays.',
      'Participated in architectural alignment calls with upper management and directly resolved business-critical customer issues.'
    ],
    tech: [
      { name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
      { name: 'MobX', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
      { name: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg' },
      { name: 'Webpack', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
      { name: 'Material UI', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Alternative_Material_UI_logo.svg' }
    ]
  },
  {
    company: 'GreyAtom Edutech Pvt. Ltd',
    role: 'Front-End Developer',
    period: 'Jul 2019 - Sep 2020',
    location: 'Mumbai, Maharashtra',
    points: [
      'Developed a core interactive online code editor supporting multiple programming languages using Monaco Editor.',
      'Optimized loading and user interactions by leveraging React Suspense, Lazy Loading, and Fallback boundaries.',
      'Designed and coded a centralized Custom Form API from scratch using React, Redux, and custom hooks.'
    ],
    tech: [
      { name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
      { name: 'Redux', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
      { name: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg' }
    ]
  },
  {
    company: 'eClerx (PayPal Process)',
    role: 'Front-End Developer',
    period: 'May 2018 - Jun 2019',
    location: 'Navi Mumbai, Maharashtra',
    points: [
      'Constructed responsive PayPal landing pages and static content interfaces with strict design requirements.',
      'Designed and engineered a custom Vanilla JavaScript carousel component with high-fps slider transitions.',
      'Created custom jQuery utility packages for comprehensive client-side form validation.',
      'Built a productive Chrome Extension using jQuery to automate and speed up GitHub pull request workflows.'
    ],
    tech: [
      { name: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg' },
      { name: 'jQuery', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/JQuery_logo_by_JQuery.svg' },
      { name: 'HTML5', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
      { name: 'CSS3', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' }
    ]
  },
  {
    company: 'LocoBuzz',
    role: 'UI Developer',
    period: 'Nov 2017 - May 2018',
    location: 'Mumbai, Maharashtra',
    points: [
      'Built static webpages using HTML5, CSS3, Javascript, and jQuery.'
    ],
    tech: [
      { name: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg' },
      { name: 'HTML5', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
      { name: 'CSS3', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
      { name: 'jQuery', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/JQuery_logo_by_JQuery.svg' }
    ]
  },
  {
    company: 'Freelancing',
    role: 'Freelance Frontend Engineer',
    period: 'Aug 2017 - Oct 2017',
    location: 'Remote',
    points: [
      'Built a comprehensive single-page online education portal with complex RBAC (Role-Based Access Control) for admins and students.',
      'Implemented front-end dashboard panels utilizing React, Redux, GraphQL, and Material UI.'
    ],
    tech: [
      { name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
      { name: 'Redux', icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
      { name: 'GraphQL', icon: 'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg' }
    ]
  }
];

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState(0); // First item expanded by default

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="experience" className="section experience-section" style={{ position: 'relative' }}>
      <div className="container">

        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title text-gradient text-center"
          >
            Professional Experience
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-title-underline"
          />
        </div>

        <div className="timeline-container" style={{ position: 'relative', marginTop: '48px' }}>

          {/* Scroll Grown Path */}
          <div
            className="timeline-line"
            style={{
              background: 'linear-gradient(to bottom, rgba(56, 189, 248, 0.4), rgba(59, 130, 246, 0.05))',
              opacity: 0.8,
              zIndex: 1
            }}
          />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedIndex === index;

            return (
              <div
                key={index}
                className={`timeline-item ${isEven ? 'left' : 'right'}`}
              >

                {/* Connector Dot */}
                <div className="timeline-dot-wrapper">
                  <div
                    className="timeline-dot"
                    style={{
                      border: '2.5px solid #38BDF8',
                      boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
                      background: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Briefcase size={14} style={{ color: '#38BDF8' }} />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                  className="timeline-card glass-panel clickable"
                  onClick={() => toggleExpand(index)}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.45)',
                    border: isExpanded ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '24px',
                    textAlign: 'left',
                    boxShadow: isExpanded ? '0 10px 30px rgba(56, 189, 248, 0.1)' : '0 4px 20px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s'
                  }}
                >
                  {/* Card Header metadata */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(56, 189, 248, 0.1)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#38BDF8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {exp.role}
                  </h3>
                  <h4 style={{ fontSize: '1rem', fontWeight: 500, color: '#60A5FA', marginBottom: '16px' }}>
                    {exp.company}
                  </h4>

                  {/* Expandable achievements points */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <ul
                          style={{
                            paddingLeft: '16px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            lineHeight: '1.6',
                            marginBottom: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                        >
                          {exp.points.map((pt, pIdx) => (
                            <li key={pIdx} style={{ listStyleType: 'square' }}>{pt}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand Chevron helper */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: '#38BDF8',
                      marginBottom: '16px',
                      fontWeight: 600
                    }}
                  >
                    {isExpanded ? (
                      <>Collapse achievements <ChevronUp size={14} /></>
                    ) : (
                      <>Expand achievements <ChevronDown size={14} /></>
                    )}
                  </div>

                  {/* Tech stack badge widgets */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {exp.tech.map((t, tIdx) => (
                        <div
                          key={tIdx}
                          className="glass-panel"
                          style={{
                            padding: '6px 12px',
                            borderRadius: '10px',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            background: 'rgba(255, 255, 255, 0.02)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                          title={t.name}
                        >
                          <img
                            src={t.icon}
                            alt={t.name}
                            style={{ width: '14px', height: '14px', objectFit: 'contain' }}
                            onError={(e) => {
                              // If image fails, replace with code symbol icon
                              e.target.style.display = 'none';
                            }}
                          />
                          <span>{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
