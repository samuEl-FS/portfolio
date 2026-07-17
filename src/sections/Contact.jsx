import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MessageSquare, CheckCircle, Rocket } from 'lucide-react';
import './Contact.css';
import confetti from 'canvas-confetti';

const RECIPIENT_EMAIL = 'nadarsamuel72@gmail.com';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Focus state styling helper
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Build a pre-filled mailto: link so the visitor's email client
    // opens with all form data already in the body — works on every
    // device with zero backend setup.
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;

    // Short delay for the rocket animation then open mailto
    setTimeout(() => {
      window.location.href = mailtoUrl;

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Trigger canvas confetti celebrate!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#38BDF8', '#60A5FA', '#05060A']
      });

      // Clear success badge after 6 seconds
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="section contact-section" style={{ position: 'relative' }}>
      <div className="container">
        
        <div className="section-header">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title text-gradient text-center"
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-title-underline"
          />
        </div>

        <div className="contact-grid">
          
          {/* Contact Details Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-info-panel glass-panel"
            style={{ padding: '32px' }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Let's Collaborate</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
              I am open to discuss new opportunities, architectural consultations, front-end optimization reviews, or general project inquiries. Feel free to reach out via Skype, phone, or email!
            </p>

            <div className="contact-details-list" style={{ display: 'grid', gap: '16px' }}>
              <a href="mailto:nadarsamuel72@gmail.com" className="contact-detail-card glass-panel clickable">
                <div className="contact-card-icon icon-purple" style={{ color: '#38BDF8' }}><Mail size={20} /></div>
                <div className="contact-card-content">
                  <span className="contact-card-label" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</span>
                  <span className="contact-card-value" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>nadarsamuel72@gmail.com</span>
                </div>
              </a>

              <a href="tel:+918097141225" className="contact-detail-card glass-panel clickable">
                <div className="contact-card-icon icon-cyan" style={{ color: '#60A5FA' }}><Phone size={20} /></div>
                <div className="contact-card-content">
                  <span className="contact-card-label" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</span>
                  <span className="contact-card-value" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>+91 80971 41225</span>
                </div>
              </a>

              <a href="skype:nadarsamuel72@gmail.com?chat" className="contact-detail-card glass-panel clickable">
                <div className="contact-card-icon icon-pink" style={{ color: '#38BDF8' }}><MessageSquare size={20} /></div>
                <div className="contact-card-content">
                  <span className="contact-card-label" style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Skype</span>
                  <span className="contact-card-value" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>samuelnadar</span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-form-panel glass-panel"
            style={{ padding: '32px' }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '24px' }}>Send Message</h3>
            
            <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'grid', gap: '20px' }}>
              
              {/* Name Input */}
              <div className="form-group" style={{ position: 'relative' }}>
                <label 
                  htmlFor="name"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: focusedField === 'name' || formData.name ? '6px' : '16px',
                    fontSize: focusedField === 'name' || formData.name ? '0.7rem' : '0.9rem',
                    color: focusedField === 'name' ? '#38BDF8' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                    pointerEvents: 'none'
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input glass-panel clickable"
                  style={{
                    padding: '24px 16px 8px 16px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: focusedField === 'name' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-group" style={{ position: 'relative' }}>
                <label 
                  htmlFor="email"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: focusedField === 'email' || formData.email ? '6px' : '16px',
                    fontSize: focusedField === 'email' || formData.email ? '0.7rem' : '0.9rem',
                    color: focusedField === 'email' ? '#38BDF8' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                    pointerEvents: 'none'
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input glass-panel clickable"
                  style={{
                    padding: '24px 16px 8px 16px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: focusedField === 'email' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  required
                />
              </div>

              {/* Message Input */}
              <div className="form-group" style={{ position: 'relative' }}>
                <label 
                  htmlFor="message"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: focusedField === 'message' || formData.message ? '6px' : '16px',
                    fontSize: focusedField === 'message' || formData.message ? '0.7rem' : '0.9rem',
                    color: focusedField === 'message' ? '#38BDF8' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                    pointerEvents: 'none'
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  className="form-input form-textarea glass-panel clickable"
                  style={{
                    padding: '24px 16px 8px 16px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: focusedField === 'message' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'border 0.2s'
                  }}
                  required
                />
              </div>

              {/* Morphing Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="btn-primary-glow form-submit-btn clickable"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  minHeight: '46px',
                  background: submitSuccess ? '#22c55e' : 'var(--primary)',
                  boxShadow: submitSuccess ? '0 0 20px rgba(34, 197, 94, 0.4)' : 'var(--primary-glow)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      <Rocket size={16} />
                    </motion.div>
                    Opening your email...
                  </>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle size={16} /> Email client opened!
                  </>
                ) : (
                  <>
                    Send Secure Message <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
