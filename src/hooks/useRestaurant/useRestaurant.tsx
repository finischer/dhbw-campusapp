import moment from "moment";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DHBWKarlsruheRestaurantScraper } from "../../api/html_scraper/DHBWKarlsruhe/DHBWKarlsruheRestaurantScraper";
import { DHBWMannheimRestaurantScraper } from "../../api/html_scraper/DHBWMannheim/DHBWMannheimRestaurantScraper";
import { RestaurantScraper } from "../../api/html_scraper/restaurant/RestaurantScraperController";
import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import { AllRestaurantsOptions } from "../../api/html_scraper/restaurant/types/RestaurantTypes";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import useAsyncStorage from "../useAsyncStorage";
import { useMetadata } from "../useMetadata";
import { IRestaurantContext, RestaurantsMapTypes } from "./useRestaurant.types";
import { RESTAURANTS_MAP } from "../../api/html_scraper/restaurant/constants";

const PREVIEW_DAYS = 5;

const RestaurantContext = createContext<IRestaurantContext | undefined>(undefined);

const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, dhbwLocation } = useMetadata();
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } = useAsyncStorage();
  const [restaurantScraper, setRestaurantScraper] = useState<RestaurantScraper>(
    new DHBWMannheimRestaurantScraper(language)
  );

  const [restaurantName, setRestaurantName] = useState<AllRestaurantsOptions>("mensa-am-schloss");

  const [choosedDate, setChoosedDate] = useState(moment().format("DD.MM.YYYY"));

  const formattedRestaurantName = RESTAURANTS_MAP[restaurantName];

  useEffect(() => {
    const initializeRestaurant = async () => {
      const restaurant = await getDataFromAsyncStorage("cafeteria");
      if (restaurant) setRestaurantName(restaurant);
    };

    initializeRestaurant();
  }, []);

  useEffect(() => {
    switch (dhbwLocation) {
      case "mannheim":
        setRestaurantScraper(new DHBWMannheimRestaurantScraper(language));
        break;
      case "karlsruhe":
        setRestaurantScraper(new DHBWKarlsruheRestaurantScraper(language));
        break;
    }
  }, [dhbwLocation]);

  const changeRestaurant = (newRestaurant: AllRestaurantsOptions) => {
    setRestaurantName(newRestaurant);
    storeDataInAsyncStorage("cafeteria", newRestaurant);
  };

  const changeDate = (newDate: string) => {
    setChoosedDate(moment(newDate).format("DD.MM.YYYY"));
  };

  const getAllRestaurants = () => {
    return RESTAURANTS_MAP;
  };

  const fetchRestaurant = useCallback(async () => {
    const restaurant: IFetchedRestaurantTypes = {
      restaurantName: "",
      offer: [],
      additivesDict: {},
    };
    for (let i = 0; i < PREVIEW_DAYS; i++) {
      const restaurantInfos: IResponseTypes = await restaurantScraper.getMenuOfRestaurant(
        restaurantName,
        moment().add(i, "days").format("YYYY-MM-DD")
      );

      if (restaurantInfos.status != 200) continue;
      restaurant.restaurantName = restaurantInfos.data.restaurantName;
      restaurant.offer.push(restaurantInfos.data.offer);
      restaurant.additivesDict = restaurantInfos.data.additivesDict;
    }

    return restaurant;
  }, [restaurantScraper, restaurantName]);

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
