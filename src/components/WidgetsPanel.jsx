import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Clock, Music } from 'lucide-react';
import './WidgetsPanel.css';

export default function WidgetsPanel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mumbaiTime, setMumbaiTime] = useState('');
  
  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef([]);

  // Time tracker (Mumbai is GMT+5:30)
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setMumbaiTime(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio Synthesizer Loop
  const startSynth = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master output filter & delay
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);

      const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(0.4, ctx.currentTime);

      const delayGain = ctx.createGain();
      delayGain.gain.setValueAtTime(0.35, ctx.currentTime);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime); // Low background volume

      // Connections
      filter.connect(ctx.destination);
      filter.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(filter);
      masterGain.connect(filter);

      // Play soft minor 7th chord swells (frequencies for E3, A3, C4, E4)
      const freqs = [164.81, 220.00, 261.63, 329.63];
      const oscillators = [];

      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const nodeGain = ctx.createGain();
        nodeGain.gain.setValueAtTime(0, ctx.currentTime);

        osc.connect(nodeGain);
        nodeGain.connect(masterGain);
        osc.start();

        // Volume swell modulation
        const modVolume = () => {
          if (ctx.state === 'closed') return;
          const swellIn = ctx.currentTime + Math.random() * 2 + 1;
          const sustain = swellIn + Math.random() * 2 + 2;
          const swellOut = sustain + Math.random() * 2 + 1;

          nodeGain.gain.linearRampToValueAtTime(0.25, swellIn);
          nodeGain.gain.linearRampToValueAtTime(0.25, sustain);
          nodeGain.gain.linearRampToValueAtTime(0.02, swellOut);

          // Slowly modulate filter frequency too
          filter.frequency.exponentialRampToValueAtTime(Math.random() * 250 + 200, swellOut);

          setTimeout(modVolume, (swellOut - ctx.currentTime) * 1000 + 500);
        };
        
        modVolume();

        oscillators.push({ osc, nodeGain });
      });

      synthNodesRef.current = oscillators;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  };

  const stopSynth = () => {
    if (synthNodesRef.current) {
      synthNodesRef.current.forEach(({ osc }) => {
        try { osc.stop(); } catch {}
      });
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
    }
    synthNodesRef.current = [];
    audioCtxRef.current = null;
  };

  const togglePlayback = () => {
    setIsPlaying(prev => {
      const next = !prev;
      if (next) {
        startSynth();
      } else {
        stopSynth();
      }
      return next;
    });
  };

  // Register command palette event trigger
  useEffect(() => {
    const handleToggleEvent = () => togglePlayback();
    window.addEventListener('toggle-ambient-audio', handleToggleEvent);
    return () => {
      window.removeEventListener('toggle-ambient-audio', handleToggleEvent);
      stopSynth();
    };
  }, []);

  return (
    <div className="widgets-panel-container">
      {/* 1. Synthesizer Ambient Music Toggle */}
      <div className="ambient-player-widget glass-panel" style={{ background: '#0F172A' }}>
        <button 
          onClick={togglePlayback}
          className="clickable"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-primary)'
          }}
        >
          {isPlaying ? <Volume2 size={16} className="text-glow" /> : <VolumeX size={16} />}
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Ambient Sound
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            {isPlaying ? 'Synthesizer swelldrone' : 'Off'}
          </span>
        </div>
        <div className="ambient-visualizer">
          <div className={`visualizer-bar ${isPlaying ? 'active' : ''}`} />
          <div className={`visualizer-bar ${isPlaying ? 'active' : ''}`} />
          <div className={`visualizer-bar ${isPlaying ? 'active' : ''}`} />
          <div className={`visualizer-bar ${isPlaying ? 'active' : ''}`} />
        </div>
      </div>

      {/* 2. Spotify Mock Widget */}
      <div className="spotify-mock-widget glass-panel" style={{ background: '#0F172A' }}>
        <div className="spotify-disc" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1db954', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Music size={12} /> Spotify Coding
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
            Resonance
          </span>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
            HOME
          </span>
        </div>
      </div>

      {/* 3. Mumbai Clock Widget */}
      <div className="mumbai-clock-widget glass-panel" style={{ background: '#0F172A' }}>
        <Clock size={16} style={{ color: '#60A5FA' }} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Mumbai, IN
          </span>
          <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#38BDF8' }}>
            {mumbaiTime || 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  );
}
