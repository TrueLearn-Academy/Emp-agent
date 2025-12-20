# Render Deployment Guide

## Deploy to Render

### Step 1: Create Web Service
1. Go to https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `TrueLearn-Academy/emp-data`
4. Configure the service:
   - **Name**: `employee-master-system`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: `Node`
   - **Build Command**: `npm install --legacy-peer-deps && npx prisma generate && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or upgrade as needed)

### Step 2: Add Environment Variables
In the Render dashboard, go to **Environment** tab and add:

| Key | Value |
|-----|-------|
| `NODE_VERSION` | `20.11.0` |
| `DATABASE_URL` | `postgresql://postgres:Appleid@16!!!@db.kgqywlbmodtojakkuhaa.supabase.co:5432/postgres?sslmode=require` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kgqywlbmodtojakkuhaa.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncXl3bGJtb2R0b2pha2t1aGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MzA0ODcsImV4cCI6MjA4MTEwNjQ4N30.YO8Gu9AoynqMijfSfPiYl0aGihyQdrclX1qiWFXK5xc` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncXl3bGJtb2R0b2pha2t1aGFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTUzMDQ4NywiZXhwIjoyMDgxMTA2NDg3fQ._wbNXpbpkbOjpltU_AeewfRE7QaYhdouicPZDksIqrE` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production` |

### Step 3: Deploy
1. Click **Create Web Service**
2. Render will automatically build and deploy your application
3. Wait 5-10 minutes for the first deployment
4. Your app will be available at: `https://employee-master-system.onrender.com`

### Step 4: Access Your Application
- **Employee Form**: `https://your-app.onrender.com/employee/new`
- **Admin Dashboard**: `https://your-app.onrender.com/admin/login`
  - Email: `admin@truezen.com`
  - Password: `12345678@Ab!`

## Important Notes

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin down will take 30-60 seconds
- Consider upgrading to a paid plan for production use

### Custom Domain
- Go to **Settings** → **Custom Domain** to add your domain
- Add CNAME record pointing to your Render URL

### Auto-Deploy
- Render automatically deploys when you push to the `main` branch
- You can disable auto-deploy in Settings if needed

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify Node version is set to 20.11.0
- Ensure all dependencies install correctly

### Database Connection Issues
- Verify DATABASE_URL includes `?sslmode=require`
- Check Supabase allows connections from Render IPs
- Test connection using debug endpoint: `/api/debug-env`

### Application Errors
- Check **Logs** tab in Render dashboard
- Verify all environment variables are set correctly
- Check Prisma schema matches database structure

## Advantages of Render
✅ Simple deployment process
✅ Automatic HTTPS and SSL certificates  
✅ Good PostgreSQL support
✅ Free tier available
✅ Auto-deploy on git push
✅ Better for long-running processes than serverless
