# ⚙️ CONFIGURE YOUR BUSINESS INFO

Replace the values below with your actual information. These will be referenced throughout the site.

```javascript
// YOUR BUSINESS CONFIG - Edit these values
export const BUSINESS_CONFIG = {
  // Contact Information
  businessName: "Confidence English Academy",
  ownerName: "Your Name",
  email: "hello@confidenceenglishacademy.com", // ← REPLACE WITH YOUR EMAIL
  phone: "+1 (555) 123-4567", // Optional
  
  // Booking & Calendar
  calendlyUrl: "https://calendly.com/your-calendly-link", // ← REPLACE WITH YOUR CALENDLY URL
  
  // Social Media
  instagram: "https://instagram.com/confidenceenglishacademy", // ← REPLACE WITH YOUR INSTAGRAM
  tiktok: "https://tiktok.com/@confidenceenglishacademy", // ← REPLACE WITH YOUR TIKTOK
  youtube: "", // Optional
  
  // Pricing
  membershipPrice: "$19/month",
  trialPrice: "Free or $15",
  oneOnOneRate: "$35/60 min",
  groupClassRate: "$79/month",
  businessRate: "$55/session",
  
  // Business Details
  businessHours: "Tue-Fri evenings, Sat mornings",
  timezone: "EST",
};
```

---

## 📝 Quick Fill-In Guide

### 1. Email Address
Copy your email address and replace:
```
hello@confidenceenglishacademy.com
```

**Example:**
```
nichole.t@gmail.com
```

---

### 2. Calendly URL
1. Go to https://calendly.com
2. Sign up (free)
3. Create new event: "30-min Trial Lesson"
4. Copy the URL from your event
5. Replace: `https://calendly.com/your-calendly-link`

**Example:**
```
https://calendly.com/nichole-t/trial-lesson
```

---

### 3. Instagram Handle
1. Sign up at https://instagram.com if you don't have an account
2. Use handle: `@confidenceenglishacademy` (or similar)
3. Replace: `https://instagram.com/confidenceenglishacademy`

**Example:**
```
https://instagram.com/confidenceenglishacademy
```

---

### 4. TikTok Handle
1. Sign up at https://tiktok.com if you don't have an account
2. Use handle: `@confidenceenglishacademy` (or similar)
3. Replace: `https://tiktok.com/@confidenceenglishacademy`

**Example:**
```
https://tiktok.com/@confidenceenglishacademy
```

---

## 🔍 Where to Find Placeholders in Code

**Homepage (app/page.tsx):**
- Line 11: Calendly link in "Book a Trial Lesson" button
- Line 18-20: Instagram, TikTok links
- Line 16: Email address

**Programs Page (app/programs/page.tsx):**
- Line 35: Calendly link in "Book Trial on Calendly" button
- Line 39-41: Email address

**README.md:**
- Various contact links

---

## ✅ How to Update (Choose One Method)

### Method 1: Edit in VS Code (Easiest)
1. Open project folder: `C:\Users\Nichole T\my-new-app`
2. Search for each placeholder using Ctrl+F
3. Replace with your actual info
4. Save files
5. Run: `git add . && git commit -m "Add business info" && git push`

### Method 2: I Do It For You
Provide me with:
- Your email
- Your Calendly URL
- Your Instagram handle
- Your TikTok handle

I'll update all files and deploy in 2 minutes.

---

## 📱 What Gets Updated

Once you fill these in:
- ✅ Homepage displays your real contact info
- ✅ Booking button links to your Calendly
- ✅ Social media links go to your accounts
- ✅ Customers can email you directly
- ✅ All pages consistent with your branding

---

## Next: Stripe Setup

After updating contact info, you'll need to configure Stripe in Vercel (15 minutes):
See `LAUNCH-CHECKLIST.md` for detailed Stripe setup instructions.
