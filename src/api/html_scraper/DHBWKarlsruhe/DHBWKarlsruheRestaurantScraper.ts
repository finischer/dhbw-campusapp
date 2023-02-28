import { ILanguageOptions } from "../../../hooks/useMetadata/useMetadata.types";
import { IResponseTypes } from "../../types/IResponseTypes";
import { RestaurantScraper } from "../restaurant/RestaurantScraperController";
import { IDayOptions } from "../restaurant/types/IDayOptions";
import { IMenuType } from "../restaurant/types/IMenuType";
import { IOfferListTypes } from "../restaurant/types/IOfferListTypes";
import { IRestaurantTypes } from "../restaurant/types/IRestaurantTypes";

const TEST_MENUS: IMenuType[] = [
  {
    menuName: "Spaghetti Carbonara",
    menuDescription: "Pasta mit Sahnesauce und Speck",
    menuPrice: "9.99 €",
    menuIcons: ["pig"],
    menuPriceSelection: "",
  },
  {
    menuName: "Pizza Margherita",
    menuDescription: "Tomaten, Mozzarella und Basilikum",
    menuPrice: "7.99 €",
    menuIcons: [],
    menuPriceSelection: "",
  },
  {
    menuName: "Hähnchenbrustfilet",
    menuDescription: "Gegrilltes Hähnchen mit Gemüse",
    menuPrice: "12.99 €",
    menuIcons: ["chicken"],
    menuPriceSelection: "",
  },
];

const TEST_DAY_OPTIONS: IDayOptions[] = [
  {
    weekDay: "Montag",
    date: "27.02.2023",
  },
  {
    weekDay: "Dienstag",
    date: "28.02.2023",
  },
  {
    weekDay: "Mittwoch",
    date: "01.03.2023",
  },
  {
    weekDay: "Donnerstag",
    date: "02.03.2023",
  },
  {
    weekDay: "Freitag",
    date: "03.03.2023",
  },
  {
    weekDay: "Samstag",
    date: "04.03.2023",
  },
  {
    weekDay: "Sonntag",
    date: "05.03.2023",
  },
];

export class DHBWKarlsruheRestaurantScraper extends RestaurantScraper {
  constructor(language: ILanguageOptions) {
    super();
  }

  async getDayOptionsOfRestaurant(
    restaurantKey: string
  ): Promise<IResponseTypes> {
    const response: IResponseTypes = {
      msg: "successful",
      status: 200,
      data: TEST_DAY_OPTIONS,
    };

    return response;
  }

  async getMenuOfRestaurant(
    restaurantKey: string,
    date: string
  ): Promise<IResponseTypes> {
    const offerList: IOfferListTypes = {
      date: "28.02.2023",
      menus: TEST_MENUS,
    };

    const restaurant: IRestaurantTypes = {
      restaurantName: "Karlsruhe Mensa",
      offer: offerList,
      additivesDict: {},
    };

    const response: IResponseTypes = {
      msg: "successful",
      status: 200,
      data: restaurant,
    };

    return response;
  }
}
