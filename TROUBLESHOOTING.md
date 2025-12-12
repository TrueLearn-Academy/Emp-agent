# Troubleshooting Guide

Common issues and their solutions for the Employee Master Data Collection System.

---

## 🔧 Installation Issues

### Error: "Cannot find module"

**Problem:** Missing dependencies

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Error: "@prisma/client not found"

**Problem:** Prisma client not generated

**Solution:**
```bash
npx prisma generate
```

---

## 🗄️ Database Issues

### Error: "Can't reach database server"

**Problem:** Invalid DATABASE_URL

**Solutions:**
1. Check DATABASE_URL format:
   ```
   postgresql://postgres:PASSWORD@HOST:5432/postgres?schema=public
   ```
2. Verify password has no special characters that need encoding
3. Check Supabase project is active
4. Verify IP is whitelisted in Supabase

### Error: "Table does not exist"

**Problem:** Schema not pushed to database

**Solution:**
```bash
npx prisma db push
```

### Error: "Foreign key constraint failed"

**Problem:** Trying to reference non-existent records

**Solution:**
1. Ensure parent record exists before creating child
2. Check cascade delete settings in schema
3. Manually clean up orphaned records

---

## 🔐 Authentication Issues

### Error: "Invalid credentials"

**Problem:** Admin user doesn't exist or wrong password

**Solutions:**
1. Create admin user:
   ```bash
   node scripts/create-admin.js
   ```
2. Verify password is correct
3. Check AdminUser table in Prisma Studio:
   ```bash
   npx prisma studio
   ```

### Error: "Session expired" or redirects to login

**Problem:** JWT issues

**Solutions:**
1. Check JWT_SECRET is set in .env
2. Clear browser cookies
3. Verify middleware.ts is configured correctly

### Error: "Unauthorized" after login

**Problem:** Session not being saved

**Solutions:**
1. Check cookies are enabled in browser
2. Verify JWT_SECRET matches between requests
3. Check cookie settings in lib/auth.ts

---

## 📁 File Upload Issues

### Error: "Upload failed"

**Problem:** Supabase storage not configured

**Solutions:**
1. Verify bucket exists:
   - Login to Supabase
   - Go to Storage
   - Check for `employee-documents` bucket

2. Check bucket permissions (should be Private)

3. Verify environment variables:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your-key
   NEXT_PUBLIC_SUPABASE_URL=your-url
   ```

### Error: "File too large"

**Problem:** File exceeds 5MB limit

**Solution:**
- Reduce file size
- Or increase limit in:
  - `app/api/upload/route.ts`
  - `components/forms/DocumentUploadForm.tsx`

### Error: "Invalid file type"

**Problem:** File type not allowed

**Solution:**
- Accept only: PDF, JPG, PNG
- Check validation in DocumentUploadForm.tsx

---

## 🎨 UI/Styling Issues

### Error: Styles not applying

**Problem:** Tailwind not configured correctly

**Solutions:**
1. Check tailwind.config.ts exists
2. Verify globals.css imports:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Restart dev server:
   ```bash
   npm run dev
   ```

### Error: Components not rendering

**Problem:** Missing UI components

**Solution:**
- Verify all component files exist in `components/ui/`
- Check imports are correct

---

## 🚀 Build/Deployment Issues

### Error: "Build failed"

**Problem:** TypeScript or ESLint errors

**Solutions:**
1. Check console for specific errors
2. Fix TypeScript errors
3. Disable strict mode temporarily in tsconfig.json (not recommended)

### Error: "Module not found" in production

**Problem:** Missing dependencies or wrong imports

**Solutions:**
1. Check all imports use `@/` alias
2. Verify dependencies are in `dependencies` not `devDependencies`
3. Ensure all files are committed to git

### Error: "Environment variables undefined"

**Problem:** Variables not set in Vercel

**Solutions:**
1. Go to Vercel Project Settings → Environment Variables
2. Add all variables from .env.example
3. Redeploy:
   ```bash
   vercel --prod
   ```

---

## 🔄 Form Issues

### Error: Form doesn't submit

**Problem:** Validation errors

**Solutions:**
1. Check browser console for errors
2. Verify all required fields filled
3. Check validation rules in lib/validators.ts

### Error: Data not saving (auto-save)

**Problem:** Server action failing

**Solutions:**
1. Check network tab in browser DevTools
2. Verify employeeId is valid
3. Check database connection

### Error: "Invalid phone number"

**Problem:** Phone validation regex

**Solution:**
- Format: 10 digits starting with 6-9
- Example: 9876543210
- Check regex in lib/validators.ts

### Error: "Invalid PAN"

**Problem:** PAN format incorrect

**Solution:**
- Format: ABCDE1234F
- 5 letters + 4 numbers + 1 letter
- All uppercase

### Error: "Invalid IFSC"

**Problem:** IFSC format incorrect

**Solution:**
- Format: ABCD0123456
- 4 letters + 0 + 6 alphanumeric
- Example: SBIN0001234

---

## 🔍 Common User Errors

### "Cannot create new submission"

**Solutions:**
1. Clear browser cache
2. Check if database is accessible
3. Verify Prisma is connected

### "Progress not saved"

**Solutions:**
1. Check network connection
2. Verify employee ID in URL
3. Check browser console for errors

### "Documents not uploading"

**Solutions:**
1. Check file size (< 5MB)
2. Verify file type (PDF, JPG, PNG)
3. Check network speed
4. Try different browser

---

## 🐛 Development Issues

### Error: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or use different port:
PORT=3001 npm run dev
```

