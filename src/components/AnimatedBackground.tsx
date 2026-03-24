'use client';
import React from 'react';

/* 6 floating clouds, 30 twinkling stars, 10 rising bubbles, falling petals */
export default function AnimatedBackground() {
  return (
    <>
      {/* Animated gradient sky */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(135deg, #f0fdf4, #f5f3ff, #fff7ed, #f0f9ff)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite',
        }}
        aria-hidden="true"
      />

      {/* Floating Clouds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {[0, 3, 6, 9, 12, 15].map((delay, i) => (
          <svg
            key={`cloud-${i}`}
            className="absolute animate-drift motion-reduce:animate-none"
            style={{
              top: `${10 + i * 12}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${18 + i * 3}s`,
              opacity: 0.12 + i * 0.02,
            }}
            width="120"
            height="60"
            viewBox="0 0 120 60"
          >
            <ellipse cx="60" cy="40" rx="50" ry="18" fill="#c2c8c7" />
            <ellipse cx="40" cy="32" rx="30" ry="20" fill="#c2c8c7" />
            <ellipse cx="80" cy="30" rx="28" ry="18" fill="#c2c8c7" />
            <ellipse cx="60" cy="25" rx="25" ry="16" fill="#d4e6e5" />
          </svg>
        ))}
      </div>

      {/* Twinkling Stars */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <svg
            key={`star-${i}`}
            className="absolute animate-twinkle motion-reduce:animate-none"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
              animationDelay: `${(i * 100) % 3000}ms`,
              width: `${6 + (i % 4) * 2}px`,
              height: `${6 + (i % 4) * 2}px`,
            }}
            viewBox="0 0 24 24"
            fill="#e9c349"
            fillOpacity={0.25}
          >
            <polygon points="12,2 15,10 24,10 17,15 19,24 12,19 5,24 7,15 0,10 9,10" />
          </svg>
        ))}
      </div>

      {/* Rising Bubbles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute bottom-0 rounded-full animate-rise motion-reduce:animate-none"
            style={{
              left: `${(i * 11 + 5) % 100}%`,
              width: `${12 + i * 3}px`,
              height: `${12 + i * 3}px`,
              border: '1.5px solid rgba(233,195,73,0.25)',
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Falling Petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <svg
            key={`petal-${i}`}
            className="absolute motion-reduce:animate-none"
            style={{
              left: `${(i * 9 + 3) % 100}%`,
              top: '-20px',
              animation: `petalFall ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              opacity: 0.3,
            }}
            width="14"
            height="18"
            viewBox="0 0 14 18"
          >
            <path
              d="M7 0 C3 4, 0 10, 7 18 C14 10, 11 4, 7 0Z"
              fill={i % 2 === 0 ? '#FFB7C5' : '#FFDAC1'}
            />
          </svg>
        ))}
      </div>
    </>
  );
}
