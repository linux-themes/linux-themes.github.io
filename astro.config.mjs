// @ts-check
import { defineConfig } from "astro/config";
// @ts-ignore
import preact from "@astrojs/preact";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://linuxthemes.org",
  integrations: [tailwind(), icon(), preact(), sitemap()],
});
