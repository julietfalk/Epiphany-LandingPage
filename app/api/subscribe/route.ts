import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Check if Supabase is configured
const isSupabaseConfigured = () =>
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if SendGrid is configured
const isSendGridConfigured = () =>
  process.env.SENDGRID_API_KEY?.startsWith('SG.');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = subscribeSchema.parse(body);

    // Get user info for tracking
    const userAgent = request.headers.get('user-agent');
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';

    // Log the subscription
    console.log('New subscription:', {
      email: validatedData.email,
      timestamp: new Date().toISOString(),
      userAgent,
      ip: ipAddress,
    });

    let dbResult: { success: boolean; error?: string } = { success: false, error: 'Supabase not configured' };
    let welcomeResult: { success: boolean; error?: string } = { success: false, error: 'SendGrid not configured' };
    let adminResult: { success: boolean; error?: string } = { success: false, error: 'SendGrid not configured' };

    // Store subscriber in Supabase database (if configured)
    if (isSupabaseConfigured()) {
      const { addSubscriber } = await import('@/lib/supabase');
      dbResult = await addSubscriber(
        validatedData.email,
        userAgent ?? undefined,
        ipAddress ?? undefined
      );
      if (!dbResult.success) {
        console.error('Failed to store subscriber in database:', dbResult.error);
      }
    } else {
      console.warn('Supabase not configured - skipping database storage');
    }

    // Send welcome email via SendGrid (if configured)
    if (isSendGridConfigured()) {
      const { sendWelcomeEmail, sendAdminNotification } = await import('@/lib/sendgrid');

      welcomeResult = await sendWelcomeEmail(validatedData.email);
      if (!welcomeResult.success) {
        console.error('Failed to send welcome email:', welcomeResult.error);
      }

      adminResult = await sendAdminNotification(validatedData.email);
      if (!adminResult.success) {
        console.error('Failed to send admin notification:', adminResult.error);
      }
    } else {
      console.warn('SendGrid not configured - skipping email sending');
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to waitlist! Check your email for confirmation.',
        timestamp: new Date().toISOString(),
        emailSent: welcomeResult.success,
        storedInDatabase: dbResult.success
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
