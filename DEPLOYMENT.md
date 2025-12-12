# Deployment Guide - Vercel + Supabase

## Prerequisites
- GitHub account
- Vercel account
- Supabase account

## Step 1: Prepare Supabase

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to be provisioned

### 1.2 Get Database Connection
1. Go to **Project Settings** → **Database**
2. Copy **Connection String** (URI format)
3. Replace `[YOUR-PASSWORD]` with your actual password
4. Save both `DATABASE_URL` and `DIRECT_URL` (same value)

### 1.3 Create Storage Bucket
1. Go to **Storage** in sidebar
2. Click **New Bucket**
3. Name: `employee-documents`
4. Set to **Private** (not public)
5. Click **Create Bucket**

### 1.4 Get API Keys
1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Employee Master Data System"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/employee-master-system.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Import Project
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Click **Import**

### 3.2 Configure Build Settings
Vercel should auto-detect Next.js. Verify:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3.3 Add Environment Variables

Click **Environment Variables** and add all:

```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public
DIRECT_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?schema=public
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
JWT_SECRET=your-random-secret-string-here
NODE_ENV=production
```

**Important:** Select all environments (Production, Preview, Development)

### 3.4 Deploy
1. Click **Deploy**
2. Wait for build to complete (3-5 minutes)
3. Your app is live! 🎉

## Step 4: Initialize Database

### Option 1: Using Vercel CLI
```bash
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

### Option 2: Using Prisma Studio
```bash
npx prisma studio
```
Then manually create tables using the schema.

## Step 5: Create Admin User

### Using Node Script:
```bash
node scripts/create-admin.js
```

### Or Using Prisma Studio:
1. Run `npx prisma studio`
2. Open **AdminUser** table
3. Click **Add record**
4. Fill in:
   - **email**: `admin@yourcompany.com`
   - **passwordHash**: Hash of your password (use bcrypt)
   - **name**: `Admin User`
   - **role**: `ADMIN`
5. Click **Save**

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Test employee form submission
3. Login to admin at `your-url.vercel.app/admin/login`
4. Verify all features work

## Step 7: Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

## Post-Deployment Checklist

- [ ] Database connection working
- [ ] Employee form submits successfully
- [ ] File uploads working
- [ ] Admin login functional
- [ ] Dashboard displays statistics
- [ ] Employee verification works
- [ ] Custom domain configured (if applicable)

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify DATABASE_URL format is correct
- Check build logs for specific errors

### File Upload Issues
- Verify Supabase storage bucket exists
- Check bucket name is `employee-documents`
- Ensure SUPABASE_SERVICE_ROLE_KEY is correct
- Verify bucket is set to Private

### Database Connection Issues
- Verify connection string has correct password
- Check Supabase project is active
- Ensure schema is pushed: `npx prisma db push`

### Admin Login Not Working
- Verify admin user exists in database
- Check JWT_SECRET is set
- Clear browser cookies and try again

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `DIRECT_URL` | ✅ | Direct PostgreSQL connection |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key |
| `JWT_SECRET` | ✅ | Random secret for JWT |
| `NODE_ENV` | ✅ | Set to `production` |

## Maintenance

### Update Code
```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel will automatically redeploy.

### Database Migrations
When schema changes:
```bash
npx prisma db push
```

### Monitor Performance
- Check Vercel Analytics
- Monitor Supabase Dashboard
- Review error logs in Vercel

## Support

For deployment issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Supabase: [supabase.com/docs](https://supabase.com/docs)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

🎉 Your Employee Master Data System is now live!
