import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantScreen from "../../../screens/RestaurantScreen";
import { headerConfig } from "../Navigation/config";
import { useRestaurant } from "../../../hooks/useRestaurant/useRestaurant";
import NavigationHeader from "../../../components/NavigationHeader";

const Stack = createStackNavigator();

const RestaurantNavigator = () => {
  const { formattedRestaurantName } = useRestaurant();

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
