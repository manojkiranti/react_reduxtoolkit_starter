export interface MenuTabType {
  label: string;
  link: string;
  key: string;
}

export interface MenuType {
  key: string;
  label: string;
  link?: string;
  icon?: string;
  children?: MenuType[];
  subNavigation?: MenuType[];
  parentKey?: string;
  tabs?: MenuTabType[];
  display?: boolean;
}