import moment from "moment";
import { createContext, useContext, useEffect, useState } from "react";
import { RestaurantScraper } from "../../api/html_scraper/restaurant/RestaurantScraperController";
import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import { RestaurantOptions } from "../../api/html_scraper/restaurant/types/RestaurantTypes";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import useAsyncStorage from "../useAsyncStorage";
import { useMetadata } from "../useMetadata";
import { IRestaurantContext, RestaurantsMapTypes } from "./useRestaurant.types";

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
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } =
    useAsyncStorage();
  const restaurantScraper = new RestaurantScraper(language);

  const [restaurantName, setRestaurantName] =
    useState<RestaurantOptions>("mensa-am-schloss");

  const [choosedDate, setChoosedDate] = useState(moment().format("DD.MM.YYYY"));

  const formattedRestaurantName = RESTAURANTS_MAP[restaurantName];

  useEffect(() => {
    const initializeRestaurant = async () => {
      const restaurant = await getDataFromAsyncStorage("cafeteria");
      if (restaurant) setRestaurantName(restaurant);
    };

    initializeRestaurant();
  }, []);

  const changeRestaurant = (newRestaurant: RestaurantOptions) => {
    setRestaurantName(newRestaurant);
    storeDataInAsyncStorage("cafeteria", newRestaurant);
  };

  const changeDate = (newDate: string) => {
    setChoosedDate(moment(newDate).format("DD.MM.YYYY"));
  };

  const getAllRestaurants = () => {
    return RESTAURANTS_MAP;
  };

  const fetchRestaurant = async () => {
    const restaurant: IFetchedRestaurantTypes = {
      restaurantName: "",
      offer: [],
      additivesDict: {}
    };
    for (let i = 0; i < PREVIEW_DAYS; i++) {
      const restaurantInfos: IResponseTypes =
        await restaurantScraper.getMenuOfRestaurant(
          restaurantName,
          moment().add(i, "days").format("YYYY-MM-DD")
        );

      if (restaurantInfos.status != 200) continue;
      restaurant.restaurantName = restaurantInfos.data.restaurantName;
      restaurant.offer.push(restaurantInfos.data.offer);
      restaurant.additivesDict = restaurantInfos.data.additivesDict;
    }

    return restaurant;
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
        fetchRestaurant,
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

