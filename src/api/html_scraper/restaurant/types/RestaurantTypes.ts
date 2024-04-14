import { DHBWLocation } from "../../../../hooks/useMetadata/useMetadata.types";
import { KarlsruheRestaurantOptions } from "../../DHBWKarlsruhe/types/KarlsruheRestaurants";
import { MannheimRestaurantOptions } from "../../DHBWMannheim/types/MannheimRestaurants";

export type MannheimRestaurants = {
  [key in MannheimRestaurantOptions]: string;
};

export type KarlsruheRestaurants = {
  [key in KarlsruheRestaurantOptions]: string;
};

export type AllRestaurantNames = MannheimRestaurantOptions | KarlsruheRestaurantOptions;

// export type AllRestaurants<T extends DHBWLocation> = T extends DHBWLocation.Mannheim
//   ? MannheimRestaurants
//   : T extends DHBWLocation.Karlsruhe
//   ? KarlsruheRestaurants
//   : never;

export type AllRestaurants = MannheimRestaurants | KarlsruheRestaurants