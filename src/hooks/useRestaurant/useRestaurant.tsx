import moment from "moment";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DHBWKarlsruheRestaurantScraper } from "../../api/html_scraper/DHBWKarlsruhe/DHBWKarlsruheRestaurantScraper";
import { DHBWMannheimRestaurantScraper } from "../../api/html_scraper/DHBWMannheim/DHBWMannheimRestaurantScraper";
import { RestaurantScraper } from "../../api/html_scraper/restaurant/RestaurantScraperController";
import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import { AllRestaurantNames } from "../../api/html_scraper/restaurant/types/RestaurantTypes";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import useAsyncStorage from "../useAsyncStorage";
import { useMetadata } from "../useMetadata";
import { DHBWLocation } from "../useMetadata/useMetadata.types";
import { IRestaurantContext, RestaurantsMapTypes } from "./useRestaurant.types";

// TODO: IMPORTANT! Currently the selection between DHBW Locations and restaurants is Buggy. It must be fixed first, before going on!

const PREVIEW_DAYS = 5;

const RESTAURANTS_MAP: RestaurantsMapTypes = {
  mannheim: {
    "mensa-am-schloss": "Mensa am Schloss",
    "cafeteria-musikhochschule": "Cafeteria Musikhochschule",
    "hochschule-mannheim": "Hochschule Mannheim",
    "mensaria-metropol": "Mensaria Metropol",
    "mensaria-wohlgelegen": "Mensaria Wohlgelegen",
    mensawagon: "Mensawagon",
  },
  karlsruhe: {
    erzbergerstrasse: "Erzbergerstraße",
    "mensa-moltke": "Mensaria Moltke",
  },
};

const RestaurantContext = createContext<IRestaurantContext | undefined>(undefined);

const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, dhbwLocation } = useMetadata();
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } = useAsyncStorage();
  const [restaurantScraper, setRestaurantScraper] = useState<RestaurantScraper | null>(null);

  const DEFAULT_RESTAURANT = Object.entries(RESTAURANTS_MAP[dhbwLocation]).at(0) as [
    AllRestaurantNames,
    string
  ];

  const [restaurantName, setRestaurantName] = useState<AllRestaurantNames>(DEFAULT_RESTAURANT[0]);

  const [choosedDate, setChoosedDate] = useState(moment().format("DD.MM.YYYY"));

  // @ts-ignore
  const formattedRestaurantName = RESTAURANTS_MAP[dhbwLocation][restaurantName];

  useEffect(() => {
    const initializeRestaurant = async () => {
      const restaurant = await getDataFromAsyncStorage("cafeteria");
      if (restaurant) setRestaurantName(restaurant);
    };

    initializeRestaurant();
  }, []);

  useEffect(() => {
    switch (dhbwLocation) {
      case DHBWLocation.Mannheim:
        setRestaurantScraper(new DHBWMannheimRestaurantScraper(language));
        break;
      case DHBWLocation.Karlsruhe:
        setRestaurantScraper(new DHBWKarlsruheRestaurantScraper(language));
        break;
    }
  }, [dhbwLocation]);

  const changeRestaurant = (newRestaurant: AllRestaurantNames) => {
    setRestaurantName(newRestaurant);
    storeDataInAsyncStorage("cafeteria", newRestaurant);
  };

  const changeDate = (newDate: string) => {
    setChoosedDate(moment(newDate).format("DD.MM.YYYY"));
  };

  const getAllRestaurants = () => {
    return RESTAURANTS_MAP[dhbwLocation];
  };

  const fetchRestaurant = useCallback(async () => {
    if (!restaurantScraper) {
      return null;
    }

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
  }, [restaurantScraper]);

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

export { RestaurantProvider, useRestaurant };
