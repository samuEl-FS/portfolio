import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './BackgroundAurora.css';

/* ─── Combined Canvas: Particles + Shooting Stars + Animex.one Falling Stars ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    /* Resize */
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    /* Mouse tracking */
    const onMove = (e) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    /* 1. Ambient Particles (Master branch) */
    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    /* 2. Big Occasional Shooting Stars (Master branch) */
    const MAX_SHOTS = 3;
    const shooters = [];
    const spawnShooter = () => {
      if (shooters.length >= MAX_SHOTS) return;
      shooters.push({
        x: Math.random() * W,
        y: Math.random() * (H * 0.5),
        len: Math.random() * 120 + 80,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 5 + (Math.random() - 0.5) * 0.3,
        life: 1,
        decay: Math.random() * 0.015 + 0.012,
      });
    };
    const shootInterval = setInterval(spawnShooter, 2800);

    /* 3. Animex.one Full-Screen Falling Stars (87.5% slower speed, full edge-to-edge trajectory) */
    const STAR_COUNT = 24;
    const baseAngle = (36 * Math.PI) / 180; // ~36 degrees slanted downwards towards bottom-right

    const createStar = (initialIndex = -1) => {
      const len = Math.random() * 65 + 40; // tapered meteor tail (40px - 105px)
      const speed = Math.random() * 0.4375 + 0.5; // 87.5% slower falling speed (0.50px - 0.9375px/frame)
      const angle = baseAngle + (Math.random() - 0.5) * 0.05;
      const opacity = Math.random() * 0.4 + 0.55; // vivid glow highlight
      const thickness = Math.random() * 0.75 + 0.5; // thin, sleek streak (0.5px - 1.25px)

      // Varied entry coordinates across top and left screen boundaries
      let x, y;
      if (Math.random() > 0.35) {
        x = Math.random() * (W + 300) - 200;
        y = -len - Math.random() * 60;
      } else {
        x = -len - Math.random() * 80;
        y = Math.random() * H * 0.8 - 40;
      }

      const entryX = x;
      const entryY = y;

      const randColor = Math.random();
      let rgb = '0, 242, 254'; // Cyan
      if (randColor > 0.65) rgb = '56, 189, 248'; // Sky blue
      else if (randColor > 0.35) rgb = '240, 249, 255'; // Ice White

      // Staggered time gap:
      // Initial load: Star i gets i * 70 frames delay (~1.2s gap between each meteor entry)
      // Respawn: Random delay of 70 - 220 frames (~1.2s - 3.6s pause)
      const delay = initialIndex >= 0 ? initialIndex * 70 : Math.floor(Math.random() * 150 + 70);

      return {
        x,
        y,
        entryX,
        entryY,
        len,
        speed,
        angle,
        opacity,
        thickness,
        rgb,
        delay,
      };
    };

    const fallingStars = Array.from({ length: STAR_COUNT }, (_, i) => createStar(i));

    const LINK_DIST = 130;
    const MOUSE_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* ── A. Render Full-Screen Sequential Falling Stars (Edge-to-edge trajectory) ── */
      for (let i = 0; i < STAR_COUNT; i++) {
        const s = fallingStars[i];

        // If star has delay remaining, decrement delay and skip drawing this frame
        if (s.delay > 0) {
          s.delay -= 1;
          continue;
        }

        // Move diagonally towards bottom-right (+dx, +dy)
        const dx = Math.cos(s.angle) * s.speed;
        const dy = Math.sin(s.angle) * s.speed;
        s.x += dx;
        s.y += dy;

        // Reset ONLY when star has completely crossed past the end of the screen
        if (s.x > W + s.len * 2.5 || s.y > H + s.len * 2.5) {
          fallingStars[i] = createStar(-1);
          continue;
        }

        // Calculate travel distance from entry point
        const distTraveled = Math.hypot(s.x - s.entryX, s.y - s.entryY);
        // Smooth entry fade in (first 100px) & exit fade out as it reaches screen edge
        const fadeInAlpha = Math.min(1, distTraveled / 100);
        const exitXAlpha = Math.max(0, Math.min(1, (W + s.len - s.x) / 140));
        const exitYAlpha = Math.max(0, Math.min(1, (H + s.len - s.y) / 140));
        const currentOpacity = s.opacity * fadeInAlpha * Math.min(exitXAlpha, exitYAlpha);

        if (currentOpacity <= 0.01) continue;

        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;

        // Linear gradient from Tail (transparent) to Head (bright white/cyan)
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(${s.rgb}, 0)`);
        grad.addColorStop(0.3, `rgba(${s.rgb}, ${currentOpacity * 0.4})`);
        grad.addColorStop(0.8, `rgba(${s.rgb}, ${currentOpacity * 0.85})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${currentOpacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glowing meteor head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.rgb}, ${currentOpacity * 0.8})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      }

      /* ── B. Update & draw ambient master particles ── */
      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < MOUSE_DIST) {
          const force = (MOUSE_DIST - md) / MOUSE_DIST;
          p.x -= (dx / md) * force * 0.9;
          p.y -= (dy / md) * force * 0.9;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < COUNT; j++) {
          const q = particles[j];
          const ex = p.x - q.x, ey = p.y - q.y;
          const dist = Math.sqrt(ex * ex + ey * ey);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        if (md < MOUSE_DIST) {
          const alpha = (1 - md / MOUSE_DIST) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      /* ── C. Master Shooting stars ── */
      for (let s = shooters.length - 1; s >= 0; s--) {
        const sh = shooters[s];
        sh.x += Math.cos(sh.angle) * sh.speed;
        sh.y += Math.sin(sh.angle) * sh.speed;
        sh.life -= sh.decay;

        if (sh.life <= 0 || sh.x > W + 50 || sh.y > H + 50) {
          shooters.splice(s, 1);
          continue;
        }

        const tailX = sh.x - Math.cos(sh.angle) * sh.len * sh.life;
        const tailY = sh.y - Math.sin(sh.angle) * sh.len * sh.life;
        const grad = ctx.createLinearGradient(tailX, tailY, sh.x, sh.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(186,230,253,${sh.life * 0.6})`);
        grad.addColorStop(1, `rgba(255,255,255,${sh.life})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(sh.x, sh.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 1.5 * sh.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${sh.life})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(shootInterval);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
    />
  );
}

/* ─── Main Background Component ─────────────────────────────────────── */
export default function BackgroundAurora() {
  /* Twinkling micro-stars (rendered via CSS) */
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.3,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 4,
      color: Math.random() > 0.85 ? '#bfdbfe' : Math.random() > 0.7 ? '#e0f2fe' : '#ffffff',
    }))
  );

  return (
    <div className="background-aurora">

      {/* ── Layer 1: Deep base gradient ── */}
      <div className="bg-base-gradient" />

      {/* ── Layer 2: Noise texture overlay ── */}
      <div className="bg-noise" />

      {/* ── Layer 3: Grid dot pattern ── */}
      <div className="bg-dot-grid" />

      {/* ── Layer 4: Large slow aurora orbs ── */}
      <motion.div
        className="orb orb-blue"
        animate={{ x: ['-8vw', '8vw', '-8vw'], y: ['-4vh', '12vh', '-4vh'], scale: [1, 1.18, 1] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb orb-cyan"
        animate={{ x: ['6vw', '-8vw', '6vw'], y: ['8vh', '-8vh', '8vh'], scale: [1, 1.12, 1] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
      <motion.div
        className="orb orb-indigo"
        animate={{ x: ['-4vw', '6vw', '-4vw'], y: ['12vh', '-10vh', '12vh'], scale: [1.1, 0.88, 1.1] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
      />
      {/* Extra accent orb bottom-left */}
      <motion.div
        className="orb orb-violet"
        animate={{ x: ['-6vw', '10vw', '-6vw'], y: ['5vh', '-12vh', '5vh'], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 52, repeat: Infinity, ease: 'easeInOut', delay: 18 }}
      />

      {/* ── Layer 5: Diagonal light shafts ── */}
      <motion.div
        className="light-shaft shaft-1"
        animate={{ opacity: [0.04, 0.09, 0.04], x: ['-2vw', '2vw', '-2vw'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="light-shaft shaft-2"
        animate={{ opacity: [0.03, 0.07, 0.03], x: ['2vw', '-3vw', '2vw'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* ── Layer 6: Horizon glow bar ── */}
      <div className="horizon-glow" />

      {/* ── Layer 7: Micro twinkling stars ── */}
      <div className="stars-layer">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="micro-star"
            animate={{ opacity: [0.08, s.size > 1.2 ? 1 : 0.7, 0.08], scale: [0.7, 1.3, 0.7] }}
            transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.color,
              boxShadow: s.size > 1.3 ? `0 0 ${s.size * 3}px ${s.color}` : 'none',
            }}
          />
        ))}
      </div>

      {/* ── Layer 8: Combined Canvas (Particles + Shooters + Falling Stars) ── */}
      <ParticleCanvas />

      {/* ── Layer 9: Vignette edge darkening ── */}
      <div className="vignette" />
    </div>
  );
}
