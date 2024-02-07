import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { z } from "zod";
import db from "~/lib/db";
import { links } from "~/lib/db/schema";

const createLinkSchema = z.object({
  userId: z.string(),
  domain: z.string(),
  key: z.string(),
  url: z.string(),
});

export async function createLink(input: z.infer<typeof createLinkSchema>) {
  try {
    const data = createLinkSchema.parse(input);

    const id = generateId(8);

    const [link] = await db
      .insert(links)
      .values({
        ...data,
        id,
      })
      .returning();

    return link;
  } catch (err) {
    // [todo) User logger some how
    console.error(err);
    return null;
  }
}

export async function getUserLinks(userId: string) {
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId));

  return userLinks;
}
