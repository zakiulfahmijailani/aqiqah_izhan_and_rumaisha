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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.273177118023!2d106.8242461750377!3d-6.227655193760596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e012977f89%3A0xc3b5168853b0f58d!2sJl.%20Melati%2C%20RW.3%2C%20Kuningan%2C%20Karet%20Kuningan%2C%20Kecamatan%20Setiabudi%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1716300000000!5m2!1sid!2sid"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Acara"
        />
      </motion.div>

      {/* CTA button */}
      <div className="text-center mt-10">
        <a
          href="https://maps.google.com/maps?q=Wisma+Indah+VI+Blok+i+no+2,+Kalumbuk,+Kuranji,+Padang&output=embed"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 bg-white border border-outline-variant/30 px-10 py-4 rounded-full text-primary font-medium hover:bg-surface transition-all overflow-hidden"
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="#357a38" className="group-hover:animate-float">
            <path d="M8,0 C3.6,0 0,3.6 0,8 C0,14 8,20 8,20 C8,20 16,14 16,8 C16,3.6 12.4,0 8,0Z" />
            <circle cx="8" cy="8" r="3" fill="#fff" />
          </svg>
          Buka di Google Maps
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-[pulseRing_2s_infinite] pointer-events-none" />
        </a>
      </div>
    </section>
  );
}
