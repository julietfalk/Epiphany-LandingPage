# Epiphany Landing Page

A modern, high-conversion landing page for Epiphany - a performance headset + AI browser system designed to help users achieve optimal focus and flow state.

## 🚀 Features

- **Beautiful Design**: Modern UI with blue, silver, and coral color scheme
- **Interactive Animations**: Cursor brush effect and smooth Framer Motion animations
- **Waitlist Management**: Email collection with Supabase database storage
- **Email Notifications**: Automated welcome emails and admin notifications via SendGrid
- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Performance Optimized**: Built with Next.js 15 and React 19 for speed

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Email Service**: SendGrid
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- SendGrid account and API key

## 🔧 Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd epiphany-landing

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Supabase Database Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to SQL Editor
3. Run the SQL script from `supabase-setup.sql` to create the `subscribers` table

The script will:
- Create a `subscribers` table with email, timestamps, user agent, and IP tracking
- Set up indexes for performance
- Configure Row Level Security (RLS)
- Add automatic timestamp updates

### 4. SendGrid Setup

1. Create an account at [SendGrid](https://sendgrid.com)
2. Navigate to Settings → API Keys
3. Create a new API key with "Mail Send" permissions
4. Add the API key to your `.env.local` file
5. Verify your sender email address in SendGrid

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your landing page.

## 📁 Project Structure

```
epiphany-landing/
├── app/
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard
│   ├── api/
│   │   └── subscribe/      # Waitlist subscription API endpoint
│   ├── brain/              # Brain/headset feature page
│   ├── cal/                # Calendar/tracking feature page
│   ├── shield/             # Shield/AI browser feature page
│   ├── globals.css         # Global styles and design tokens
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main landing page
├── components/
│   ├── AnimatedFactCards.tsx  # Animated statistics cards
│   ├── EmailForm.tsx          # Email subscription form
│   ├── FeatureCard.tsx        # Feature display cards
│   └── Testimonials.tsx       # Testimonials section
├── lib/
│   ├── design-tokens.ts    # Central design system values
│   ├── sendgrid.ts         # SendGrid email utilities
│   └── supabase.ts         # Supabase client and database functions
├── public/                 # Static assets (images, videos, icons)
└── supabase-setup.sql      # Database schema setup script
```

## 🗄️ Database (Supabase)

The waitlist data is stored in **Supabase**, a PostgreSQL database. The `subscribers` table includes:

- `id`: Unique identifier (UUID)
- `email`: Subscriber email address (unique)
- `created_at`: Timestamp of signup
- `user_agent`: Browser/user agent information
- `ip_address`: IP address for tracking
- `status`: Subscription status (`active` or `unsubscribed`)
- `updated_at`: Last update timestamp

### Viewing Waitlist Data

You can view and manage subscribers through:
1. **Supabase Dashboard**: Go to Table Editor → `subscribers` table
2. **Admin Page**: Visit `/admin` (if implemented)
3. **Supabase API**: Use the functions in `lib/supabase.ts`

## 📧 Email System

The project uses **SendGrid** for email delivery:

- **Welcome Emails**: Sent automatically when users join the waitlist
- **Admin Notifications**: Alerts sent to admin email for each new signup
- **Email Templates**: Customizable HTML templates in `lib/sendgrid.ts`

## 🎨 Design System

### Colors
- **Deep Blue**: Primary brand color
- **Coral**: Accent and CTA color
- **Silver**: Background and neutral tones
- **Metallic**: Subtle metallic hints

### Typography
- **Headlines**: The Seasons (serif) for brand voice
- **Body**: Manrope (sans-serif) for readability

### Design Tokens
Central design values are stored in `lib/design-tokens.ts` for easy updates from Figma.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add all environment variables in the Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SENDGRID_API_KEY`
- `FROM_EMAIL`
- `ADMIN_EMAIL`

## 📝 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🔒 Security Notes

- Supabase uses Row Level Security (RLS) for database access
- API keys should never be committed to version control
- Use environment variables for all sensitive configuration
- Consider implementing rate limiting for the subscription endpoint

## 🐛 Troubleshooting

### Email Not Sending
- Verify SendGrid API key is correct
- Check that sender email is verified in SendGrid
- Review SendGrid activity logs

### Database Connection Issues
- Verify Supabase URL and anon key are correct
- Check Supabase project status
- Ensure RLS policies allow the operations you need

### Build Errors
- Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
- Check Node.js version (requires 18+)
- Verify all dependencies are installed: `npm install`

## 📄 License

All rights reserved © 2025 Epiphany

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.
