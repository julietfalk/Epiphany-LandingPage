'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Radar } from 'lucide-react';
import EmailForm, { SubscriptionProvider } from '@/components/EmailForm';
import FeatureCard from '@/components/FeatureCard';

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
    title: "Track your focus patterns over time.",
    description: "Monitor your focus trends and flow states to optimize your performance."
  }
];

export default function Home() {
  // Cursor brush effect
  React.useEffect(() => {
    const heroSection = document.getElementById('hero-section');
    const backgroundImage = heroSection?.querySelector('[style*="backgroundImage"]') as HTMLElement;
    if (!heroSection || !backgroundImage) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 2 - 1; // -1..1
      const yPercent = (y / rect.height) * 2 - 1; // -1..1

      // Subtle movement for background image
      const maxTranslate = 20; // px - subtle effect
      const tx = Math.max(-maxTranslate, Math.min(maxTranslate, xPercent * maxTranslate));
      const ty = Math.max(-maxTranslate, Math.min(maxTranslate, yPercent * maxTranslate));

      // Subtle scale
      const baseScale = 1.0;
      const scaleMod = 1 + (Math.abs(xPercent) + Math.abs(yPercent)) * 0.02; // very subtle

      const transform = `translate(${tx}px, ${ty}px) scale(${(baseScale * scaleMod).toFixed(3)})`;
      
      backgroundImage.style.transform = transform;
    };

    const handleMouseLeave = () => {
      backgroundImage.style.transform = 'scale(1.0)';
    };

    heroSection.addEventListener('mousemove', handleMouseMove);
    heroSection.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove);
      heroSection.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <SubscriptionProvider>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6" id="hero-section">
          {/* Background image with dark overlay */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/hero-background.png?v=1)' }} />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
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

        {/* Product Video Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-headline text-3xl sm:text-4xl text-deep-blue mb-6 tracking-wide">
                Epiphany in Action
              </h2>
              <p className="text-slate text-lg max-w-2xl mx-auto font-light">
                Experience the flow state that Epiphany helps you achieve.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Video Container with elegant border and shadow - smaller size */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-deep-blue via-silver to-coral rounded-3xl opacity-20 blur-xl transform scale-105"></div>
                <div className="relative bg-white rounded-3xl p-2 shadow-2xl">
                  <div className="relative overflow-hidden rounded-2xl bg-black">
                    <video
                      className="w-full h-auto"
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster="/video-poster.svg"
                    >
                      <source src="/epiphany-demo.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Play button overlay for mobile */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 md:hidden">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center mobile-play-button">
                        <svg className="w-8 h-8 text-deep-blue ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video caption */}
              <div className="text-center mt-8">
                <p className="text-slate text-sm font-medium">
                  Epiphany vibe
                </p>
              </div>
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
            </motion.div>

            <div className="features-grid">
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
    </SubscriptionProvider>
  );
}
