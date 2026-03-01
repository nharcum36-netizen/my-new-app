# Confidence English Academy - Tutoring Platform

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🌐 Live Demo

**Production URL:** [https://my-new-app-one-chi.vercel.app](https://my-new-app-one-chi.vercel.app)

### Quick Links

- Programs: [https://my-new-app-one-chi.vercel.app/programs](https://my-new-app-one-chi.vercel.app/programs)
- Health dashboard: [https://my-new-app-one-chi.vercel.app/admin/health](https://my-new-app-one-chi.vercel.app/admin/health)
- Health API: [https://my-new-app-one-chi.vercel.app/api/health](https://my-new-app-one-chi.vercel.app/api/health)

## 🎓 Confidence English Academy Launch Kit

This repo now includes a complete tutoring business launch package in `business-kit/`:

- Brand and positioning (`business-kit/brand-and-positioning.md`)
- Website copy (`business-kit/website-copy.md`)
- Pricing and offers (`business-kit/pricing-and-offers.md`)
- 8-week curriculum (`business-kit/curriculum/8-week-roadmap.md`)
- Operations SOP and legal checklist (`business-kit/operations/`)
- Marketing system including a 14-day content calendar and 3-email sequence (`business-kit/marketing/`)

Start here: `business-kit/README.md`

## ✨ Features

- 🎓 Tutoring business landing and programs page
- 💳 Stripe subscription checkout for membership plans
- 🧪 Built-in health dashboard for production readiness checks
- 📚 Complete business launch kit (brand, pricing, curriculum, marketing, operations)
- 📱 Responsive UI with Tailwind CSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Stripe integration (added)

This project includes basic Stripe integration to create Checkout sessions and handle webhooks.

Required environment variables (set in Vercel or locally in `.env.local`):

- `STRIPE_SECRET_KEY` — your Stripe secret key (starts with `sk_...`).
- `STRIPE_WEBHOOK_SECRET` — the webhook signing secret for your webhook endpoint (for verifying webhook signatures).

Local testing:

```bash
# install deps
npm install

# start dev server
npm run dev
```

Create a Checkout session (client-side) by POSTing to `/api/checkout` with JSON body:

```json
{ "priceId": "price_XXXXXXXX", "successUrl": "https://your-site/success", "cancelUrl": "https://your-site/cancel" }
```

Configure your Stripe Dashboard webhook to point to `/api/webhook` on your deployed domain and set `STRIPE_WEBHOOK_SECRET` accordingly.

## Supabase / Student notes persistence

To persist student notes across devices the app can use Supabase. Required env vars:

- `SUPABASE_URL` — your Supabase project URL
- `SUPABASE_SERVICE_ROLE` — service role key for server-side inserts

Create a table named `journal_entries` (legacy name still used in code) with columns at minimum: `id`, `text`, `mood`, `created_at` (timestamp).

If Supabase is not configured the client will fall back to `localStorage`.

## Client subscription price

Set `NEXT_PUBLIC_PRICE_ID` to the Stripe Price you want customers to subscribe to (created in the Stripe Dashboard). The in-app Subscribe button uses this value to create a Checkout session.

## Admin: Create Prices via API

If you want to create Stripe Products and Prices programmatically, the app includes a protected route at `/api/prices` that accepts `POST` and creates a Product + Price. Protect this route by setting an admin key:

- `PRICE_CREATION_KEY` — a secret string used to authorize price creation requests

Request example (replace <ADMIN_KEY> and values):

```bash
curl -X POST https://your-site.com/api/prices \
	-H "Authorization: Bearer <ADMIN_KEY>" \
	-H "Content-Type: application/json" \
	-d '{"productName":"Pro Plan","unitAmount":999,"currency":"usd","recurringInterval":"month"}'
```

Response contains `product` and `price` objects from Stripe. You can then copy the `price.id` into `NEXT_PUBLIC_PRICE_ID` for client Checkout.

## Launch checklist (recommended)

Use this before going live to avoid customer-facing issues.

1. Add environment variables in Vercel (Production, Preview, and Development as needed):

- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_PRICE_ID`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `PRICE_CREATION_KEY` (optional, only if using `/api/prices`)

2. Configure Stripe:

- Create/confirm your subscription Product + Price in Stripe.
- Set `NEXT_PUBLIC_PRICE_ID` to that Stripe `price_...` value.
- Point webhook to `https://<your-domain>/api/webhook`.
- Add webhook events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
- Paste webhook signing secret into `STRIPE_WEBHOOK_SECRET`.
- For payouts: Stripe Dashboard → Settings → Bank accounts and scheduling (or Payouts) → add debit card/bank and complete verification.

3. Configure Supabase:

- Ensure tables exist (`journal_entries`, `subscriptions`).
- Confirm service-role key is set only on server env vars (`SUPABASE_SERVICE_ROLE`).

4. Validate app health:

- Open `/admin/health` after deployment.
- Confirm **Overall Status** is healthy.
- Confirm **Production Readiness** is ready before launch.

5. Run final checks:

```bash
npm run lint
npm run build
```

You can also copy `.env.example` to `.env.local` for local setup.


