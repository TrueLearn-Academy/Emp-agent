# Railway Deployment Guide

## Prerequisites
- Railway account (sign up at https://railway.app)
- This repository pushed to GitHub

## Step-by-Step Deployment

### 1. Create New Project in Railway
1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select this repository: `TrueLearn-Academy/emp-data`
4. Railway will automatically detect it as a Next.js project

### 2. Add Environment Variables
In the Railway project dashboard, go to the **Variables** tab and add:

```
DATABASE_URL=postgresql://postgres:Appleid@16!!!@db.kgqywlbmodtojakkuhaa.supabase.co:5432/postgres?sslmode=require

NEXT_PUBLIC_SUPABASE_URL=https://kgqywlbmodtojakkuhaa.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncXl3bGJtb2R0b2pha2t1aGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MzA0ODcsImV4cCI6MjA4MTEwNjQ4N30.YO8Gu9AoynqMijfSfPiYl0aGihyQdrclX1qiWFXK5xc

SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncXl3bGJtb2R0b2pha2t1aGFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTUzMDQ4NywiZXhwIjoyMDgxMTA2NDg3fQ._wbNXpbpkbOjpltU_AeewfRE7QaYhdouicPZDksIqrE

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Deploy
1. Railway will automatically start building and deploying
2. Wait for the build to complete (2-3 minutes)
3. Once deployed, Railway will provide you with a URL (e.g., `https://your-project.up.railway.app`)

### 4. Access Your Application
- Employee Form: `https://your-project.up.railway.app/employee/new`
- Admin Login: `https://your-project.up.railway.app/admin/login`
  - Email: `admin@truezen.com`
  - Password: `12345678@Ab!`

## Troubleshooting

### Build Fails
- Check the build logs in Railway dashboard
- Ensure all environment variables are set correctly

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Supabase project is accessible from external IPs

### Application Errors
- Check Runtime logs in Railway dashboard
- Verify all environment variables are present

## Notes
- Railway provides automatic HTTPS
- Railway auto-deploys on every git push to main branch
- You can set up custom domains in Railway Settings
