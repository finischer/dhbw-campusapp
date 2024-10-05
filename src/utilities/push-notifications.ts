import { SecureStoreEntries } from "./../hooks/useSecureStorage/useSecureStorage.types";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { isAndroid } from "../constants/device/device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Registriert das Gerät für Push-Benachrichtigungen und gibt das Expo Push Token zurück.
 * @returns Das Expo Push Token oder null, wenn die Registrierung fehlschlägt.
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  if (true) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Berechtigungen anfordern, falls nicht bereits erteilt
    if (existingStatus !== "granted") {
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

    // Überprüfe den endgültigen Berechtigungsstatus
    if (finalStatus !== "granted") {
      console.log("Fehler: Push-Benachrichtigungen sind nicht erlaubt.");
      return null;
    }

    // Erhalte das Expo Push Token
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token erhalten:", token);
    SecureStore.setItem("expo-push-token" as SecureStoreEntries, token);
  } else {
  }

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
 * Sendet eine Push-Benachrichtigung mit den angegebenen Inhalten.
 * @param title Der Titel der Benachrichtigung.
 * @param body Der Hauptinhalt der Benachrichtigung.
 * @param data Optionale zusätzliche Daten, die mit der Benachrichtigung gesendet werden.
 */
export async function sendPushNotification(title: string, body: string, data?: object): Promise<void> {
  const currBadgeCount = await Notifications.getBadgeCountAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: "default",
      badge: currBadgeCount + 1,
    },
    trigger: null, // Sofort senden
  });
}
