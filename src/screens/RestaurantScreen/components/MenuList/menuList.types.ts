import { IMenuType } from "./../../../../api/html_scraper/restaurant/types/IMenuType";
export type IMenuListProps = {
  menus: IMenuType[];
  index: number;
  scrollX?: number;
  lengthOfOffers: number;
};
