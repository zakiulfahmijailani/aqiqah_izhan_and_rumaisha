'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ── Floating Music Notes ─────────────────── */
function FloatingNotes({ playing }: { playing: boolean }) {
  const [notes, setNotes] = useState<{ id: number; char: string; x: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const chars = ['♪', '♫', '♬', '♩'];
      counter.current += 1;
      setNotes((prev) => [
        ...prev.slice(-5),
        { id: counter.current, char: chars[counter.current % chars.length], x: Math.random() * 40 - 20 },
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true">
      {notes.map((n) => (
        <motion.span
          key={n.id}
          className="absolute text-primary/40 text-lg"
          initial={{ y: 0, x: n.x, opacity: 1 }}
          animate={{ y: -80, opacity: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          onAnimationComplete={() =>
            setNotes((prev) => prev.filter((nn) => nn.id !== n.id))
          }
        >
          {n.char}
        </motion.span>
      ))}
    </div>
  );
}

/* ── Sound Wave Bars ──────────────────────── */
function SoundWaveBars({ playing }: { playing: boolean }) {
  const delays = [0, 0.1, 0.2, 0.3, 0.4];
  const durations = [0.5, 0.6, 0.4, 0.7, 0.5];

  return (
    <div className={`flex items-end gap-[2px] h-4 ${playing ? '' : 'hidden'}`}>
      {delays.map((d, i) => (
        <div
          key={i}
          className="sound-bar motion-reduce:animate-none"
          style={{
            height: '100%',
            animationDelay: `${d}s`,
            animationDuration: `${durations[i]}s`,
            animationPlayState: playing ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Component ───────────────────────── */
export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const prefersReduced = useReducedMotion();

  const toggle = () => {
    setPlaying((prev) => !prev);
    // In production, you'd control audioRef.current.play()/pause() here
  };

  return (
    <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-[70]">
      <motion.button
        onClick={toggle}
        className="relative bg-white text-primary p-5 rounded-full shadow-2xl flex items-center justify-center cursor-pointer"
        animate={
          prefersReduced
            ? {}
            : playing
            ? { boxShadow: ['0 0 0px rgba(233,195,73,0.3)', '0 0 16px rgba(233,195,73,0.6)', '0 0 0px rgba(233,195,73,0.3)'] }
            : { scale: [1, 1.05, 1] }
        }
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {/* Glow halo */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-tertiary rounded-full opacity-10 blur-xl animate-pulse pointer-events-none" />

        {/* Vinyl record / icon */}
        <div className="relative z-10">
          {playing ? (
            <div
              className="w-7 h-7 rounded-full border-4 border-primary motion-reduce:animate-none"
              style={{
                animation: 'vinylSpin 2s linear infinite',
                borderTopColor: '#735c00',
              }}
            >
              <div className="w-2 h-2 bg-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,3 L12,12.3 A3.5,3.5,0,1,0,14,15.5 L14,7 L18,7 L18,3Z" />
            </svg>
          )}
        </div>

        {/* Sound wave bars */}
        <div className="absolute top-1 right-1">
          <SoundWaveBars playing={playing} />
        </div>

        {/* Floating notes */}
        {playing && !prefersReduced && <FloatingNotes playing={playing} />}
      </motion.button>

      {/* Hidden audio element (would connect to actual audio file) */}
      <audio ref={audioRef} loop preload="none">
        <source src="/audio/background.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
