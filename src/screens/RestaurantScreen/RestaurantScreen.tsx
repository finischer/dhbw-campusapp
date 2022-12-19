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
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import RequestTime from "../../components/RequestTime";
import AdditivesList from "./components/AdditivesList";
import { useMetadata } from "../../hooks/useMetadata";

const RestaurantScreen = () => {
  const { t } = useTranslation("restaurantScreen");
  const { language } = useMetadata();
  const {
    restaurantName,
    formattedRestaurantName,
    fetchMenus,
    changeRestaurant,
  } = useRestaurant();

  const [restaurant, setRestaurant] = useState<IRestaurantState>({
    restaurantName,
    offer: [],
  });

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y >= 30) {
      DeviceEventEmitter.emit("handleShowSubTitle", true);
    } else {
      DeviceEventEmitter.emit("handleShowSubTitle", false);
    }
  };

  const { isFetching } = useQuery(
    ["cafeteria-menus", restaurantName, language],
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
        <Loader text={t("offerLoaderText")} size="small" />
      </GlobalBody>
    );

  return (
    <GlobalBody style={{ paddingTop: 0, paddingHorizontal: 0 }}>
      <Animated.ScrollView onScroll={handleOnScroll} scrollEventThrottle={16}>
        {/* Restaurant Title View */}
        <GlobalBody style={restaurantScreenStyles.restaurantNameContainer}>
          <RegularText style={restaurantScreenStyles.restaurantNameText}>
            {formattedRestaurantName}
          </RegularText>
        </GlobalBody>

        {/* MenuList View */}
        <SnapCarousel
          data={restaurant.offer}
          renderItem={({ item }: IRenderMenuListProps) => (
            <MenuList menus={item.menus} date={item.date} />
          )}
        />

        {/* Request Time */}
        <RequestTime />

        {/* Additive List */}
        <AdditivesList />
      </Animated.ScrollView>
    </GlobalBody>
  );
};

export default RestaurantScreen;
