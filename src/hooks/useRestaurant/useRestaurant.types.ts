import { IOfferListTypes } from "../../api/html_scraper/restaurant/types/IOfferListTypes";
import { IMenuType } from "./../../api/html_scraper/restaurant/types/IMenuType";
import { RestaurantOptions } from "./../../api/html_scraper/restaurant/types/RestaurantTypes";

export type IRestaurantContext = {
  restaurantName: RestaurantOptions;
  formattedRestaurantName: string;
  changeRestaurant(restaurant: RestaurantOptions): void;
  changeDate(newDate: string): void;
  choosedDate: string;
  fetchMenus(): Promise<IOfferListTypes[]>;
};

export type RestaurantsMapTypes = {
  [key in RestaurantOptions]: string;
};
