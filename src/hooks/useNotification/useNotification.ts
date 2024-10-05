import { useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync as _registerForPushNotificationsAsync } from "../../utilities/push-notifications";
import { navigate } from "../../infrastructure/navigation/Navigation/RootNavigation";

type NotificationResponse = Notifications.NotificationResponse;

interface UseNotificationsReturnType {
  registerForPushNotificationsAsync: () => Promise<string | null>;
  initializeNotificationListeners: () => void;
  removeNotificationListeners: () => void;
  resetBadgeCount: () => Promise<boolean>;
  lastNotificationResponse: NotificationResponse | null;
}

export const useNotifications = (): UseNotificationsReturnType => {
  const [lastNotificationResponse, setLastNotificationResponse] = useState<NotificationResponse | null>(null);
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
      console.log("Benachrichtigung erhalten:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Benachrichtigungsantwort erhalten:", JSON.stringify(response, null, 2));
      const screen = response.notification.request.content.data.screen;

      console.log("Screen: ", screen);
      if (screen) {
        console.log("Navigate to screen: ", screen);
        navigate(screen);
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
    lastNotificationResponse,
    resetBadgeCount,
    removeNotificationListeners,
  };
};
