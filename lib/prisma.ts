import { PrismaClient } from '@prisma/client'

let prismaInstance: PrismaClient | null = null

// Lazy initialization - client is created only when first accessed
export function getPrisma() {
  if (prismaInstance) {
    return prismaInstance
  }

  // Check for DATABASE_URL from environment
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not found!', {
      nodeEnv: process.env.NODE_ENV,
      availableEnvVars: Object.keys(process.env).filter(k => 
        k.includes('DATABASE') || k.includes('POSTGRES')
      )
    })
    
    throw new Error('DATABASE_URL environment variable is not set')
  }

  console.log('✅ Initializing Prisma Client')
  console.log('🔗 Database host:', new URL(databaseUrl).hostname)

  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
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
