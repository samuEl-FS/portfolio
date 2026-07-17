import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './BackgroundAurora.css';

export default function BackgroundAurora() {
  const [stars, setStars] = useState([]);
  const gridVisible = true;

  // Generate random static stars on mount
  useEffect(() => {
    const starCount = 60;
    const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="background-aurora" style={{ background: '#05060A' }}>
      {/* 1. Subtle Floating Mesh Grid Overlay */}
      {gridVisible && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            opacity: 0.8,
            zindex: 1,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 2. Slow Animated Mesh Gradient Blobs */}
      <motion.div
        animate={{
          x: ['-10vw', '10vw', '-10vw'],
          y: ['-5vh', '15vh', '-5vh'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="aurora aurora-1"
        style={{
          width: '60vw',
          height: '60vw',
          filter: 'blur(130px)',
          opacity: 0.16,
          background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
          position: 'absolute',
          top: '-15vw',
          left: '-10vw',
          borderRadius: '50%',
        }}
      />

      <motion.div
        animate={{
          x: ['10vw', '-10vw', '10vw'],
          y: ['10vh', '-10vh', '10vh'],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
        className="aurora aurora-2"
        style={{
          width: '70vw',
          height: '70vw',
          filter: 'blur(150px)',
          opacity: 0.14,
          background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)',
          position: 'absolute',
          bottom: '-20vw',
          right: '-10vw',
          borderRadius: '50%',
        }}
      />

      <motion.div
        animate={{
          x: ['-5vw', '5vw', '-5vw'],
          y: ['15vh', '-15vh', '15vh'],
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
        className="aurora aurora-3"
        style={{
          width: '50vw',
          height: '50vw',
          filter: 'blur(120px)',
          opacity: 0.15,
          background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
          position: 'absolute',
          top: '30%',
          left: '25%',
          borderRadius: '50%',
        }}
      />

      {/* 3. Tiny Twinkling Stars */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            animate={{
              opacity: [0.1, 0.9, 0.1],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: star.delay,
            }}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: '#fff',
              borderRadius: '50%',
              boxShadow: star.size > 1.5 ? '0 0 4px #fff' : 'none',
            }}
          />
        ))}
      </div>

      {/* 4. Slow floating light beams */}
      <motion.div
        animate={{
          opacity: [0.03, 0.08, 0.03],
          rotate: [-15, -12, -15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: '300px',
          height: '150%',
          background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.15), transparent)',
          transform: 'rotate(-15deg)',
          top: '-25%',
          left: '40%',
          filter: 'blur(80px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
