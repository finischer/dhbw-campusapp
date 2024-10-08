import { LecturesController } from "./../api/lectures/lecturesController";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { NotificationServices } from "../screens/NotificationSettingsScreen/notificationSettingsScreen.types";
import { LectureType, OrganizedLectures } from "../api/lectures/lectures.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { diffNestedLists } from "./diffLists";
import { NotificationMessage, sendPushNotification } from "./push-notifications";
import { AsyncStorageEntries } from "../hooks/useAsyncStorage/useAsyncStorage.types";
import { t } from "i18next";
import { sleep } from "./helpers";
import moment from "moment";
import { INTERNAL_DATE_FORMAT, INTERNAL_TIME_FORMAT } from "../constants/common";

// Lectures
TaskManager.defineTask(NotificationServices.Lectures, async () => {
  console.log("Call task");
  const courseString = await AsyncStorage.getItem("course");
  const icalUrl = (await AsyncStorage.getItem("icalUrl")) || undefined;

  const course = courseString ? JSON.parse(courseString) : undefined;
  const lecturesController = new LecturesController(icalUrl, course?.courseId);

  const res = await lecturesController.getScheduleFromWeb();

  if (res.status !== 200) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }

  const storageKey: AsyncStorageEntries = "lectures";
  const scheduleLocalString = await AsyncStorage.getItem(storageKey);
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

  const messages: NotificationMessage[] = [];

  const timeFormat = t("common:timeFormat");
  const dateFormat = t("common:dateFormat");

  added.forEach((entry) => {
    const startDate = moment(entry.title, INTERNAL_DATE_FORMAT).format(dateFormat);

    entry.data.forEach((lecture) => {
      const newMessage: NotificationMessage = {
        title: t("calendarScreen:lectureAddedNotificationTitle", {
          lectureName: lecture.lecture,
          lectureStartDate: startDate,
          interpolation: { escapeValue: false },
        }),
        body: t("calendarScreen:lectureAddedNotificationBody", {
          lectureName: lecture.lecture,
          lectureStartTime: moment(lecture.startTime, INTERNAL_TIME_FORMAT).format(timeFormat),
          lectureEndTime: moment(lecture.endTime, INTERNAL_TIME_FORMAT).format(timeFormat),
          interpolation: { escapeValue: false },
        }),
      };
      messages.push(newMessage);
    });
  });

  removed.forEach((entry) => {
    const startDate = moment(entry.title, INTERNAL_DATE_FORMAT).format(dateFormat);

    entry.data.forEach((lecture) => {
      const newMessage: NotificationMessage = {
        title: t("calendarScreen:lectureRemovedNotificationTitle"),
        body: t("calendarScreen:lectureRemovedNotificationBody", {
          lectureName: lecture.lecture,
          lectureStartDate: startDate,
          lectureStartTime: moment(lecture.startTime, INTERNAL_TIME_FORMAT).format(timeFormat),
          lectureEndTime: moment(lecture.endTime, INTERNAL_TIME_FORMAT).format(timeFormat),
          interpolation: { escapeValue: false },
        }),
      };
      messages.push(newMessage);
    });
  });

  updated.forEach((entry) => {
    const startDate = moment(entry.title, INTERNAL_DATE_FORMAT).format(dateFormat);

    entry.data.forEach((lecture) => {
      const newMessage: NotificationMessage = {
        title: t("calendarScreen:lectureUpdatedNotificationTitle"),
        body: t("calendarScreen:lectureUpdatedNotificationBody", {
          lectureName: lecture.lecture,
          lectureStartDate: startDate,
          lectureStartTime: moment(lecture.startTime, INTERNAL_TIME_FORMAT).format(timeFormat),
          lectureEndTime: moment(lecture.endTime, INTERNAL_TIME_FORMAT).format(timeFormat),
          interpolation: { escapeValue: false },
        }),
      };
      messages.push(newMessage);
    });
  });

  // send notifications
  messages.forEach(async (message) => {
    const messageToSend: NotificationMessage = {
      data: {
        screen: "CalendarScreen",
        params: { refetchData: true },
      },
      ...message,
    };
    sendPushNotification(messageToSend);
    await sleep(2000); // wait 2 seconds until we send the next message
  });

  // if (added.length > 0 || updated.length > 0 || removed.length > 0) {
  //   sendPushNotification({
  //     title: t("calendarScreen:lectureChangesNotificationTitle"),
  //     body: t("calendarScreen:lectureChangesNotificationBody"),
  //     data: {
  //       screen: "CalendarScreen",
  //       params: { refetchData: true },
  //     },
  //   });
  //   // update new lectures in async storage
  //   // await AsyncStorage.setItem(storageKey, JSON.stringify(scheduleRemote));
  // }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});
