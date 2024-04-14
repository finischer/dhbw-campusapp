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
import { MenuIconNames } from "../../../screens/RestaurantScreen/components/MenuIcon/menuIcon.types";
import { PropsWithChildren } from "react";

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

enum PriceSelector {
  Portion = "Portion",
  Gramm = "gr",
  Kilogramm = "kg",
}

export class DHBWKarlsruheRestaurantScraper extends RestaurantScraper {
  baseUrl: string;
  restaurants: KarlsruheRestaurants;
  price_html_classes: Record<TMP_Role, string>;
  role: TMP_Role;
  html: any;
  currRestaurant: KarlsruheRestaurantOptions | null;
  currWeek: number | null;
  weekCorrection: number;

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

    this.currRestaurant = null;
    this.html = null;
    this.weekCorrection = 0;

    this.currWeek = null;
  }

  extractPriceSelection(text: string) {
    const SEARCH_KEYS = ["preis je"];

    let priceSelector: string = PriceSelector.Portion; // DEFAULT

    SEARCH_KEYS.forEach((key) => {
      // const regex = new RegExp(`${key}\\s*(\\d+\\s*(g|kg))`, "gi");
      const regex = new RegExp(`${key}\\s*(\\d+)\\s*(g|kg)`, "gi");

      const match = regex.exec(text);
      if (match) {
        const weight = match.at(1) ?? "";
        const weightUnit = match.at(2) ?? "-";

        if (weightUnit === "g") {
          priceSelector = PriceSelector.Gramm;
        } else {
          priceSelector = weightUnit;
        }

        if (weight) {
          priceSelector = `${weight} ${priceSelector}`;
        }

        return;
      }
    });

    return priceSelector;
  }

  async getHtmlOfRestaurant(
    restaurantKey: KarlsruheRestaurantOptions,
    date: string | undefined = undefined,
    calendarWeek: number | null = moment().isoWeek()
  ): Promise<IResponseTypes> {
    if (this.html && this.currRestaurant === restaurantKey && calendarWeek === this.currWeek) {
      return { msg: "successful", status: 200, data: this.html };
    }

    const payloadDate = date || moment().format("YYYY-MM-DD");

    const pathToRestaurant = this.restaurants[restaurantKey];

    const url = this.baseUrl + "/" + pathToRestaurant + `/?kw=${calendarWeek}`;

    const res = await axios.post(url);

    if (res.status !== 200) {
      return {
        msg: `Error: scrap menue of restaurant ${restaurantKey} failed`,
        status: res.status,
        data: undefined,
      };
    }

    this.html = res.data;
    this.currRestaurant = restaurantKey;
    this.currWeek = calendarWeek;
    return { msg: "successful", status: 200, data: res.data };
  }

  async getDayOptionsOfRestaurant(
    restaurantKey: KarlsruheRestaurantOptions,
    week: number | null = null
  ): Promise<IResponseTypes> {
    const res = await this.getHtmlOfRestaurant(restaurantKey, undefined, week);

    const $ = cheerio.load(res.data);

    const optionList: IDayOptions[] = [];

    $("ul.canteen-day-nav li a").each((_: number, dayElem: any) => {
      const date = $(dayElem).attr("rel").trim();
      const weekDay = moment(date).format("dddd");

      const newDay: IDayOptions = {
        weekDay,
        date,
      };

      optionList.push(newDay);
    });

    const response: IResponseTypes = {
      msg: "successful",
      status: 200,
      data: optionList,
    };

    return response;
  }

  incrementWeek() {
    if (this.currWeek) {
      this.currWeek++;
    }
  }

  async getMenuOfRestaurant(
    restaurantKey: KarlsruheRestaurantOptions,
    date: string
  ): Promise<IResponseTypes> {
    const dateCalendarWeek = moment(date).isoWeek();

    const resDayOptions = await this.getDayOptionsOfRestaurant(restaurantKey, dateCalendarWeek);

    const dayOptions = resDayOptions.data as IDayOptions[];

    const dates = dayOptions.map((opt) => opt.date);

    if (!dates.includes(date)) {
      this.incrementWeek();
    }

    const dayId = dates.indexOf(date) + 1;

    const res = await this.getHtmlOfRestaurant(
      restaurantKey,
      undefined,
      dateCalendarWeek + this.weekCorrection
    );

    if (!res.data) return res;

    const $ = cheerio.load(res.data);
    const restaurantName = $(".mensa_fullname").text();

    const $offer = $(`#canteen_day_${dayId}`).find(".mensatype_rows");

    const offerList: IOfferListTypes = {
      date,
      menus: [],
    };

    $offer.each((_: number, parentElem: any) => {
      const menuName = $(parentElem).find(".mensatype").text().trim();

      const $menus = $(parentElem).find('[class^="mt-"]');

      let tmpDesc = "";
      $menus.each((_: number, menuElem: any) => {
        const price_class = this.price_html_classes[this.role];
        const menuPrice: string = $(menuElem).find(price_class).text().trim();
        const menuDescription = $(menuElem).find(".menu-title").text().trim();

        if (menuPrice.length === 0) {
          tmpDesc += ` | ${menuDescription}`;
        } else {
          tmpDesc = menuDescription;

          const menuPriceSelection = this.extractPriceSelection(menuDescription);
          const menuIcons: Array<MenuIconNames> = [];

          const iconName: MenuIconNames = "carrot"; // TODO: Find correct icon

          const newMenu: IMenuType = {
            menuName,
            menuDescription,
            menuIcons,
            menuPrice,
            menuPriceSelection,
          };

          offerList.menus.push(newMenu);
        }
      });
    });

    const restaurant: IRestaurantTypes = {
      restaurantName,
      offer: offerList,
      additivesDict: {}, // TODO: extract additives from HTML
    };

    const response: IResponseTypes = {
      msg: "successful",
      status: 200,
      data: restaurant,
    };

    return response;
  }
}
