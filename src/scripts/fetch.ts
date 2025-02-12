import jsyaml from "js-yaml";

type Theme = {
  Name: string;
  Description: string;
  Icon: string;
  Grade: string;
  Category: string;
};

type Icon = {
  Name: string;
  Description: string;
  Icon: string;
  Grade: string;
  Category: string;
};

type Config = {
  Name: string;
  Description: string;
  Icon: string;
  Grade: string;
  Category: string;
};

export function fetchThemes(storeResults: HTMLElement | null): HTMLElement | null {
  fetch(`https://raw.githubusercontent.com/linux-themes/database/refs/heads/main/themes/index.yml`)
    .then((response) => response.text())
    .then((data) => {
      const themes: { [key: string]: { [key: string]: Theme } } = jsyaml.load(data) as { [key: string]: { [key: string]: Theme } };
      if (typeof themes === "object" && storeResults) {
        for (const item in themes["Themes"]) {
          const theme = themes["Themes"][item];
          // const icon = `https://github.com/linux-themes/themes/blob/main/data/${item}/${theme.Icon}?raw=true`;
          // const cardHTML = generateThemesCardHTML(item, theme, icon);
          const cardHTML = generateThemesCardHTML(item, theme, "/assets/logo.svg");
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
        for (const item in themes["Themes"]) {
          const theme = themes["Themes"][item];
          // const icon = `https://github.com/linux-themes/themes/blob/main/data/${item}/${theme.Icon}?raw=true`;
          // const cardHTML = generateIconsCardHTML(item, theme, icon);
          const cardHTML = generateIconsCardHTML(item, theme, "/assets/logo.svg");
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
        for (const item in themes["Themes"]) {
          const theme = themes["Themes"][item];
          // const icon = `https://github.com/linux-themes/themes/blob/main/data/${item}/${theme.Config}?raw=true`;
          // const cardHTML = generateConfigsCardHTML(item, theme, icon);
          const cardHTML = generateConfigCardHTML(item, theme, "/assets/logo.svg");
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
  theme.Grade = "custom";
  theme.Category = "icons";
  return `
      <div grade="${theme.Grade.toLowerCase()}" category="${theme.Category.toLowerCase()}" class="card bg-white rounded-lg shadow-md justify-between flex flex-col relative top-0 transition-all hover:shadow-lg hover:-top-1 dark:bg-gray-800 dark:text-gray-200">
        <div class="p-4">
          <div class="flex gap-4 justify-between">
            <div>
              <img src="${icon}" alt="${item}" class="w-8 h-8 self-center">
              <h3 class="text-2xl font-bold mb-2">${theme.Name}</h3>
            </div>
            <h3 class="text-2xl font-bold mb-2">${item}</h3>
          </div>
          <p class="text-gray-600 mb-4 text-xl dark:text-gray-300">${theme.Description}</p>
          <div class="tags flex space-x-2 mb-4">
            <span class="${getGradeColor(theme.Grade)} px-2 py-1 rounded-lg text-sm">${theme.Grade}</span>
            <span class="px-2 py-1 rounded-lg text-sm ${getCategoryColor(theme.Category)}">${theme.Category}</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-b-lg text-center flex gap-2 justify-between dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-bl-lg" href="/app#${theme.Category}_${item}">Details</a>
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-br-lg" href="https://linuxthemes.org/download/">Install</a>
        </div>
      </div>
      `;
}

function generateThemesCardHTML(item: string, theme: Theme, icon: string): string {
  theme.Grade = "custom";
  theme.Category = "themes";
  return `
      <div grade="${theme.Grade.toLowerCase()}" category="${theme.Category.toLowerCase()}" class="card bg-white rounded-lg shadow-md justify-between flex flex-col relative top-0 transition-all hover:shadow-lg hover:-top-1 dark:bg-gray-800 dark:text-gray-200">
        <div class="p-4">
          <div class="flex gap-4 justify-between">
            <div>
              <img src="${icon}" alt="${item}" class="w-8 h-8 self-center">
              <h3 class="text-2xl font-bold mb-2">${theme.Name}</h3>
            </div>
            <h3 class="text-2xl font-bold mb-2">${item}</h3>
          </div>
          <p class="text-gray-600 mb-4 text-xl dark:text-gray-300">${theme.Description}</p>
          <div class="tags flex space-x-2 mb-4">
            <span class="${getGradeColor(theme.Grade)} px-2 py-1 rounded-lg text-sm">${theme.Grade}</span>
            <span class="px-2 py-1 rounded-lg text-sm ${getCategoryColor(theme.Category)}">${theme.Category}</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-b-lg text-center flex gap-2 justify-between dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-bl-lg" href="/app#${theme.Category}_${item}">Details</a>
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-br-lg" href="https://linuxthemes.org/download/">Install</a>
        </div>
      </div>
      `;
}

function generateConfigCardHTML(item: string, theme: Theme, icon: string): string {
  return `
      <div grade="${theme.Grade.toLowerCase()}" category="${theme.Category.toLowerCase()}" class="card bg-white rounded-lg shadow-md justify-between flex flex-col relative top-0 transition-all hover:shadow-lg hover:-top-1 dark:bg-gray-800 dark:text-gray-200">
        <div class="p-4">
          <div class="flex gap-4">
            <img src="${icon}" alt="${item}" class="w-8 h-8 self-center">
            <h3 class="text-2xl font-bold mb-2">${theme.Name}</h3>
          </div>
          <p class="text-gray-600 mb-4 text-xl dark:text-gray-300">${theme.Description}</p>
          <div class="tags flex space-x-2 mb-4">
            <span class="${getGradeColor(theme.Grade)} px-2 py-1 rounded-lg text-sm">${theme.Grade}</span>
            <span class="px-2 py-1 rounded-lg text-sm ${getCategoryColor(theme.Category)}">${theme.Category}</span>
          </div>
        </div>
        <div class="bg-gray-100 rounded-b-lg text-center flex gap-2 justify-between dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-bl-lg" href="/app#${theme.Category}_${item}">Details</a>
          <a class="block font-medium text-lg size-full p-2 hover:bg-gray-500 rounded-br-lg" href="https://linuxthemes.org/download/">Install</a>
        </div>
      </div>
      `;
}
