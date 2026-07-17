import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Briefcase, Code2, FolderGit, GraduationCap, Mail, Music, CornerDownLeft } from 'lucide-react';
import './CommandPalette.css';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const items = [
    { id: 'about', label: 'Go to About Me', icon: User, action: () => scrollToSection('about') },
    { id: 'experience', label: 'Go to Experience', icon: Briefcase, action: () => scrollToSection('experience') },
    { id: 'skills', label: 'Go to Skills', icon: Code2, action: () => scrollToSection('skills') },
    { id: 'projects', label: 'Go to Projects', icon: FolderGit, action: () => scrollToSection('portfolio') },
    { id: 'education', label: 'Go to Education', icon: GraduationCap, action: () => scrollToSection('education') },
    { id: 'contact', label: 'Go to Contact', icon: Mail, action: () => scrollToSection('contact') },
    { id: 'music', label: 'Toggle Background Ambient Music', icon: Music, action: () => toggleMusic() },
    { id: 'cv', label: 'Download Resume / CV', icon: FolderGit, action: () => downloadCV() },
  ];

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToSection = (id) => {
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
      setIsOpen(false);
    }
  };

  const toggleMusic = () => {
    window.dispatchEvent(new CustomEvent('toggle-ambient-audio'));
    setIsOpen(false);
  };

  const downloadCV = () => {
    // Dispatch download CV trigger
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', 'Samuel_Nadar_Resume.pdf');
    document.body.appendChild(link);
    // Simulating download or trigger event
    window.dispatchEvent(new CustomEvent('download-cv-started'));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle palette on Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      // Handle list navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[activeIndex]) {
          filteredItems[activeIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Custom trigger from Navbar click
    const handleToggleEvent = () => setIsOpen((prev) => !prev);
    window.addEventListener('toggle-cmd-palette', handleToggleEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-cmd-palette', handleToggleEvent);
    };
  }, [isOpen, activeIndex, filteredItems]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay">
      <div ref={containerRef} className="cmd-palette-container glass-panel" style={{ background: '#0F172A' }}>
        <div className="cmd-palette-input-wrapper">
          <Search className="cmd-palette-search-icon" size={20} />
          <input
            type="text"
            className="cmd-palette-input"
            placeholder="Type a command or search section..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            autoFocus
          />
        </div>

        <div className="cmd-palette-list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  className={`cmd-palette-item ${isActive ? 'active' : ''}`}
                  onClick={item.action}
                >
                  <Icon className="cmd-palette-item-icon" size={18} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="cmd-palette-shortcut">
                      <CornerDownLeft size={10} /> Enter
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No commands matched your query.
            </div>
          )}
        </div>

        <div className="cmd-palette-footer">
          <span>
            Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate
          </span>
          <span>
            <kbd>Enter</kbd> to select
          </span>
          <span>
            <kbd>ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
