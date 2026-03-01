# Confidence English Academy - Final Launch Steps

## ✅ Completed
- Full tutoring business branding across app
- `/programs` route with subscription checkout
- Business launch kit (curriculum, pricing, marketing, operations)
- Health monitoring dashboard at `/admin/health`
- Contact links and social placeholders added
- Calendly integration placeholder ready
- Production deployment: https://my-new-app-one-chi.vercel.app

## 🎯 Required Actions (Do These Today)

### 1. Update Calendly Link (5 minutes)
**Where:** Replace `https://calendly.com/your-calendly-link` in these files:
- [app/page.tsx](app/page.tsx) - line with "Book a Trial Lesson"
- [app/programs/page.tsx](app/programs/page.tsx) - line with "Book Trial on Calendly"

**How:** 
1. If you don't have Calendly, sign up free at https://calendly.com
2. Create event: "30-min Trial Lesson"
3. Copy your Calendly event URL
4. Replace placeholder URLs in both files
5. Commit: `git add . && git commit -m "Add real Calendly link" && git push`

### 2. Update Social Media Links (3 minutes)
**Where:** [app/page.tsx](app/page.tsx) - footer section

Replace:
- `https://instagram.com/confidenceenglishacademy` → your real Instagram
- `https://tiktok.com/@confidenceenglishacademy` → your real TikTok

If you don't have these yet, create accounts now using handle: `@confidenceenglishacademy`

### 3. Configure Stripe in Vercel (10 minutes)
**Where:** Vercel Dashboard → Project Settings → Environment Variables

Add these production values:
- `NEXT_PUBLIC_PRICE_ID` = your real Stripe Price ID (create in Stripe Dashboard)
- `STRIPE_WEBHOOK_SECRET` = webhook signing secret from Stripe

**How to get Price ID:**
1. Login to Stripe Dashboard
2. Products → Create Product: "Confidence English Academy Membership"
3. Add recurring price: $19/month
4. Copy the `price_xxxxx` ID
5. Add to Vercel env vars

**How to get Webhook Secret:**
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://my-new-app-one-chi.vercel.app/api/webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.*`
4. Copy signing secret (`whsec_xxx`)
5. Add to Vercel env vars

### 4. Update Email Address (2 minutes)
**Where:** Throughout site (app/page.tsx, app/programs/page.tsx)

Replace `hello@confidenceenglishacademy.com` with your real email address.

## 📣 Marketing Launch (Start Tomorrow)

### Week 1: Content Blitz
- Post 1 short video daily using [business-kit/marketing/14-day-content-calendar.csv](business-kit/marketing/14-day-content-calendar.csv)
- Use scripts from [business-kit/marketing/social-posts-and-scripts.md](business-kit/marketing/social-posts-and-scripts.md)
- Offer "50 Everyday Phrases PDF" as lead magnet

### Week 1: Email Setup
- Set up email automation using [business-kit/marketing/email-sequence.md](business-kit/marketing/email-sequence.md)
- 3-email nurture: deliver PDF → build trust → convert to trial

### Week 2: Testimonials
- After first 3 trial lessons, request video testimonials
- Post them on socials + add to homepage

## 📊 Track These Metrics Weekly
- Website visits
- Trial bookings
- Trial → paid conversion rate
- Social engagement rate
- Email open rate

## 🚀 Optional Enhancements (Later)
- Add custom domain
- Create lead magnet PDF design
- Set up Supabase for student note persistence
- Add OpenAI for lesson content generation

## Need Help?
Check `/admin/health` dashboard to verify all integrations are working.
