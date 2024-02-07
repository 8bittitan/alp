import type { Auth } from '../lib/auth'

interface DatabaseUserAttributes {
  username: string
}

declare module 'lucia' {
  interface Register {
    Lucia: Auth
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}
