import { MannheimRestaurantOptions } from "../../DHBWMannheim/types/MannheimRestaurants";

export type MannheimRestaurants = {
  [key in MannheimRestaurantOptions]: string;
};

export type AllRestaurantsOptions = MannheimRestaurantOptions;
