import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/sendgrid';
import { addSubscriber } from '@/lib/supabase';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

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

    // Store subscriber in Supabase database
    const dbResult = await addSubscriber(
      validatedData.email,
      userAgent ?? undefined,
      ipAddress ?? undefined
    );
    if (!dbResult.success) {
      console.error('Failed to store subscriber in database:', dbResult.error);
      // Continue anyway - don't fail the subscription
    }

    // Send welcome email via SendGrid
    const welcomeResult = await sendWelcomeEmail(validatedData.email);
    if (!welcomeResult.success) {
      console.error('Failed to send welcome email:', welcomeResult.error);
      // Continue anyway - don't fail the subscription
    }

    // Send admin notification
    const adminResult = await sendAdminNotification(validatedData.email);
    if (!adminResult.success) {
      console.error('Failed to send admin notification:', adminResult.error);
      // Continue anyway - don't fail the subscription
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