### Error: Hot reload not working

**Solutions:**
1. Restart dev server
2. Clear .next folder:
   ```bash
   rm -rf .next
   npm run dev
   ```
3. Check file watchers limit (Linux)

### Error: "Cannot read property of undefined"

**Solutions:**
1. Check data is loaded before accessing
2. Use optional chaining: `data?.property`
3. Add null checks

---

## 🔄 State Management Issues

### Form values not persisting

**Solutions:**
1. Check defaultValues in useForm
2. Verify data is passed from parent
3. Check localStorage or database

### Admin dashboard not updating

**Solutions:**
1. Add `router.refresh()` after actions
2. Use `revalidatePath` in server actions
3. Clear cache

---

## 📱 Mobile Issues

### Forms not working on mobile

**Solutions:**
1. Check viewport meta tag in layout.tsx
2. Test in Chrome DevTools mobile view
3. Verify touch events work

### File upload not working on mobile

**Solutions:**
1. Check file input accepts mobile formats
2. Test with different mobile browsers
3. Verify camera permissions

---

## 🔒 Security Issues

### Warning: "JWT_SECRET is insecure"

**Solution:**
```bash
# Generate secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Warning: "Default password in use"

**Solution:**
- Change admin password immediately
- Use strong password (12+ characters)
- Update in AdminUser table

---

## 📊 Performance Issues

### Slow page loads

**Solutions:**
1. Check database query efficiency
2. Add loading states
3. Implement pagination
4. Use static generation where possible

### Large bundle size

**Solutions:**
1. Check for duplicate dependencies
2. Use dynamic imports
3. Remove unused packages

---

## 🆘 Getting Help

### Still having issues?

1. **Check Documentation:**
   - README.md
   - DEPLOYMENT.md
   - PROJECT_SUMMARY.md

2. **Check Logs:**
   - Browser console
   - Vercel logs
   - Supabase logs

3. **Debug Mode:**
   ```bash
   DEBUG=* npm run dev
   ```

4. **Common Commands:**
   ```bash
   # Reset database
   npx prisma db push --force-reset
   
   # View database
   npx prisma studio
   
   # Check types
   npx tsc --noEmit
   
   # Clean build
   rm -rf .next node_modules
   npm install
   npm run build
   ```

---

## 📞 Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://prisma.io/docs
- **Supabase Docs:** https://supabase.com/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

---

**Remember:** Most issues are environment-related. Always check:
1. Environment variables
2. Database connection
3. Supabase configuration
4. Node version (18+)

If all else fails, start fresh with the QUICKSTART.md guide! 🚀
