# 🚀 Vercel Deployment Setup

## ⚠️ CRITICAL: Environment Variables Required

Your application is deployed but **NOT CONFIGURED**. You must add environment variables for it to work.

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Select your project: **emp-data**
3. Click **Settings** → **Environment Variables**

### Step 2: Add These 6 Variables

For each variable below:
- Click **"Add New"**
- Enter the **Key** (variable name)
- Enter the **Value** (from below)
- Select **"All Environments"** (Production, Preview, Development)
- Click **"Save"**

---

#### 1. DATABASE_URL
```
postgresql://postgres:Appleid@16!!!@db.kgqywlbmodtojakkuhaa.supabase.co:5432/postgres
```

#### 2. DIRECT_URL
```
postgresql://postgres:Appleid@16!!!@db.kgqywlbmodtojakkuhaa.supabase.co:5432/postgres
```

#### 3. NEXT_PUBLIC_SUPABASE_URL
```
https://kgqywlbmodtojakkuhaa.supabase.co
```

#### 4. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncXl3bGJtb2R0b2pha2t1aGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MzA0ODcsImV4cCI6MjA4MTEwNjQ4N30.YO8Gu9AoynqMijfSfPiYl0aGihyQdrclX1qiWFXK5xc
```

#### 5. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtncXl3bGJtb2R0b2pha2t1aGFhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTUzMDQ4NywiZXhwIjoyMDgxMTA2NDg3fQ._wbNXpbpkbOjpltU_AeewfRE7QaYhdouicPZDksIqrE
```

#### 6. JWT_SECRET
```
your-super-secret-jwt-key-change-this-in-production
```

---

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (~2-3 minutes)

---

## ✅ After Setup

Once environment variables are added and redeployed:

- **Admin Login**: `https://your-app.vercel.app/admin/login`
  - Email: `admin@truezen.com`
  - Password: `12345678@Ab!`

- **Employee Form**: `https://your-app.vercel.app/employee/new`

---

## 🔒 Security Note

**Before going live, change these credentials:**
1. Generate a new JWT_SECRET (use a random 32+ character string)
2. Update admin password via Supabase dashboard or update-admin script
3. Consider rotating Supabase keys if they've been exposed

---

## 📞 Support

If you encounter issues after adding environment variables:
1. Check Vercel logs for errors
2. Verify all 6 variables are set correctly
3. Ensure Supabase project is active
4. Check database connection in Supabase dashboard
