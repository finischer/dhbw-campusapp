import moment, { lang } from "moment";
import { useState, createContext, useContext } from "react";
import { RestaurantScraper } from "../../api/html_scraper/restaurant/RestaurantScraperController";
import { IRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import { RestaurantOptions } from "../../api/html_scraper/restaurant/types/RestaurantTypes";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import { IOfferListTypes } from "../../api/html_scraper/restaurant/types/IOfferListTypes";
import { IRestaurantContext, RestaurantsMapTypes } from "./useRestaurant.types";
import { useMetadata } from "../useMetadata";

const PREVIEW_DAYS = 5;

const RESTAURANTS_MAP: RestaurantsMapTypes = {
  "mensa-am-schloss": "Mensa am Schloss",
  "cafeteria-musikhochschule": "Cafeteria Musikhochschule",
  "hochschule-mannheim": "Hochschule Mannheim",
  "mensaria-metropol": "Mensaria Metropol",
  "mensaria-wohlgelegen": "Mensaria Wohlgelegen",
  mensawagon: "Mensawagon",
};

const RestaurantContext = createContext<IRestaurantContext | undefined>(
  undefined
);

const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { language } = useMetadata();
  const restaurantScraper = new RestaurantScraper(language);

  const [restaurantName, setRestaurantName] =
    useState<RestaurantOptions>("mensa-am-schloss");

  const [choosedDate, setChoosedDate] = useState(moment().format("DD.MM.YYYY"));

  const formattedRestaurantName = RESTAURANTS_MAP[restaurantName];

  const changeRestaurant = (newRestaurant: RestaurantOptions) => {
    setRestaurantName(newRestaurant);
  };

  const changeDate = (newDate: string) => {
    setChoosedDate(moment(newDate).format("DD.MM.YYYY"));
  };

  const getAllRestaurants = () => {
    return RESTAURANTS_MAP;
  };

  const fetchMenus = async () => {
    const allMenus: IOfferListTypes[] = [];
    for (let i = 0; i < PREVIEW_DAYS; i++) {
      const restaurantInfos = await restaurantScraper.getMenuOfRestaurant(
        restaurantName,
        moment().add(i, "days").format("YYYY-MM-DD")
      );

      if (restaurantInfos.status != 200) continue;
      allMenus.push(restaurantInfos.data.offer);
    }

    return allMenus;
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurantName,
        formattedRestaurantName,
        getAllRestaurants,
        changeRestaurant,
        changeDate,
        choosedDate,
        fetchMenus,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

const useRestaurant = () => {
  const context = useContext(RestaurantContext);

  if (context === undefined) {
    throw Error("useRestaurant must be used within RestaurantProvider");
  }
  return context;
};

export { useRestaurant, RestaurantProvider };
