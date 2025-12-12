# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
- Get credentials from https://supabase.com
- Create a storage bucket named `employee-documents`

## 3. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

## 4. Create Admin User
```bash
node scripts/create-admin.js
```

Default credentials:
- Email: `admin@example.com`
- Password: `admin123`

**⚠️ IMPORTANT: Change the password in production!**

## 5. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## 6. Test the Application

### Employee Portal
1. Go to http://localhost:3000
2. Click "Start New Submission"
3. Complete the multi-step form
4. Upload documents
5. Submit

### Admin Dashboard
1. Go to http://localhost:3000/admin/login
2. Login with admin credentials
3. View dashboard and employee submissions
4. Verify or reject submissions

## Next Steps

- Read [README.md](./README.md) for full documentation
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Customize forms in `components/forms/`
- Update styling in `tailwind.config.ts`

## Common Issues

### "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### "Database connection failed"
- Check DATABASE_URL in .env
- Verify Supabase project is active

### "File upload failed"
- Create storage bucket named `employee-documents`
- Set bucket to Private
- Check SUPABASE_SERVICE_ROLE_KEY

## Support

For issues, check:
- README.md
- DEPLOYMENT.md
- GitHub Issues

---

Happy coding! 🚀
