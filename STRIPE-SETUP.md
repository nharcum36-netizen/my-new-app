# 🔑 STRIPE SETUP GUIDE (15 minutes)

Follow these exact steps to enable payment processing in production.

---

## 📋 What You Need

- Stripe account (free to create)
- Access to Vercel dashboard
- 15 minutes

---

## Step 1: Create Stripe Account (2 minutes)

If you don't have one:

1. Go to https://stripe.com
2. Click "Sign up"
3. Enter your email and password
4. For "Business type" select: Individual or Sole Proprietor
5. Complete verification (may take hours to days for full features, but you can use test mode immediately)

---

## Step 2: Create Product & Price (3 minutes)

1. Login to Stripe Dashboard: https://dashboard.stripe.com
2. Click **Products** in left sidebar
3. Click **+ Create Product**
4. Fill in:
   - **Name:** `Confidence English Academy Membership`
   - **Description:** `Monthly membership with recorded lessons, worksheets, and live Q&A`
   - **Pricing model:** Recurring
   - **Billing period:** Monthly
   - **Price:** `$19.00`
5. Keep **Test mode** toggle ON (blue) in top right
6. Click **Create Product**
7. **Copy the Price ID** - it looks like: `price_1ABC2xyz123...`
   - Go to the product, click on the price
   - Copy the ID (starts with `price_`)
   - Save it somewhere safe

---

## Step 3: Get API Keys (2 minutes)

1. Still in Stripe Dashboard
2. Click **Developers** in left sidebar
3. Click **API keys**
4. You'll see:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)
5. We need the **Secret key** - click "Reveal" and copy it

---

## Step 4: Set up Webhook (5 minutes)

1. In Stripe Dashboard, click **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. For "Endpoint URL" enter:
   ```
   https://my-new-app-one-chi.vercel.app/api/webhook
   ```
4. For "Events to send" select:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
5. Click **Add endpoint**
6. Click on the endpoint you just created
7. Scroll down and click **Reveal** under "Signing secret"
8. Copy the secret (starts with `whsec_...`)
9. Save it somewhere safe

---

## Step 5: Add to Vercel (3 minutes)

1. Go to Vercel Dashboard: https://vercel.com
2. Select your project: `my-new-app`
3. Click **Settings** → **Environment Variables**
4. You'll add 3 variables for **Production**:

### Variable 1: Stripe Secret Key
- **Name:** `STRIPE_SECRET_KEY`
- **Value:** Paste the secret key from Step 3 (starts with `sk_test_...`)
- **Environments:** Select "Production" only
- Click "Add"

### Variable 2: Webhook Secret
- **Name:** `STRIPE_WEBHOOK_SECRET`
- **Value:** Paste the signing secret from Step 4 (starts with `whsec_...`)
- **Environments:** Select "Production" only
- Click "Add"

### Variable 3: Price ID
- **Name:** `NEXT_PUBLIC_PRICE_ID`
- **Value:** Paste the Price ID from Step 2 (starts with `price_...`)
- **Environments:** Select "Production" only
- Click "Add"

**Screenshot reference:**
```
Environment Variables
Production

STRIPE_SECRET_KEY = sk_test_...
STRIPE_WEBHOOK_SECRET = whsec_...
NEXT_PUBLIC_PRICE_ID = price_...
```

---

## Step 6: Verify Setup (2 minutes)

1. Wait 2-3 minutes for Vercel to redeploy with new env vars
2. Go to: https://my-new-app-one-chi.vercel.app/admin/health
3. Look for **Stripe** section
4. Should show:
   - ✅ Stripe: Healthy
   - ✅ Webhook Secret: Configured
   - ✅ Price ID: Configured
5. If all green, you're done!

---

## 🧪 Test Payment (Optional)

Want to test it works?

1. Go to: https://my-new-app-one-chi.vercel.app/programs
2. Click **Subscribe Now**
3. Stripe will open checkout in **TEST MODE**
4. Use test card: `4242 4242 4242 4242`
5. Use any future expiry date and any 3-digit CVC
6. Enter any email address
7. Complete the test transaction
8. You should see success page

(No real money charged - it's just test mode)

---

## ✅ Congratulations!

Your payment system is now live. You're ready to:
- ✅ Accept real subscriptions
- ✅ Track customer payments
- ✅ Manage subscriptions from Stripe Dashboard

---

## 🆘 Troubleshooting

**Problem:** "Production Readiness: FALSE" on health dashboard

**Solution:** 
- Make sure all 3 env vars are added to Production (not just Preview)
- Wait 2-3 minutes for Vercel to redeploy
- Refresh the health page

---

**Problem:** Webhook endpoint shows as inactive

**Solution:**
- Check the URL is exactly: `https://my-new-app-one-chi.vercel.app/api/webhook`
- Check the signing secret matches what's in Vercel env vars
- Check the webhook is listening for the right events

---

## Next Steps

1. ✅ Stripe configured
2. ⬜ Update contact info (BUSINESS-CONFIG.md)
3. ⬜ Start posting content (14-day calendar)
4. ⬜ Set up email automation (3-email sequence)

You're almost there!
