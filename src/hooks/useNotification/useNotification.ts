import { useRef } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync as _registerForPushNotificationsAsync } from "../../utilities/push-notifications";
import { navigate } from "../../infrastructure/navigation/Navigation/RootNavigation";

interface UseNotificationsReturnType {
  registerForPushNotificationsAsync: () => Promise<string | null>;
  initializeNotificationListeners: () => void;
  removeNotificationListeners: () => void;
  resetBadgeCount: () => Promise<boolean>;
}

export const useNotifications = (): UseNotificationsReturnType => {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  // Funktion zur Registrierung für Push-Benachrichtigungen
  const registerForPushNotificationsAsync = async (): Promise<string | null> => {
    return _registerForPushNotificationsAsync();
  };

  const resetBadgeCount = async () => {
    return await Notifications.setBadgeCountAsync(0);
  };

  const initializeNotificationListeners = () => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      // console.log("Benachrichtigung erhalten:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Benachrichtigungsantwort erhalten:", JSON.stringify(response, null, 2));
      const { screen, params } = response.notification.request.content.data;

      console.log("Screen: ", screen);
      console.log("Params: ", params);
      if (screen) {
        console.log("Navigate to screen: ", screen);
        navigate(screen, params);
      } else {
        console.log("Navigate to home");
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

  return {
    registerForPushNotificationsAsync,
    initializeNotificationListeners,
    resetBadgeCount,
    removeNotificationListeners,
  };
};
