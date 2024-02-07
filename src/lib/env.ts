import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NODE_ENV: z.enum(["development", "production"]),
    UPSTASH_URL: z.string(),
    UPSTASH_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
});

export default env;
