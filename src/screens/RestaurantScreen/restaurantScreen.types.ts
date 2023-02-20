import moment from "moment";
import { IOfferListTypes } from "../../api/html_scraper/restaurant/types/IOfferListTypes";
import { IAdditivesDict } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";

export type IRestaurantState = {
  restaurantName: string;
  offer: IOfferListTypes[] | [];
  requestTime?: moment.Moment | undefined;
  additivesDict: IAdditivesDict;
};

export type IRenderMenuListProps = {
  item: IOfferListTypes;
};
