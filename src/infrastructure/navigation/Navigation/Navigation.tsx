import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DualisNavigator from "../DualisNavigator";
import RestaurantNavigator from "../RestaurantNavigator";
import CalendarNavigator from "../CalendarNavigator";
import MoreNavigator from "../MoreNavigator";
import { tabBarStyle } from "./navigation.styles";
import { useTranslation } from "react-i18next";

import { FeatherIconName } from "../../../services/expo-vector-icons/expo-vector-icons.types";
import { useMetadata } from "../../../hooks/useMetadata";
import { INavigationIcons } from "./navigation.types";
import Icon from "../../../components/Icon";
import { TAB_BAR_ICON_NAMES } from "./config";
import { navigationRef } from "./RootNavigation";

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { colors, isAndroid } = useMetadata();
  const { t } = useTranslation("navigation");

  const getTabBarLabel = (name: string) => {
    if (!name) return undefined;

    return t(name);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        barStyle={[tabBarStyle(colors)]}
        activeColor={colors.accent}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            const iconColor: string = focused ? colors.accent : colors.secondary;
            const iconName: FeatherIconName = TAB_BAR_ICON_NAMES[route.name as keyof INavigationIcons];

            return (
              <Icon
                source="feather"
                name={iconName}
                size={24}
                color={iconColor}
              />
            );
          },
        })}
        keyboardHidesNavigationBar={isAndroid ? true : false} // important!
      >
        <Tab.Screen
          name="dualis"
          component={DualisNavigator}
          options={{
            tabBarLabel: getTabBarLabel("dualis"),
          }}
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
