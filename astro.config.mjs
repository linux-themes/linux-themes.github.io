// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
// @ts-ignore
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://linuxthemes.org",
  // site: "https://linux-themes.github.io",
  // base: "website",
  integrations: [tailwind(), icon(), preact()],
});
