import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerConfig } from "../Navigation/config";
import MoreScreen from "../../../screens/MoreScreen";
import NavigationHeader from "../../../components/NavigationHeader";

const Stack = createStackNavigator();

const MoreNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerConfig()}>
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{ headerTitle: () => <NavigationHeader title="Mehr" /> }}
      />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
