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
            className={errors.email ? 'border-coral focus:border-coral' : ''}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={isSubmitting}
          />
        </div>

        {errors.email && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-500 text-sm"
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
            className="flex items-center gap-2 text-red-500 text-sm"
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
          className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
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

        <p className="text-xs text-slate text-center font-light">
          No spam. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
