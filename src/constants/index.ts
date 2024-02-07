import env from "~/lib/env";

export const DEFAULT_KEY_DOMAIN =
  env.NODE_ENV === "development" ? "http://localhost:3000" : "https://alp.dev";

export const GOOGLE_FAVICONS_URL =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";
