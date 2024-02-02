import { html } from "@elysiajs/html";
import { Elysia } from "elysia";

import BaseLayout from "~/layouts/BaseLayout";
import userMiddleware from "~/middleware/user";
import AuthenticatedLayout from "~/layouts/AuthLayout";

const pagesRouter = new Elysia({
  name: "@router/pages",
})
  .use(html())
  .use(userMiddleware)
  .get("/", () => (
    <BaseLayout>
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
  .get("/login", () => (
    <BaseLayout>
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
  .get("/dashboard", ({ user }) => {
    if (!user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }

    return (
      <AuthenticatedLayout user={user}>
        <h1>Dashboard</h1>
      </AuthenticatedLayout>
    );
  });

export default pagesRouter;
