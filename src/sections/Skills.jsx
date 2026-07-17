import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe2, Code2, Database, Cloud } from 'lucide-react';
import './Skills.css';

const categories = [
  { id: 'all', label: 'All Skills', icon: Sparkles },
  { id: 'frontend', label: 'Frontend & UI', icon: Code2 },
  { id: 'backend', label: 'Backend/DB', icon: Database },
  { id: 'devops', label: 'DevOps & Cloud', icon: Cloud }
];

function SkillIcon({ src, alt }) {
  const [hasError, setHasError] = useState(false);
  
  if (hasError || !src) {
    return <Code2 size={16} style={{ color: '#38BDF8' }} />;
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className="skill-icon-img"
      onError={() => setHasError(true)}
    />
  );
}

const skills = [
  { name: 'React', level: 95, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'JavaScript', level: 90, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', level: 90, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Angular', level: 80, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
  { name: 'Redux Toolkit', level: 85, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
  { name: 'Material UI', level: 85, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'HTML5 & CSS3', level: 85, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'MobX', level: 80, category: 'frontend', icon: 'https://raw.githubusercontent.com/mobxjs/mobx/main/website/static/img/mobx.png' },
  { name: 'GraphQL', level: 80, category: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
  
  { name: 'Node JS', level: 85, category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Express js', level: 80, category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
  { name: 'Fastify', level: 75, category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastify/fastify-original.svg' },
  { name: 'Java', level: 70, category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Spring Boot', level: 70, category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'PostgreSQL', level: 75, category: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },

  { name: 'Azure Cloud', level: 80, category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
  { name: 'Azure CI-CD', level: 80, category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg' },
  { name: 'TurboRepo', level: 80, category: 'devops', icon: 'https://raw.githubusercontent.com/vercel/turbo/main/packages/turbo-repository/logo.png' },
  { name: 'Docker', level: 75, category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'Kubernetes', level: 50, category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'AWS', level: 50, category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
  { name: 'Github', level: 85, category: 'devops', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' }
];

const languages = [
  { name: 'English', proficiency: 'Advanced', code: 'US' },
  { name: 'Japanese', proficiency: 'Beginner', code: 'JP' },
  { name: 'Hindi', proficiency: 'Advanced', code: 'IN' },
  { name: 'Marathi', proficiency: 'Advanced', code: 'IN' },
  { name: 'Tamil', proficiency: 'Advanced', code: 'IN' }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = skills.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="section skills-section" style={{ position: 'relative' }}>
      <div className="container">
        
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title text-gradient text-center"
          >
            Skills & Expertise
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-title-underline"
          />
        </div>

        {/* Filter Categories Tabs */}
        <div 
          className="skills-filters"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px'
          }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-tab-btn clickable ${isActive ? 'active glass-panel' : ''}`}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 500,
                  transition: 'all 0.3s'
                }}
              >
                <Icon size={16} style={{ color: isActive ? '#38BDF8' : 'inherit' }} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Linear Skills progress grid */}
        <motion.div 
          layout
          className="skills-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                className="skill-card glass-panel clickable"
              >
                <div className="skill-info">
                  <div className="skill-logo-name">
                    <div className="skill-img-wrapper">
                      <SkillIcon src={skill.icon} alt={skill.name} />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-progress-bg">
                  <motion.div 
                    className="skill-progress-bar"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Languages section */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            <Globe2 size={20} style={{ color: '#38BDF8' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700 }}>
              Languages Spoken
            </h3>
          </div>

          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            {languages.map((lang, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel clickable"
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>
                  {lang.code === 'US' ? '🇺🇸' : 
                   lang.code === 'JP' ? '🇯🇵' : '🇮🇳'}
                </span>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{lang.name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#60A5FA', fontWeight: 500 }}>{lang.proficiency}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
