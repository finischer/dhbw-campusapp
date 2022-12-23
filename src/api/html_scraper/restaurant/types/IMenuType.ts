import { MenuIconNames } from "./../../../../screens/RestaurantScreen/components/MenuIcon/menuIcon.types";

export type IMenuType = {
  menuName: string;
  menuDescription: string;
  menuIcons: MenuIconNames[];
  menuPrice: string;
  menuPriceSelection: string;
};
