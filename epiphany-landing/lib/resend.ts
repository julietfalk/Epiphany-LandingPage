import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@epiphany.com',
      to: [email],
      subject: 'Welcome to the Epiphany Waitlist! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e3a8a; text-align: center; margin-bottom: 30px;">
            Welcome to Epiphany! 🎯
          </h1>
          
          <p style="font-size: 18px; line-height: 1.6; color: #333; margin-bottom: 20px;">
            You're now on the waitlist for the future of focus. We're building something special.
          </p>
          
          <div style="background: linear-gradient(135deg, #1e3a8a, #f97316); padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h2 style="color: white; margin: 0; text-align: center;">
              What's Next?
            </h2>
            <ul style="color: white; line-height: 1.8;">
              <li>🚀 Early access to pre-orders</li>
              <li>💡 Exclusive product updates</li>
              <li>🎁 Special launch discounts</li>
              <li>🔬 Beta testing opportunities</li>
            </ul>
          </div>
          
          <p style="font-size: 16px; color: #666; text-align: center; margin-top: 30px;">
            We'll be in touch soon with exciting updates!
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px;">
              Epiphany - Go with the Flow
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function sendAdminNotification(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'noreply@epiphany.com',
      to: [process.env.ADMIN_EMAIL || 'admin@epiphany.com'],
      subject: 'New Epiphany Waitlist Signup! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e3a8a; text-align: center; margin-bottom: 30px;">
            New Waitlist Signup! 🎯
          </h1>
          
          <p style="font-size: 18px; line-height: 1.6; color: #333; margin-bottom: 20px;">
            Someone just joined the Epiphany waitlist!
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin: 0 0 10px 0;">New Subscriber:</h3>
            <p style="font-size: 16px; color: #333; margin: 0;">
              <strong>Email:</strong> ${email}
            </p>
            <p style="font-size: 16px; color: #333; margin: 10px 0 0 0;">
              <strong>Time:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <p style="font-size: 16px; color: #666; text-align: center; margin-top: 30px;">
            Total waitlist size is growing! 🚀
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Admin notification error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Admin email error:', error);
    return { success: false, error: 'Failed to send admin notification' };
  }
}
