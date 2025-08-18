'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const testimonials = [
  "Just had an Epiphany.",
  "Flow state unlocked.",
  "Focus like never before.",
  "Productivity redefined.",
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center mb-8">
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="font-headline text-2xl sm:text-3xl text-ink mb-2 tracking-wide"
        >
          {testimonials[currentIndex]}
        </motion.h2>
      </AnimatePresence>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-600 text-sm sm:text-base max-w-md mx-auto"
      >
        Join thousands already on the waitlist
      </motion.p>
    </div>
  );
}
