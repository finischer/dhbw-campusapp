import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerConfig } from "../Navigation/config";
import CalendarScreen from "../../../screens/CalendarScreen";
import NavigationHeader from "../../../components/NavigationHeader";

const Stack = createStackNavigator();

const CalendarNavigator = () => {
  return (
    <Stack.Navigator screenOptions={headerConfig()}>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerTitle: () => <NavigationHeader title="Vorlesungen" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
