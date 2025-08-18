'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, AlertCircle } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailFormProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function EmailForm({ variant = 'primary', className = '' }: EmailFormProps) {
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
        setSubmitMessage('You\'re on the list! We\'ll be in touch soon.');
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

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <input
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            className={`w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-electric focus:outline-none 
                     transition-colors duration-200 bg-white text-ink placeholder-gray-400 text-lg font-light
                     ${errors.email ? 'border-signal focus:border-signal' : ''}`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        {errors.email && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-signal text-sm"
            role="alert"
            id="email-error"
          >
            <AlertCircle className="w-4 h-4" />
            {errors.email.message}
          </motion.div>
        )}

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-green-600 text-sm"
            role="alert"
          >
            <CheckCircle className="w-4 h-4" />
            {submitMessage}
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-signal text-sm"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" />
            {submitMessage}
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className={`w-full font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform text-lg
                   ${variant === 'primary'
                     ? 'bg-gradient-to-r from-electric to-hyperlime text-ink hover:shadow-lg'
                     : 'bg-white text-electric border-2 border-electric hover:bg-electric hover:text-white'
                   } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Joining...
            </div>
          ) : (
            'Join the Waitlist'
          )}
        </motion.button>

        <p className="text-xs text-gray-500 text-center font-light">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
