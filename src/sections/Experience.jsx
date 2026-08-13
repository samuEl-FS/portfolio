import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Building, ExternalLink } from 'lucide-react';
import './Experience.css';

function CompanyLogo({ src, alt }) {
  const [hasError, setHasError] = useState(false);
  
  if (hasError || !src) {
    return (
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#38BDF8'
      }}>
        <Building size={16} />
      </div>
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '6px' }}
      onError={() => setHasError(true)}
    />
  );
}

const experiences = [
  {
    company: 'Accenture India Pvt. Ltd.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
    link: 'https://www.accenture.com/us-en',
    role: 'Software Engineer Team Lead',
    period: 'Aug 2024 - Present',
    location: 'Mumbai, India',
    projects: [
      {
        name: 'Philip Morris International',
        highlights: [
          'Developed an advanced Query Generator supporting unlimited nested conditions.',
          'Implemented dynamic logical operators (AND, OR, NOT) for business rule creation.',
          'Built reusable React components for scalable rule management.'
        ],
        tech: ['React', 'TypeScript', 'Material UI']
      },
      {
        name: 'Crédit Agricole Retail Bank',
        highlights: [
          'Built multiple enterprise frontend applications from scratch.',
          'Designed scalable architecture following MVVM principles.',
          'Developed reusable UI components and integrated secure banking APIs.'
        ],
        tech: ['React', 'Angular', 'TypeScript', 'Redux']
      },
      {
        name: 'Unified Marketing Platform & Synops 2.0',
        highlights: [
          'Led a team of 6 frontend engineers.',
          'Built Synops 2.0 from scratch using TurboRepo Monorepo.',
          'Designed reusable component architecture and shared UI libraries.',
          'Established coding standards, project structure, and development guidelines.',
          'Participated in major architectural decisions for enterprise applications.'
        ],
        tech: ['React', 'TurboRepo', 'Monorepo', 'Storybook', 'Module Federation', 'CI-CD', 'Azure Cloud', 'Docker']
      }
    ],
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'Azure Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' }
    ]
  },
  {
    company: 'JPMorgan Chase & Co.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/J_P_Morgan_Chase_Logo_2008-1.svg/512px-J_P_Morgan_Chase_Logo_2008-1.svg.png',
    link: 'https://www.jpmorgan.com/IN/en/about-us',
    role: 'Senior Software Engineer',
    period: 'Nov 2022 - Jul 2024',
    location: 'Mumbai, India',
    points: [
      'Developed and maintained large-scale banking applications using modern frontend technologies.',
      'Upgraded multiple Angular and React applications to the latest versions.',
      'Managed production deployments using the Jules CI/CD pipeline.',
      'Collaborated with cross-functional teams to deliver scalable, high-performance applications.',
      'Improved application performance, maintainability, and user experience.'
    ],
    tech: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' }
    ]
  },
  {
    company: 'Privacera, Inc.',
    logo: 'https://privacera.com/wp-content/uploads/2021/04/privacera-logo.svg',
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
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'MobX', icon: 'https://raw.githubusercontent.com/mobxjs/mobx/main/website/static/img/mobx.png' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'Webpack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg' },
      { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' }
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
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' }
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
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' }
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
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg' }
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
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
      { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' }
    ]
  }
];

export default function Experience() {
  const [expandedIndices, setExpandedIndices] = useState(() => new Set(experiences.map((_, i) => i))); // All items expanded by default

  const toggleExpand = (idx) => {
    setExpandedIndices(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
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
              background: 'linear-gradient(to bottom, rgba(0, 242, 254, 0.4), rgba(0, 136, 255, 0.05))',
              opacity: 0.8,
              zIndex: 1
            }}
          />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const isExpanded = expandedIndices.has(index);

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
                      border: '2.5px solid #00F2FE',
                      boxShadow: '0 0 15px rgba(0, 242, 254, 0.5)',
                      background: '#030712',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Briefcase size={14} style={{ color: '#00F2FE' }} />
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
                    border: isExpanded ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px',
                    padding: '24px',
                    textAlign: 'left',
                    boxShadow: isExpanded ? '0 10px 30px rgba(0, 242, 254, 0.1)' : '0 4px 20px rgba(0, 0, 0, 0.2)',
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
                        background: 'rgba(0, 242, 254, 0.1)',
                        border: '1px solid rgba(0, 242, 254, 0.2)',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#00F2FE',
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <CompanyLogo src={exp.logo} alt={exp.company} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        {exp.role}
                      </h3>
                      <span style={{ fontSize: '0.9rem', color: '#00F2FE', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {exp.company}
                        {exp.link && (
                          <a 
                            href={exp.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: '#00F2FE', display: 'inline-flex', alignItems: 'center' }}
                            title="Visit website"
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Expandable achievements / projects */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        {exp.projects ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px', marginTop: '8px' }}>
                            {exp.projects.map((proj, pIdx) => (
                              <div 
                                key={pIdx} 
                                className="glass-panel" 
                                style={{ 
                                  padding: '16px', 
                                  borderRadius: '16px', 
                                  background: 'rgba(255,255,255,0.01)', 
                                  border: '1px solid rgba(255,255,255,0.05)',
                                  cursor: 'default'
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: '#00F2FE', marginBottom: '8px' }}>
                                  ⚡ {proj.name}
                                </h4>
                                <ul
                                  style={{
                                    paddingLeft: '16px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.88rem',
                                    lineHeight: '1.6',
                                    marginBottom: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '6px'
                                  }}
                                >
                                  {proj.highlights.map((high, hIdx) => (
                                    <li key={hIdx} style={{ listStyleType: 'square' }}>{high}</li>
                                  ))}
                                </ul>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                  {proj.tech.map((tName, tIdx) => (
                                    <span 
                                      key={tIdx} 
                                      className="tech-tag"
                                      style={{ 
                                        fontSize: '0.7rem', 
                                        padding: '3px 8px', 
                                        borderRadius: '6px', 
                                        background: 'rgba(0, 242, 254, 0.08)', 
                                        border: '1px solid rgba(0, 242, 254, 0.15)',
                                        color: '#00F2FE',
                                        fontWeight: 500
                                      }}
                                    >
                                      {tName}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
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
                        )}
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
                      color: '#00F2FE',
                      marginBottom: '16px',
                      fontWeight: 600
                    }}
                  >
                    {isExpanded ? (
                      <>Collapse achievements <ChevronUp size={14} /></>
                    ) : (
                      <>Expand achievements / projects <ChevronDown size={14} /></>
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
