'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut" as const
      }
    },
    hover: { 
      y: -8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-white rounded-2xl p-8 shadow-sm border border-silver hover:shadow-metallic transition-all duration-300 text-center"
    >
      <div className="icon-container">
        <Icon />
      </div>
      
      <h3 className="font-headline text-xl text-deep-blue mb-4 tracking-wide">
        {title}
      </h3>
      
      <p className="text-slate text-base leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}
