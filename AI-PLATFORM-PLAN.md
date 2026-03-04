# 🤖 AI TUTORING PLATFORM - BUILD PLAN

**Status:** 🚀 IN DEVELOPMENT  
**Timeline:** 2-4 weeks to MVP  
**Model:** 20% Live + 80% AI

---

## 📊 BUSINESS MODEL

### **Pricing Tiers**

| Plan | Price | AI Access | Live Sessions | Best For |
|------|-------|-----------|---------------|----------|
| **Starter** | $29/mo | Unlimited | 1 group call/month | Students exploring |
| **Pro** | $79/mo | Unlimited + Priority | Weekly group calls (4/mo) | Serious learners |
| **Elite** | $199/mo | Unlimited + Custom track | Weekly group + 2 1-on-1 calls | Professionals |
| **Annual** | $249/year | Unlimited | Access to all live sessions | Budget-conscious |

---

## 🛠️ TECHNICAL ARCHITECTURE

### **Frontend (Student Experience)**
```
├── /dashboard
│   ├── Chat Interface (AI Tutor)
│   ├── Lesson Modules (Interactive)
│   ├── Progress Tracker
│   ├── Certificates & Achievements
│   └── Settings
├── /lessons
│   ├── Young Learners Module
│   ├── Beginner Module
│   ├── Intermediate Module
│   └── Advanced Module
├── /schedule
│   ├── Upcoming Live Sessions
│   ├── Group Call Zoom Links
│   └── Recording Library
└── /pricing
    └── Plans & Subscribe
```

### **Backend (AI & Data)**
```
API Endpoints:
├── /api/chat (AI conversations)
├── /api/lessons (get lesson content)
├── /api/progress (track student progress)
├── /api/schedule (live session booking)
├── /api/subscriptions (manage billing)
└── /api/certificates (generate badges)

AI System:
├── OpenAI GPT-4 Integration
├── Lesson Context (RAG - Retrieval Augmented Generation)
├── Student Profile & Learning Style
├── Conversation History Storage
└── Progress Analysis
```

### **Database Structure**
```
Tables:
├── students (id, email, subscription_tier, created_at)
├── conversations (id, student_id, messages, timestamp)
├── progress (student_id, lesson_id, completion_%, score)
├── subscriptions (student_id, plan_type, renewal_date, payment)
├── sessions (id, date_time, zoom_link, recording_url)
├── certificates (id, student_id, level_completed, issued_date)
└── lessons (id, level, content, exercises)
```

---

## 📱 FEATURES (MVP)

### **Phase 1: Foundation** (1 week)
- [x] Project planning
- [ ] Pricing page (3 tiers)
- [ ] Student dashboard skeleton
- [ ] Stripe subscriptions setup
- [ ] Authentication (student login)

### **Phase 2: AI Tutor** (1 week)
- [ ] OpenAI API integration
- [ ] Chat interface
- [ ] Lesson content upload
- [ ] Conversation history
- [ ] Basic progress tracking

### **Phase 3: Interactive Content** (1 week)
- [ ] Convert lessons to interactive modules
- [ ] Exercise/quiz system
- [ ] Auto-grading
- [ ] Certificate generation
- [ ] Achievement badges

### **Phase 4: Live Sessions** (1 week)
- [ ] Weekly group session scheduling
- [ ] Zoom integration
- [ ] Session materials PDF
- [ ] Recording storage
- [ ] Live feedback system

---

## 🔑 KEY DECISIONS MADE

✅ **AI Provider:** OpenAI GPT-4 (quality + reliability)  
✅ **Pricing Model:** Tier-based monthly subscriptions  
✅ **Live Format:** Weekly group coaching (scalable)  
✅ **Content:** Convert existing lesson plans → interactive  
✅ **Dashboard:** Full progress tracking + achievements  

---

## 💬 AI TUTOR SYSTEM PROMPT

```
You are an ESL tutor for Confidence English Academy.

Your role:
- Teach English conversation in an engaging, game-based way
- Adapt to student level (Young Learners, Beginner, Intermediate, Advanced)
- Use our lesson curriculum as reference
- Provide immediate feedback and encouragement
- Track progress and celebrate wins

Teaching Style:
- Always smile and be encouraging
- Use simple language for young learners
- Correct gently (sandwiching technique)
- Make it fun and interactive
- Ask questions to keep student talking

Lesson Flow:
1. Warm-up (~2 min) - "How are you today?"
2. Core lesson (~15 min) - Focus on today's topic
3. Practice (~10 min) - Conversation practice
4. Wrap-up (~3 min) - Celebrate learning

Remember: You're not replacing real teachers, you're supporting student learning 24/7.
```

---

## 📊 STUDENT DASHBOARD FEATURES

```
Main Dashboard Shows:
├── Current Plan: [Starter | Pro | Elite]
├── Days Until Renewal: 14 days
├── Progress Overview
│   ├── Current Level: A1-A2 (Beginner)
│   ├── Completion: 34% (12/35 lessons done)
│   ├── Streak: 5 days (keep going!)
│   └── Total Learning Hours: 12 hours
├── Next Live Session: Saturday 2pm (Join)
├── Recent Achievements
│   ├── 🏆 First Conversation (Mar 4)
│   ├── ⭐ Perfect Quiz (Mar 3)
│   └── 🎯 7-Day Streak (In Progress)
└── Quick Links
    ├── Start AI Lesson
    ├── View Certificates
    ├── See Schedule
    └── Account Settings
```

---

## 🎯 SUCCESS METRICS

**Week 1-2:**
- [ ] Platform live with AI chat
- [ ] 10+ signups on free tier
- [ ] Demo lessons working

**Week 4:**
- [ ] 3+ paid subscriptions
- [ ] Weekly live session running
- [ ] 50+ conversations logged

**Month 2:**
- [ ] 20+ active students
- [ ] $500+ MRR
- [ ] 80%+ student satisfaction

---

## 🚀 NEXT IMMEDIATE STEPS

1. **Update Homepage** → Show new pricing, remove old booking
2. **Build Pricing Page** → Display 3 subscription tiers
3. **Create Dashboard** → Skeleton for student login
4. **Setup Stripe** → Recurring billing (subscriptions)
5. **Begin AI Integration** → ChatGPT API setup

---

## 📝 NOTES

- All lesson plans already created ✅
- Stripe payment system in place ✅
- Website foundation solid ✅
- Ready to build AI layer ✅

**Current Status:** Starting Phase 1 - Foundation Build ⏳
