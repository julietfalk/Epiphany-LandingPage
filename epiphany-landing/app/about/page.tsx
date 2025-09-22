'use client';

import { motion } from 'framer-motion';
import EmailForm, { SubscriptionProvider } from '@/components/EmailForm';
import Link from 'next/link';

export default function AboutPage() {
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
              <Link href="/about" className="nav-link active">About</Link>
              <button 
                className="waitlist-button-nav"
                onClick={() => {
                  const preOrderSection = document.getElementById('pre-order');
                  if (preOrderSection) {
                    preOrderSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </nav>

      {/* About Us Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          <div className="about-hero-layout">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="about-hero-content"
            >
              <h1 className="about-hero-title">About Us</h1>
              <p className="about-hero-description">
                About the team at epiphany is working on ground-breaking tech that helps you focus
              </p>
              
              {/* Email Signup Form */}
              <div className="about-hero-email-form">
                <EmailForm variant="primary" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="about-hero-image"
            >
              <img 
                src="/images/aboutpeople.png" 
                alt="About the team at Epiphany"
                className="about-people-illustration"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="meet-team-section">
        <div className="meet-team-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="meet-team-title">Meet the Team</h2>
          </motion.div>

          <div className="team-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="team-card"
            >
              <div className="team-photo">
                <img 
                  src="/images/vai.png" 
                  alt="Vai Jaiswal"
                  className="team-photo-img"
                />
                <div className="team-overlay">
                  <h3 className="team-name">Vai Jaiswal</h3>
                  <p className="team-role">Co-Founder & CEO</p>
                  <p className="team-bio">NeuroScience and CS Major at Columbia</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="team-card"
            >
              <div className="team-photo">
                <img 
                  src="/images/juliet.png" 
                  alt="Juliet Falk"
                  className="team-photo-img"
                />
                <div className="team-overlay">
                  <h3 className="team-name">Juliet Falk</h3>
                  <p className="team-role">Co-Founder & COO</p>
                  <p className="team-bio">Symbolic Systems Major at Stanford</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pre-order" className="pre-order-cta-section">
        <div className="pre-order-cta-container">
          <div className="pre-order-cta-left">
            <h2 className="pre-order-cta-title">Be the First to Pre Order</h2>
            <p className="pre-order-cta-tagline">Get Early Access and exclusive updates as we build the future of Focus</p>
            
            <div className="pre-order-cta-form">
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="pre-order-cta-input"
              />
              <button className="pre-order-cta-button">Join the Waitlist</button>
            </div>
            
            <p className="pre-order-cta-privacy">Don&apos;t worry, We keep your inbox as distraction-free as your mind.</p>
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

