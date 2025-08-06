import { NextResponse } from 'next/server'

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    vercelUrl: process.env.VERCEL_URL,
    customBaseUrl: process.env.CUSTOM_BASE_URL,
    allEnvVars: Object.keys(process.env).filter(key => 
      key.includes('VERCEL') || key.includes('URL') || key.includes('DOMAIN')
    ).reduce((acc, key) => ({ ...acc, [key]: process.env[key] }), {}),
    headers: {
      host: 'Will be determined at runtime'
    }
  }
  
  return NextResponse.json(debugInfo, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  })
}