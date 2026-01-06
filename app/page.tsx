'use client';

// Force deployment update - styles should now be live
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Radar } from 'lucide-react';
import EmailForm, { SubscriptionProvider } from '@/components/EmailForm';
import FeatureCard from '@/components/FeatureCard';
import AnimatedFactCards from '@/components/AnimatedFactCards';
import Link from 'next/link';

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
        {/* Navigation Header */}
        <nav className="nav-header">
          <div className="nav-container">
            <div className="nav-left">
              <Link href="/" className="epiphany-brand-nav-link">
                <h1 className="epiphany-brand-nav">Epiphany</h1>
              </Link>
            </div>
            <div className="nav-right">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              <button
                className="waitlist-button-nav"
                onClick={() => {
                  const preOrderSection = document.getElementById('pre-order');
                  if (preOrderSection) {
                    preOrderSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Reserve Yours
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section" id="hero-section" style={{ backgroundColor: '#0D1C31' }}>
          {/* Background gradient overlay */}
          <div className="hero-background-overlay" />
          
          <div className="hero-content">
            {/* Go with the Flow Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="go-with-flow-container"
            >
              <button className="go-with-flow-button">Go with the Flow</button>
            </motion.div>

            {/* Hero Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hero-header"
            >
              <h1 className="hero-title">
                Turn Focus Into a Superpower
              </h1>
            </motion.div>

            {/* Subheader */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hero-subheader"
            >
              Epiphany blends a performance-based headset with an AI browser to help you lock in and track your mental performance.
            </motion.p>

            {/* Email Form - Side by Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hero-form-container"
            >
              <EmailForm />
            </motion.div>
          </div>

          {/* Scroll Down Button - At bottom of hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="scroll-down-container"
          >
            <button className="scroll-down-button" onClick={() => document.getElementById('fact-cards')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Scroll Down</span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 24L24 32M24 32L32 24M24 32V16M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>

          {/* Scroll Down Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="scroll-down-container"
          >
            <button className="scroll-down-button" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Scroll Down</span>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 24L24 32M24 32L32 24M24 32V16M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </section>

        {/* How It Works Section - Updated from Figma */}
        <section id="how-it-works" className="py-16 bg-gradient-to-b from-white via-pale-blue to-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="how-it-works-container"
            >
              {/* How it Works Title */}
              <h2 className="how-it-works-title">
                How it Works
              </h2>
              
              {/* Steps Container */}
              <div className="how-it-works-steps">
        {/* Step 1 */}
        <div className="how-it-works-step">
          <div className="step-content">
            <div className="step-icon">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18.7769V5.77686" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 13.7769C14.1348 13.5239 13.3748 12.9975 12.834 12.2764C12.2932 11.5552 12.0005 10.6783 12 9.77686C11.9995 10.6783 11.7068 11.5552 11.166 12.2764C10.6252 12.9975 9.8652 13.5239 9 13.7769" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.598 7.27687C17.8281 6.87835 17.9635 6.43225 17.9936 5.97306C18.0237 5.51387 17.9478 5.05391 17.7717 4.62876C17.5956 4.20361 17.324 3.82466 16.9781 3.52124C16.6321 3.21782 16.221 2.99806 15.7765 2.87896C15.332 2.75986 14.866 2.7446 14.4147 2.83438C13.9634 2.92416 13.5387 3.11657 13.1737 3.39671C12.8086 3.67685 12.5129 4.03723 12.3093 4.44995C12.1058 4.86268 12 5.31669 12 5.77687C12 5.31669 11.8942 4.86268 11.6907 4.44995C11.4871 4.03723 11.1914 3.67685 10.8263 3.39671C10.4613 3.11657 10.0366 2.92416 9.5853 2.83438C9.13396 2.7446 8.66803 2.75986 8.22353 2.87896C7.77904 2.99806 7.3679 3.21782 7.02193 3.52124C6.67596 3.82466 6.40442 4.20361 6.22833 4.62876C6.05224 5.05391 5.97632 5.51387 6.00643 5.97306C6.03655 6.43225 6.17189 6.87835 6.402 7.27687" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.9971 5.90186C18.5849 6.05299 19.1306 6.33591 19.5928 6.72917C20.0551 7.12243 20.4218 7.61573 20.6652 8.1717C20.9086 8.72768 21.0223 9.33175 20.9977 9.93817C20.9731 10.5446 20.8108 11.1375 20.5231 11.6719" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 18.7769C18.8805 18.7768 19.7364 18.4863 20.4349 17.9502C21.1335 17.4142 21.6356 16.6627 21.8635 15.8122C22.0914 14.9617 22.0323 14.0597 21.6954 13.2462C21.3585 12.4327 20.7625 11.7532 20 11.3129" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.967 18.2599C20.0371 18.8021 19.9953 19.353 19.8441 19.8784C19.693 20.4039 19.4357 20.8927 19.0882 21.3148C18.7407 21.737 18.3104 22.0834 17.8238 22.3326C17.3372 22.5819 16.8046 22.7288 16.259 22.7642C15.7134 22.7996 15.1664 22.7228 14.6516 22.5385C14.1369 22.3542 13.6654 22.0663 13.2662 21.6926C12.8671 21.319 12.5488 20.8675 12.331 20.366C12.1132 19.8645 12.0006 19.3236 12 18.7769C11.9994 19.3236 11.8867 19.8645 11.669 20.366C11.4512 20.8675 11.1329 21.319 10.7338 21.6926C10.3346 22.0663 9.86313 22.3542 9.34838 22.5385C8.83364 22.7228 8.28657 22.7996 7.74097 22.7642C7.19537 22.7288 6.66283 22.5819 6.17622 22.3326C5.68961 22.0834 5.25927 21.737 4.91178 21.3148C4.56429 20.8927 4.30703 20.4039 4.15589 19.8784C4.00474 19.353 3.96291 18.8021 4.033 18.2599" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.00007 18.7769C5.11957 18.7768 4.26368 18.4863 3.56514 17.9502C2.8666 17.4142 2.36444 16.6627 2.13655 15.8122C1.90865 14.9617 1.96775 14.0597 2.30469 13.2462C2.64162 12.4327 3.23755 11.7532 4.00007 11.3129" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.00293 5.90186C5.41513 6.05299 4.86943 6.33591 4.40716 6.72917C3.94489 7.12243 3.57817 7.61573 3.33477 8.1717C3.09138 8.72768 2.97769 9.33175 3.00232 9.93817C3.02695 10.5446 3.18925 11.1375 3.47693 11.6719" stroke="#3887FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="step-title">Prime your Brain for Deep Work</h3>
            <p className="step-description">Advanced neurotech headset that primes your brain for optimal focus and flow state</p>
            <a href="/brain" className="step-button">Learn More</a>
                  </div>
          <div className="step-illustration">
            <img 
              src="/images/brain-illustration.svg.png" 
              alt="Brain illustration showing person building with blocks"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
                </div>
              </div>
              
        {/* Step 2 */}
        <div className="how-it-works-step">
          <div className="step-illustration">
            <img 
              src="/images/startupgirl.svg" 
              alt="Startup girl illustration"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="step-content">
            <div className="step-icon">
              <img 
                src="/images/shield.svg" 
                alt="Shield icon"
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <h3 className="step-title">AI Browser blocks noise, guides your Session</h3>
            <p className="step-description">Distraction blocking AI browser that keeps you on task and guides your work sessions</p>
            <a href="/shield" className="step-button">Learn More</a>
          </div>
        </div>

        {/* Step 3 */}
        <div className="how-it-works-step">
          <div className="step-content">
            <div className="step-icon">
              <img 
                src="/images/cal.svg" 
                alt="Calendar icon"
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            <h3 className="step-title">Reach your focus patterns over time</h3>
            <p className="step-description">Monitor your focus trends and flow states to optimize your performance</p>
            <a href="/cal" className="step-button">Learn More</a>
          </div>
          <div className="step-illustration">
            <img 
              src="/images/presman.svg" 
              alt="Presman illustration"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Pre-Order CTA Section */}
        <section id="pre-order" className="pre-order-cta-section">
          <div className="pre-order-cta-container">
            <div className="pre-order-cta-left">
              <h2 className="pre-order-cta-title">Reserve Your Epiphany</h2>
              <p className="pre-order-cta-tagline">Secure early access pricing before public launch</p>
              
              <EmailForm variant="secondary" className="pre-order-cta-email-form" />
            </div>
            
            <div className="pre-order-cta-right">
              <img 
                src="/images/groupblue.png" 
                alt="Group illustration showing people and robot"
                className="pre-order-cta-illustration"
              />
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer className="footer-section">
          <div className="footer-container">
            <div className="footer-top">
              <div className="footer-brand">
                <h3 className="footer-brand-title">Epiphany</h3>
                <p className="footer-brand-tagline">Go with the Flow</p>
              </div>
            <div className="footer-links">
              <a href="/about" className="footer-link">About</a>
              <a href="#" className="footer-link">Contact</a>
              <a href="#" className="footer-link">Other Links</a>
            </div>
            </div>
            
            <div className="footer-bottom">
              <p className="footer-copyright">Copyright 2025</p>
              <div className="footer-legal">
                <a href="#" className="footer-legal-link">Privacy Policy</a>
                <a href="#" className="footer-legal-link">Terms and Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </SubscriptionProvider>
  );
}
