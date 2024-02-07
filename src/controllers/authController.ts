import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import auth from "~/lib/auth";
import { deleteUserAccount, login, signup } from "~/models/user";
import userMiddleware from "~/middleware/user";
import { session } from "~/lib/db/schema";
import ctx from "~/middleware";

const authControllers = new Elysia({
  name: "@controllers/auth",
})
  .use(ctx)
  .guard(
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
    (app) =>
      app
        .post("/signup", async ({ body, cookie }) => {
          const user = await signup(body);

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
        .post("/login", async ({ body, cookie }) => {
          const u = await login(body);

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
  )
  .group("", (app) =>
    app.use(userMiddleware).guard(
      {
        beforeHandle({ session, user }) {
          if (!session || !user) {
            return new Response(null, {
              status: 302,
              headers: {
                Location: "/login",
              },
            });
          }
        },
      },
      (app) =>
        app
          .get("/logout", async ({ session }) => {
            await auth.invalidateSession(session!.id);

            return new Response(null, {
              status: 200,
              headers: {
                "HX-Redirect": "/login",
              },
            });
          })
          .delete("/user", async ({ user, db }) => {
            await db.delete(session).where(eq(session.userId, user!.id));

            await deleteUserAccount(user!);

            return new Response(null, {
              status: 200,
              headers: {
                "HX-Redirect": "/login",
              },
            });
          })
    )
  );

export default authControllers;
