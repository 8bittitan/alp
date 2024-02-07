import staticPlugin from '@elysiajs/static'
import { Elysia, t } from 'elysia'

import controllerRouter from '~/controllers'
import { sql } from '~/lib/db'
import env from '~/lib/env'
import { storeLinkInRedis } from '~/lib/redis'
import ctx from '~/middleware'
import { getLinkByKey } from '~/models/link'
import pagesRouter from '~/pages'

const app = new Elysia()
  .use(staticPlugin())
  .use(ctx)
  .use(controllerRouter)
  .use(pagesRouter)
  .get(
    '/:key',
    async ({ params, redis }) => {
      let link = await redis.get<string>(params.key)

      let destinationUrl = link

      if (!link) {
        const link = await getLinkByKey(params.key)

        if (link) {
          await storeLinkInRedis(link.key, link.url)
        }

        destinationUrl = link.url
      }

      if (!destinationUrl) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/',
          },
        })
      }

      await sql`UPDATE links SET clicks = clicks + 1 WHERE key = ${params.key}`

      return new Response(null, {
        status: 302,
        headers: {
          Location: destinationUrl,
        },
      })
    },
    {
      params: t.Object({
        key: t.String(),
      }),
    },
  )
  .onStart(() => {
    if (env.NODE_ENV === 'development') {
      void fetch('http://localhost:3001/reload')

      console.log('🦊 Triggering live reload')
    }
  })
  .onError(({ log, error }) => {
    log.error(error)
  })
  .listen(3000)

export type App = typeof app

console.log(`🦊 Elysia is running at ${app.server?.url}`)
