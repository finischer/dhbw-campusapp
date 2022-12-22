import React, { useState } from "react";
import {
  DeviceEventEmitter,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import Loader from "../../components/Loader/Loader";
import { useTranslation } from "react-i18next";
import RequestTime from "../../components/RequestTime";
import AdditivesList from "./components/AdditivesList";
import { useMetadata } from "../../hooks/useMetadata";
import TouchableOpacity from "../../components/TouchableOpacity";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import FeatherIcon from "../../components/FeatherIcon";

const RestaurantScreen = () => {
  const { t } = useTranslation("restaurantScreen");
  const { language } = useMetadata();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { restaurantName, formattedRestaurantName, fetchMenus } =
    useRestaurant();

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
      <Animated.ScrollView
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Title View */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ChangeRestaurantScreen")}
        >
          <GlobalBody style={restaurantScreenStyles.restaurantNameContainer}>
            {/* Name of Restaurant */}
            <RegularText style={restaurantScreenStyles.restaurantNameText}>
              {formattedRestaurantName}
            </RegularText>
            {/* Edit Icon */}
            <RegularText style={{ marginLeft: 5 }}>
              <FeatherIcon clickable={false} name="edit" size={20} />
            </RegularText>
          </GlobalBody>
        </TouchableOpacity>

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
