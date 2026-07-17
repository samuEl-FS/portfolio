import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, User, Briefcase, Code2, FolderGit, GraduationCap, Mail, Terminal } from 'lucide-react';
import './Navbar.css';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'portfolio', label: 'Projects', icon: FolderGit },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('about');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking intersection
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveTab(id);
    }
  };

  return (
    <>
      {/* Scroll Progress line at the very top */}
      <motion.div 
        className="scroll-progress-line"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #3B82F6, #38BDF8, #60A5FA)',
          transformOrigin: '0%',
          zIndex: 1000,
          scaleX
        }}
      />

      <header 
        className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '1200px',
          zIndex: 900,
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        }}
      >
        <div 
          className="container nav-container glass-panel"
          style={{
            background: isScrolled ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isScrolled 
              ? '0 10px 30px -10px rgba(56, 189, 248, 0.25), 0 1px 1px rgba(255,255,255,0.05)'
              : '0 4px 20px rgba(0, 0, 0, 0.2)',
            borderRadius: '50px',
            transition: 'all 0.3s'
          }}
        >
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="nav-logo clickable"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
          >
            Samuel<span style={{ color: '#38BDF8', textShadow: '0 0 10px rgba(56,189,248,0.4)' }}>Nadar</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link-btn clickable ${isActive ? 'active' : ''}`}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    border: 'none',
                    background: 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    borderRadius: '20px'
                  }}
                >
                  <Icon size={14} style={{ color: isActive ? '#38BDF8' : 'inherit' }} />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="nav-active-bar"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(59, 130, 246, 0.15)',
                        border: '1px solid rgba(56, 189, 248, 0.2)',
                        borderRadius: '20px',
                        zIndex: -1
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {/* Quick terminal / console command hint */}
            <span 
              className="glass-panel clickable" 
              onClick={() => window.dispatchEvent(new CustomEvent('toggle-cmd-palette'))}
              style={{
                marginLeft: '8px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Terminal size={12} />
              <kbd style={{ fontSize: '0.7rem', opacity: 0.8 }}>⌘K</kbd>
            </span>
          </nav>

          {/* Mobile Toggle Button */}
          <button 
            className="nav-mobile-toggle clickable"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="nav-mobile-drawer glass-panel"
              style={{
                marginTop: '10px',
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                borderRadius: '24px',
                overflow: 'hidden',
                padding: '16px'
              }}
            >
              <div 
                className="mobile-drawer-container"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-mobile-link clickable ${isActive ? 'active' : ''}`}
                      style={{
                        padding: '12px 16px',
                        border: 'none',
                        background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                        borderLeft: isActive ? '3px solid #38BDF8' : '3px solid transparent',
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        borderRadius: '6px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
