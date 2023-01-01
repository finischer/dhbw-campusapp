import { IOfferListTypes } from "./../../api/html_scraper/restaurant/types/IOfferListTypes";
import { RestaurantOptions } from "./../../api/html_scraper/restaurant/types/RestaurantTypes";

export type IRestaurantContext = {
  restaurantName: RestaurantOptions;
  formattedRestaurantName: string;
  getAllRestaurants(): RestaurantsMapTypes;
  changeRestaurant(restaurant: RestaurantOptions): void;
  changeDate(newDate: string): void;
  choosedDate: string;
  fetchMenus(): Promise<IOfferListTypes[]>;
};

export type RestaurantsMapTypes = {
  [key in RestaurantOptions]: string;
};
