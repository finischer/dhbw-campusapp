import * as Notifications from "expo-notifications";
import { isAndroid } from "../constants/device/device";
import { RootStackParamList } from "../infrastructure/navigation/Navigation/navigation.types";

type ScreenParams = {
  [K in keyof RootStackParamList]: { screen: string; params?: RootStackParamList[K] }; // `params` kann `undefined` oder ein Objekt sein
};

type PushNotificationData = ScreenParams[keyof ScreenParams];

export type NotificationMessage = {
  title: string | null;
  subtitle?: string | null;
  body: string | null;
  data?: PushNotificationData;
  sound?: "default" | "defaultCritical" | "custom";
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Register for push notifications.
 * @returns The push notification token or `null` if the user denied the permission.
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    console.log("Requesting permissions");
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Fehler: Push-Benachrichtigungen sind nicht erlaubt.");
    return null;
  }

  // receive expo push token
  // token = (await Notifications.getExpoPushTokenAsync()).data;
  // console.log("Expo Push Token erhalten:", token);
  // SecureStore.setItem("expo-push-token" as SecureStoreEntries, token);

  if (isAndroid) {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

/**
 * Send a push notification
 * @param title The title of the notification.
 * @param body The body of the notification.
 * @param data The data to send with the notification.
 */
export async function sendPushNotification(message: NotificationMessage): Promise<void> {
  const { title, body, data, sound, subtitle } = message;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      subtitle,
      body,
      data,
      sound,
    },
    trigger: null, // send immediately
  });
}
