import { PrismaClient } from '@prisma/client'

let prismaInstance: PrismaClient | null = null

// Lazy initialization - client is created only when first accessed
// This ensures DATABASE_URL is read at runtime in Vercel environment
export function getPrisma() {
  if (prismaInstance) {
    return prismaInstance
  }

  // In Vercel, environment variables should be available at runtime
  // Check for DATABASE_URL from multiple possible sources
  const databaseUrl = 
    process.env.DATABASE_URL || 
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL

  if (!databaseUrl) {
    const availableVars = Object.keys(process.env).filter(k => 
      k.includes('DATABASE') || k.includes('POSTGRES') || k.includes('SUPABASE')
    )
    
    console.error('❌ DATABASE_URL not found!', {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercel: process.env.VERCEL,
      availableEnvVars: availableVars,
      allKeys: Object.keys(process.env).slice(0, 20)
    })
    
    throw new Error('DATABASE_URL environment variable is not set. Please configure it in Vercel Project Settings > Environment Variables')
  }

  console.log('✅ Initializing Prisma Client with DATABASE_URL:', databaseUrl.substring(0, 35) + '...')

  // Add connection pooling and timeout settings for Vercel serverless
  const url = new URL(databaseUrl)
  
  // Add SSL mode if not already present
  if (!url.searchParams.has('sslmode')) {
    url.searchParams.set('sslmode', 'require')
  }
  
  // Add connection limit for serverless
  if (!url.searchParams.has('connection_limit')) {
    url.searchParams.set('connection_limit', '1')
  }

  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: url.toString(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

  return prismaInstance
}

// Export a Proxy that lazily initializes the Prisma client
export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    const client = getPrisma()
    return (client as any)[prop]
  },
})
