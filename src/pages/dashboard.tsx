import { Elysia } from "elysia";
import { generateId } from "lucia";
import CreateLinkButton from "~/components/links/create-button";
import CreateLinkModal from "~/components/links/create-link-modal";
import Link from "~/components/links/link";
import BaseLayout from "~/layouts/BaseLayout";
import ctx from "~/middleware";
import userMiddleware from "~/middleware/user";
import { getUserLinks } from "~/models/link";

const dashboardPage = new Elysia({
  name: "@router/pages/dashboard",
})
  .use(userMiddleware)
  .use(ctx)
  .guard(
    {
      beforeHandle(context) {
        if (!context.user) {
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
      app.get("/dashboard", async ({ user }) => {
        const links = await getUserLinks(user!.id);

        const newLinkKey = generateId(15);

        return (
          <BaseLayout user={user}>
            <div
              x-data="{ createLinkModalOpen: false }"
              x-on:close-modal="createLinkModalOpen = false"
            >
              <header class="flex justify-between items-center">
                <h1>Dashboard</h1>

                <CreateLinkButton />
              </header>

              <div class="flex flex-col space-y-4 mt-4" id="links">
                {links.map((link) => (
                  <Link link={link} />
                ))}
              </div>

              <CreateLinkModal defaultKey={newLinkKey} />
            </div>
          </BaseLayout>
        );
      })
  );

export default dashboardPage;
