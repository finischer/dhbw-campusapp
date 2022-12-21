import React, { useEffect, useState } from "react";
import { DeviceEventEmitter, Modal as RNModal, View } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import RestaurantScreen from "../../../screens/RestaurantScreen";
import { headerConfig } from "../Navigation/config";
import { useRestaurant } from "../../../hooks/useRestaurant/useRestaurant";
import NavigationHeader from "../../../components/NavigationHeader";
import { useTranslation } from "react-i18next";
import Modal from "../../../components/Modal";
import RegularText from "../../../components/RegularText";
import ChangeRestaurantScreen from "../../../screens/ChangeRestaurantScreen/ChangeRestaurantScreen";
import { useMetadata } from "../../../hooks/useMetadata";

const RestaurantStack = createStackNavigator();

const RestaurantNavigator = () => {
  const { t } = useTranslation("navigation");
  const { colors } = useMetadata();
  const { formattedRestaurantName } = useRestaurant();
  const [showSubTitle, setShowSubTitle] = useState(false);

  useEffect(() => {
    const handleShowSubTitle = (newState: boolean) => {
      setShowSubTitle(newState);
    };

    DeviceEventEmitter.addListener("handleShowSubTitle", handleShowSubTitle);

    return () => {
      DeviceEventEmitter.removeAllListeners("handleShowSubTitle");
    };
  }, []);

  return (
    <RestaurantStack.Navigator screenOptions={headerConfig()}>
      <RestaurantStack.Group>
        <RestaurantStack.Screen
          name="RestaurantScreen"
          component={RestaurantScreen}
          options={{
            headerTitle: () => (
              <NavigationHeader
                title={t("cafeteria")}
                subTitle={formattedRestaurantName}
                showSubTitle={showSubTitle}
              />
            ),
          }}
        />
      </RestaurantStack.Group>
      <RestaurantStack.Group
        screenOptions={{
          presentation: "modal",
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
          headerShown: false,
          gestureEnabled: true,
          cardStyle: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <RestaurantStack.Screen
          name="ChangeRestaurantScreen"
          component={ChangeRestaurantScreen}
        />
      </RestaurantStack.Group>
    </RestaurantStack.Navigator>
  );
};

export default RestaurantNavigator;
