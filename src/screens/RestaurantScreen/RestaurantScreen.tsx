import React, { useEffect, useState } from "react";
import { FlatList, View, ScrollView } from "react-native";
import { RestaurantScraper } from "../../api/html_scraper/restaurant/RestaurantScraperController";
import { IDayOptions } from "../../api/html_scraper/restaurant/types/IDayOptions";
import { IMenuType } from "../../api/html_scraper/restaurant/types/IMenuType";
import { IRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import {
  IObjectResponse,
  IResponseTypes,
} from "../../api/types/IResponseTypes";
import GlobalBody from "../../components/GlobalBody";
import RegularText from "../../components/RegularText";
import SnapCarousel from "../../components/SnapCarousel";
import MenuItem from "./components/MenuItem";
import { restaurantScreenStyles } from "./restaurantScreen.styles";
import moment from "moment";
import { IRestaurantState } from "./restaurantScreen.types";
import MenuList from "./components/MenuList";

const PREVIEW_DAYS = 3;

const RestaurantScreen = () => {
  const restaurantScraper = new RestaurantScraper();
  const [dayOptions, setDayOptions] = useState<IDayOptions[]>([]);
  const [restaurant, setRestaurant] = useState<IRestaurantState>({
    restaurantName: "",
    offer: [],
  });

  useEffect(() => {
    const fetchMenus = async () => {
      const allMenus = [];
      for (let i = 0; i < PREVIEW_DAYS; i++) {
        const restaurantInfos = restaurantScraper.getMenuOfRestaurant(
          "mensa-am-schloss",
          moment().subtract(1, "days").add(i, "days").format("YYYY-MM-DD")
        );

        // if (restaurantInfos.status != 200) return;
        allMenus.push(restaurantInfos);
      }

      Promise.all(allMenus).then((resolvedPromise: IResponseTypes[]) => {
        resolvedPromise.forEach((response: IResponseTypes) => {
          if (response.status != 200) return;
          const restaurant: IRestaurantTypes =
            response.data as IRestaurantTypes;
          setRestaurant((oldState) => ({
            restaurantName: restaurant.restaurantName,
            offer: [...oldState.offer, restaurant.offer],
          }));
        });
      });
    };

    fetchMenus();
  }, []);

  if (!restaurant) return <RegularText>Angebot wird geladen ...</RegularText>;

  return (
    <GlobalBody style={{ paddingTop: 0, paddingHorizontal: 0 }}>
      {/* TODO: Animate header on scroll (maybe implement it at as generic component for all screens) */}
      <ScrollView>
        {/* Header View */}
        <View style={restaurantScreenStyles.restaurantNameContainer}>
          <RegularText style={restaurantScreenStyles.restaurantNameText}>
            {restaurant.restaurantName}
          </RegularText>
        </View>

        {/* DayOptions Dropdown View */}
        {/* <View>
          {dayOptions.map((option: IDayOptions, index: number) => (
            <RegularText key={index}>
            {option.date} ({option.weekDay})
            </RegularText>
          ))}
        </View> */}

        {/* MenuList View */}
        <SnapCarousel
          data={restaurant.offer}
          renderItem={({ item }: { item: IMenuType[] }) => (
            <MenuList menus={item} />
          )}
        />
      </ScrollView>
    </GlobalBody>
  );
};

export default RestaurantScreen;
