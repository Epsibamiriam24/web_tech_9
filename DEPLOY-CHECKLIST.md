# Quick Deployment Checklist

Use this checklist to deploy to Render step-by-step.

## ✅ Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB Atlas Network Access allows 0.0.0.0/0
- [ ] MongoDB connection string ready with correct username/password
- [ ] GitHub account created
- [ ] Render account created (https://render.com)

## 📋 Step-by-Step Deployment

### Step 1: Commit and Push to GitHub
```powershell
# If not already initialized
git init
git add .
git commit -m "Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/resume-screening-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. **Connect GitHub** repository
4. Select your repo: `resume-screening-platform`
5. Configure settings:
   - **Name**: `resume-screening-app`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install && cd client && npm install && npx vite build && cd ..`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Click **"Advanced"** and add environment variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: `mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority`
   - `SESSION_SECRET`: `my-super-secret-key-2024-change-this`
7. Click **"Create Web Service"**
8. Wait 3-5 minutes for build

### Step 3: Test Your Deployment

1. Click the URL Render provides (e.g., `https://resume-screening-app-xxxx.onrender.com`)
2. Register a new account
3. Login
4. Submit a resume
5. Verify resume appears in list

## ✅ Success Indicators

- ✅ Build completes without errors
- ✅ Logs show "Connected to MongoDB"
- ✅ Logs show "Server running on..."
- ✅ URL loads the login page
- ✅ Can register new account
- ✅ Can login with credentials
- ✅ Dashboard loads with user info
- ✅ Can submit resume
- ✅ Resume appears in list

## 🔧 If Something Fails

### Build Error
- Check Render logs
- Verify `package.json` has correct scripts
- Ensure `client/package.json` exists

### MongoDB Connection Error
- Verify `MONGODB_URI` environment variable is set correctly
- Check MongoDB Atlas Network Access whitelist
- Confirm username (`Epsiba`) and password (`Miriam`) are correct

### Blank Page / 404 Error
- Check build logs - did `npm run build` succeed?
- Verify `client/dist` folder was created
- Check server logs for errors

### Session/Auth Not Working
- Clear browser cookies
- Try incognito/private window
- Verify `SESSION_SECRET` is set in Render

## 📝 Environment Variables Summary

Set these in Render dashboard → Service → Environment:

| Variable | Value | Notes |
|----------|-------|-------|
| `NODE_ENV` | `production` | Auto-set by render.yaml |
| `MONGODB_URI` | `mongodb+srv://Epsiba:Miriam@cluster1.1pgnsxq.mongodb.net/based_resume_screening?retryWrites=true&w=majority` | Your full connection string |
| `SESSION_SECRET` | Auto-generated | Or set custom secret |

## 🚀 Post-Deployment

- [ ] Bookmark your Render URL
- [ ] Test all features (register, login, submit resume)
- [ ] Check MongoDB Atlas to verify data is saved
- [ ] Share URL with others for testing

## 📚 Full Documentation

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.
