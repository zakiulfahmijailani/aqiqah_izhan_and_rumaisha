'use client';
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/* ── Traveler Dot ─────────────────────────── */
function TravelerDot({ active }: { active: boolean }) {
  return (
    <div
      className="absolute top-2 motion-reduce:animate-none"
      style={{
        animation: active ? 'walkAcross 8s linear forwards' : 'none',
        opacity: active ? 0.5 : 0,
      }}
      aria-hidden="true"
    >
      <svg width="24" height="30" viewBox="0 0 24 30">
        <circle cx="12" cy="6" r="5" fill="#516161" />
        <rect x="8" y="12" width="8" height="14" rx="3" fill="#516161" />
        <rect x="14" y="10" width="6" height="8" rx="2" fill="#735c00" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ── Dotted Trail Path ────────────────────── */
function DottedTrail({ inView }: { inView: boolean }) {
  return (
    <svg className="w-full h-12 mb-6" viewBox="0 0 400 40" preserveAspectRatio="none">
      <path
        d="M0,20 C100,40 200,0 300,20 C350,30 380,10 400,20"
        fill="none"
        stroke="#735c00"
        strokeWidth="2"
        strokeDasharray="6 4"
        style={{
          strokeDashoffset: inView ? 0 : 400,
          transition: 'stroke-dashoffset 2s ease-out',
        }}
        opacity="0.3"
      />
    </svg>
  );
}

/* ── Main Section ─────────────────────────── */
export default function MapsSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [travelerActive, setTravelerActive] = useState(false);

  React.useEffect(() => {
    if (inView) setTravelerActive(true);
  }, [inView]);

  return (
    <section
      ref={ref}
      id="location"
      className="section-maps px-6 py-20 relative overflow-hidden"
    >
      {/* Traveler animation bar */}
      <div className="absolute top-0 left-0 w-full h-12 pointer-events-none">
        <TravelerDot active={travelerActive && !prefersReduced} />
      </div>

      <div className="max-w-4xl mx-auto text-center mb-10">
        <motion.h2
          className="font-headline text-3xl md:text-4xl text-primary mb-4"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Lokasi Acara
        </motion.h2>
        <div className="h-1 w-20 bg-tertiary/20 mx-auto rounded-full mb-4" />
        <DottedTrail inView={inView} />
      </div>

      {/* Map iframe */}
      <motion.div
        className="max-w-5xl mx-auto rounded-2xl overflow-hidden border-4 border-white/80"
        style={{
          boxShadow: '0 0 20px rgba(233,195,73,0.15), 0 0 40px rgba(233,195,73,0.08)',
          animation: prefersReduced ? 'none' : 'pulseRing 3s ease-in-out infinite',
        }}
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', bounce: 0.3 }}
        viewport={{ once: true }}
      >
        <iframe
          src="https://maps.google.com/maps?q=Wisma+Indah+VI+Blok+i+no+2,+Kalumbuk,+Kuranji,+Padang&output=embed&z=16&hl=id"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>

      {/* CTA button */}
      <div className="text-center mt-10">
        <a
          href="https://maps.app.goo.gl/9Hx2u8dGqbTwvGHR9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buka di Google Maps
        </a>
      </div>
    </section>
  );
}
