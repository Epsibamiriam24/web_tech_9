# Render Deployment - Simple Step-by-Step Guide

## 🎯 What You'll Do
Deploy your Resume Screening Platform to Render so it's accessible online with a URL like: `https://your-app-name.onrender.com`

---

## 📋 Before You Start

Make sure you have:
- ✅ Code pushed to GitHub (repository: `REPO1` or your repo name)
- ✅ MongoDB Atlas cluster with Network Access set to `0.0.0.0/0`
- ✅ Your MongoDB connection string ready:
  ```
  mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority
  ```
- ✅ Render account created at https://render.com (free)

---

## 🚀 Deployment Steps

### Step 1: Go to Render Dashboard
1. Open browser → https://dashboard.render.com
2. Log in to your Render account

### Step 2: Create New Web Service
1. Click **"New +"** button (top right corner)
2. Click **"Web Service"**

### Step 3: Connect Your GitHub Repository
1. Click **"Connect account"** (if first time)
2. Authorize Render to access GitHub
3. **Search** for your repository name
4. Click **"Connect"** button next to your repo

### Step 4: Fill in Basic Information

| Field | What to Enter |
|-------|---------------|
| **Name** | `resume-screening-app` (or any name) |
| **Region** | Select closest: Oregon / Ohio / Frankfurt / Singapore |
| **Branch** | `main` or `master` |
| **Root Directory** | Leave **blank** |
| **Runtime** | Select **Node** |

### Step 5: Set Build & Start Commands

**Build Command** (copy-paste this):
```
npm install && cd client && npm install && npx vite build && cd ..
```

**Start Command** (copy-paste this):
```
npm start
```

### Step 6: Select Free Plan
- **Instance Type**: Click **Free**
- This gives you 750 hours/month (plenty for testing)

### Step 7: Add Environment Variables

Click **"Advanced"** button, then add these 3 variables:

**Variable 1:**
```
Key: NODE_ENV
Value: production
```

**Variable 2:**
```
Key: MONGODB_URI
Value: mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority
```

**Variable 3:**
```
Key: SESSION_SECRET
Value: my-super-secret-key-2024-change-this
```
(Use any random string - make it long and random)

### Step 8: Deploy!
1. **Review** all settings one more time
2. Click **"Create Web Service"** button at bottom
3. ⏳ Wait 3-5 minutes while Render builds your app

---

## ⏰ While Waiting (Build Process)

You'll see logs like this:
```
==> Cloning from https://github.com/...
==> Running 'npm install'...
==> Running 'cd client && npm install'...
==> Running 'npm run build'...
==> Build successful!
==> Starting service with 'npm start'...
Connected to MongoDB
Server running on http://localhost:10000
==> Your service is live! 🎉
```

**Build time**: Usually 3-5 minutes on free tier

---

## ✅ After Deployment

### Your App URL
Render gives you a URL like:
```
https://resume-screening-app-xxxx.onrender.com
```

**Find it**: Top of your Render dashboard, under service name

### Test Your App
1. Click the URL
2. You should see the **Login page**
3. Click **"Sign up"** to register
4. Fill form and submit
5. You'll be redirected to **Dashboard**
6. Try submitting a resume
7. Check if resume appears in the list

---

## ⚠️ Common Issues & Fixes

### Issue 1: Build Fails
**Error**: "npm install failed"

**Fix**:
- Check Build Command is correct (no typos)
- Verify `package.json` exists in both root and `client/` folders

### Issue 2: MongoDB Connection Error
**Error**: "Could not connect to MongoDB"

**Fix**:
- Go to MongoDB Atlas → Security → Network Access
- Add IP address: `0.0.0.0/0` (allow all)
- Wait 1 minute for it to apply
- In Render: Manual Deploy → Deploy Latest Commit

### Issue 3: Blank Page / White Screen
**Error**: App loads but shows nothing

**Fix**:
- Check Render logs for errors
- Verify Build Command ran successfully
- Look for "Build successful" in logs
- Check `client/dist` folder was created

### Issue 4: "Service Unavailable" / 503 Error
**Cause**: App is waking up from sleep (free tier)

**Fix**: Just wait 30 seconds and refresh

---

## 📱 Your App is Live!

Congratulations! Your app is now:
- ✅ Online 24/7 (sleeps after 15 min inactivity on free tier)
- ✅ Accessible from anywhere with the URL
- ✅ Using MongoDB Atlas for database
- ✅ Secured with HTTPS automatically
- ✅ Auto-deploys when you push to GitHub

### Share Your App
Send this URL to anyone:
```
https://your-app-name.onrender.com
```

They can:
- Register an account
- Login
- Submit resumes
- View their dashboard

---

## 🔄 Making Updates

### To update your deployed app:

1. **Make changes** to your code locally
2. **Commit and push** to GitHub:
   ```powershell
   git add .
   git commit -m "Update feature X"
   git push origin main
   ```
3. **Render auto-deploys** within 5 minutes
4. Or manually: Render Dashboard → Manual Deploy → Deploy Latest Commit

---

## 💰 Cost

**Free Tier:**
- $0/month
- 750 hours of runtime
- Sleeps after 15 min inactivity
- Perfect for portfolio/testing

**Paid Tier** (if you need always-on):
- $7/month
- No sleep
- Faster
- More resources

---

## 📞 Need Help?

**Render Support:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**Check Logs:**
- Render Dashboard → Your Service → Logs tab

**Common Log Messages:**
- ✅ "Connected to MongoDB" = Good!
- ✅ "Server running on..." = Good!
- ❌ "Could not connect" = Check MongoDB whitelist
- ❌ "Build failed" = Check build command

---

## 🎉 That's It!

Your full-stack app with React frontend and Node.js backend is now deployed on Render!

**Your URL**: `https://resume-screening-app-xxxx.onrender.com`

**MongoDB**: Hosted on Atlas
**Frontend**: React with Vite
**Backend**: Node.js + Express
**Database**: MongoDB Atlas

Enjoy your deployed app! 🚀
