import { Elysia } from 'elysia'

import BaseLayout from '~/layouts/BaseLayout'
import userMiddleware from '~/middleware/user'

const authPages = new Elysia({
  name: '@router/pages/auth',
})
  .use(userMiddleware)
  .get('/', ({ user }) => (
    <BaseLayout user={user}>
      <h1>Hello world!</h1>
      <form
        hx-post="/api/signup"
        hx-trigger="submit"
        method="POST"
        action="/api/signup"
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          id="username"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
        />
        <button type="submit">Signup</button>
      </form>
    </BaseLayout>
  ))
  .get('/login', ({ user }) => (
    <BaseLayout user={user}>
      <h1>Login</h1>
      <form
        hx-post="/api/login"
        hx-trigger="submit"
        method="POST"
        action="/api/login"
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          id="username"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
        />
        <button type="submit">Login</button>
      </form>
    </BaseLayout>
  ))

export default authPages
