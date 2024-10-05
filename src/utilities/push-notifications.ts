import { SecureStoreEntries } from "./../hooks/useSecureStorage/useSecureStorage.types";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { isAndroid } from "../constants/device/device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/**
 * Registriert das Gerät für Push-Benachrichtigungen und gibt das Expo Push Token zurück.
 * @returns Das Expo Push Token oder null, wenn die Registrierung fehlschlägt.
 */
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  let token: string | null = null;

  if (!Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Berechtigungen anfordern, falls nicht bereits erteilt
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
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
    console.log("Push-Benachrichtigungen funktionieren nur auf physischen Geräten.");
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
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: null, // Sofort senden
  });
}
