import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Code2, Layers, AlertCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'Distributed Data Governance Platform',
    category: 'webapp',
    categoryLabel: 'Backend Systems',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400',
    slides: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600'
    ],
    desc: 'Designed and implemented secure, policy-driven microservices for enterprise data governance and access management across hybrid cloud environments.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'AWS', 'Azure'],
    architecture: 'A modular microservices landscape exposing secure APIs and integrating policy engines with cloud-based storage and governance services.',
    challenges: 'Balancing high-volume access control with strong security constraints and consistent service availability across distributed infrastructure.',
    solutions: 'Applied service isolation, layered authentication, and caching strategies to improve reliability, maintainability, and response performance.'
  },
  {
    id: 2,
    title: 'Real-Time Search & Indexing Services',
    category: 'webapp',
    categoryLabel: 'Backend Systems',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
    slides: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600'
    ],
    desc: 'Built backend services for distributed data processing and search using Hadoop and Solr, enabling fast indexing and efficient retrieval.',
    tech: ['Java', 'Hadoop', 'Solr', 'Kafka', 'Redis'],
    architecture: 'A scalable ingestion pipeline paired with search and indexing components to support large enterprise datasets and performant lookups.',
    challenges: 'Handling large-scale data flows while keeping query performance predictable and search responses low latency.',
    solutions: 'Optimised indexing workflows, distributed processing patterns, and caching layers to support enterprise-grade retrieval speed.'
  },
  {
    id: 3,
    title: 'Financial Planning API Suite',
    category: 'webapp',
    categoryLabel: 'API Work',
    img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400',
    slides: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600'
    ],
    desc: 'Developed secure Spring Boot services for a financial planning platform with integrated third-party APIs and robust reporting support.',
    tech: ['Spring Boot', 'MySQL', 'Postman', 'REST APIs'],
    architecture: 'Service-oriented backend design with relational persistence and integration layers for data processing and financial insights.',
    challenges: 'Ensuring data integrity and secure processing across external financial integrations and report generation workflows.',
    solutions: 'Implemented well-defined service boundaries, strong validation rules, and tested API flows for dependable downstream usage.'
  },
  {
    id: 4,
    title: 'Healthcare Platform Backend Services',
    category: 'webapp',
    categoryLabel: 'Backend Systems',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    slides: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600'
    ],
    desc: 'Built backend components for a healthcare application with modular architecture, reliable data handling, and production-ready deployment support.',
    tech: ['Java', 'Spring Boot', 'Hibernate', 'Docker', 'PostgreSQL'],
    architecture: 'A maintainable service layer backed by relational persistence and deployment-ready containerization for stable operations.',
    challenges: 'Maintaining reliability and consistency in a domain where business workflows and data integrity are critical.',
    solutions: 'Focused on clean service design, transactional integrity, and careful production support to improve stability and maintainability.'
  }
];

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'webapp', label: 'Backend Systems' },
  { id: 'design', label: 'API Work' }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  // Modal slide handlers
  const nextSlide = () => {
    if (selectedProject?.slides) {
      setCarouselIdx((prev) => (prev + 1) % selectedProject.slides.length);
    }
  };

  const prevSlide = () => {
    if (selectedProject?.slides) {
      setCarouselIdx((prev) => (prev - 1 + selectedProject.slides.length) % selectedProject.slides.length);
    }
  };

  // Card perspective tilt
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = -(y - yc) / 20;
    const rotateY = (x - xc) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section id="portfolio" className="section portfolio-section" style={{ position: 'relative' }}>
      <div className="container">
        
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title text-gradient text-center"
          >
            Project Showcases
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-title-underline"
          />
        </div>

        {/* Project Filters */}
        <div className="skills-filters">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`filter-tab-btn clickable ${activeFilter === f.id ? 'active glass-panel' : ''}`}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                border: 'none',
                background: activeFilter === f.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: activeFilter === f.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: 500,
                transition: 'all 0.3s'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout 
          className="portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="portfolio-card glass-panel perspective-container clickable"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setSelectedProject(project);
                  setCarouselIdx(0);
                }}
                style={{
                  background: 'rgba(15, 23, 42, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s'
                }}
              >
                <div className="shine-effect" />
                
                <div className="portfolio-img-container" style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  />
                  <div 
                    className="portfolio-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(5, 6, 10, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <Maximize2 size={24} style={{ color: '#38BDF8' }} />
                  </div>
                </div>

                <div className="portfolio-details" style={{ padding: '20px' }}>
                  <span 
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      color: '#60A5FA',
                      background: 'rgba(96, 165, 250, 0.1)',
                      padding: '3px 8px',
                      borderRadius: '8px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}
                  >
                    {project.categoryLabel}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {project.desc.substring(0, 85)}...
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox / Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lightbox-overlay"
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 6, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}
            >
              <motion.div
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="lightbox-card glass-panel"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  maxWidth: '850px',
                  maxHeight: '90vh',
                  background: '#0F172A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '30px',
                  overflowY: 'auto',
                  padding: '32px',
                  position: 'relative'
                }}
              >
                <button 
                  className="lightbox-close-btn clickable"
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>

                <div className="lightbox-content-grid">
                  {/* Screenshots Carousel */}
                  <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '18px', overflow: 'hidden', background: '#05060A' }}>
                    {selectedProject.slides && (
                      <>
                        <img 
                          src={selectedProject.slides[carouselIdx]} 
                          alt="Project view" 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {selectedProject.slides.length > 1 && (
                          <>
                            <button 
                              onClick={prevSlide}
                              className="clickable"
                              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <button 
                              onClick={nextSlide}
                              className="clickable"
                              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', padding: '6px', borderRadius: '50%', cursor: 'pointer' }}
                            >
                              <ChevronRight size={20} />
                            </button>
                            {/* Slide indicators */}
                            <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
                              {selectedProject.slides.map((_, sIdx) => (
                                <div key={sIdx} style={{ width: '8px', height: '8px', borderRadius: '50%', background: sIdx === carouselIdx ? '#38BDF8' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }} />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {/* Details column */}
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#60A5FA', textTransform: 'uppercase' }}>
                      {selectedProject.categoryLabel}
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0 16px' }}>
                      {selectedProject.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '24px' }}>
                      {selectedProject.desc}
                    </p>

                    {/* Tech Stack list */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Code2 size={16} style={{ color: '#38BDF8' }} /> Mapped Tech Stack
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedProject.tech.map((t) => (
                          <span 
                            key={t} 
                            className="glass-panel"
                            style={{
                              padding: '6px 12px',
                              borderRadius: '10px',
                              fontSize: '0.75rem',
                              color: 'var(--text-secondary)',
                              background: 'rgba(255,255,255,0.02)',
                              border: '1px solid rgba(255,255,255,0.06)'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tony Stark technical parameter cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
                      <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60A5FA', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                          <Layers size={14} /> Architecture
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{selectedProject.architecture}</p>
                      </div>

                      <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                          <AlertCircle size={14} /> Challenges
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{selectedProject.challenges}</p>
                      </div>

                      <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22c55e', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                          <CheckCircle2 size={14} /> Solutions
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{selectedProject.solutions}</p>
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
