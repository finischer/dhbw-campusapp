import axios from "axios";
import cheerio from "cheerio-without-node-native";
import moment from "moment";
import { ILanguageOptions } from "../../../hooks/useMetadata/useMetadata.types";
import { MenuIconNames } from "../../../screens/RestaurantScreen/components/MenuIcon/menuIcon.types";
import { IResponseTypes } from "../../types/IResponseTypes";
import { RestaurantScraper } from "../restaurant/RestaurantScraperController";
import { IDayOptions } from "../restaurant/types/IDayOptions";
import { IMenuType } from "../restaurant/types/IMenuType";
import { IOfferListTypes } from "../restaurant/types/IOfferListTypes";
import { IAdditivesDict, IRestaurantTypes } from "../restaurant/types/IRestaurantTypes";
import { MannheimRestaurants } from "../restaurant/types/RestaurantTypes";
import { MannheimRestaurantOptions } from "./types/MannheimRestaurants";

export class DHBWMannheimRestaurantScraper extends RestaurantScraper {
  restaurants: MannheimRestaurants;
  baseUrl: string;

  constructor(language: ILanguageOptions) {
    super();
    const suffix = language === "de" ? "" : "en";
    this.baseUrl = `https://www.stw-ma.de/${suffix}`;
    this.restaurants = {
      "mensa-am-schloss": "menüplan_schlossmensa.html",
      "mensaria-metropol": "Essen+_+Trinken/Speisepl%C3%A4ne/Mensaria+Metropol.html",
      "hochschule-mannheim": "Essen+_+Trinken/Speisepläne/Hochschule+Mannheim.html",
      "cafeteria-musikhochschule": "Essen+_+Trinken/Speisepläne/Cafeteria+Musikhochschule.html",
      "mensaria-wohlgelegen": "Essen+_+Trinken/Speisepläne/Mensaria+Wohlgelegen.html",
      mensawagon: "Essen+_+Trinken/Speisepläne/MensaWagon.html",
    };
  }

  async getHtmlOfRestaurant(restaurantKey: MannheimRestaurantOptions, date: string | undefined = undefined) {
    const payloadDate = date || moment().format("YYYY-MM-DD");

    const pathToRestaurant = this.restaurants[restaurantKey];
    const url = this.baseUrl + "/" + pathToRestaurant;
    const res = await axios.post(url, `day=${payloadDate}`);

    if (res.status !== 200) {
      return {
        msg: `Error: scrap menue of restaurant ${restaurantKey} failed`,
        status: res.status,
        data: undefined,
      };
    }

    return { msg: "successful", status: 200, data: res.data };
  }

  getRestaurants() {
    // returns all names of all restaurants of Mannheim
    return this.restaurants;
  }

  getInfoOfRestaurant(restaurant: string) {
    // returns information of the given Restaurant
    // available Information: name, opening hours, adress (name, street, houseNumber, other, zip code, city, additional info), description
  }

  async getDayOptionsOfRestaurant(restaurantKey: MannheimRestaurantOptions) {
    const res = await this.getHtmlOfRestaurant(restaurantKey);
    if (!res.data) return res;

    const $ = cheerio.load(res.data);

    const optionList: IDayOptions[] = [];
    $(".speiseplan-day-select")
      .find("option")
      .each((_: number, elem: any) => {
        const weekDay: string = $(elem).text().split(",")[0].trim();
        const date: string = $(elem).text().split(",")[1].trim();

        const newDay: IDayOptions = {
          weekDay,
          date,
        };
        optionList.push(newDay);
      });

    return {
      msg: "successful",
      status: 200,
      data: optionList,
    };
  }

  async getMenuOfRestaurant(restaurantKey: MannheimRestaurantOptions, date: string) {
    const res = await this.getHtmlOfRestaurant(restaurantKey, date);
    if (!res.data) return res;

    const $ = cheerio.load(res.data);
    const restaurantName = $(".maintitle").text();

    const $offer = $(".speiseplan-table").children();

    const offerList: IOfferListTypes = {
      date,
      menus: [],
    };

    // iterate over offer
    $offer.each((_: number, parentElem: any) => {
      const menuName = $(parentElem).find(".speiseplan-table-menu-headline > strong").text().trim();

      const menuDescription = $(parentElem).find(".speiseplan-table-menu-content").text().trim();

      const menuIcons: Array<MenuIconNames> = [];
      $(parentElem)
        .find(".speiseplan-table-menu-icon")
        .find(".icon")
        .each((_: number, childElem: any) => {
          const classNameOfIcon = $(childElem).attr("class").split(" ")[1];
          const iconName: MenuIconNames = classNameOfIcon.split("-")[1];
          menuIcons.push(iconName);
        });

      const menuPrice = $(parentElem).find(".price").text().trim();
      const menuPriceSelection = $(parentElem).find(".customSelection").text().trim();

      const newMenu: IMenuType = {
        menuName,
        menuDescription,
        menuIcons,
        menuPrice,
        menuPriceSelection,
      };

      offerList.menus.push(newMenu);
    });

    const additivesDict: IAdditivesDict = {};

    let currCategory = "";
    $(".speiseplan-label-content")
      .children()
      .each((i: number, el: any) => {
        const elemClass = el["attribs"]["class"];

        if (elemClass === "speiseplan-category") {
          currCategory = $(el).text().replace(":", "").trim();
          additivesDict[currCategory] = [];
        } else {
          const label = $(el).find("sup b").text().trim();
          const name = $(el).clone().children().remove().end().text().trim();

          additivesDict[currCategory].push({
            label,
            name,
          });
        }
      });

    const restaurant: IRestaurantTypes = {
      restaurantName,
      offer: offerList,
      additivesDict: additivesDict,
    };

    const response: IResponseTypes = {
      msg: "successful",
      status: 200,
      data: restaurant,
    };

    return response;
  }
}
