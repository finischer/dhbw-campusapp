import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import { AllRestaurantsOptions } from "./../../api/html_scraper/restaurant/types/RestaurantTypes";

export type IRestaurantContext = {
  restaurantName: AllRestaurantsOptions;
  formattedRestaurantName: string;
  getAllRestaurants(): RestaurantsMapTypes;
  changeRestaurant(restaurant: AllRestaurantsOptions): void;
  changeDate(newDate: string): void;
  choosedDate: string;
  fetchRestaurant(): Promise<IFetchedRestaurantTypes>;
};

export type RestaurantsMapTypes = {
  [key in AllRestaurantsOptions]: string;
};
