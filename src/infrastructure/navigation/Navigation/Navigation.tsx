import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DualisNavigator from "../DualisNavigator";

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dualis" component={DualisNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
