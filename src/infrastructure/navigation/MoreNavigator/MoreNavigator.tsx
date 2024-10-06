import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTranslation } from "react-i18next";
import NavigationHeader from "../../../components/NavigationHeader";
import ChangeLanguageScreen from "../../../screens/ChangeLanguageScreen";
import LegalNoticeScreen from "../../../screens/LegalNoticeScreen";
import LicensesScreen from "../../../screens/LicensesScreen";
import MoreScreen from "../../../screens/MoreScreen";
import NotificationSettingsScreen from "../../../screens/NotificationSettingsScreen";
import SelectLocationScreen from "../../../screens/SelectLocationScreen";
import CampusplanScreen from "../../../screens/CampusplanScreen";
import { useHeaderConfig } from "../../../hooks/useHeaderConfig";

const Stack = createStackNavigator();

const MoreNavigator = () => {
  const headerConfig = useHeaderConfig();
  const { t } = useTranslation("");

  return (
    <Stack.Navigator screenOptions={headerConfig}>
      <Stack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("navigation:more")} />,
        }}
      />
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("moreScreen:notifications")} />,
        }}
      />
      <Stack.Screen
        name="ChangeLanguageScreen"
        component={ChangeLanguageScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("navigation:changeLanguage")} />,
        }}
      />
      <Stack.Screen
        name="LegalNoticeScreen"
        component={LegalNoticeScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("moreScreen:legalNotice")} />,
        }}
      />

      <Stack.Screen
        name="SelectLocationScreen"
        component={SelectLocationScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("moreScreen:selectLocation")} />,
        }}
      />

      <Stack.Screen
        name="LicensesScreen"
        component={LicensesScreen}
        options={{
          headerTitle: () => <NavigationHeader title={t("moreScreen:licenses")} />,
        }}
      />

      <Stack.Screen
        name="CampusplanScreen"
        component={CampusplanScreen}
        options={{
          headerTitle: () => (
            <NavigationHeader
              title={t("moreScreen:campusplan")}
              subTitle="Coblitzallee"
              showSubTitle
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
