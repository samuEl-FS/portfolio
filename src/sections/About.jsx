import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User2, Flag, Phone, Mail, Award, Target } from 'lucide-react';
import './About.css';

const personalDetails = [
  { icon: Calendar, label: 'Location', value: 'Dublin, Ireland', color: 'text-cyan' },
  { icon: User2, label: 'Current Focus', value: 'Backend Engineering & Cloud', color: 'text-purple' },
  { icon: Flag, label: 'Nationality', value: 'Indian', color: 'text-pink' },
  { icon: Phone, label: 'Phone', value: '+353 899446355', href: 'tel:+353899446355', color: 'text-cyan' },
  { icon: Mail, label: 'Email', value: 'akshaytakke@icloud.com', href: 'mailto:akshaytakke@icloud.com', color: 'text-purple' }
];

const stats = [
  { id: 'exp', label: 'Years Experience', target: 5, suffix: '+' },
  { id: 'projects', label: 'Backend Systems Built', target: 12, suffix: '+' },
  { id: 'tech', label: 'Core Technologies', target: 15, suffix: '+' },
  { id: 'clients', label: 'Cloud Platforms', target: 2, suffix: '+' }
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
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '20px'
              }}
            >
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38BDF8', marginBottom: '8px' }}>
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
              <Award className="bio-icon" size={24} style={{ color: '#60A5FA' }} />
              <h3 style={{ fontSize: '1.4rem' }}>Professional Narrative</h3>
            </div>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              I am a <strong style={{ color: 'var(--text-primary)' }}>Backend Software Engineer</strong> focused on building scalable, secure, and reliable systems using Java, Spring Boot, and cloud-native architecture. With <strong style={{ color: 'var(--text-primary)' }}>nearly 5 years of experience</strong>, I have delivered microservices, REST APIs, event-driven integrations, and data governance solutions across banking, fintech, and enterprise environments.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              My work spans <strong style={{ color: 'var(--text-primary)' }}>AWS and Azure</strong>, containerized deployments, distributed systems, and performance optimisation. I value clean design, strong testing practices, and engineering solutions that balance reliability, security, and maintainability.
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
                          background: 'rgba(255, 255, 255, 0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#38BDF8',
                          border: '1px solid rgba(255,255,255,0.06)'
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
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                borderRadius: '20px'
              }}
            >
              <Target size={24} style={{ color: '#38BDF8', marginTop: '3px' }} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                  Mission Objective
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  To turn complex business requirements into robust backend systems — designing secure APIs, resilient microservices, and cloud-ready architectures that scale with confidence.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
