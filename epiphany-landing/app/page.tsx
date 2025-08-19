'use client';

import { motion } from 'framer-motion';
import { Brain, Shield, Radar } from 'lucide-react';
import EmailForm from '@/components/EmailForm';
import FeatureCard from '@/components/FeatureCard';
import React from 'react'; // Added missing import

const features = [
  {
    icon: Brain,
    title: "Prime your brain for deep work.",
    description: "Advanced neurotech headset that primes your brain for optimal focus and flow state."
  },
  {
    icon: Shield,
    title: "AI browser blocks noise, guides your session.",
    description: "Distraction-blocking AI browser that keeps you on task and guides your work sessions."
  },
  {
    icon: Radar,
    title: "Flow tracking—like Oura, for focus.",
    description: "Track your focus patterns and flow states over time, just like Oura tracks your sleep."
  }
];

export default function Home() {
  // Cursor brush effect
  React.useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const gradientBg = heroSection?.querySelector('.bg-gradient') as HTMLElement;
    if (!heroSection || !gradientBg) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 2 - 1; // -1..1
      const yPercent = (y / rect.height) * 2 - 1; // -1..1

      // Much stronger translation for visible effect
      const maxTranslate = 45; // px - slightly reduced from 60
      const tx = Math.max(-maxTranslate, Math.min(maxTranslate, xPercent * maxTranslate));
      const ty = Math.max(-maxTranslate, Math.min(maxTranslate, yPercent * maxTranslate));

      // Base scale to hide edges + more dramatic modulation
      const baseScale = 1.25;
      const scaleMod = 1 + (Math.abs(xPercent) + Math.abs(yPercent)) * 0.08; // slightly reduced from 0.1

      // Much more rotation for visible effect
      const rot = xPercent * 6; // degrees - slightly reduced from 8

      const gradientTransform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${(baseScale * scaleMod).toFixed(3)})`;
      const gradientFilter = `saturate(${(1 + Math.abs(xPercent) * 0.2).toFixed(3)}) hue-rotate(${xPercent * 5}deg)`;

      gradientBg.style.setProperty('--gradient-transform', gradientTransform);
      gradientBg.style.setProperty('--gradient-filter', gradientFilter);
    };

    const handleMouseLeave = () => {
      gradientBg.style.setProperty('--gradient-transform', 'scale(1.3)');
      gradientBg.style.setProperty('--gradient-filter', 'none');
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 hero-ripple" id="hero-section">
        {/* Background gradient matching inspiration image */}
        <div className="absolute inset-0 bg-blue-coral-gradient opacity-80 bg-gradient" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl text-white tracking-widest mb-6 drop-shadow-lg">
              EPIPHANY
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-headline text-2xl sm:text-3xl lg:text-4xl text-white mb-8 tracking-wide font-light drop-shadow-md"
          >
            Go with the Flow.
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl text-white max-w-3xl mx-auto mb-16 leading-relaxed font-light opacity-90 drop-shadow-sm"
          >
            <span className="hero-blob">
              Epiphany is a performance headset + AI browser that helps you enter deep focus on demand—and shows your flow trends over time.
            </span>
          </motion.p>

          {/* Email Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mb-20"
          >
            <EmailForm />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-silver">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-3xl sm:text-4xl text-deep-blue mb-6 tracking-wide">
              How It Works
            </h2>
            <p className="text-slate text-lg max-w-2xl mx-auto font-light">
              Three components working together to unlock your peak performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-deep-blue via-silver to-coral">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="font-headline text-3xl sm:text-4xl text-white mb-6 tracking-wide drop-shadow-lg">
              Be first for pre-orders.
            </h3>
            <p className="text-white text-lg mb-12 font-light opacity-90 drop-shadow-md">
              Get early access and exclusive updates as we build the future of focus.
            </p>
          </motion.div>

          <EmailForm variant="secondary" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-deep-blue text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div className="mb-6 sm:mb-0 text-center sm:text-left">
              <h4 className="font-headline text-2xl tracking-wide mb-2 text-white drop-shadow-sm">EPIPHANY</h4>
              <p className="text-white text-sm font-light opacity-90">Go with the Flow.</p>
            </div>
            
            <div className="footer-links flex gap-8 text-sm text-white">
              <a href="#" className="hover:text-coral transition-colors font-medium">About</a>
              <a href="#" className="hover:text-coral transition-colors font-medium">Contact</a>
              <a href="#" className="hover:text-coral transition-colors font-medium">Privacy</a>
              <a href="#" className="hover:text-coral transition-colors font-medium">Terms</a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white border-opacity-20 text-center">
            <p className="text-white text-sm font-light opacity-90">
              © 2025 Epiphany. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
