import React, { useEffect, useRef, useState } from "react";
import GlobalBody from "../../components/GlobalBody";
import SettingRow from "../../components/SettingRow";
import { notificationSettingsScreenStyles } from "./notificationSettingsScreen.styles";
import { NotificationServices, NotificationSettings } from "./notificationSettingsScreen.types";
import { useTranslation } from "react-i18next";

// TEST
import { View } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import RegularText from "../../components/RegularText";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync, sendPushNotification } from "../../utilities/push-notifications";
import Button from "../../components/Button/Button";
import { useNotifications } from "../../hooks/useNotification/useNotification";

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync(service: NotificationServices) {
  return BackgroundFetch.registerTaskAsync(service, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync(service: NotificationServices) {
  return BackgroundFetch.unregisterTaskAsync(service);
}

const NotificationSettingsScreen = () => {
  const { getDataFromAsyncStorage, storeDataInAsyncStorage } = useAsyncStorage();
  const { registerForPushNotificationsAsync } = useNotifications();

  const { t } = useTranslation();

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    dualis: false,
    lectures: false,
  });

  const checkStatusAsync = async (service: NotificationServices) => {
    // const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(service);
    setNotificationSettings(() => ({
      ...notificationSettings,
      [service]: isRegistered,
    }));
  };

  const toggleFetchTask = async (service: NotificationServices) => {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(service);
    if (isRegistered) {
      await unregisterBackgroundFetchAsync(service);
    } else {
      await registerBackgroundFetchAsync(service);
    }

    checkStatusAsync(service);
  };

  const initNotificationSettings = async () => {
    const storageNotificationSettings = await getDataFromAsyncStorage("notifications-settings");
    setNotificationSettings(storageNotificationSettings);
  };

  const notificationPermissionAllowed = async () => {
    const res = await Notifications.getPermissionsAsync();
    return res.granted;
  };

  const updateSetting = async (service: NotificationServices) => {
    if (!(await notificationPermissionAllowed())) {
      return;
    } else {
      const currentServiceSetting = notificationSettings[service];

      toggleFetchTask(service);
      setNotificationSettings((oldState) => ({
        ...oldState,
        [service]: !currentServiceSetting,
      }));

      const newNotificationSettings = {
        ...notificationSettings,
        [service]: !currentServiceSetting,
      };

      storeDataInAsyncStorage("notifications-settings", newNotificationSettings);
    }
  };

  useEffect(() => {
    initNotificationSettings();
    registerForPushNotificationsAsync();
    checkStatusAsync(NotificationServices.Lectures);
  }, []);

  return (
    <GlobalBody style={notificationSettingsScreenStyles.wrapper}>
      <SettingRow
        disabled
        title={t("navigation:dualis")}
        subtitle={t("notificationSettings:dualisDescription")}
        onChangeSwitch={null}
        switchValue={notificationSettings.dualis}
      />
      <SettingRow
        title={t("navigation:lectures")}
        subtitle={t("notificationSettings:lecturesDescription")}
        onChangeSwitch={() => updateSetting(NotificationServices.Lectures)}
        switchValue={notificationSettings.lectures}
      />
      <View>
        <RegularText>
          Background fetch task name:{" "}
          <RegularText>
            {notificationSettings.lectures ? NotificationServices.Lectures : "Not registered yet!"}
          </RegularText>
        </RegularText>

        <Button
          variant="contained"
          onClick={async () =>
            await sendPushNotification(
              "Kalenderaktualisierung",
              "Es gab Änderungen in deinen Kalenderereignissen."
            )
          }
        >
          Send message
        </Button>
      </View>
    </GlobalBody>
  );
};

export default NotificationSettingsScreen;
