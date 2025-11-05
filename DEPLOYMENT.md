# Deploying to Render - Manual Setup

This guide walks you through deploying the Based Resume Screening Platform to Render (free tier) without using yaml files.

## Prerequisites

- ✅ GitHub account
- ✅ MongoDB Atlas account with a cluster set up
- ✅ Render account (sign up at https://render.com)
- ✅ Code pushed to GitHub

## Part 1: Prepare MongoDB Atlas

### 1. Whitelist Render IPs
In MongoDB Atlas, you need to allow connections from anywhere (since Render uses dynamic IPs):

1. Go to MongoDB Atlas → Security → Network Access
2. Click "ADD IP ADDRESS"
3. Select "ALLOW ACCESS FROM ANYWHERE" or enter `0.0.0.0/0`
4. Save

### 2. Get your connection string
1. Go to Database → Connect → Connect your application
2. Copy the connection string (should look like):
   ```
   mongodb+srv://Epsiba:<password>@cluster1.1pgnsxq.mongodb.net/?retryWrites=true&w=majority
   ```
3. Replace `<password>` with your actual password: `Miriam`
4. Add database name to the path:
   ```
   mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority
   ```

## Part 2: Push to GitHub

### 1. Initialize Git (if not already done)
```powershell
cd C:\Users\epsib\OneDrive\Documents\Webtech\exp9
git init
git add .
git commit -m "Initial commit - Resume screening platform"
```

### 2. Create GitHub repository
1. Go to https://github.com/new
2. Repository name: `resume-screening-platform` (or any name)
3. Make it **Public** or **Private**
4. Don't initialize with README (you already have one)
5. Click "Create repository"

### 3. Push to GitHub
```powershell
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/resume-screening-platform.git
git branch -M main
git push -u origin main
```

## Part 3: Deploy on Render (Step-by-Step)

### Step 1: Create New Web Service

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** button (top right)
3. **Select "Web Service"**

### Step 2: Connect GitHub Repository

1. **Click "Connect account"** if you haven't connected GitHub yet
2. **Authorize Render** to access your GitHub repositories
3. **Search for your repository**: Type `resume-screening-platform` (or your repo name)
4. **Click "Connect"** next to your repository

### Step 3: Configure Basic Settings

Fill in these fields:

**Name**: `resume-screening-app` (or any name you prefer)
- This will be part of your URL: `https://resume-screening-app.onrender.com`

**Region**: Select the region closest to you
- Options: Oregon (US West), Ohio (US East), Frankfurt (EU), Singapore (Asia)

**Branch**: `main` (or `master` if that's your default branch)

**Root Directory**: Leave this **blank/empty**

**Runtime**: Select **Node** from dropdown

### Step 4: Configure Build Settings

**Build Command**: Copy and paste this exactly:
```
npm install && cd client && npm install && npx vite build && cd ..
```

**Start Command**: Copy and paste this exactly:
```
npm start
```

### Step 5: Select Plan

**Instance Type**: Select **Free**
- Free tier includes 750 hours/month
- App sleeps after 15 minutes of inactivity
- Perfect for testing and portfolio projects

### Step 6: Add Environment Variables

**Click "Advanced"** button to expand advanced settings

**Add Environment Variables** - Click "+ Add Environment Variable" for each:

1. **First Variable:**
   - Key: `NODE_ENV`
   - Value: `production`

2. **Second Variable:**
   - Key: `MONGODB_URI`
   - Value: (paste your full connection string)
   ```
   mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority
   ```

3. **Third Variable:**
   - Key: `SESSION_SECRET`
   - Value: (generate a random string - example below)
   ```
   my-super-secret-key-change-this-2024-random-string
   ```
   Or use this PowerShell command to generate one:
   ```powershell
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
   ```

### Step 7: Create Web Service

1. **Review all settings** - make sure everything is correct
2. **Click "Create Web Service"** button at the bottom
3. Render will start building your app immediately

## Part 4: Wait for Deployment

Render will:
1. ✅ Clone your repository
2. ✅ Install server dependencies (`npm install`)
3. ✅ Install client dependencies (`cd client && npm install`)
4. ✅ Build React app (`npm run build` in client)
5. ✅ Start the server (`npm start`)

**This takes 3-5 minutes on free tier.**

Watch the logs in the Render dashboard. You should see:
```
Connected to MongoDB
Server running on http://localhost:10000
```

## Part 5: Access Your App

Once deployed, Render provides a URL like:
```
https://resume-screening-app-XXXX.onrender.com
```

Click the URL or copy it to access your app!

## Testing the Deployment

1. **Visit the URL**: You should see the login page
2. **Register a new account**: Fill the registration form
3. **Login**: Use your credentials
4. **Dashboard**: Submit a resume and verify it's saved to MongoDB Atlas

## Important Notes

### Free Tier Limitations
- ⚠️ **Sleeps after 15 minutes of inactivity**
  - First request after sleep takes ~30 seconds to wake up
  - Subsequent requests are normal speed
- ✅ 750 hours/month of runtime (plenty for testing)
- ✅ Automatic HTTPS

### Environment Variables Security
- ✅ Never commit passwords or secrets to Git
- ✅ Always use Render's Environment Variables UI
- ✅ MongoDB password is hidden in Render dashboard

### Updates & Redeployment
Every time you push to GitHub's `main` branch:
1. Render auto-detects the push
2. Automatically rebuilds and redeploys
3. Takes 3-5 minutes

To manually trigger a deploy:
- Go to Render dashboard → your service → "Manual Deploy" → "Deploy latest commit"

## Troubleshooting

### Build fails with "npm install" error
- Check that both root `package.json` and `client/package.json` exist
- Verify Node version (Render uses Node 20 by default)

### "Could not connect to MongoDB" error
- Verify `MONGODB_URI` is set correctly in Render Environment Variables
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Verify username/password are correct

### App shows blank page
- Check Render logs for errors: Dashboard → Service → Logs
- Verify build command ran successfully
- Ensure `client/dist` folder was created during build

### Session/cookies not working
- This is expected behavior - secure cookies work automatically with Render's HTTPS
- Test in **incognito/private** window if having issues

## Custom Domain (Optional)

To use your own domain:
1. Buy a domain (e.g., from Namecheap, Google Domains)
2. In Render dashboard → Service → Settings → Custom Domains
3. Add your domain and follow DNS configuration instructions

## Cost Estimate

- **Free Tier**: $0/month
  - 750 hours runtime
  - Sleeps after inactivity
  - Perfect for testing/portfolio projects

- **Paid Tier** (if you need 24/7 uptime): $7/month
  - No sleep
  - Faster builds
  - More resources

## Support

If deployment fails:
1. Check Render logs (Dashboard → Service → Logs)
2. Verify all environment variables are set
3. Test locally first with `NODE_ENV=production npm start`
4. Check the Render community forum: https://community.render.com

---

## Quick Reference

**Render URLs:**
- Dashboard: https://dashboard.render.com
- Docs: https://render.com/docs

**Your MongoDB Atlas Connection:**
```
mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority
```

**Build Command:**
```
npm install && cd client && npm install && npx vite build && cd ..
```

**Start Command:**
```
npm start
```

**Environment Variables:**
- `NODE_ENV`: `production`
- `MONGODB_URI`: (your full connection string)
- `SESSION_SECRET`: (random secret string)
