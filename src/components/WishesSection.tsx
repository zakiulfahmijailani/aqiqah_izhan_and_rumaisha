'use client';
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const PASTEL_COLORS = ['#B5EAD7', '#FFDAC1', '#C7CEEA', '#FFB7C5', '#E2F0CB'];

/* ── Rolling Hills + Flowers ──────────────── */
function RollingHills() {
  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none" aria-hidden="true">
      <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="w-full h-24">
        <path d="M0,80 Q200,20 400,80 Q600,140 800,80 L800,120 L0,120Z" fill="#B5EAD7" opacity="0.15" />
        <path d="M0,90 Q150,50 350,90 Q550,130 800,90 L800,120 L0,120Z" fill="#E2F0CB" opacity="0.15" />
      </svg>
      {/* Flower stems */}
      {[10, 25, 50, 70, 85].map((left, i) => (
        <div
          key={i}
          className="absolute bottom-8 animate-sway motion-reduce:animate-none"
          style={{ left: `${left}%`, animationDelay: `${i * 0.3}s`, transformOrigin: 'bottom center' }}
        >
          <svg width="16" height="40" viewBox="0 0 16 40">
            <line x1="8" y1="40" x2="8" y2="12" stroke="#6b8f71" strokeWidth="1.5" />
            <circle cx="8" cy="10" r="5" fill={PASTEL_COLORS[i % PASTEL_COLORS.length]} />
            <circle cx="8" cy="10" r="2" fill="#e9c349" opacity="0.6" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ── Floating Hearts ──────────────────────── */
function FloatingHearts() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <svg
          key={i}
          className="absolute animate-float motion-reduce:animate-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.6}s`,
            opacity: 0.12,
          }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#FFB7C5"
        >
          <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Spinner SVG ──────────────────────────── */
function Spinner() {
  return (
    <svg className="inline-block w-5 h-5 animate-spin ml-2" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M12,2 A10,10,0,0,1,22,12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Success Card ─────────────────────────── */
function SuccessCard({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-12 px-6"
      initial={prefersReduced ? {} : { scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
    >
      {/* Animated heart SVG */}
      <motion.svg
        width="72"
        height="72"
        viewBox="0 0 24 24"
        fill="#FFB7C5"
        className="mb-6"
        animate={prefersReduced ? {} : { scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
      </motion.svg>

      <h3 className="font-headline text-2xl text-primary mb-2">
        Jazakumullahu Khairan! 🤍
      </h3>
      <p className="text-secondary text-sm">Ucapan Anda telah terkirim.</p>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────── */
export default function WishesSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const errorShake = useAnimation();
  const prefersReduced = useReducedMotion();
  const maxLength = 300;

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      errorShake.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      return;
    }

    setFormState('loading');

    try {
      const response = await fetch('https://formspree.io/f/xreynjaw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      if (response.ok) {
        setFormState('success');
        confetti({
          spread: 180,
          particleCount: 150,
          origin: { y: 0.4 },
          colors: ['#FFB7C5', '#B5EAD7', '#C7CEEA', '#FFD700'],
        });
      } else {
        setFormState('error');
        errorShake.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      }
    } catch {
      setFormState('error');
      errorShake.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
    }
  };

  return (
    <section
      className="px-4 py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5F0FF, #FFF5F7)' }}
    >
      <RollingHills />
      <FloatingHearts />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-10"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-3">
            Ucapan &amp; Doa
          </h2>
          <p className="text-secondary text-sm">
            Berikan ucapan selamat dan doa terbaik untuk Izhan &amp; Rumaisha
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-[520px] mx-auto"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          animate={errorShake}
        >
          {formState === 'success' ? (
            <SuccessCard prefersReduced={prefersReduced} />
          ) : (
            <div className="flex flex-col gap-5">
              {/* Honeypot */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Name */}
              <div>
                <label className="font-label text-[10px] tracking-widest uppercase text-secondary mb-1.5 block">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  required
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 bg-white/80 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-label text-[10px] tracking-widest uppercase text-secondary mb-1.5 block">
                  Pesan &amp; Doa
                </label>
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
                  placeholder="Tulis ucapan atau doa untuk Izhan & Rumaisha..."
                  rows={4}
                  maxLength={maxLength}
                  required
                  className="w-full border border-pink-200 rounded-xl px-4 py-3 bg-white/80 focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all duration-200 text-sm text-gray-700 placeholder-gray-400 resize-none"
                />
                <p
                  className={`text-right text-xs mt-1 ${
                    message.length > 280 ? 'text-rose-500' : 'text-gray-400'
                  }`}
                >
                  {message.length}/{maxLength}
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={formState === 'loading'}
                className={`w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold py-3 px-6 rounded-xl cursor-pointer flex items-center justify-center transition-opacity ${
                  formState === 'loading' ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                whileHover={formState === 'loading' || prefersReduced ? {} : { scale: 1.02 }}
                whileTap={formState === 'loading' || prefersReduced ? {} : { scale: 0.98 }}
              >
                {formState === 'loading' ? (
                  <>
                    Mengirim...
                    <Spinner />
                  </>
                ) : (
                  'Kirim Ucapan 🤍'
                )}
              </motion.button>

              {/* Error message */}
              {formState === 'error' && (
                <motion.p
                  className="text-rose-500 text-sm text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Gagal mengirim. Silakan coba lagi.
                </motion.p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
