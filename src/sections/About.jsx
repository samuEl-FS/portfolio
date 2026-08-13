import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User2, Flag, Phone, Mail, Award, Target } from 'lucide-react';
import { getYearsOfExperience, getFormattedExperienceString } from '../utils/experience';
import './About.css';

const personalDetails = [
  { icon: Calendar, label: 'Birthday', value: '1993 May 12', color: 'text-cyan' },
  { icon: User2, label: 'Marital Status', value: 'Married', color: 'text-purple' },
  { icon: Flag, label: 'Nationality', value: 'Indian', color: 'text-pink' },
  { icon: Phone, label: 'Phone', value: '+91 80971 41225', href: 'tel:+918097141225', color: 'text-cyan' },
  { icon: Mail, label: 'Email', value: 'nadarsamuel72@gmail.com', href: 'mailto:nadarsamuel72@gmail.com', color: 'text-purple' }
];

const stats = [
  { id: 'exp', label: 'Years Experience', target: getYearsOfExperience(), suffix: '+' },
  { id: 'projects', label: 'Completed Projects', target: 24, suffix: '+' },
  { id: 'tech', label: 'Tech Stack Handled', target: 50, suffix: '+' },
  { id: 'clients', label: 'Product Deployments', target: 12, suffix: '+' }
];

// Simple Animated Counter component
function AnimatedCounter({ value, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function About() {
  return (
    <section id="about-details" className="section about-details-section" style={{ position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title text-center text-gradient"
          >
            Personal Profile & Mission
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-title-underline"
          />
        </div>

        {/* Stats Row Counters */}
        <div className="stats-row">
          {stats.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="stat-card glass-panel text-center clickable"
              style={{
                padding: '24px',
                background: 'rgba(8, 14, 26, 0.65)',
                border: '1px solid rgba(0, 242, 254, 0.15)',
                borderRadius: '20px'
              }}
            >
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00F2FE', textShadow: '0 0 15px rgba(0, 242, 254, 0.4)', marginBottom: '8px' }}>
                <AnimatedCounter value={s.target} />{s.suffix}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="about-grid">
          {/* Column Left: Who I Am */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="about-bio glass-panel"
            style={{ padding: '32px' }}
          >
            <div className="bio-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Award className="bio-icon" size={24} style={{ color: '#00F2FE' }} />
              <h3 style={{ fontSize: '1.4rem' }}>Professional Narrative</h3>
            </div>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              I am a Software Engineer Team Lead passionate about building scalable, high-performance applications that solve real business problems. With <strong style={{ color: 'var(--text-primary)' }}>{getFormattedExperienceString()} years of experience</strong> working with organisations like <strong style={{ color: '#00F2FE' }}>Accenture</strong>, <strong style={{ color: '#00F2FE' }}>JPMorgan Chase</strong>, and <strong style={{ color: '#00F2FE' }}>Privacera</strong>, I have led engineering teams, architected enterprise solutions, and built modern applications using React, Angular, and TypeScript.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              My focus is on <strong style={{ color: 'var(--text-primary)' }}>clean architecture</strong>, reusable components, and delivering exceptional user experiences through thoughtful engineering. I thrive where technical leadership meets product vision — driving code quality, setting standards, and turning complex requirements into elegant, maintainable solutions.
            </p>
          </motion.div>

          {/* Column Right: Personal Details & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Personal Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="about-details-card glass-panel"
              style={{ padding: '24px' }}
            >
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Identity Metrics</h3>
              <div className="details-grid" style={{ display: 'grid', gap: '16px' }}>
                {personalDetails.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="details-item" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        className={`details-icon-wrapper`}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: 'rgba(0, 242, 254, 0.05)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: index % 2 === 0 ? '#00F2FE' : '#00D8F6',
                          border: '1px solid rgba(0, 242, 254, 0.2)'
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="details-content">
                        <span className="details-label" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.label}</span>
                        {item.href ? (
                          <a href={item.href} className="details-value link-highlight clickable" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                            {item.value}
                          </a>
                        ) : (
                          <span className="details-value" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{item.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Core Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mission-card glass-panel"
              style={{
                padding: '20px',
                background: 'rgba(0, 242, 254, 0.04)',
                border: '1px solid rgba(0, 242, 254, 0.2)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                borderRadius: '20px'
              }}
            >
              <Target size={24} style={{ color: '#00F2FE', marginTop: '3px' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Mission Objective
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  To bridge complex business problems with elegant technical solutions — engineering high-performance frontends, scalable architectures, and fluid user experiences that make software feel effortless.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
