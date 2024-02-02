import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

import db from "../lib/db";
import { user } from "../lib/db/schema";
import { eq } from "drizzle-orm";

type UserInputDTO = {
  username: string;
  password: string;
};

export async function signup({ username, password }: UserInputDTO) {
  try {
    const userId = generateId(15);
    const hashedPassword = await new Argon2id().hash(password);

    const [u] = await db
      .insert(user)
      .values({
        id: userId,
        username,
        hashedPassword,
      })
      .returning();

    return { id: u.id };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function login({ username, password }: UserInputDTO) {
  const [u] = await db
    .select()
    .from(user)
    .where(eq(user.username, username))
    .limit(1)
    .execute();

  if (!u) {
    return null;
  }

  const isPasswordValid = await new Argon2id().verify(
    u.hashedPassword ?? "",
    password
  );

  if (!isPasswordValid) {
    return null;
  }

  return u;
}
