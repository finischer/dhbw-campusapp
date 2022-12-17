import { IMenuType } from "./../../api/html_scraper/restaurant/types/IMenuType";
export type IRestaurantState = {
  restaurantName: string;
  offer: Array<IMenuType[]>;
};

export type IRenderMenuListProps = {
  item: IMenuType[];
  index: number;
  scrollX: number;
};
