import { DHBWLocation } from "./../useMetadata/useMetadata.types";
import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import {
  AllRestaurantNames,
  AllRestaurants,
  KarlsruheRestaurants,
  MannheimRestaurants,
} from "../../api/html_scraper/restaurant/types/RestaurantTypes";

export type IRestaurantContext = {
  restaurantName: AllRestaurantNames;
  formattedRestaurantName: string;
  getAllRestaurants: () => AllRestaurants;
  changeRestaurant(restaurant: AllRestaurantNames): void;
  changeDate(newDate: string): void;
  choosedDate: string;
  fetchRestaurant(): Promise<IFetchedRestaurantTypes | null>;
};

export type RestaurantsMapTypes = {
  mannheim: MannheimRestaurants;
  karlsruhe: KarlsruheRestaurants;
};
