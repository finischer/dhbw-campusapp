import { KarlsruheRestaurantOptions } from "../../DHBWKarlsruhe/types/KarlsruheRestaurants";
import { MannheimRestaurantOptions } from "../../DHBWMannheim/types/MannheimRestaurants";

export type MannheimRestaurants = {
  [key in MannheimRestaurantOptions]: string;
};

export type KarlsruheRestaurants = {
  [key in KarlsruheRestaurantOptions]: string;
};

export type AllRestaurantNames = MannheimRestaurantOptions | KarlsruheRestaurantOptions;
