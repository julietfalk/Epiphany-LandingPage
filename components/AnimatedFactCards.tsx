'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const factCards = [
  {
    id: 1,
    text: "Knowledge workers spend 57% of their day communicating — only 43% creating.",
    className: "fact-card"
  },
  {
    id: 2,
    text: "3 minutes: average time to refocus after an interruption",
    className: "fact-card"
  },
  {
    id: 3,
    text: "Sleep more than doubles the chance of breakthrough insight.",
    className: "fact-card fact-card-small"
  }
];

export default function AnimatedFactCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % factCards.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Simple test version first
  return (
    <div className="fact-cards-container">
      <div className="fact-cards-stack">
        <div className="fact-card">
          <p>Knowledge workers spend 57% of their day communicating — only 43% creating.</p>
        </div>
        <div className="fact-card">
          <p>3 minutes: average time to refocus after an interruption</p>
        </div>
        <div className="fact-card fact-card-small">
          <p>Sleep more than doubles the chance of breakthrough insight.</p>
        </div>
      </div>
    </div>
  );
}
