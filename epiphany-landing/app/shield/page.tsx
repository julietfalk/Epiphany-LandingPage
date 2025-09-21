'use client';

import { motion } from 'framer-motion';
import EmailForm, { SubscriptionProvider } from '@/components/EmailForm';

export default function ShieldPage() {
  return (
    <SubscriptionProvider>
      <main className="min-h-screen bg-white">
        {/* Navigation Header */}
        <nav className="nav-header">
          <div className="nav-container">
            <div className="nav-left">
              <h1 className="epiphany-brand-nav">Epiphany</h1>
            </div>
            <div className="nav-right">
              <a href="/" className="nav-link">Home</a>
              <a href="/about" className="nav-link">About</a>
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

        {/* Shield Hero Section */}
        <section className="about-hero-section">
          <div className="about-hero-container">
            <div className="about-hero-layout">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="about-hero-content"
              >
                <h1 className="about-hero-title">AI Browser Blocks Noise</h1>
                <p className="about-hero-description">
                  Distraction-blocking AI browser that keeps you on task and guides your work sessions
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
                  src="/images/browser.png" 
                  alt="AI browser interface for distraction blocking"
                  className="about-people-illustration"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <div className="benefits-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="benefits-title">Benefits you get</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="benefits-image-container"
            >
              <img 
                src="/images/shieldbenefits.png" 
                alt="Benefits of AI browser protection"
                className="benefits-image"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="benefits-text-container"
            >
              <p className="benefits-text">
                Experience unparalleled focus with our neuroscience-based headphones. Designed to eliminate distracting voices and ambient noise, they create a serene soundscape that enhances your concentration. By utilizing advanced auditory technology, these headphones help you enter a flow state, allowing for deeper work sessions. Enjoy the benefits of improved productivity and mental clarity, making every task feel effortless. Elevate your work experience and unlock your full potential with our innovative solution.
              </p>
            </motion.div>
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
              
              <p className="pre-order-cta-privacy">Don't worry, We keep your inbox as distraction-free as your mind.</p>
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
