import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import NavigationHeader from "../../../components/NavigationHeader";
import ChangeLanguageScreen from "../../../screens/ChangeLanguageScreen";
import LegalNoticeScreen from "../../../screens/LegalNoticeScreen";
import LicensesScreen from "../../../screens/LicensesScreen";
import MoreScreen from "../../../screens/MoreScreen";
import SelectLocationScreen from "../../../screens/SelectLocationScreen/SelectLocationScreen";
import { headerConfig } from "../Navigation/config";

const Stack = createStackNavigator();

const MoreNavigator = () => {
  const { t } = useTranslation("");

  return (
    <Stack.Navigator screenOptions={headerConfig()}>
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("navigation:more")} />,
        }}
      />
      <Stack.Screen
        name="ChangeLanguageScreen"
        component={ChangeLanguageScreen}
        options={{
          headerTitle: () => (
            <NavigationHeader title={t("navigation:changeLanguage")} />
          ),
        }}
      />
      <Stack.Screen
        name="LegalNoticeScreen"
        component={LegalNoticeScreen}
        options={{
          headerTitle: () => (
            <NavigationHeader title={t("moreScreen:legalNotice")} />
          ),
        }}
      />

      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
        options={{
          headerTitle: () => (
            <NavigationHeader title={t("moreScreen:selectLocation")} />
          ),
        }}
      />

      <Stack.Screen
        name="LicensesScreen"
        component={LicensesScreen}
        options={{
          headerTitle: () => (
            <NavigationHeader title={t("moreScreen:licenses")} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
