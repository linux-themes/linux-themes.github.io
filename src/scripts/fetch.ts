import jsyaml from "js-yaml";
import type { Theme } from "../scripts/types.ts";
import type { Icon } from "../scripts/types.ts";
import type { Config } from "../scripts/types.ts";
import type { List } from "../scripts/types.ts";

export async function fetchThemes(storeResults: HTMLElement | null): Promise<HTMLElement | null> {
  const response = await fetch("https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/themes/index.yml");
  const data = await response.text();
  const packages: List = jsyaml.load(data) as List;
  if (typeof packages === "object" && storeResults) {
    for (const index in packages["themes"]) {
      storeResults.innerHTML += generateCardHTML(packages["themes"][index], "/assets/logo.svg", index);
    }
  }
  return storeResults;
}

export async function fetchIcons(storeResults: HTMLElement | null): Promise<HTMLElement | null> {
  const response = await fetch("https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/icons/index.yml");
  const data = await response.text();
  const packages: List = jsyaml.load(data) as List;
  if (typeof packages === "object" && storeResults) {
    for (const index in packages["icons"]) {
      storeResults.innerHTML += generateCardHTML(packages["icons"][index], "/assets/logo.svg", index);
    }
  }
  return storeResults;
}

export async function fetchConfigs(storeResults: HTMLElement | null): Promise<HTMLElement | null> {
  const response = await fetch("https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/configs/index.yml");
  const data = await response.text();
  const packages: List = jsyaml.load(data) as List;
  if (typeof packages === "object" && storeResults) {
    for (const index in packages["configs"]) {
      storeResults.innerHTML += generateCardHTML(packages["configs"][index], "/assets/logo.svg", index);
    }
  }
  return storeResults;
}

export function getDesktopColor(desktop: string): string {
  console.log(desktop);
  switch (desktop.toLowerCase()) {
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
  switch (category.toLowerCase()) {
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

function generateCardHTML(data: Theme | Icon | Config, icon: string, index: string): string {
  if (data.category == "icons") data.desktop = "all";
  return `
      <div grade="${data.desktop.toLowerCase()}" category="${data.category.toLowerCase()}" class="card bg-white rounded-lg shadow-md justify-between flex flex-col relative top-0 transition-all hover:shadow-lg hover:-top-1 dark:bg-gray-800 dark:text-gray-200">
        <div class="p-4 flex flex-col ">
          <div class="flex gap-4 justify-between">
            <div>
            <h3 class="text-2xl font-bold mb-2">${data.name}</h3>
            </div>
            <h3 class="text-2xl font-bold mb-2">${index}</h3>
            </div>
            <img src="${icon}" alt="${data.name}" class="h-60 self-center">
          <p class="text-gray-600 mb-4 text-xl dark:text-gray-300">${data.description}</p>
          <div class="tags flex space-x-2 mb-4">
            <span class="${getDesktopColor(data.desktop)} px-2 py-1 rounded-lg text-sm">${data.desktop}</span>
            <span class="px-2 py-1 rounded-lg text-sm ${getCategoryColor(data.category)}">${data.category}</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-b-lg text-center flex gap-2 justify-between dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-bl-lg" href="/app#${data.category}_${index}">Details</a>
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-br-lg" href="https://linuxthemes.org/download/">Install</a>
        </div>
      </div>
      `;
}
