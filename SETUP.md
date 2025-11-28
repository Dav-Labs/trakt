# TRAKT MVP - Setup & Deployment Guide

## Prerequisites

- Node.js 20.9.0 or higher
- A Supabase account (free tier works)
- A Vercel account (free tier works)

## Local Setup

### 1. Install Dependencies

```bash
cd trakt-app
npm install
```

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned (usually 1-2 minutes)
3. Once ready, go to **Project Settings > API**
4. Copy your **Project URL** and **anon/public** API key

### 3. Configure Environment Variables

Create a `.env.local` file in the `trakt-app` directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Paste it into the editor and click **Run**
4. This creates all tables, RLS policies, and triggers

### 5. Seed Initial Data

1. In the SQL Editor, copy the contents of `seed-national-parks.sql`
2. Paste and run it to populate the database with National Parks data

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### Option 1: Connect GitHub Repository (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial TRAKT MVP"
   git push origin main
   ```

2. Go to [https://vercel.com](https://vercel.com)
3. Click **Add New Project**
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. Click **Deploy**

### Option 2: Deploy via CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd trakt-app
   vercel
   ```

3. Follow prompts and add environment variables when asked

## Testing the MVP

### 1. Create an Account
- Navigate to `/signup`
- Enter email, name, and password
- You'll be automatically logged in and redirected to dashboard

### 2. Explore Locations
- Click **Explore** in navigation
- Filter by category (National Parks, etc.)
- Filter by state
- View location cards

### 3. Check In at a Location
- Click on any location card
- View location details
- Click **Check In** button
- Optionally add notes about your visit
- Confirm check-in

### 4. View Your Profile
- Click **Profile** in navigation
- See your stats (total check-ins, categories explored, etc.)
- View category progress bars
- See all your check-ins chronologically

### 5. View Dashboard
- Click **Dashboard** in navigation
- See summary stats
- Browse categories
- View recent check-ins

## Troubleshooting

### Authentication Issues

If you get authentication errors:

1. Check that your Supabase URL and key are correct in `.env.local`
2. Verify RLS policies are enabled (should be set by schema SQL)
3. Make sure the `handle_new_user()` trigger is created

### Database Connection Issues

1. Ensure your Supabase project is active
2. Check that you ran both SQL files (schema and seed data)
3. Verify tables exist in **Table Editor** in Supabase dashboard

### Build Errors

If you get build errors about Node version:
```bash
# Install nvm if you haven't
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node 20+
nvm install 20
nvm use 20
```

## Next Steps

After successful MVP deployment:

1. **Add Custom Domain** (optional)
   - In Vercel project settings, add your domain
   - Configure DNS records as instructed

2. **Monitor Usage**
   - Check Supabase dashboard for database usage
   - Check Vercel analytics for traffic

3. **Invite Beta Users**
   - Share your deployed URL
   - Gather feedback

4. **Plan Phase 2**
   - Once MVP is validated, start adding social features
   - Consider adding photo uploads
   - Implement friend/follow system

## Cost Estimates (Free Tier Limits)

### Supabase Free Tier
- 500MB database storage
- 1GB file storage
- 50,000 monthly active users
- 2GB bandwidth

### Vercel Free Tier
- 100GB bandwidth
- Unlimited deployments
- Automatic SSL

**You can comfortably run with 100-1000 users on free tiers!**

## Support

If you encounter issues:
1. Check the README.md for basic setup
2. Review Supabase logs in dashboard
3. Check Vercel deployment logs
4. Verify environment variables are set correctly

