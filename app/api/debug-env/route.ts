import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Check what environment variables are available
  const envVars = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasDirectUrl: !!process.env.DIRECT_URL,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasJwtSecret: !!process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    // Show partial values to confirm they exist
    databaseUrlStart: process.env.DATABASE_URL?.substring(0, 30),
    allEnvKeys: Object.keys(process.env).filter(k => 
      k.includes('DATABASE') || 
      k.includes('SUPABASE') || 
      k.includes('JWT') ||
      k.includes('VERCEL')
    ).sort()
  }

  return NextResponse.json(envVars)
}
