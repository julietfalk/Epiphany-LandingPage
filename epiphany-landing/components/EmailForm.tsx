'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailFormProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

// Context for sharing subscription state between forms
interface SubscriptionContextType {
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <SubscriptionContext.Provider value={{ isSubscribed, setIsSubscribed }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default function EmailForm({ variant = 'primary', className = '' }: EmailFormProps) {
  const { isSubscribed, setIsSubscribed } = useSubscription();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('You\'re on the list! We\u2019ll be in touch soon.');
        setIsSubscribed(true); // Update shared state
        reset();
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02, y: -1 },
    tap: { scale: 0.98 },
  };

  // Success state component
  const SuccessState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center py-8"
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue via-silver to-coral rounded-2xl opacity-20 blur-xl transform scale-110"></div>
        <div className="relative bg-gradient-to-r from-deep-blue via-silver to-coral rounded-2xl p-8 shadow-2xl">
          <h3 className="text-3xl text-white mb-3 tracking-wide" style={{ fontFamily: '"FONTSPRING DEMO - The Seasons"', fontWeight: '700' }}>
            Welcome to Epiphany
          </h3>
          <p className="text-lg text-white opacity-90 max-w-md mx-auto" style={{ fontFamily: 'Manrope, sans-serif' }}>
            You&apos;re now on the waitlist. Check your email for confirmation!
          </p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-slate text-sm font-medium" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Early access coming soon
        </p>
      </div>
    </motion.div>
  );

  // If subscribed (either from this form or the other), show success state
  if (isSubscribed) {
    return <SuccessState />;
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="email-form-container">
        <div className="email-form-row">
          <div className="email-input-wrapper">
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your Email"
              className={`email-input ${errors.email ? 'border-error' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={isSubmitting}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="join-waitlist-button-side"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="loading-spinner" />
                Joining...
              </div>
            ) : (
              'Join the Waitlist'
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {errors.email && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-red-500 text-sm"
              role="alert"
              id="email-error"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.email.message}
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-red-500 text-sm"
              role="alert"
            >
              <AlertCircle className="w-4 h-4" />
              {submitMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="privacy-text">
          Don't worry, We keep your inbox as distraction-free as your mind.
        </p>
      </form>
    </div>
  );
}
