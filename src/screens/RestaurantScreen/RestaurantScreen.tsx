import React, { useEffect, useRef, useState } from "react";
import {
  DeviceEventEmitter,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import { IDayOptions } from "../../api/html_scraper/restaurant/types/IDayOptions";
import GlobalBody from "../../components/GlobalBody";
import RegularText from "../../components/RegularText";
import SnapCarousel from "../../components/SnapCarousel";
import {
  IRenderMenuListProps,
  IRestaurantState,
} from "./restaurantScreen.types";
import MenuList from "./components/MenuList";
import { useRestaurant } from "../../hooks/useRestaurant/useRestaurant";
import { IOfferListTypes } from "../../api/html_scraper/restaurant/types/IOfferListTypes";
import { useQuery } from "react-query";
import { restaurantScreenStyles } from "./restaurantScreen.styles";
import { useRoute } from "@react-navigation/native";
import Animated from "react-native-reanimated";

const RestaurantScreen = () => {
  const {
    restaurantName,
    formattedRestaurantName,
    fetchMenus,
    changeRestaurant,
    changeDate,
  } = useRestaurant();

  const [restaurant, setRestaurant] = useState<IRestaurantState>({
    restaurantName,
    offer: [],
  });
  const [dayOptions, setDayOptions] = useState<IDayOptions[]>([]);

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y >= 30) {
      DeviceEventEmitter.emit("handleShowSubTitle", true);
    } else {
      DeviceEventEmitter.emit("handleShowSubTitle", false);
    }
  };

  const { isFetching } = useQuery(
    ["cafeteria-menus", restaurantName],
    fetchMenus,
    {
      onSuccess: (menus: IOfferListTypes[]) => {
        setRestaurant((oldState) => ({
          ...oldState,
          offer: menus,
        }));
      },
    }
  );

  if (isFetching)
    return (
      <GlobalBody centered>
        <RegularText>Angebot wird geladen ...</RegularText>
      </GlobalBody>
    );

  return (
    <GlobalBody style={{ paddingTop: 0, paddingHorizontal: 0 }}>
      {/* TODO: Animate header on scroll (maybe implement it at as generic component for all screens) */}
      <Animated.ScrollView onScroll={handleOnScroll} scrollEventThrottle={16}>
        {/* Restaurant Title View */}
        <View style={restaurantScreenStyles.restaurantNameContainer}>
          <RegularText style={restaurantScreenStyles.restaurantNameText}>
            {formattedRestaurantName}
          </RegularText>
        </View>

        {/* MenuList View */}
        <SnapCarousel
          data={restaurant.offer}
          renderItem={({ item, index, scrollX }: IRenderMenuListProps) => (
            <MenuList
              menus={item.menus}
              date={item.date}
              index={index}
              scrollX={scrollX}
              lengthOfOffers={restaurant.offer.length}
            />
          )}
        />
      </Animated.ScrollView>
    </GlobalBody>
  );
};

export default RestaurantScreen;
