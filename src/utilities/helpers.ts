import { Platform, Linking } from "react-native";
import Constants from "expo-constants";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const openNotificationSettings = () => {
  if (Platform.OS === "ios") {
    // const bundleId = Constants?.expoConfig?.ios?.bundleIdentifier ?? "";
    // console.log("Bundle ID: ", bundleId);
    return Linking.openSettings();
  }

  const packageName = Constants?.expoConfig?.android?.package ?? "";
  return Linking.sendIntent("android.settings.APP_NOTIFICATION_SETTINGS", [
    {
      key: "android.provider.extra.APP_PACKAGE",
      value: packageName,
    },
  ]);
};
