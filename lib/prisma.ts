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

  // Parse and modify the connection URL for serverless environments
  let connectionUrl = databaseUrl
  
  // In production/Vercel, use Supabase connection pooler for better reliability
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const url = new URL(databaseUrl)
    
    // Convert direct connection to pooler connection for Supabase
    if (url.hostname.includes('supabase.co')) {
      // Extract project ref from hostname (e.g., db.kgqywlbmodtojakkuhaa.supabase.co -> kgqywlbmodtojakkuhaa)
      const parts = url.hostname.split('.')
      const projectRef = parts.length > 2 ? parts[1] : parts[0].replace('db.', '')
      
      console.log('📍 Project ref:', projectRef)
      
      // For Supabase Transaction pooler:
      // Use format: postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
      const password = url.password
      
      // Build the pooler connection string
      const poolerUrl = new URL(databaseUrl)
      poolerUrl.username = `postgres.${projectRef}`
      poolerUrl.hostname = `aws-0-ap-south-1.pooler.supabase.com`
      poolerUrl.port = '6543'
      poolerUrl.searchParams.set('pgbouncer', 'true')
      poolerUrl.searchParams.set('connection_limit', '1')
      
      connectionUrl = poolerUrl.toString()
      console.log('🔄 Using Supabase pooler with username:', poolerUrl.username)
    } else {
      // For non-Supabase databases, just add SSL
      const url = new URL(databaseUrl)
      if (!url.searchParams.has('sslmode')) {
        url.searchParams.set('sslmode', 'require')
      }
      url.searchParams.set('connection_limit', '1')
      connectionUrl = url.toString()
    }
  }

  prismaInstance = new PrismaClient({
    datasources: {
      db: {
        url: connectionUrl,
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
