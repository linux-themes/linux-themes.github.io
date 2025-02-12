import jsyaml from "js-yaml";

type Theme = {
  name: string;
  description: string;
  category: string;
  desktop: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

type Icon = {
  name: string;
  description: string;
  category: string;
  desktop: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

type Config = {
  name: string;
  description: string;
  category: string;
  desktop: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

export function fetchThemes(storeResults: HTMLElement | null): HTMLElement | null {
  fetch(`https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/themes/index.yml`)
    .then((response) => response.text())
    .then((data) => {
      const themes: { [key: string]: { [key: string]: Theme } } = jsyaml.load(data) as { [key: string]: { [key: string]: Theme } };
      if (typeof themes === "object" && storeResults) {
        for (const item in themes["themes"]) {
          const pkg = themes["themes"][item];
          const cardHTML = generateThemesCardHTML(item, pkg, "/assets/logo.svg");
          storeResults.innerHTML += cardHTML;
        }
      }
    })
    .catch((err) => console.error("Failed to fetch Installers database index!", err));
  return storeResults;
}

export function fetchIcons(storeResults: HTMLElement | null): HTMLElement | null {
  fetch(`https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/icons/index.yml`)
    .then((response) => response.text())
    .then((data) => {
      const themes: { [key: string]: { [key: string]: Icon } } = jsyaml.load(data) as { [key: string]: { [key: string]: Icon } };
      if (typeof themes === "object" && storeResults) {
        for (const item in themes["icons"]) {
          const pkg = themes["icons"][item];
          const cardHTML = generateIconsCardHTML(item, pkg, "/assets/logo.svg");
          storeResults.innerHTML += cardHTML;
        }
      }
    })
    .catch((err) => console.error("Failed to fetch Installers database index!", err));
  return storeResults;
}

export function fetchConfigs(storeResults: HTMLElement | null): HTMLElement | null {
  fetch(`https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/icons/index.yml`)
    .then((response) => response.text())
    .then((data) => {
      const themes: { [key: string]: { [key: string]: Config } } = jsyaml.load(data) as { [key: string]: { [key: string]: Config } };
      if (typeof themes === "object" && storeResults) {
        for (const item in themes["configs"]) {
          const pkg = themes["configs"][item];
          const cardHTML = generateConfigCardHTML(item, pkg, "/assets/logo.svg");
          storeResults.innerHTML += cardHTML;
        }
      }
    })
    .catch((err) => console.error("Failed to fetch Installers database index!", err));
  return storeResults;
}

function getGradeColor(grade: string): string {
  switch (grade.toLowerCase()) {
    case "custom":
      return "bg-green-300 text-green-900 dark:bg-green-600 dark:text-green-100";
    case "themes":
      return "bg-yellow-300 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100";
    case "icon":
      return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
    case "config":
      return "bg-gray-200 text-gray-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case "themes":
      return "bg-purple-300 text-purple-900 dark:bg-purple-600 dark:text-purple-100";
    case "icons":
      return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
    case "config":
      return "bg-purple-200 text-purple-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

function generateIconsCardHTML(item: string, theme: Theme, icon: string): string {
  theme.desktop = "custom";
  theme.category = "icons";
  return `
      <div grade="${theme.desktop.toLowerCase()}" category="${theme.category.toLowerCase()}" class="card bg-white rounded-lg shadow-md justify-between flex flex-col relative top-0 transition-all hover:shadow-lg hover:-top-1 dark:bg-gray-800 dark:text-gray-200">
        <div class="p-4">
          <div class="flex gap-4 justify-between">
            <div>
              <img src="${icon}" alt="${item}" class="w-8 h-8 self-center">
              <h3 class="text-2xl font-bold mb-2">${theme.name}</h3>
            </div>
            <h3 class="text-2xl font-bold mb-2">${item}</h3>
          </div>
          <p class="text-gray-600 mb-4 text-xl dark:text-gray-300">${theme.description}</p>
          <div class="tags flex space-x-2 mb-4">
            <span class="${getGradeColor(theme.desktop)} px-2 py-1 rounded-lg text-sm">${theme.desktop}</span>
            <span class="px-2 py-1 rounded-lg text-sm ${getCategoryColor(theme.category)}">${theme.category}</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-b-lg text-center flex gap-2 justify-between dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-bl-lg" href="/app#${theme.category}_${item}">Details</a>
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-br-lg" href="https://linuxthemes.org/download/">Install</a>
        </div>
      </div>
      `;
}

function generateThemesCardHTML(item: string, theme: Theme, icon: string): string {
  theme.desktop = "custom";
  theme.category = "themes";
  return `
      <div grade="${theme.desktop.toLowerCase()}" category="${theme.category.toLowerCase()}" class="card bg-white rounded-lg shadow-md justify-between flex flex-col relative top-0 transition-all hover:shadow-lg hover:-top-1 dark:bg-gray-800 dark:text-gray-200">
        <div class="p-4">
          <div class="flex gap-4 justify-between">
            <div>
              <img src="${icon}" alt="${item}" class="w-8 h-8 self-center">
              <h3 class="text-2xl font-bold mb-2">${theme.name}</h3>
            </div>
            <h3 class="text-2xl font-bold mb-2">${item}</h3>
          </div>
          <p class="text-gray-600 mb-4 text-xl dark:text-gray-300">${theme.description}</p>
          <div class="tags flex space-x-2 mb-4">
            <span class="${getGradeColor(theme.desktop)} px-2 py-1 rounded-lg text-sm">${theme.desktop}</span>
            <span class="px-2 py-1 rounded-lg text-sm ${getCategoryColor(theme.category)}">${theme.category}</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-b-lg text-center flex gap-2 justify-between dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-bl-lg" href="/app#${theme.category}_${item}">Details</a>
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-br-lg" href="https://linuxthemes.org/download/">Install</a>
        </div>
      </div>
      `;
}

function generateConfigCardHTML(item: string, theme: Theme, icon: string): string {
  return `
      <div grade="${theme.desktop.toLowerCase()}" category="${theme.category.toLowerCase()}" class="card bg-white rounded-lg shadow-md justify-between flex flex-col relative top-0 transition-all hover:shadow-lg hover:-top-1 dark:bg-gray-800 dark:text-gray-200">
        <div class="p-4">
          <div class="flex gap-4">
            <img src="${icon}" alt="${item}" class="w-8 h-8 self-center">
            <h3 class="text-2xl font-bold mb-2">${theme.name}</h3>
          </div>
          <p class="text-gray-600 mb-4 text-xl dark:text-gray-300">${theme.description}</p>
          <div class="tags flex space-x-2 mb-4">
            <span class="${getGradeColor(theme.desktop)} px-2 py-1 rounded-lg text-sm">${theme.desktop}</span>
            <span class="px-2 py-1 rounded-lg text-sm ${getCategoryColor(theme.category)}">${theme.category}</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-b-lg text-center flex gap-2 justify-between dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-bl-lg" href="/app#${theme.category}_${item}">Details</a>
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-br-lg" href="https://linuxthemes.org/download/">Install</a>
        </div>
      </div>
      `;
}
