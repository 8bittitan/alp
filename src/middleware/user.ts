import { Elysia } from 'elysia'
import { verifyRequestOrigin } from 'lucia'

import auth from '../lib/auth'

const userMiddleware = new Elysia({
  name: '@middleware/user',
}).derive(async (ctx) => {
  if (ctx.request.method !== 'GET') {
    const originHeader = ctx.request.headers.get('Origin')
    const hostHeader =
      ctx.request.headers.get('X-Forwarded-Host') ||
      ctx.request.headers.get('Host')

    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return {
        user: null,
        session: null,
      }
    }
  }

  const cookieHeader = ctx.request.headers.get('Cookie') || ''
  const sessionId = auth.readSessionCookie(cookieHeader)

  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  const { session, user } = await auth.validateSession(sessionId)

  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id)
    ctx.cookie[sessionCookie.name].set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    })
  }

  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie()
    ctx.cookie[sessionCookie.name].set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    })
  }

  return {
    user,
    session,
  }
})

export default userMiddleware
