import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { headerConfig } from "../Navigation/config";
import CalendarScreen from "../../../screens/CalendarScreen";
import NavigationHeader from "../../../components/NavigationHeader";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

const CalendarNavigator = () => {
  const { t } = useTranslation("navigation");

  return (
    <Stack.Navigator screenOptions={headerConfig()}>
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("lectures")} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
