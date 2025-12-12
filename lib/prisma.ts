import { PrismaClient } from '@prisma/client'

let prismaInstance: PrismaClient | null = null

// Lazy initialization - client is created only when first accessed
// This ensures DATABASE_URL is read at runtime, not at module load time
export function getPrisma() {
  if (prismaInstance) {
    return prismaInstance
  }

  const databaseUrl = process.env.DATABASE_URL
  
  if (!databaseUrl) {
    console.error('DATABASE_URL is missing!', {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      availableEnvVars: Object.keys(process.env).filter(k => 
        k.includes('DATABASE') || k.includes('POSTGRES') || k.includes('SUPABASE')
      )
    })
    throw new Error('DATABASE_URL environment variable is not set')
  }

  console.log('Initializing Prisma Client with DATABASE_URL:', databaseUrl.substring(0, 30) + '...')

  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  return prismaInstance
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_, prop) {
    const client = getPrisma()
    return (client as any)[prop]
  },
})
