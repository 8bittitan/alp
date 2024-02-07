import { Redis } from '@upstash/redis'

import env from '~/lib/env'

const redis = new Redis({
  url: env.UPSTASH_URL,
  token: env.UPSTASH_TOKEN,
})

export default redis

export async function storeLinkInRedis(key: string, destinationUrl: string) {
  await redis.set(key, destinationUrl)
}
