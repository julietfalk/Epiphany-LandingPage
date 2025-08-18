'use client';

import { motion } from 'framer-motion';
import { Brain, Shield, Radar } from 'lucide-react';
import EmailForm from '@/components/EmailForm';
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
    title: "Flow tracking—like Oura, for focus.",
    description: "Track your focus patterns and flow states over time, just like Oura tracks your sleep."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-60" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="font-headline text-5xl sm:text-7xl lg:text-8xl text-gray-900 tracking-widest mb-6">
              EPIPHANY
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-headline text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-8 tracking-wide font-light"
          >
            Go with the Flow.
          </motion.h2>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed font-light"
          >
            Epiphany is a performance headset + AI browser that helps you enter deep focus on demand—and shows your flow trends over time.
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-headline text-3xl sm:text-4xl text-gray-900 mb-6 tracking-wide">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
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
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="font-headline text-3xl sm:text-4xl text-gray-900 mb-6 tracking-wide">
              Be first for pre-orders.
            </h3>
            <p className="text-gray-600 text-lg mb-12 font-light">
              Get early access and exclusive updates as we build the future of focus.
            </p>
          </motion.div>

          <EmailForm variant="secondary" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div className="mb-6 sm:mb-0 text-center sm:text-left">
              <h4 className="font-headline text-2xl tracking-wide mb-2">EPIPHANY</h4>
              <p className="text-gray-400 text-sm font-light">Go with the Flow.</p>
            </div>
            
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors font-light">About</a>
              <a href="#" className="hover:text-white transition-colors font-light">Contact</a>
              <a href="#" className="hover:text-white transition-colors font-light">Privacy</a>
              <a href="#" className="hover:text-white transition-colors font-light">Terms</a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm font-light">
              © 2025 Epiphany. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
