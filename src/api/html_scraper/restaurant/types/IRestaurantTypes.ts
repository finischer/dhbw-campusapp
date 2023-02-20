import { IOfferListTypes } from "./IOfferListTypes";

export type IAdditivesItem = {
  label: string;
  name: string;
};

export type IAdditivesDict = {
  [key: string]: IAdditivesItem[];
};

export type IRestaurantTypes = {
  restaurantName: string;
  offer: IOfferListTypes;
  additivesDict: IAdditivesDict;
};

export type IFetchedRestaurantTypes = {
  restaurantName: string;
  offer: IOfferListTypes[];
  additivesDict: IAdditivesDict;
};
