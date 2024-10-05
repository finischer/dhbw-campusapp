import { LecturesController } from "./../api/lectures/lecturesController";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { NotificationServices } from "../screens/NotificationSettingsScreen/notificationSettingsScreen.types";
import { LectureType, OrganizedLectures } from "../api/lectures/lectures.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { diffNestedLists } from "./diffLists";
import { sendPushNotification } from "./push-notifications";
import { AsyncStorageEntries } from "../hooks/useAsyncStorage/useAsyncStorage.types";

// Lectures
TaskManager.defineTask(NotificationServices.Lectures, async () => {
  console.log("Call taks");

  const courseString = await AsyncStorage.getItem("course");
  const icalUrl = (await AsyncStorage.getItem("icalUrl")) || undefined;

  const course = courseString ? JSON.parse(courseString) : undefined;
  const lecturesController = new LecturesController(icalUrl, course?.courseId);

  const res = await lecturesController.getScheduleFromWeb();

  if (res.status !== 200) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
  const scheduleLocalString = await AsyncStorage.getItem("lectures" as AsyncStorageEntries);
  const scheduleLocal = scheduleLocalString ? (JSON.parse(scheduleLocalString) as OrganizedLectures[]) : null;
  const scheduleRemote = res.data as OrganizedLectures[];

  if (!scheduleLocal) return BackgroundFetch.BackgroundFetchResult.NoData;

  const seriesIdAccessor = (item: OrganizedLectures) => item.title;
  const lectureIdAccessor = (item: LectureType) => item.uid;

  // Unterschiede ermitteln
  const { added, updated, removed } = diffNestedLists(
    scheduleLocal,
    scheduleRemote,
    seriesIdAccessor,
    "data",
    lectureIdAccessor
  );

  console.log({ added, updated, removed });

  // const badgeCountKey: AsyncStorageEntries = "lecture-badge-count";
  // const lectureBadgeCount = (await AsyncStorage.getItem(badgeCountKey)) ?? "0";
  // await AsyncStorage.setItem(badgeCountKey, JSON.stringify(parseInt(lectureBadgeCount) + 1));

  if (added.length > 0 || updated.length > 0 || removed.length > 0) {
    console.log("send notification to device");
    sendPushNotification("Vorlesungsänderung", "Es gibt Änderungen in deinem Vorlesungsplan", {
      screen: "calendar",
    });
    // update new lectures in async storage
    await AsyncStorage.setItem("lectures" as AsyncStorageEntries, JSON.stringify(scheduleRemote));
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});
