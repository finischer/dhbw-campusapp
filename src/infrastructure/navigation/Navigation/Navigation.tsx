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

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { t } = useTranslation("navigation");

  return (
    <NavigationContainer>
      <Tab.Navigator barStyle={tabBarStyle}>
        <Tab.Screen
          name={t("dualis")}
          component={DualisNavigator}
          options={{
            tabBarIcon: () => <Feather name="home" size={24} color="red" />,
          }}
        />
        <Tab.Screen
          name={t("cafeteria")}
          component={RestaurantNavigator}
          options={{
            tabBarIcon: () => <Feather name="coffee" size={24} color="red" />,
          }}
        />
        <Tab.Screen
          name={t("lectures")}
          component={CalendarNavigator}
          options={{
            tabBarIcon: () => <Feather name="calendar" size={24} color="red" />,
          }}
        />
        <Tab.Screen
          name={t("more")}
          component={MoreNavigator}
          options={{
            tabBarIcon: () => (
              <Feather name="more-horizontal" size={24} color="red" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
