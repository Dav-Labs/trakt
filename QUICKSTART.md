# 🚀 TRAKT Quick Start Guide

## Get Your MVP Running in Under 30 Minutes

### Step 1: Set Up Supabase (5 minutes)

1. Go to [https://supabase.com](https://supabase.com) and sign up
2. Click **"New Project"**
3. Fill in:
   - **Name**: TRAKT
   - **Database Password**: (save this somewhere)
   - **Region**: Choose closest to you
4. Click **"Create new project"** and wait ~2 minutes

5. Once ready, click **"SQL Editor"** in the left sidebar
6. Click **"New Query"**
7. Open `supabase-schema.sql` from your project
8. Copy ALL contents and paste into the editor
9. Click **"Run"** - You should see "Success"

10. Create another new query
11. Open `seed-national-parks.sql`
12. Copy ALL contents and paste into the editor
13. Click **"Run"** - You should see "Success"

14. Go to **"Project Settings"** → **"API"**
15. Copy these two values:
    - **Project URL**
    https://qgomasmmkxeojnotudfv.supabase.co
    - **anon public** key
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnb21hc21ta3hlb2pub3R1ZGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyODUzNzMsImV4cCI6MjA3OTg2MTM3M30.9tJ2QSbkgH9mC764s5vbQLMr6QaWr9IoydetciMF_zs

### Step 2: Configure Your App (2 minutes)

1. Open your terminal
2. Navigate to the project:
   ```bash
   cd /Users/dav/Desktop/TRAKT/trakt-app
   ```

3. Create environment file:
   ```bash
   cat > .env.local << 'EOF'
   NEXT_PUBLIC_SUPABASE_URL=https://qgomasmmkxeojnotudfv.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnb21hc21ta3hlb2pub3R1ZGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyODUzNzMsImV4cCI6MjA3OTg2MTM3M30.9tJ2QSbkgH9mC764s5vbQLMr6QaWr9IoydetciMF_zs
   ```

4. Edit `.env.local` and replace with your actual values from Supabase

### Step 3: Install & Run (3 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

### Step 4: Test the App (10 minutes)

1. **Sign Up**
   - Click "Get Started"
   - Enter: Name, Email, Password
   - You'll be auto-logged in

2. **Explore Locations**
   - Click "Explore" in nav
   - Try filtering by category (National Parks)
   - Try filtering by state (California, Utah, etc.)
   - Click on a location card

3. **Check In**
   - On location page, click "Check In"
   - Add a note (optional): "Amazing views!"
   - Click "Confirm Check-in"
   - See the green checkmark ✓

4. **View Profile**
   - Click "Profile" in nav
   - See your stats update
   - See your check-in in the list
   - Watch the progress bar

5. **View Dashboard**
   - Click "Dashboard"
   - See your recent check-ins
   - See category overview

### Step 5: Deploy to Vercel (10 minutes)

1. **Initialize Git** (if not done)
   ```bash
   cd /Users/dav/Desktop/TRAKT/trakt-app
   git init
   git add .
   git commit -m "Initial TRAKT MVP"
   ```

2. **Push to GitHub**
   - Create a new repo on GitHub
   - Follow GitHub instructions to push

3. **Deploy to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repo
   - Add Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = (your value)
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (your value)
   - Click "Deploy"
   - Wait ~2 minutes

4. **Test Your Live Site**
   - Visit your Vercel URL
   - Test signup/login
   - Test check-ins
   - Share with friends!

## 🎉 You're Live!

Your TRAKT app is now running in production!

## What to Do Next

### Immediate Actions
- [ ] Share with 5 friends to test
- [ ] Check in at your favorite location
- [ ] Add your own locations to database
- [ ] Customize the colors/branding

### This Week
- [ ] Get 10 users signed up
- [ ] Gather feedback
- [ ] Monitor Supabase usage
- [ ] Plan Phase 2 features

### This Month
- [ ] Reach 50 users
- [ ] Add more categories
- [ ] Add more locations
- [ ] Start building social features

## Common Issues & Fixes

### "Invalid login credentials"
- Check your Supabase URL and key in `.env.local`
- Make sure you ran both SQL files

### "Table doesn't exist"
- Go to Supabase SQL Editor
- Run `supabase-schema.sql` again

### "Cannot connect to database"
- Check your Supabase project is active
- Check your internet connection
- Verify credentials are correct

### Build errors
- Make sure Node.js 20+ is installed
- Delete `node_modules` and run `npm install` again
- Clear `.next` folder: `rm -rf .next`

## Need Help?

1. Check `SETUP.md` for detailed instructions
2. Check `DEPLOYMENT.md` for complete guide
3. Review Supabase logs in dashboard
4. Check Vercel deployment logs

## 📊 Monitor Your App

### Supabase Dashboard
- **Database**: See your tables and data
- **Auth**: See registered users
- **Logs**: Debug issues

### Vercel Dashboard
- **Analytics**: See traffic
- **Logs**: See errors
- **Deployments**: See all versions

## 🎯 Success Metrics

Track these in first 2 weeks:
- Number of signups
- Number of check-ins
- Most popular category
- Most popular location
- User feedback

## 🚀 You're Ready!

Everything is set up and working. Now go:
1. Test it thoroughly
2. Get feedback from users
3. Iterate and improve
4. Plan Phase 2 features

**Happy tracking! 🗺️**

