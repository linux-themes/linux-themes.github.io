import jsyaml from "js-yaml";

interface Themes {
  Description: string;
  Category: string;
  Desktop: string;
}

interface Icons {
  Description: string;
  Category: string;
}

interface Configs {
  Description: string;
  Category: string;
}

interface Component {
  Channel: string;
  Category: string;
  "Sub-category"?: string;
}

type DatabaseType = ".themes" | ".icons" | ".configs" | "components";

class DatabaseTableManager {
  private tableId: string;
  private dataUrl: string;
  private databaseType: DatabaseType;

  constructor(tableId: string, databaseType: DatabaseType) {
    this.tableId = tableId;
    this.dataUrl = `https://raw.githubusercontent.com/linux-themes/${databaseType}/main/index.yml`;
    this.databaseType = databaseType;
    this.fetchAndRenderData();
  }

  private getCategoryColor(category: string): string {
    console.log(category);
    switch (category.toLowerCase()) {
      case "theme":
        return "bg-green-300 text-green-900 dark:bg-green-600 dark:text-green-100";
      case "gnome":
        return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
      case "fonts":
        return "bg-yellow-300 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100";
      case "icons":
        return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
      case "configs":
        return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
      default:
        return "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-200";
    }
  }

  private getDesktpColor(desktop: string): string {
    console.log(desktop);
    switch (desktop.toLowerCase()) {
      case "theme":
        return "bg-green-300 text-green-900 dark:bg-green-600 dark:text-green-100";
      case "gnome":
        return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
      case "fonts":
        return "bg-yellow-300 text-yellow-900 dark:bg-yellow-600 dark:text-yellow-100";
      case "icons":
        return "bg-black text-white dark:bg-black dark:text-white";
      case "configs":
        return "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-blue-100";
      default:
        return "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-200";
    }
  }

  private renderRow(item: string, data: Themes | Component) {
    const table = document.getElementById(this.tableId)?.getElementsByTagName("tbody")[0];
    if (!table) {
      console.error("Table element not found");
      return;
    }

    const row = table.insertRow(-1);
    row.classList.add("hover:bg-gray-50", "dark:hover:bg-gray-700", "border-b", "dark:border-gray-700");
    const name = row.insertCell(0);
    const descriptionOrType = row.insertCell(1);
    const category = row.insertCell(2);

    name.classList.add("px-6", "py-4", "whitespace-nowrap", "text-lg", "font-medium", "text-gray-900", "dark:text-gray-100");
    category.classList.add("px-6", "py-4", "whitespace-nowrap");
    name.innerHTML = `<span class="font-semibold">${item}</span>`;

    if (this.databaseType === ".themes") {
      // THEMES
      const desktop = row.insertCell(3);
      const actions = row.insertCell(4);
      actions.classList.add("px-6", "py-4", "whitespace-nowrap", "text-lg", "font-medium", "text-blue-600", "dark:text-blue-400");
      desktop.classList.add("px-6", "py-4", "whitespace-nowrap");

      const theme = data as Themes;
      descriptionOrType.classList.add("px-6", "py-4", "whitespace-nowrap", "text-lg", "text-gray-500", "dark:text-gray-300");
      descriptionOrType.innerHTML = `<span class="text-gray-600 dark:text-gray-400">${theme.Description}</span>`;
      category.innerHTML = `<span class="px-2 py-1 rounded-lg ${this.getCategoryColor(theme.Category)}">${theme.Category}</span>`;
      desktop.innerHTML = `<span class="px-2 py-1 rounded-lg ${this.getDesktpColor(theme.Desktop)}">${theme.Desktop}</span>`;
      actions.innerHTML = `
      <a href='https://github.com/linux-themes/.themes/blob/main/${theme.Category}/${item}.yml' class="text-blue-600 dark:text-blue-400">Details</a> |
      <a href='https://github.com/linux-themes/.themes/issues/new/choose' class="text-blue-600 dark:text-blue-400">Report problem</a>`;
    } else if (this.databaseType === ".icons") {
      // ICONS
      const actions = row.insertCell(3);
      actions.classList.add("px-6", "py-4", "whitespace-nowrap", "text-lg", "font-medium", "text-blue-600", "dark:text-blue-400");

      const icon = data as Icons;
      descriptionOrType.classList.add("px-6", "py-4", "whitespace-nowrap");
      descriptionOrType.innerHTML = `<span class="px-2 py-1 rounded-lg">${icon.Description || "n/a"}</span>`;
      category.innerHTML = `<span class="px-2 py-1 rounded-lg ${this.getCategoryColor(icon.Category)}">${icon.Category}</span>`;
      // additional.classList.add('px-6', 'py-4', 'whitespace-nowrap');
      // additional.innerHTML = `<span class="px-2 py-1 rounded-lg">${icon.Channel}</span>`;
      actions.innerHTML = `
      <a href='https://github.com/linux-themes/.icons/blob/main/${icon.Category}/${item}.yml' class="text-blue-600 dark:text-blue-400">Details</a> |
      <a href='https://github.com/linux-themes/.icons/issues/new/choose' class="text-blue-600 dark:text-blue-400">Report problem</a>`;
    } else if (this.databaseType === ".configs") {
      // CONFIGS
      const actions = row.insertCell(4);
      actions.classList.add("px-6", "py-4", "whitespace-nowrap", "text-lg", "font-medium", "text-blue-600", "dark:text-blue-400");
      const config = data as Configs;
      descriptionOrType.classList.add("px-6", "py-4", "whitespace-nowrap");
      // descriptionOrType.innerHTML = `<span class="px-2 py-1 rounded-lg">${config["Sub-category"] || "n/a"}</span>`;
      category.innerHTML = `<span class="px-2 py-1 rounded-lg ${this.getCategoryColor(config.Category)}">${config.Category}</span>`;
      // additional.classList.add('px-6', 'py-4', 'whitespace-nowrap');
      // additional.innerHTML = `<span class="px-2 py-1 rounded-lg">${config.Channel}</span>`;
      actions.innerHTML = `
        <a href='https://github.com/linux-themes/.configs/blob/main/${config.Category}/${item}.yml' class="text-blue-600 dark:text-blue-400">Details</a> |
        <a href='https://github.com/linux-themes/.configs/issues/new/choose' class="text-blue-600 dark:text-blue-400">Report problem</a>`;
    }
  }

  private fetchAndRenderData() {
    fetch(this.dataUrl)
      .then((response) => response.text())
      .then((data) => {
        console.info(`${this.databaseType} database index found.`);
        const parsedData = jsyaml.load(data) as Record<string, any>;
        console.log(parsedData);

        for (let item in parsedData) {
          this.renderRow(item, parsedData[item]);
        }
      })
      .catch((err) => {
        console.error(`Failed to fetch ${this.databaseType} database index!`, err);
      });
  }
}

export default DatabaseTableManager;
