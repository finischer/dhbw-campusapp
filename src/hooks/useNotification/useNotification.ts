import { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync as _registerForPushNotificationsAsync } from "../../utilities/push-notifications";
import { navigate, navigateToNestedScreen } from "../../infrastructure/navigation/Navigation/RootNavigation";

interface UseNotificationsReturnType {
  registerForPushNotificationsAsync: () => Promise<string | null>;
  initializeNotificationListeners: () => void;
  removeNotificationListeners: () => void;
  resetBadgeCount: () => Promise<boolean>;
  permissions: Notifications.NotificationPermissionsStatus | null;
}

export const useNotifications = (): UseNotificationsReturnType => {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const [permissions, setPermissions] = useState<Notifications.NotificationPermissionsStatus | null>(null);

  // Funktion zur Registrierung für Push-Benachrichtigungen
  const registerForPushNotificationsAsync = async (): Promise<string | null> => {
    return _registerForPushNotificationsAsync();
  };

  const resetBadgeCount = async () => {
    return await Notifications.setBadgeCountAsync(0);
  };

  const initializeNotificationListeners = () => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      resetBadgeCount();

      const { screen, params } = response.notification.request.content.data;

      if (screen) {
        navigateToNestedScreen(screen, params);
      } else {
        navigate("dualis");
      }
    });
  };

  const removeNotificationListeners = () => {
    if (notificationListener.current) {
      Notifications.removeNotificationSubscription(notificationListener.current);
    }
    if (responseListener.current) {
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  };

  useEffect(() => {
    const initPermissions = async () => {
      setPermissions(await Notifications.getPermissionsAsync());
    };

    initPermissions();
  }, []);

  return {
    registerForPushNotificationsAsync,
    initializeNotificationListeners,
    resetBadgeCount,
    removeNotificationListeners,
    permissions,
  };
};
