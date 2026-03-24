'use client';
import React, { useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PASTEL_COLORS = ['#B5EAD7', '#FFDAC1', '#C7CEEA', '#FFB7C5', '#E2F0CB'];

/* ── Corner icons (random per card) ───────── */
function CornerIcon({ type }: { type: number }) {
  const icons = [
    // Star
    <svg key="s" width="16" height="16" viewBox="0 0 24 24" fill="#e9c349" fillOpacity="0.4">
      <polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10" />
    </svg>,
    // Heart
    <svg key="h" width="16" height="16" viewBox="0 0 24 24" fill="#FFB7C5" fillOpacity="0.5">
      <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
    </svg>,
    // Moon
    <svg key="m" width="16" height="16" viewBox="0 0 24 24" fill="#C7CEEA" fillOpacity="0.5">
      <path d="M12,2 A10,10,0,0,0,12,22 A7,7,0,0,1,12,2Z" />
    </svg>,
  ];
  return <div className="absolute top-3 right-3">{icons[type % 3]}</div>;
}

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

/* ── Wish Card ────────────────────────────── */
interface Wish {
  name: string;
  message: string;
  time: string;
}

const initialWishes: Wish[] = [
  { name: 'Ustadz Hanan', message: 'Barakallahu lakum fil mauhubi lakum, wa syakartumul wahib, wa balagho asyuddahu, wa ruziqtum birrohu. Semoga menjadi anak yang sholeh & sholehah.', time: '5 Menit lalu' },
  { name: 'Keluarga Besar Bpk. Surya', message: 'Selamat atas kelahiran putra-putri kembarnya. Semoga Arsyad dan Aisyah tumbuh sehat, cerdas, dan membanggakan orang tua. Aamiin.', time: '1 Jam lalu' },
];

/* ── Main Section ─────────────────────────── */
export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const shakeControls = useAnimation();
  const prefersReduced = useReducedMotion();

  const handleSubmit = useCallback(() => {
    if (!name.trim() || !message.trim()) {
      // Shake
      shakeControls.start({ x: [-8, 8, -8, 8, 0], transition: { duration: 0.3 } });
      return;
    }

    // Success confetti
    confetti({
      spread: 180,
      particleCount: 150,
      origin: { y: 0.3 },
      colors: ['#FFB7C5', '#B5EAD7', '#C7CEEA', '#FFD700', '#FFDAC1'],
    });

    setWishes((prev) => [
      { name: name.trim(), message: message.trim(), time: 'Baru saja' },
      ...prev,
    ]);
    setName('');
    setMessage('');
  }, [name, message, shakeControls]);

  return (
    <section className="section-wishes px-6 py-24 relative overflow-hidden">
      <RollingHills />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="font-headline text-3xl md:text-4xl text-primary mb-4"
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ucapan &amp; Doa
          </motion.h2>
          <p className="text-secondary">Berikan ucapan selamat dan doa terbaik untuk ananda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Form */}
          <motion.form
            className="md:col-span-5 flex flex-col gap-8"
            onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            animate={shakeControls}
          >
            <div className="relative pt-4">
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary absolute top-0 left-0">Nama Lengkap</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary focus:outline-none transition-all px-0 py-3 text-on-surface placeholder:text-outline/50"
                placeholder="Nama Anda"
                type="text"
              />
            </div>
            <div className="relative pt-4">
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary absolute top-0 left-0">Pesan &amp; Doa</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary focus:outline-none transition-all px-0 py-3 text-on-surface placeholder:text-outline/50 resize-none"
                placeholder="Tulis doa terbaik..."
                rows={4}
              />
            </div>
            <motion.button
              type="submit"
              className="bg-primary text-on-primary py-4 rounded-xl font-medium tracking-wide flex justify-center items-center gap-2 cursor-pointer hover:shadow-lg transition-shadow"
              whileHover={prefersReduced ? {} : { scale: 1.05 }}
              whileTap={prefersReduced ? {} : { scale: 0.95 }}
            >
              Kirim Ucapan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
                <path d="M12,21 C12,21 3,13 3,8 A5,5,0,0,1,12,5 A5,5,0,0,1,21,8 C21,13 12,21 12,21Z" />
              </svg>
            </motion.button>
          </motion.form>

          {/* Wishes list */}
          <div className="md:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {wishes.map((w, i) => (
              <motion.div
                key={`${w.name}-${i}`}
                className="relative p-6 rounded-2xl border border-outline-variant/10 shadow-sm transition-all hover:scale-[1.02]"
                style={{ backgroundColor: PASTEL_COLORS[i % PASTEL_COLORS.length] + '40' }}
                initial={prefersReduced ? {} : { rotateY: 90, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <CornerIcon type={i} />
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-headline text-primary text-lg">{w.name}</h5>
                  <span className="text-[10px] text-outline uppercase tracking-wider">{w.time}</span>
                </div>
                <p className="text-on-surface-variant text-sm italic leading-relaxed">&ldquo;{w.message}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
