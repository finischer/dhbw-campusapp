import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantScreen from "../../../screens/RestaurantScreen";
import { headerConfig } from "../Navigation/config";

const Stack = createStackNavigator();

const RestaurantNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerConfig()}>
      <Stack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{ headerTitle: "Mensa" }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantNavigator;
