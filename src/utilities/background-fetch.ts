import * as BackgroundFetch from "expo-background-fetch";
import { NotificationServices } from "../screens/NotificationSettingsScreen/notificationSettingsScreen.types";

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync(service: NotificationServices) {
  return BackgroundFetch.registerTaskAsync(service, {
    minimumInterval: 15 * 60, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only,
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync(service: NotificationServices) {
  return BackgroundFetch.unregisterTaskAsync(service);
}

export { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync };
