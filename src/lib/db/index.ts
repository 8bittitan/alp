import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import env from '~/lib/env'

export const sql = neon(env.DATABASE_URL)
const db = drizzle(sql, { logger: true })

export default db
