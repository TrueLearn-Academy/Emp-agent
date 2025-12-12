# Employee Master Data Collection System

A comprehensive full-stack web application built with **Next.js 14**, **Supabase**, **Prisma**, and **TypeScript** for collecting and managing employee master data.

## 🚀 Features

### Employee Portal
- **Multi-step Form Wizard**: 7-step guided form with progress tracking
- **Auto-save Functionality**: Automatically saves progress at each step
- **Document Upload**: Drag-and-drop file upload with validation
- **Mobile Responsive**: Fully optimized for mobile devices
- **Validation**: Real-time form validation with detailed error messages

### Admin Dashboard
- **Authentication**: Secure JWT-based admin login
- **Dashboard Statistics**: Overview of submissions, pending reviews, verified employees
- **Employee Management**: View, filter, and search all employee submissions
- **Document Verification**: Review and verify/reject employee submissions
- **Audit Logging**: Track all admin actions with timestamps

## 📋 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage
- **Authentication**: Custom JWT
- **Form Management**: React Hook Form + Zod

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+
- A Supabase account ([Sign up here](https://supabase.com))

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Supabase

1. Create a new project on Supabase
2. Get your database connection string from Project Settings → Database
3. Create a storage bucket named `employee-documents` (set to Private)
4. Get API keys from Project Settings → API

### Step 3: Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

JWT_SECRET="your-secure-random-string"
NODE_ENV="development"
```

### Step 4: Set Up Database

```bash
npx prisma generate
npx prisma db push
```

### Step 5: Create Admin User

```bash
node scripts/create-admin.js
```

Or use Prisma Studio:

```bash
npx prisma studio
```

### Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
employee-master-system/
├── app/
│   ├── actions/              # Server Actions
│   ├── admin/               # Admin dashboard
│   ├── api/upload/          # File upload
│   ├── employee/            # Employee portal
│   └── page.tsx             # Landing page
├── components/
│   ├── admin/               # Admin components
│   ├── forms/               # Form steps
│   └── ui/                  # UI components
├── lib/
│   ├── auth.ts              # Authentication
│   ├── prisma.ts            # Prisma client
│   ├── supabase.ts          # Supabase client
│   ├── utils.ts             # Utilities
│   └── validators.ts        # Zod schemas
├── prisma/
│   └── schema.prisma        # Database schema
└── middleware.ts            # Route protection
```

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel settings
4. Deploy

## 📝 Usage

### For Employees
1. Visit homepage and click "Start New Submission"
2. Complete all 7 form steps
3. Upload required documents
4. Review and submit

### For Admins
1. Login at `/admin/login`
2. View dashboard statistics
3. Review employee submissions
4. Verify or reject applications

## 🔐 Security
- JWT authentication
- Password hashing with bcrypt
- Protected routes via middleware
- Server-side validation
- File type/size validation

## 📄 License

MIT License

---

Built with ❤️ using Next.js, Supabase, and TypeScript
