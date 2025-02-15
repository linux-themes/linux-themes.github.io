import jsyaml from "js-yaml";
import type { Theme } from "../scripts/types.ts";
import type { Icon } from "../scripts/types.ts";
import type { Config } from "../scripts/types.ts";
import type { List } from "../scripts/types.ts";

export async function getDownloads(maintainer: string, repository: string) {
  try {
    // let url = `https://api.github.com/repos/${maintainer}/${repository}/releases`;
    // console.log(url);
    const response = await fetch(`https://api.github.com/repos/${maintainer}/${repository}/releases`);
    const data = await response.json();
    return data[0]["assets"][0]["download_count"];
  } catch {
    return "n/a";
  }
}

export async function fetchThemes() {
  const response = await fetch("https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/themes/index.yml");
  const data = await response.text();
  const yaml: List = jsyaml.load(data) as List;
  let packages: Theme[] = [];
  for (const index in yaml["themes"]) {
    packages.push(yaml["themes"][index]);
  }
  return packages;
}

export async function fetchIcons() {
  const response = await fetch("https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/icons/index.yml");
  const data = await response.text();
  const yaml: List = jsyaml.load(data) as List;
  let packages: Icon[] = [];
  for (const index in yaml["icons"]) {
    packages.push(yaml["icons"][index]);
  }
  return packages;
}

export async function fetchConfigs() {
  const response = await fetch("https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/configs/index.yml");
  const data = await response.text();
  const yaml: List = jsyaml.load(data) as List;
  let packages: Config[] = [];
  for (const index in yaml["configs"]) {
    packages.push(yaml["configs"][index]);
  }
  return packages;
}

export function getDesktopColor(desktop: string): string {
  switch (desktop) {
    case "all":
      return "bg-green-300 text-green-900 dark:bg-green-600 dark:text-green-100";
    case "gnome":
      return "bg-yellow-300 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100";
    case "xcfe":
      return "bg-red-300 text-red-900 dark:bg-red-600 dark:text-red-100";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case "themes":
      return "bg-purple-300 text-purple-900 dark:bg-purple-600 dark:text-purple-100";
    case "icons":
      return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
    case "config":
      return "bg-yellow-300 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100";
    default:
      return "bg-gray-200 text-gray-800";
  }
}
