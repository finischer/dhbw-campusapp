import { IResponseTypes } from "../../types/IResponseTypes";
export abstract class RestaurantScraper {
  abstract getDayOptionsOfRestaurant(restaurantKey: string): Promise<IResponseTypes>;

  abstract getMenuOfRestaurant(restaurantKey: string, date: string): Promise<IResponseTypes>;

  abstract getHtmlOfRestaurant(restaurantKey: string, date: string | undefined): Promise<IResponseTypes>;
}
