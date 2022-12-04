import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DualisNavigator from "../DualisNavigator";
import RestaurantNavigator from "../RestaurantNavigator";
import CalendarNavigator from "../CalendarNavigator";
import MoreNavigator from "../MoreNavigator";
import { tabBarStyle } from "./navigation.styles";
import { Feather } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TAB_BAR_ICON_NAMES } from "./config";
import { NavigationIcons } from "./navigation.types";
import { FeatherIconName } from "../../../services/expo-vector-icons/expo-vector-icons.types";

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { t } = useTranslation("navigation");

  const getTabBarLabel = (name: string) => {
    if (!name) return undefined;

    return t(name);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={tabBarStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const iconColor: string = focused ? "red" : "black";
            const iconName: FeatherIconName =
              TAB_BAR_ICON_NAMES[route.name as keyof NavigationIcons];

            return <Feather name={iconName} size={24} color={iconColor} />;
          },
        })}
      >
        <Tab.Screen
          name="dualis"
          component={DualisNavigator}
          options={{ tabBarLabel: getTabBarLabel("dualis") }}
        />
        <Tab.Screen
          name="cafeteria"
          component={RestaurantNavigator}
          options={{ tabBarLabel: getTabBarLabel("cafeteria") }}
        />
        <Tab.Screen
          name="calendar"
          component={CalendarNavigator}
          options={{ tabBarLabel: getTabBarLabel("lectures") }}
        />
        <Tab.Screen
          name="more"
          component={MoreNavigator}
          options={{ tabBarLabel: getTabBarLabel("more") }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
