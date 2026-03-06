# 🎯 Stripe Setup - Do This Right Now

**Time: 10 minutes**  
**Result: Platform ready to accept payments**

---

## Step 1: Open Stripe Dashboard

1. Go to: https://dashboard.stripe.com
2. Log in to your account
3. **Make sure you're in TEST mode** (toggle at top right should be blue/on)

---

## Step 2: Create Your 3 Products

### Product #1: Starter Plan

1. Click **Products** in left sidebar
2. Click **+ Add product** (top right)
3. Fill in:
   - **Name:** `Starter Plan`
   - **Description:** `AI English tutor with unlimited conversations + 1 group coaching session per month`
   - **Image:** (optional - skip for now)

4. Under **Pricing**:
   - Click **Add pricing information**
   - **Price:** `29`
   - **Billing period:** `Monthly`
   - Click **Add price**

5. Click **Add another price**
   - **Price:** `249`
   - **Billing period:** `Yearly`
   - Click **Add price**

6. Click **Save product**

7. **COPY YOUR PRICE IDs:**
   - Click on the product you just created
   - You'll see 2 prices listed
   - Click the Monthly price → Copy the ID (starts with `price_`)
   - Click the Yearly price → Copy the ID (starts with `price_`)
   
   **Write them down:**
   ```
   STARTER_MONTHLY: price_________________
   STARTER_ANNUAL:  price_________________
   ```

---

### Product #2: Pro Plan

1. Click **Products** → **+ Add product**
2. Fill in:
   - **Name:** `Pro Plan`
   - **Description:** `Everything in Starter + All lesson levels + 4 group sessions/month + Certificates`

3. Add pricing:
   - **Monthly:** `79`
   - **Yearly:** `699`

4. Click **Save product**

5. **COPY PRICE IDs:**
   ```
   PRO_MONTHLY: price_________________
   PRO_ANNUAL:  price_________________
   ```

---

### Product #3: Elite Plan

1. Click **Products** → **+ Add product**
2. Fill in:
   - **Name:** `Elite Plan`
   - **Description:** `Everything in Pro + 2 private 1-on-1 sessions/month + Business English + Priority support`

3. Add pricing:
   - **Monthly:** `199`
   - **Yearly:** `1999`

4. Click **Save product**

5. **COPY PRICE IDs:**
   ```
   ELITE_MONTHLY: price_________________
   ELITE_ANNUAL:  price_________________
   ```

---

## Step 3: Add Price IDs to Vercel

**Now paste those 6 IDs into Vercel:**

1. Go to: https://vercel.com/dashboard
2. Click on your project: `my-new-app`
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Click **Add New** (top right)

**Add these 6 variables one by one:**

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `STRIPE_PRICE_STARTER_MONTHLY` | paste your price_xxx here | Production ✓ Preview ✓ |
| `STRIPE_PRICE_STARTER_ANNUAL` | paste your price_xxx here | Production ✓ Preview ✓ |
| `STRIPE_PRICE_PRO_MONTHLY` | paste your price_xxx here | Production ✓ Preview ✓ |
| `STRIPE_PRICE_PRO_ANNUAL` | paste your price_xxx here | Production ✓ Preview ✓ |
| `STRIPE_PRICE_ELITE_MONTHLY` | paste your price_xxx here | Production ✓ Preview ✓ |
| `STRIPE_PRICE_ELITE_ANNUAL` | paste your price_xxx here | Production ✓ Preview ✓ |

**For each variable:**
- Click **Add New**
- Enter the name exactly as shown
- Paste the price_xxx ID in Value
- Check BOTH "Production" and "Preview"
- Click **Save**

---

## Step 4: Redeploy

1. Stay in Vercel
2. Click **Deployments** tab (top)
3. Find the latest deployment (top of list)
4. Click the **...** menu (3 dots on right)
5. Click **Redeploy**
6. Wait 2-3 minutes

---

## Step 5: Test It Works! 🎉

1. Open: https://my-new-app-one-chi.vercel.app/pricing
2. Click **Start Learning** (Starter plan button)
3. Log in with: `demo@example.com` / `demo1234`
4. Click **Start Learning** again
5. **You should see Stripe checkout page!**

**If you see Stripe checkout = YOU'RE LIVE! 🚀**

---

## Test Payment (Optional)

Want to complete a test transaction?

1. On Stripe checkout, use test card: `4242 4242 4242 4242`
2. Expiry: Any future date (e.g., `12/28`)
3. CVC: Any 3 digits (e.g., `123`)
4. Email: Any email
5. Click **Subscribe**

Should redirect you to dashboard ✓

*(No real money - it's test mode)*

---

## What to Do After Setup

**Immediate:**
- [ ] Test all 3 pricing tiers (Starter, Pro, Elite)
- [ ] Test monthly AND annual billing
- [ ] Verify checkout redirects to dashboard
- [ ] Check Stripe dashboard shows test subscription

**Today:**
- [ ] Create launch post for Instagram/TikTok
- [ ] Record 30-second demo of AI tutor
- [ ] Write welcome email template
- [ ] Set calendar reminder to check Stripe daily

**Tomorrow:**
- [ ] Post announcement on social media
- [ ] DM 10-20 potential students
- [ ] Share link in bio
- [ ] Monitor first signups

---

## 🆘 Problems?

**"Plan pricing not configured" error**
- Double-check all 6 env vars are in Vercel
- Make sure no typos in price IDs
- Verify you redeployed after adding them
- Wait 2 minutes and try again

**Can't find price IDs in Stripe**
- Go to Products → Click on product
- Scroll down to "Pricing" section
- Click on the price → ID is at top
- Format: `price_1ABC2def3GHI4jkl`

**Checkout page doesn't open**
- Clear browser cache
- Try incognito/private window
- Check browser console for errors (F12)

---

## 📋 YOUR CHECKLIST

**Complete these in order:**

- [ ] Create 3 products in Stripe (Starter, Pro, Elite)
- [ ] Add 2 prices to each (monthly + annual) = 6 prices total
- [ ] Copy all 6 price IDs
- [ ] Add 6 environment variables to Vercel
- [ ] Redeploy in Vercel
- [ ] Test checkout with demo account
- [ ] Test with Stripe test card
- [ ] Verify redirect to dashboard works

**When all checked = Payment system is LIVE! ✅**

---

## 🎉 Next Steps After This Works

Once payments working, I'll help you:
1. Write your launch announcement
2. Create social media content
3. Set up email welcome sequence
4. Plan your launch day strategy

**But first: Get those Stripe IDs added!**

**Start now → Should take exactly 10 minutes → Then you're accepting real subscriptions**

Go! 🚀
