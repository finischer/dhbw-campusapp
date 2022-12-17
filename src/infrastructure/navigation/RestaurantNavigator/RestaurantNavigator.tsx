import React, { useEffect, useState } from "react";
import { DeviceEventEmitter } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantScreen from "../../../screens/RestaurantScreen";
import { headerConfig } from "../Navigation/config";
import { useRestaurant } from "../../../hooks/useRestaurant/useRestaurant";
import NavigationHeader from "../../../components/NavigationHeader";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

const RestaurantNavigator = () => {
  const { t } = useTranslation("navigation");
  const [showSubTitle, setShowSubTitle] = useState(false);
  const { formattedRestaurantName } = useRestaurant();

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
    <Stack.Navigator screenOptions={headerConfig()}>
      <Stack.Screen
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
    </Stack.Navigator>
  );
};

export default RestaurantNavigator;
