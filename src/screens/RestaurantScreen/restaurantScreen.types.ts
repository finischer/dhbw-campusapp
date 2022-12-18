import { IOfferListTypes } from "../../api/html_scraper/restaurant/types/IOfferListTypes";
import { IMenuType } from "./../../api/html_scraper/restaurant/types/IMenuType";
export type IRestaurantState = {
  restaurantName: string;
  offer: IOfferListTypes[];
};

export type IRenderMenuListProps = {
  item: IOfferListTypes;
};
