# Setup Checklist

Follow this checklist to get your Employee Master Data System up and running.

## 📋 Pre-Deployment Checklist

### 1. Project Setup
- [x] ✅ Project structure created
- [x] ✅ Dependencies configured in package.json
- [x] ✅ TypeScript configuration set
- [x] ✅ Tailwind CSS configured
- [x] ✅ Prisma schema defined
- [x] ✅ All components created

### 2. Supabase Setup
- [ ] Create Supabase account
- [ ] Create new Supabase project
- [ ] Copy Database URL
- [ ] Copy API Keys (anon + service_role)
- [ ] Create storage bucket: `employee-documents`
- [ ] Set bucket to Private

### 3. Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Add `DATABASE_URL`
- [ ] Add `DIRECT_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Generate and add `JWT_SECRET`

### 4. Dependencies Installation
```bash
npm install
```
- [ ] All packages installed successfully
- [ ] No dependency errors

### 5. Database Setup
```bash
npx prisma generate
npx prisma db push
```
- [ ] Prisma client generated
- [ ] Database schema pushed
- [ ] All tables created

### 6. Admin User Creation
```bash
node scripts/create-admin.js
```
- [ ] Admin user created
- [ ] Login credentials saved securely
- [ ] Plan to change default password

### 7. Local Testing
```bash
npm run dev
```
- [ ] Server starts on port 3000
- [ ] Homepage loads correctly
- [ ] No console errors

### 8. Feature Testing

#### Employee Portal
- [ ] Can create new submission
- [ ] Personal details form works
- [ ] Address form works
- [ ] Government IDs form validates correctly
- [ ] Education form saves
- [ ] Bank details form validates IFSC
- [ ] File upload works
- [ ] Documents upload to Supabase
- [ ] Review page shows all data
- [ ] Final submission succeeds
- [ ] Success page displays

#### Admin Dashboard
- [ ] Can login at `/admin/login`
- [ ] Dashboard shows statistics
- [ ] Employee list displays
- [ ] Can view employee details
- [ ] Verify button works
- [ ] Reject button works
- [ ] Audit logs created
- [ ] Can logout

### 9. Mobile Testing
- [ ] Responsive on iPhone/Android
- [ ] Forms work on mobile
- [ ] Touch-friendly buttons
- [ ] File upload works on mobile

### 10. Pre-Deployment
- [ ] Change default admin password
- [ ] Review all environment variables
- [ ] Test production build locally
```bash
npm run build
npm start
```
- [ ] No build errors
- [ ] Application works in production mode

## 🚀 Deployment Checklist

### Vercel Setup
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel

### Vercel Configuration
- [ ] All environment variables added
- [ ] Environment variables set for Production
- [ ] Build settings verified
- [ ] Deploy initiated

### Post-Deployment
- [ ] Deployment successful
- [ ] Production URL works
- [ ] SSL certificate active
- [ ] Test employee submission on production
- [ ] Test admin login on production
- [ ] Verify file uploads work
- [ ] Check database connections

### Optional
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Domain SSL verified
- [ ] Analytics configured

## 🧪 Testing Scenarios

### Test Case 1: Complete Employee Flow
1. Visit homepage
2. Click "Start New Submission"
3. Fill all form steps
4. Upload at least one document
5. Review and submit
6. Verify success page shows

### Test Case 2: Admin Review Flow
1. Login to admin dashboard
2. Check statistics are correct
3. Navigate to employee list
4. Open an employee record
5. Review all details
6. Click "Verify"
7. Confirm status updates

### Test Case 3: Form Validation
1. Try submitting invalid phone number
2. Try uploading file > 5MB
3. Try uploading invalid file type
4. Try submitting incomplete form
5. Verify error messages show

### Test Case 4: Auto-Save
1. Fill first form step
2. Close browser
3. Return to same URL
4. Verify data is saved

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Default admin password changed
- [ ] Database credentials secure
- [ ] Service role key kept secret
- [ ] HTTPS enabled in production
- [ ] CORS configured properly
- [ ] Rate limiting considered

## 📊 Performance Checklist

- [ ] Images optimized
- [ ] Build size acceptable
- [ ] Initial load time < 3 seconds
- [ ] Forms respond quickly
- [ ] File uploads complete successfully
- [ ] No memory leaks

## 📝 Documentation Checklist

- [x] README.md complete
- [x] DEPLOYMENT.md created
- [x] QUICKSTART.md created
- [x] PROJECT_SUMMARY.md created
- [x] .env.example provided
- [x] Code comments where needed

## 🎉 Launch Checklist

- [ ] All tests passing
- [ ] No critical bugs
- [ ] Admin user created
- [ ] Sample data tested
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Support plan ready

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Create admin user
node scripts/create-admin.js

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## Support Resources

- 📖 README.md - Full documentation
- 🚀 DEPLOYMENT.md - Deployment guide
- ⚡ QUICKSTART.md - Quick setup
- 📋 PROJECT_SUMMARY.md - Project overview

---

**Once all items are checked, your system is ready for production! 🎉**
