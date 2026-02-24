This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

