# Epiphany Landing Page

A high-conversion landing page for Epiphany - a performance headset + AI browser for flow state.

## 🚀 Features

- **Beautiful Design**: Blue, silver, and coral color scheme with metallic hints
- **Interactive Cursor**: Paint brush effect that moves the gradient background
- **Email Collection**: Waitlist signup with Resend integration
- **Responsive**: Mobile-first design that looks great on all devices
- **Performance**: Optimized for speed and accessibility

## 📧 Email Setup with Resend

### 1. Get Your Resend API Key

1. Go to [resend.com](https://resend.com) and create an account
2. Navigate to API Keys in your dashboard
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxx

# From email address (must be verified in Resend)
FROM_EMAIL=noreply@yourdomain.com

# Optional: Admin email for notifications
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Verify Your Domain

1. In Resend dashboard, go to Domains
2. Add and verify your domain
3. Update `FROM_EMAIL` in `.env.local` to use your verified domain

### 4. Test the Integration

1. Start your dev server: `npm run dev`
2. Go to the landing page
3. Enter an email address
4. Check your email for the welcome message
5. Check your admin email for the notification

## 🎥 Video Integration

### Adding Your Product Video

1. **Video Files**: Place your video file in the `public/` folder:
   - `epiphany-demo.mp4` (MP4 format - required)
   - `video-poster.jpg` (Optional poster image to replace the SVG)

2. **Video Specifications**:
   - **Format**: MP4 (H.264) - widely supported
   - **Resolution**: 1920x1080 or 1280x720 (16:9 aspect ratio)
   - **Duration**: 8-30 seconds (your 8-second video is perfect!)
   - **File Size**: Keep under 15MB for fast loading
   - **Content**: Show the headset, AI browser interface, and user experience

3. **Video Content Ideas**:
   - Headset being worn and activated
   - AI browser interface in action
   - Focus mode transitions
   - User achieving flow state
   - Data visualization of focus patterns

4. **Optimization Tips**:
   - Use HandBrake or FFmpeg to compress video
   - Consider creating multiple quality versions
   - Test on different devices and connections

### Current Video Section Features

- **Auto-play loop** on desktop (muted for user experience)
- **Mobile play button** overlay for better mobile experience
- **Elegant border** with gradient glow effect
- **Responsive design** that works on all screen sizes
- **Loading states** and fallback handling
- **Smooth animations** that match your page design

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
epiphany-landing/
├── app/
│   ├── api/subscribe/     # Email subscription API
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── EmailForm.tsx      # Email signup form
│   └── FeatureCard.tsx    # Feature display cards
├── lib/
│   └── resend.ts          # Resend email utilities
└── public/                 # Static assets
```

## 🎨 Design System

### Colors
- **Deep Blue**: `#1e3a8a` - Primary brand color
- **Coral**: `#f97316` - Accent and CTA color
- **Silver**: `#e5e7eb` - Background and neutral
- **Metallic**: `#d1d5db` - Subtle metallic hints

### Typography
- **Headlines**: Saira Extra Condensed + Orbitron
- **Body**: Inter (clean, readable)

### Animations
- **Cursor Effect**: Interactive paint brush that moves the gradient
- **Framer Motion**: Smooth entrance animations
- **CSS Transitions**: Hover effects and micro-interactions

## 📊 Analytics & Tracking

The current setup includes:
- ✅ Email collection via Resend
- ✅ Server-side logging
- ✅ Admin notifications
- 🔄 Database storage (TODO)
- 🔄 Conversion tracking (TODO)

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- **Netlify**: Add build command and environment variables
- **Railway**: Deploy with environment variables
- **Self-hosted**: Build and serve the static files

## 🔧 Customization

### Colors
Update CSS variables in `app/globals.css`:
```css
:root {
  --deep-blue: #1e3a8a;
  --coral: #f97316;
  --silver: #e5e7eb;
  /* ... */
}
```

### Content
Edit copy in `app/page.tsx` and `components/`

### Email Templates
Customize email HTML in `lib/resend.ts`

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify your Resend API key and domain
3. Ensure environment variables are set correctly

## 📄 License

All rights reserved © 2025 Epiphany
