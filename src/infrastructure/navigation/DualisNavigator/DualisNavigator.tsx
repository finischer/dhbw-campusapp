import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerConfig } from "../Navigation/config";
import LoginScreen from "../../../screens/LoginScreen";
import DualisScreen from "../../../screens/DualisScreen";

const Stack = createStackNavigator();

const DualisNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        // options={{ headerTitle: "Anmelden" }}
      />
      <Stack.Screen
        name="DualisScreen"
        component={DualisScreen}
        // options={{ headerTitle: "Dualis" }}
      />
    </Stack.Navigator>
  );
};

export default DualisNavigator;
