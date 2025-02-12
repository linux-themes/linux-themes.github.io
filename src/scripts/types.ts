export type Theme = {
  name: string;
  description: string;
  category: string;
  desktop: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

export type Icon = {
  name: string;
  description: string;
  category: string;
  desktop: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

export type Config = {
  name: string;
  description: string;
  category: string;
  desktop: string;
  url_icon: string;
  url_screenshot: string;
  url_package: string;
};

export type List = {
  [key: string]: {
    [key: string]: Theme | Icon | Config;
  };
};
