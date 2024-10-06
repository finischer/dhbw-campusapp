import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeviceEventEmitter, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import Animated from "react-native-reanimated";
import { useQuery } from "react-query";
import { IFetchedRestaurantTypes } from "../../api/html_scraper/restaurant/types/IRestaurantTypes";
import ErrorView from "../../components/ErrorView";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import RegularText from "../../components/RegularText";
import SnapCarousel from "../../components/SnapCarousel";
import typography from "../../constants/typography";
import { useMetadata } from "../../hooks/useMetadata";
import { useRestaurant } from "../../hooks/useRestaurant/useRestaurant";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import AdditivesList from "./components/AdditivesList";
import MenuList from "./components/MenuList";
import { restaurantScreenStyles } from "./restaurantScreen.styles";
import { IRenderMenuListProps, IRestaurantState } from "./restaurantScreen.types";
import useAsyncStorage from "../../hooks/useAsyncStorage/useAsyncStorage";
import Alert from "../../components/Alert/Alert";
import { IAlertFunctions } from "../../components/Alert/alert.types";
import { DialogButtonProps } from "react-native-dialog/lib/Button";
import useReview from "../../hooks/useReview/useReview";

const setHeaderSubtitle = (newValue: boolean) => {
  DeviceEventEmitter.emit("handleShowSubTitle", newValue);
};

const RestaurantScreen = () => {
  const { t } = useTranslation(["restaurantScreen", "common"]);
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } = useAsyncStorage();
  const { language, dhbwLocation } = useMetadata();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { restaurantName, formattedRestaurantName, fetchRestaurant } = useRestaurant();
  const { requestStoreReview } = useReview();
  const [defaultIndex, setDefaultIndex] = useState(0);

  const alertLocalRef = useRef<IAlertFunctions | null>(null);
  const alertRef = useCallback((node: IAlertFunctions | null) => {
    checkForFirstTime(node?.openAlert);
    alertLocalRef.current = node;
  }, []);

  const alertButtons: DialogButtonProps[] = [
    {
      label: "Ok",
      onPress: () => alertLocalRef.current?.closeAlert(),
    },
  ];

  const [restaurant, setRestaurant] = useState<IRestaurantState>({
    restaurantName,
    offer: [],
    requestTime: undefined,
    additivesDict: {},
  });

  const {
    isFetching,
    isError,
    refetch: handleFechMenus,
  } = useQuery(["cafeteria-menus", restaurantName, dhbwLocation, language], fetchRestaurant, {
    onSuccess: (restaurant: IFetchedRestaurantTypes) => {
      setHeaderSubtitle(false);
      setRestaurant((oldState) => ({
        ...oldState,
        offer: restaurant.offer,
        additivesDict: restaurant.additivesDict,
        requestTime: moment(),
      }));
    },
    onError: () => {
      setHeaderSubtitle(true);
    },
  });

  useEffect(() => {
    requestStoreReview();
  }, []);

  const checkForFirstTime = async (openAlertFn: IAlertFunctions["openAlert"] | undefined) => {
    // check if screen appears for the first time
    const alreadySeenScreen = await getDataFromAsyncStorage("restaurantScreen.alreadySeen");

    if (alreadySeenScreen) return;

    storeDataInAsyncStorage("restaurantScreen.alreadySeen", true);

    if (openAlertFn) {
      openAlertFn();
    }
  };

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y >= 33) {
      setHeaderSubtitle(true);
    } else {
      setHeaderSubtitle(false);
    }
  };

  const goToChangeNavigationScreen = () => {
    navigation.navigate("ChangeRestaurantScreen");
  };

  useEffect(() => {
    const initDefaultIndex = async () => {
      const currIdx = (await getDataFromAsyncStorage("restaurant-idx")) || 0;
      setDefaultIndex(parseInt(currIdx));
    };

    initDefaultIndex();
  }, [restaurantName]);

  if (isFetching)
    return (
      <GlobalBody centered>
        <Loader
          text={t("offerLoaderText")}
          size="small"
        />
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
      <Alert
        ref={alertRef}
        title={t("hint", { ns: "common" })}
        description={t("swipeHintDescription")}
        buttons={alertButtons}
      />
      <Animated.ScrollView
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant Title View */}
        <GlobalBody style={restaurantScreenStyles.restaurantNameContainer}>
          {/* Name of Restaurant */}
          <RegularText
            weight="bold"
            size={typography.h2}
          >
            {formattedRestaurantName}
          </RegularText>
        </GlobalBody>

        {/* MenuList View */}
        <SnapCarousel
          data={restaurant.offer}
          defaultIndex={defaultIndex}
          renderItem={({ item }: IRenderMenuListProps) => (
            <MenuList
              menus={item.menus}
              date={item.date}
              requestTime={restaurant.requestTime}
            />
          )}
        />

        {/* Additive List */}
        <AdditivesList additivesDict={restaurant.additivesDict} />
      </Animated.ScrollView>
    </GlobalBody>
  );
};

export default RestaurantScreen;
