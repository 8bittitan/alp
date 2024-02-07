import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import env from "~/lib/env";

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { logger: true });

export default db;
