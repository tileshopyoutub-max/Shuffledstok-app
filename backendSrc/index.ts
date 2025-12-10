import { registerAllRoutes } from './appReg'
import { router } from './router'
import type { Fetcher, D1Database, ExecutionContext, Request, R2Bucket } from '@cloudflare/workers-types'

export type Env = {
  DB: D1Database
  ASSETS: Fetcher
  PUBLIC_WATERMARKED_BUCKET: R2Bucket
  PRIVATE_BUCKET: R2Bucket
}

function handleCors(request: Request) {
  const origin = request.headers.get('Origin') || ''

  const allowedOrigins = ['http://localhost:5173', 'https://shuffledstok-app.vercel.app']

  const isAllowed =
    allowedOrigins.includes(origin) || (origin.startsWith('https://shuffledstok-') && origin.endsWith('.vercel.app'))

  const headers = {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers })
  }

  return headers
}

// Register all routes
registerAllRoutes(router)
// Static assets fallback
router.all('*', (request: Request, env: Env) => env.ASSETS.fetch(request))

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    if (request.method === 'OPTIONS') {
      return handleCors(request)
    }

    const response = await router.fetch(request, env, ctx)

    const corsHeaders = handleCors(request)
    const finalResponse = new Response(response.body, response)
    Object.entries(corsHeaders).forEach(([key, value]) => {
      finalResponse.headers.set(key, value)
    })

    return finalResponse
  },
}
