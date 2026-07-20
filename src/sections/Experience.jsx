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
    company: 'Freestone Infotech Pvt Ltd',
    role: 'Software Engineer',
    period: 'Jan 2020 - Nov 2022',
    location: 'Mumbai, India',
    projects: [
      {
        name: 'Data Governance & Access Management',
        highlights: [
          'Designed and implemented scalable microservices with Java, Spring Boot, and REST APIs for secure hybrid-cloud platforms.',
          'Built distributed data processing and search capabilities using Hadoop and Solr to support enterprise indexing and retrieval.',
          'Optimised services and caching strategies to reduce API response times by 25% and improve scalability.'
        ],
        tech: ['Java', 'Spring Boot', 'Spring Security', 'AWS', 'Azure', 'Kafka', 'PostgreSQL', 'Redis']
      }
    ],
    tech: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg' }
    ]
  },
  {
    company: 'Futurewise Technology Pvt Ltd',
    role: 'Junior Software Engineer',
    period: 'Aug 2019 - Nov 2019',
    location: 'Mumbai, India',
    points: [
      'Developed Spring Boot REST services for a financial planning platform with secure financial data processing.',
      'Designed high-performance SQL queries and relational models that improved reporting accuracy and execution speed.',
      'Integrated third-party financial APIs to provide real-time portfolio insights and seamless data flow.'
    ],
    tech: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' }
    ]
  },
  {
    company: 'Penguin Apps Labs',
    role: 'Software Engineer',
    period: 'Apr 2018 - Aug 2019',
    location: 'Mumbai, India',
    points: [
      'Built microservices-based backend components for a healthcare platform with a focus on scalability and maintainability.',
      'Designed and maintained robust database schemas and persistence layers for reliable transaction processing.',
      'Contributed to solution design, architecture reviews, and production support for a mission-critical application.'
    ],
    tech: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Hibernate', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/hibernate/hibernate-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' }
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <CompanyLogo src={exp.logo} alt={exp.company} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                        {exp.role}
                      </h3>
                      <span style={{ fontSize: '0.9rem', color: '#60A5FA', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {exp.company}
                        {exp.link && (
                          <a 
                            href={exp.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            style={{ color: '#38BDF8', display: 'inline-flex', alignItems: 'center' }}
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
                                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: '#60A5FA', marginBottom: '8px' }}>
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
                                        background: 'rgba(56, 189, 248, 0.08)', 
                                        border: '1px solid rgba(56, 189, 248, 0.15)',
                                        color: '#38BDF8',
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
                      color: '#38BDF8',
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
