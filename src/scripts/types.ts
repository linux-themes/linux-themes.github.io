export type Theme = {
  package_number: number;
  name: string;
  description: string;
  category: string;
  desktop: string;
  maintainer: string;
  repository: string;
  url_git: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

export type Icon = {
  package_number: number;
  name: string;
  description: string;
  category: string;
  desktop: string;
  maintainer: string;
  repository: string;
  url_git: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

export type Config = {
  package_number: number;
  name: string;
  description: string;
  category: string;
  desktop: string;
  maintainer: string;
  repository: string;
  url_git: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

export type List = {
  [key: string]: {
    [key: string]: Theme | Icon | Config;
  };
};
