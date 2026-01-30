# Stripe Integration for Early Access Pre-orders

## Overview

Integrate Stripe payment for the waitlist signup flow. When users submit their email, they're redirected to Stripe checkout with their email pre-filled.

**Stripe Payment Link**: `https://buy.stripe.com/00w28s8zd7ec6k3651c7u00`

## Flow

```
User enters email → POST /api/subscribe → Email saved to Supabase → Redirect to Stripe (email prefilled) → Payment → Back to homepage
```

## Implementation Details

### 1. EmailForm Component (`components/EmailForm.tsx`)

**Changes made:**

```typescript
// On successful API response, redirect to Stripe instead of showing success state
if (response.ok) {
  const stripeUrl = `https://buy.stripe.com/00w28s8zd7ec6k3651c7u00?prefilled_email=${encodeURIComponent(data.email)}`;
  window.location.href = stripeUrl;
  return;
}
```

- Button text: `"Get Early Access"` (was "Join the Waitlist")
- Loading text: `"Redirecting..."` (was "Joining...")

### 2. API Route (`app/api/subscribe/route.ts`)

**Graceful degradation for missing env vars:**

- Supabase: Only attempts database storage if `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- SendGrid: Only attempts email sending if `SENDGRID_API_KEY` starts with `SG.`
- API returns success even if DB/email fail (allows Stripe redirect to proceed)

### 3. Supabase Client (`lib/supabase.ts`)

**Lazy initialization:**

- Client is created on first use, not at import time
- Prevents crashes when env vars are missing
- Uses `getSupabase()` function for lazy loading

### 4. SendGrid (`lib/sendgrid.ts`)

**Conditional API key setup:**

- Only sets API key if it's valid (starts with `SG.`)
- Prevents initialization errors

## Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | For DB storage |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | For DB storage |
| `SENDGRID_API_KEY` | SendGrid API key (starts with SG.) | For emails |
| `FROM_EMAIL` | Sender email address | For emails |
| `ADMIN_EMAIL` | Admin notification recipient | For emails |

## Manual Steps Required

### Stripe Dashboard

1. Go to your Stripe Payment Link settings
2. Set **Success URL** to: `https://your-domain.com/` (or `/?payment=success` for future success message handling)
3. Save changes

### Vercel Deployment

**Current issue:** Vercel Root Directory is set to `epiphany-landing/` but files are now at root.

**Fix:**
1. Go to Vercel Dashboard → Project Settings → General
2. Find "Root Directory"
3. Clear it (leave empty) or set to `.`
4. Redeploy

## Benefits of This Approach

1. **Email capture before payment** - Even if user abandons Stripe, you have their email for follow-up
2. **Pre-filled email** - Reduces friction at checkout
3. **Single component change** - All 10+ form instances updated automatically
4. **Graceful degradation** - Works even without Supabase/SendGrid configured

## Future Enhancements

- [ ] Add success banner on homepage after payment (`?payment=success` query param)
- [ ] Stripe webhook integration to sync paid customers to Supabase
- [ ] Different tiers/pricing options
