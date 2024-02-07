import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import Link from "~/components/links/link";
import { links } from "~/lib/db/schema";
import { storeLinkInRedis } from "~/lib/redis";
import ctx from "~/middleware";
import userMiddleware from "~/middleware/user";
import { createLink } from "~/models/link";

const linksController = new Elysia({
  name: "@controllers/links",
  prefix: "/link",
})
  .use(userMiddleware)
  .use(ctx)
  .guard(
    {
      beforeHandle(context) {
        if (!context.user) {
          return new Response("Unauthorized", {
            status: 401,
            headers: {
              Location: "/login",
            },
          });
        }
      },
    },
    (app) =>
      app
        .post(
          "/",
          async ({ body, user }) => {
            const input = {
              ...body,
              // [todo) Use domain from ENV
              domain: "alp.dev",
              userId: user!.id,
            };
            const link = await createLink(input);

            if (!link) {
              return new Response("Error creating link", {
                status: 422,
              });
            }

            await storeLinkInRedis(link.key, link.url);

            return <Link link={link} />;
          },
          {
            body: t.Object({
              // domain: t.String({ minLength: 1 }),
              key: t.String({ minLength: 1 }),
              url: t.String({ minLength: 1 }),
            }),
          }
        )
        .delete(
          "/:key",
          async ({ db, params, redis }) => {
            await db.delete(links).where(eq(links.key, params.key));

            await redis.del(params.key);

            // [todo) Return HTML with removed link
            return new Response(null, {
              status: 200,
              headers: {
                "HX-Redirect": "/dashboard",
              },
            });
          },
          {
            params: t.Object({
              key: t.String({ minLength: 1 }),
            }),
          }
        )
  );

export default linksController;
