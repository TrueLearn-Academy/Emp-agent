import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use placeholder URL during build if DATABASE_URL is not set
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }
  
  // Return a valid placeholder URL during build to prevent errors
  // This will never be used in production runtime since env vars are set
  if (process.env.VERCEL_ENV === undefined) {
    // Local development - use real URL from .env.local
    return process.env.DATABASE_URL || ''
  }
  
  // Vercel build time - use placeholder
  return 'postgresql://placeholder:placeholder@placeholder:5432/placeholder'
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
