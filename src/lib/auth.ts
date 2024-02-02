import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from "./db";
import { session, user } from "./db/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    attributes: {
      secure: import.meta.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(attributes) {
    return {
      username: attributes.username,
    };
  },
});

export default auth;
export type Auth = typeof auth;
