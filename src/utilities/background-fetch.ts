import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { NotificationServices } from "../screens/NotificationSettingsScreen/notificationSettingsScreen.types";

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync(service: NotificationServices) {
  const status = await BackgroundFetch.getStatusAsync();

  if (status === BackgroundFetch.BackgroundFetchStatus.Denied) return;

  console.log("Registering background fetch task: ", service);
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
  const isRegistered = await TaskManager.isTaskRegisteredAsync(service);

  if (!isRegistered) return;
  console.log("Unregister background fetch task: ", service);
  return BackgroundFetch.unregisterTaskAsync(service);
}

export { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync };
