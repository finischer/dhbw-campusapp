import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import RestaurantScreen from "../../../screens/RestaurantScreen";
import { headerConfig } from "../Navigation/config";
import { useRestaurant } from "../../../hooks/useRestaurant/useRestaurant";
import RegularText from "../../../components/RegularText";
import typography from "../../../constants/typography";
import NavigationHeader from "../../../components/NavigationHeader";

const Stack = createStackNavigator();

const RestaurantNavigator = () => {
  const { formattedRestaurantName, choosedDate } = useRestaurant();

  return (
    <Stack.Navigator screenOptions={headerConfig()}>
      <Stack.Screen
        name="RestaurantScreen"
        component={RestaurantScreen}
        options={{
          headerTitle: () => (
            <NavigationHeader title={formattedRestaurantName} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default RestaurantNavigator;
