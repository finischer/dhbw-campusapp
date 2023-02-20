import { Moment } from "moment";
import { IMenuType } from "./../../../../api/html_scraper/restaurant/types/IMenuType";
export type IMenuListProps = {
  menus: IMenuType[];
  requestTime: Moment | undefined;
  date: string;
};
