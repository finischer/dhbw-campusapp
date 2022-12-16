export type RestaurantOptions =
  | "mensa-am-schloss"
  | "mensaria-metropol"
  | "hochschule-mannheim"
  | "cafeteria-musikhochschule"
  | "mensaria-wohlgelegen"
  | "mensawagon";

export type Restaurants = {
  [key in RestaurantOptions]: string;
};
