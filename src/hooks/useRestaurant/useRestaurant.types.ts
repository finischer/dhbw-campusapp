import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import { RestaurantOptions } from "./../../api/html_scraper/restaurant/types/RestaurantTypes";

export type IRestaurantContext = {
  restaurantName: RestaurantOptions;
  formattedRestaurantName: string;
  getAllRestaurants(): RestaurantsMapTypes;
  changeRestaurant(restaurant: RestaurantOptions): void;
  changeDate(newDate: string): void;
  choosedDate: string;
  fetchRestaurant(): Promise<IFetchedRestaurantTypes>;
};

export type RestaurantsMapTypes = {
  [key in RestaurantOptions]: string;
};
