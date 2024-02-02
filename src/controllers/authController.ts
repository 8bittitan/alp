import { Elysia } from "elysia";

import auth from "../lib/auth";
import { login, signup } from "../models/user";

const authControllers = new Elysia({
  name: "@controllers/auth",
})
  .post("/signup", async ({ request, cookie }) => {
    const fData = await request.formData();

    const username = fData.get("username")?.toString() ?? "";
    const password = fData.get("password")?.toString() ?? "";

    const user = await signup({ username, password });

    if (!user) {
      return new Response("Failed to create user", {
        status: 422,
      });
    }

    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    cookie[sessionCookie.name].set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    });

    return new Response(null, {
      status: 200,
      headers: {
        "HX-Redirect": "/dashboard",
      },
    });
  })
  .post("/login", async ({ request, cookie, set }) => {
    const fData = await request.formData();

    const username = fData.get("username")?.toString() ?? "";
    const password = fData.get("password")?.toString() ?? "";

    const u = await login({ username, password });

    if (!u) {
      return new Response("Invalid username or password", {
        status: 401,
      });
    }

    const session = await auth.createSession(u.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    cookie[sessionCookie.name].set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    });

    return new Response(null, {
      status: 200,
      headers: {
        "HX-Redirect": "/dashboard",
      },
    });
  })
  .get("/logout", async (ctx) => {
    const cookieHeader = ctx.request.headers.get("Cookie") || "";
    const sessionId = auth.readSessionCookie(cookieHeader);

    if (!sessionId) {
      return new Response(null, {
        status: 200,
        headers: {
          "HX-Redirect": "/login",
        },
      });
    }

    await auth.invalidateSession(sessionId);

    return new Response(null, {
      status: 200,
      headers: {
        "HX-Redirect": "/login",
      },
    });
  });

export default authControllers;
