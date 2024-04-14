import cheerio from "cheerio-without-node-native";
import moment from "moment";
import { ILanguageOptions } from "../../../hooks/useMetadata/useMetadata.types";
import { IResponseTypes } from "../../types/IResponseTypes";
import { RestaurantScraper } from "../restaurant/RestaurantScraperController";
import { IDayOptions } from "../restaurant/types/IDayOptions";
import { IMenuType } from "../restaurant/types/IMenuType";
import { IOfferListTypes } from "../restaurant/types/IOfferListTypes";
import { IRestaurantTypes } from "../restaurant/types/IRestaurantTypes";
import { KarlsruheRestaurants } from "../restaurant/types/RestaurantTypes";
import { KarlsruheRestaurantOptions } from "./types/KarlsruheRestaurants";
import axios from "axios";

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

// HINT: Only temporarily until user can choose his own role
type TMP_Role = "student" | "guest" | "staff" | "pupils";

export class DHBWKarlsruheRestaurantScraper extends RestaurantScraper {
  baseUrl: string;
  restaurants: KarlsruheRestaurants;
  price_html_classes: Record<TMP_Role, string>;
  role: TMP_Role;

  constructor(language: ILanguageOptions) {
    super();
    this.baseUrl = `https://www.sw-ka.de/${language}/hochschulgastronomie/speiseplan`;
    this.restaurants = {
      erzbergerstrasse: "mensa_erzberger",
    };
    this.price_html_classes = {
      student: ".price_1",
      guest: ".price_2",
      staff: ".price_3",
      pupils: ".price_4",
    };

    this.role = "student";
  }

  async getHtmlOfRestaurant(
    restaurantKey: KarlsruheRestaurantOptions,
    date: string | undefined = undefined
  ): Promise<IResponseTypes> {
    const payloadDate = date || moment().format("YYYY-MM-DD");

    const pathToRestaurant = this.restaurants[restaurantKey];
    const url = this.baseUrl + "/" + pathToRestaurant + "/?kw=16";
    const res = await axios.post(url);

    console.log("URL: ", url);

    if (res.status !== 200) {
      return {
        msg: `Error: scrap menue of restaurant ${restaurantKey} failed`,
        status: res.status,
        data: undefined,
      };
    }

    return { msg: "successful", status: 200, data: res.data };
  }

  async getDayOptionsOfRestaurant(restaurantKey: KarlsruheRestaurantOptions): Promise<IResponseTypes> {
    const res = await this.getHtmlOfRestaurant(restaurantKey);

    const response: IResponseTypes = {
      msg: "successful",
      status: 200,
      data: TEST_DAY_OPTIONS,
    };

    return response;
  }

  async getMenuOfRestaurant(
    restaurantKey: KarlsruheRestaurantOptions,
    date: string
  ): Promise<IResponseTypes> {
    const res = await this.getHtmlOfRestaurant(restaurantKey);

    if (!res.data) return res;

    const $ = cheerio.load(res.data);
    const restaurantName = $(".mensa_fullname").text();

    console.log("restaurantName: ", restaurantName);
    const $offer = $("#canteen_day_1").find(".mensatype_rows");

    $offer.each((_: number, parentElem: any) => {
      const menuName = $(parentElem).find(".mensatype").text().trim();

      const $menuDescriptions = $(parentElem).find(".menu-title");

      const menuDescriptions: string[] = [];
      $menuDescriptions.each((_: number, descElem: any) => {
        const desc = $(descElem).text().trim();
        menuDescriptions.push(desc);
      });

      const menuDescription = menuDescriptions.join(" | ");

      const price_class = this.price_html_classes[this.role];
      const menuPrice = $(parentElem).find(price_class).text().trim(); // price for students -> TODO: Show als

      const newMenu: IMenuType = {
        menuName,
        menuDescription,
        // menuIcons,
        menuPrice,
        // menuPriceSelection,
      };

      console.log("Menu: ", newMenu);
    });

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
