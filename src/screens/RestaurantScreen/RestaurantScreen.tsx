import React, { useState } from "react";
import {
  DeviceEventEmitter,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
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
import ErrorView from "../../components/ErrorView";
import typography from "../../constants/typography";
import { SPACING } from "../../constants/layout";
import Icon from "../../components/Icon";

const setHeaderSubtitle = (newValue: boolean) => {
  DeviceEventEmitter.emit("handleShowSubTitle", newValue);
};

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

  const {
    isFetching,
    isError,
    refetch: handleFechMenus,
  } = useQuery(["cafeteria-menus", restaurantName, language], fetchMenus, {
    onSuccess: (menus: IOfferListTypes[]) => {
      setHeaderSubtitle(false);
      setRestaurant((oldState) => ({
        ...oldState,
        offer: menus,
      }));
    },
    onError: () => {
      setHeaderSubtitle(true);
    },
  });

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y >= 38) {
      setHeaderSubtitle(true);
    } else {
      setHeaderSubtitle(false);
    }
  };

  const goToChangeNavigationScreen = () => {
    navigation.navigate("ChangeRestaurantScreen");
  };

  if (isFetching)
    return (
      <GlobalBody centered>
        <Loader text={t("offerLoaderText")} size="small" />
      </GlobalBody>
    );

  if (isError) {
    return (
      <GlobalBody centered>
        <ErrorView
          centered
          onRetry={handleFechMenus}
          showSecondaryButton
          secondaryButtonText={t("navigation:changeRestaurant")}
          onClickSecondaryButton={goToChangeNavigationScreen}
        >
          {t("errorFetchMenus", {
            cafeteriaName: formattedRestaurantName,
          })}
        </ErrorView>
      </GlobalBody>
    );
  }

  return (
    <GlobalBody style={{ paddingTop: 0, paddingHorizontal: 0 }}>
      <Animated.ScrollView
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Title View */}
        <TouchableOpacity onPress={goToChangeNavigationScreen}>
          <GlobalBody style={restaurantScreenStyles.restaurantNameContainer}>
            {/* Name of Restaurant */}
            <RegularText weight="bold" size={typography.h2}>
              {formattedRestaurantName}
            </RegularText>
            {/* Edit Icon */}
            <View style={{ marginLeft: SPACING.s }}>
              <Icon source="feather" clickable={false} name="edit" size={20} />
            </View>
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
