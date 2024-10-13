import React, { useEffect, useRef, useState } from "react";
import GlobalBody from "../../components/GlobalBody";
import SettingRow from "../../components/SettingRow";
import { notificationSettingsScreenStyles } from "./notificationSettingsScreen.styles";
import { NotificationServices, NotificationSettings } from "./notificationSettingsScreen.types";
import { useTranslation } from "react-i18next";

import * as TaskManager from "expo-task-manager";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import * as Notifications from "expo-notifications";
import { useNotifications } from "../../hooks/useNotification/useNotification";
import {
  registerBackgroundFetchAsync,
  unregisterBackgroundFetchAsync,
} from "../../utilities/background-fetch";
import AlertView from "../../components/AlertView";
import Alert from "../../components/Alert";
import { IAlertFunctions } from "../../components/Alert/alert.types";
import { openNotificationSettings } from "../../utilities/helpers";
import { useNavigation } from "@react-navigation/native";
import { AppState, AppStateStatus } from "react-native";

const NotificationSettingsScreen = () => {
  const { getDataFromAsyncStorage, storeDataInAsyncStorage } = useAsyncStorage();
  const { registerForPushNotificationsAsync, permissions } = useNotifications();
  const alertRef = useRef<IAlertFunctions | null>(null);
  const navigate = useNavigation();
  const { t } = useTranslation();

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    dualis: false,
    lectures: false,
  });

  const checkStatusAsync = async (service: NotificationServices) => {
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

  const turnAllSettingsOff = async () => {
    // unregister all background tasks
    for (const service in notificationSettings) {
      await unregisterBackgroundFetchAsync(service as NotificationServices);
      checkStatusAsync(service as NotificationServices);
    }
  };

  const initNotificationSettings = async () => {
    const storageNotificationSettings = await getDataFromAsyncStorage("notifications-settings");
    setNotificationSettings(storageNotificationSettings);
  };

  const getPermissions = async () => {
    return await Notifications.getPermissionsAsync();
  };

  const updateSetting = async (service: NotificationServices) => {
    if (!(await getPermissions()).granted) {
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

  const openAlertDialog = () => {
    turnAllSettingsOff();
    alertRef.current?.openAlert();
  };

  const initializeNotificationSettings = () => {
    initNotificationSettings();
    registerForPushNotificationsAsync();
    checkStatusAsync(NotificationServices.Lectures);
    // TODO: Fix bug where Taskmanager.isTaskRegisteredAsync() seems not to work with two different services
    // checkStatusAsync(NotificationServices.Dualis);
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    const permissions = await getPermissions();

    if (nextAppState === "active" && !permissions.granted) {
      openAlertDialog();
    }
  };

  useEffect(() => {
    // open dialog if permissions are not granted and user returns back to the app
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    const checkDialogAction = async () => {
      const permissions = await getPermissions();

      if (!permissions.granted && !permissions.canAskAgain) {
        openAlertDialog();
      } else {
        initializeNotificationSettings();
      }
    };

    checkDialogAction();

    return () => {
      subscription.remove();
    };
  }, [permissions]);

  return (
    <GlobalBody style={notificationSettingsScreenStyles.wrapper}>
      <Alert
        ref={alertRef}
        title={t("notificationSettings:alertTitle")}
        description={t("notificationSettings:alertDescription")}
        pressBackdropToClose={false}
        buttons={[
          {
            label: t("common:cancel"),
            onPress: () => {
              alertRef.current?.closeAlert();
              navigate.goBack();
            },
          },
          // open app settings
          {
            label: t("common:openSettings"),
            onPress: () => {
              openNotificationSettings();
              // navigate.goBack();
              alertRef.current?.closeAlert();
            },
          },
        ]}
      />

      <AlertView>{t("notificationSettings:betaInfoHint")}</AlertView>

      {/* <SettingRow
        disabled
        title={t("navigation:dualis")}
        subtitle={t("notificationSettings:dualisDescription")}
        onChangeSwitch={() => updateSetting(NotificationServices.Dualis)}
        switchValue={notificationSettings.dualis}
      /> */}

      <SettingRow
        title={t("navigation:lectures")}
        subtitle={t("notificationSettings:lecturesDescription")}
        onChangeSwitch={() => updateSetting(NotificationServices.Lectures)}
        switchValue={notificationSettings.lectures}
      />
    </GlobalBody>
  );
};

export default NotificationSettingsScreen;
