import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [typedName, setTypedName] = useState('');
  const fullName = "Samuel Nadar";

  useEffect(() => {
    // Progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Increments to reach 100 in ~1.2s
      });
    }, 25);

    // Typwriter effect simulation
    let currentLetters = '';
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullName.length) {
        currentLetters += fullName[index];
        setTypedName(currentLetters);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    // Call onFinish when loading finishes (around 2.5s)
    const timeout = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2600);

    return () => {
      clearInterval(interval);
      clearInterval(typeInterval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="loader-overlay"
    >
      {/* Iron Man style energy pulse rings */}
      <div className="loader-pulse" />
      <div className="loader-pulse" style={{ animationDelay: '0.8s' }} />
      <div className="loader-pulse" style={{ animationDelay: '1.6s' }} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="loader-logo"
      >
        S<span>N</span>
      </motion.div>

      <div className="loader-typing">
        {typedName}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        >
          |
        </motion.span>
      </div>

      <div className="loader-bar-bg">
        <motion.div
          className="loader-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="text-muted"
        style={{ marginTop: '12px', fontSize: '0.8rem', fontFamily: 'monospace' }}
      >
        BOOTING_SYSTEM... {progress}%
      </motion.span>
    </motion.div>
  );
}
