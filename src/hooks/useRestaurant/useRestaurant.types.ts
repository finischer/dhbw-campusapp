import { DHBWLocation } from "./../useMetadata/useMetadata.types";
import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import {
  AllRestaurantNames,
  KarlsruheRestaurants,
  MannheimRestaurants,
} from "../../api/html_scraper/restaurant/types/RestaurantTypes";

export type IRestaurantContext = {
  restaurantName: AllRestaurantNames;
  formattedRestaurantName: string;
  getAllRestaurants(): RestaurantsMapTypes;
  changeRestaurant(restaurant: AllRestaurantNames): void;
  changeDate(newDate: string): void;
  choosedDate: string;
  fetchRestaurant(): Promise<IFetchedRestaurantTypes>;
};

export type RestaurantsMapTypes = {
  mannheim: MannheimRestaurants;
  karlsruhe: KarlsruheRestaurants;
};
