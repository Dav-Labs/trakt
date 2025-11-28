# TRAKT - Location Check-in App

A motivational social media app for tracking and sharing location-based experiences.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to Project Settings > API
4. Copy your project URL and anon/public key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Database

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Paste and run it in the SQL Editor
4. This will create all necessary tables, policies, and triggers

### 5. Seed Initial Data

After running the schema, you can seed initial location data:

1. Go to SQL Editor in Supabase
2. Run the seed SQL commands (we'll create this next)

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage

## Project Structure

```
trakt-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── (app)/             # Main app pages (protected)
│   │   ├── dashboard/
│   │   ├── explore/
│   │   ├── locations/
│   │   └── profile/
│   ├── layout.tsx
│   └── page.tsx
├── components/            # Reusable React components
├── lib/                   # Utility functions
│   └── supabase/         # Supabase client configuration
├── types/                # TypeScript type definitions
└── middleware.ts         # Next.js middleware for auth
```

## Features (Phase 1 MVP)

- ✅ User authentication (email/password)
- ✅ Browse locations by category
- ✅ Manual check-in system
- ✅ User profile with stats
- ✅ Location detail pages

## Deployment

Deploy to Vercel with one click:

```bash
npm run build
```

Then connect your GitHub repository to Vercel and add your environment variables.

## License

MIT
