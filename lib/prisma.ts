import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use placeholder URL during build if DATABASE_URL is not set
const getDatabaseUrl = () => {
  // At runtime, DATABASE_URL must be set
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }
  
  // Only use placeholder during build time (when NODE_ENV is not production yet)
  // In Vercel, during build, VERCEL_ENV exists but DATABASE_URL might not
  const isBuildTime = process.env.VERCEL && !process.env.DATABASE_URL
  
  if (isBuildTime) {
    // Vercel build time - use placeholder
    return 'postgresql://placeholder:placeholder@placeholder:5432/placeholder'
  }
  
  // This should not happen in production runtime
  throw new Error('DATABASE_URL is not set in production environment!')
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
