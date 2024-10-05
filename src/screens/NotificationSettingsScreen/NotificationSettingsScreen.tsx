import React, { useEffect, useRef, useState } from "react";
import GlobalBody from "../../components/GlobalBody";
import SettingRow from "../../components/SettingRow";
import { notificationSettingsScreenStyles } from "./notificationSettingsScreen.styles";
import { NotificationServices, NotificationSettings } from "./notificationSettingsScreen.types";
import { useTranslation } from "react-i18next";

// TEST
import * as TaskManager from "expo-task-manager";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../../hooks/useNotification/useNotification";
import {
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from "../../utilities/background-fetch";
import Button from "../../components/Button/Button";
import { sendPushNotification } from "../../utilities/push-notifications";

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

      {/* <Button
        variant="contained"
        onClick={async () => {
          await sendPushNotification(
            "Kalenderaktualisierung",
            "Es gab Änderungen in deinen Kalenderereignissen.",
            { screen: "calendar" }
          );
        }}
      >
        Send message
      </Button> */}
    </GlobalBody>
  );
};

export default NotificationSettingsScreen;
