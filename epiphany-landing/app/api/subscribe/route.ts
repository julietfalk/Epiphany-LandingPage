import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = subscribeSchema.parse(body);
    
    // Log the subscription (replace with your actual logging/analytics)
    console.log('New subscription:', {
      email: validatedData.email,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });

    // TODO: Hook up to real Email Service Provider (ESP)
    // Examples: Mailchimp, ConvertKit, SendGrid, etc.
    // const response = await espClient.subscribe(validatedData.email);
    
    // TODO: Store in database for analytics
    // await db.subscriptions.create({ email: validatedData.email });
    
    // TODO: Send welcome email
    // await emailService.sendWelcome(validatedData.email);
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to waitlist',
        timestamp: new Date().toISOString()
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
