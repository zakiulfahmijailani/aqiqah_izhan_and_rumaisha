'use client';
import React, { useState } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import CoverSection from '@/components/CoverSection';
import BabyNamesSection from '@/components/BabyNamesSection';
import EventDetailsSection from '@/components/EventDetailsSection';
import MapsSection from '@/components/MapsSection';
import GiftSection from '@/components/GiftSection';
import MusicPlayer from '@/components/MusicPlayer';
import WishesSection from '@/components/WishesSection';
import ClosingSection from '@/components/ClosingSection';
import WaveDivider from '@/components/WaveDivider';

export default function Home() {
  const [coverOpen, setCoverOpen] = useState(false);

  return (
    <>
      <AnimatedBackground />
      {coverOpen && <ScrollProgressBar />}

      <CoverSection onOpen={() => setCoverOpen(true)} />

      {/* Main content — visible after cover opens */}
      <main className="relative z-10">
        {/* Names Section */}
        <section>
          <BabyNamesSection />
        </section>

        <WaveDivider fillColor="#FFF8E7" variant="sine" />

        {/* Event Details Section */}
        <section>
          <EventDetailsSection />
        </section>

        <WaveDivider fillColor="#E8F8FF" variant="hill" />

        {/* Maps Section */}
        <section>
          <MapsSection />
        </section>

        <WaveDivider fillColor="#FFF8E7" variant="double" />

        {/* Gift Section */}
        <section>
          <GiftSection />
        </section>

        <WaveDivider fillColor="#F5F0FF" variant="sine" />

        {/* Wishes Section */}
        <section>
          <WishesSection />
        </section>

        <WaveDivider fillColor="#FFF5F7" variant="hill" />

        {/* Closing Section */}
        <section>
          <ClosingSection />
        </section>
      </main>

      {/* Music player FAB */}
      {coverOpen && <MusicPlayer />}
    </>
  );
}
