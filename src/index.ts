import { Elysia, t } from "elysia";
import staticPlugin from "@elysiajs/static";
import { InferSelectModel, eq } from "drizzle-orm";

import pagesRouter from "~/pages";
import controllerRouter from "~/controllers";
import env from "~/lib/env";
import ctx from "~/middleware";
import { links } from "~/lib/db/schema";
import { storeLinkInRedis } from "~/lib/redis";

const app = new Elysia()
  .use(staticPlugin())
  .use(ctx)
  .use(controllerRouter)
  .use(pagesRouter)
  .get(
    "/:key",
    async ({ db, params, redis }) => {
      let link = await redis.get<InferSelectModel<typeof links>>(params.key);

      if (!link) {
        [link] = await db
          .select()
          .from(links)
          .where(eq(links.key, params.key))
          .limit(1);

        await storeLinkInRedis(link.key, link.url);
      }

      if (!link) {
        return {
          status: 404,
          body: "Not found",
        };
      }

      await db
        .update(links)
        .set({ clicks: link.clicks + 1 })
        .where(eq(links.key, params.key));

      return new Response(null, {
        status: 302,
        headers: {
          Location: link.url,
        },
      });
    },
    {
      params: t.Object({
        key: t.String(),
      }),
    }
  )
  .onStart(() => {
    if (env.NODE_ENV === "development") {
      void fetch("http://localhost:3001/reload");

      console.log("🦊 Triggering live reload");
    }
  })
  .onError(({ log, error }) => {
    log.error(error);
  })
  .listen(3000);

export type App = typeof app;

console.log(`🦊 Elysia is running at ${app.server?.url}`);
