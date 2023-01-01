import moment from "moment";
import { IOfferListTypes } from "../../api/html_scraper/restaurant/types/IOfferListTypes";

export type IRestaurantState = {
  restaurantName: string;
  offer: IOfferListTypes[];
  requestTime?: moment.Moment | undefined;
};

export type IRenderMenuListProps = {
  item: IOfferListTypes;
};
