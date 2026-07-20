import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import './Education.css';

const educationData = [
  {
    institution: 'Dublin Business School',
    degree: 'Master of Science in Information Systems with Computing',
    grade: '2.1 GPA',
    period: 'Jan 2023 - Oct 2024',
    icon: GraduationCap
  },
  {
    institution: 'University of Mumbai',
    degree: 'Bachelor of Engineering in Information Technology',
    grade: '2.1 GPA',
    period: 'Sep 2014 - May 2018',
    icon: Award
  }
];

export default function Education() {
  return (
    <section id="education" className="section education-section" style={{ position: 'relative' }}>
      <div className="container">
        
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title text-gradient text-center"
          >
            Education Milestones
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-title-underline"
          />
        </div>

        <div 
          className="education-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '48px'
          }}
        >
          {educationData.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 80, damping: 15, delay: index * 0.1 }}
                className="education-card glass-panel clickable"
                style={{
                  background: 'rgba(15, 23, 42, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '24px',
                  display: 'flex',
                  gap: '20px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div 
                  className="edu-icon-container"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#38BDF8',
                    flexShrink: 0
                  }}
                >
                  <Icon size={24} className="edu-icon" />
                </div>
                
                <div className="edu-card-content" style={{ textAlign: 'left' }}>
                  <div 
                    className="edu-period"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '8px'
                    }}
                  >
                    <Calendar size={12} />
                    <span>{edu.period}</span>
                  </div>
                  
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '4px', fontWeight: 700 }}>
                    {edu.institution}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    {edu.degree}
                  </p>
                  
                  <div 
                    className="edu-grade-tag glass-panel"
                    style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <span>Grade: </span>
                    <strong style={{ color: '#38BDF8' }}>{edu.grade}</strong>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
