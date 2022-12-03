import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerConfig } from "../Navigation/config";
import LoginScreen from "../../../screens/LoginScreen";

const Stack = createStackNavigator();

const DualisNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default DualisNavigator;
