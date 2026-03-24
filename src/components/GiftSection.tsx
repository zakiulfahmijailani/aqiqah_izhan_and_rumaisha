'use client';
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ── Animated Gift Box SVG ────────────────── */
function AnimatedGiftBox({ onClick }: { onClick: (x: number, y: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      onClick(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  };

  return (
    <div ref={ref} className="relative cursor-pointer group mb-8" onClick={handleClick}>
      <svg width="100" height="110" viewBox="0 0 100 110">
        {/* Box body */}
        <rect x="10" y="45" width="80" height="60" rx="6" fill="#FFB7C5" />
        <rect x="10" y="45" width="80" height="60" rx="6" fill="url(#giftPattern)" opacity="0.3" />
        {/* Ribbon V */}
        <line x1="50" y1="45" x2="50" y2="105" stroke="#e9c349" strokeWidth="4" />
        <line x1="10" y1="75" x2="90" y2="75" stroke="#e9c349" strokeWidth="4" />

        {/* Lid (animated) */}
        <g className="animate-pop-lid motion-reduce:animate-none" style={{ transformOrigin: '50px 40px' }}>
          <rect x="5" y="30" width="90" height="20" rx="4" fill="#C7CEEA" />
          <line x1="50" y1="30" x2="50" y2="50" stroke="#e9c349" strokeWidth="4" />
          {/* Bow */}
          <path d="M40,30 Q35,15 50,25 Q65,15 60,30" fill="#e9c349" />
        </g>

        <defs>
          <pattern id="giftPattern" patternUnits="userSpaceOnUse" width="10" height="10">
            <circle cx="5" cy="5" r="1.5" fill="#fff" opacity="0.4" />
          </pattern>
        </defs>
      </svg>
    </div>
  );
}

/* ── Gold Sparkle/Coin Shapes ─────────────── */
function GoldSparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <svg
          key={i}
          className="absolute animate-rise motion-reduce:animate-none"
          style={{
            left: `${10 + i * 10}%`,
            bottom: '10%',
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.3}s`,
          }}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="#e9c349"
          fillOpacity="0.5"
        >
          {i % 2 === 0 ? (
            <polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10" />
          ) : (
            <circle cx="12" cy="12" r="10" />
          )}
        </svg>
      ))}
    </div>
  );
}

/* ── Main Section ─────────────────────────── */
export default function GiftSection() {
  const [toast, setToast] = useState(false);
  const prefersReduced = useReducedMotion();
  const accountNumber = '7123456789';

  const fireGiftConfetti = useCallback((x: number, y: number) => {
    confetti({
      particleCount: 60,
      spread: 80,
      colors: ['#FFB7C5', '#B5EAD7', '#C7CEEA', '#FFD700', '#FFDAC1'],
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  }, []);

  const copyToClipboard = useCallback((e: React.MouseEvent) => {
    navigator.clipboard.writeText(accountNumber);
    setToast(true);
    setTimeout(() => setToast(false), 2000);

    // Small confetti burst at button position
    confetti({
      particleCount: 30,
      spread: 60,
      colors: ['#FFD700', '#e9c349'],
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
    });
  }, [accountNumber]);

  return (
    <section className="section-gifts px-6 py-24 max-w-4xl mx-auto text-center overflow-hidden relative">
      <GoldSparkles />

      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="relative z-10"
      >
        <AnimatedGiftBox onClick={fireGiftConfetti} />

        <h2 className="font-headline text-3xl text-primary mb-4">Hadiah &amp; Amplop Digital</h2>
        <p className="text-secondary max-w-md mx-auto mb-12">
          Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Rekan yang ingin memberikan tanda kasih
          untuk ananda dapat melalui:
        </p>

        {/* Account card */}
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-outline-variant/10 shadow-sm relative max-w-lg mx-auto overflow-hidden group hover:shadow-2xl transition-all">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 shimmer-card opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" style={{ backgroundSize: '200%' }} />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <p className="font-label text-sm font-semibold text-secondary tracking-widest uppercase">Bank Syariah Indonesia</p>

            <div className="flex flex-col items-center">
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary mb-1">Nomor Rekening</span>
              <div className="flex items-center gap-3">
                <p className="font-headline text-3xl text-on-surface tracking-tighter">{accountNumber}</p>
                <button
                  onClick={copyToClipboard}
                  className="relative p-3 text-tertiary hover:bg-tertiary-container rounded-lg transition-all active:scale-90 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5,15 L3,15 A2,2,0,0,1,1,13 L1,3 A2,2,0,0,1,3,1 L13,1 A2,2,0,0,1,15,3 L15,5" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary mb-1">Atas Nama</span>
              <p className="font-body font-semibold text-lg">Zakiul Fahmi / Tri Rachmat</p>
            </div>
          </div>
        </div>

        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-4 py-2 rounded-lg text-sm font-medium z-50"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -40, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tersalin! ✓
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-12 text-primary font-headline italic text-lg md:text-xl animate-pulse">
          &ldquo;Kehadiran dan doa Anda adalah hadiah terbaik bagi kami 🤲&rdquo;
        </p>
      </motion.div>
    </section>
  );
}
