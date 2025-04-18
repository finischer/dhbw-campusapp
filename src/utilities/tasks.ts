import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundFetch from "expo-background-fetch";
import { getBadgeCountAsync, setBadgeCountAsync } from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { t } from "i18next";
import moment from "moment";
import { LectureType, OrganizedLectures } from "../api/lectures/lectures.types";
import {
  INTERNAL_DATE_FORMAT,
  INTERNAL_TIME_FORMAT,
} from "../constants/common";
import { AsyncStorageEntries } from "../hooks/useAsyncStorage/useAsyncStorage.types";
import { ActionTriggers } from "../infrastructure/navigation/Navigation/navigation.types";
import { NotificationServices } from "../screens/NotificationSettingsScreen/notificationSettingsScreen.types";
import { LecturesController } from "./../api/lectures/lecturesController";
import { diffSchedules } from "./diffLists";
import { sleep } from "./helpers";
import {
  NotificationMessage,
  sendPushNotification,
} from "./push-notifications";

// Lectures
TaskManager.defineTask(NotificationServices.Lectures, async (data) => {
  console.log("Call task at " + new Date().toISOString());
  console.log("Data: ", data);
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
  const scheduleLocal = scheduleLocalString
    ? (JSON.parse(scheduleLocalString) as OrganizedLectures[])
    : null;
  const scheduleRemote = res.data as OrganizedLectures[];

  if (!scheduleLocal) return BackgroundFetch.BackgroundFetchResult.NoData;

  const { added, updated, removed } = diffSchedules(
    scheduleLocal,
    scheduleRemote,
  );

  // const badgeCountKey: AsyncStorageEntries = "lecture-badge-count";
  // const lectureBadgeCount = (await AsyncStorage.getItem(badgeCountKey)) ?? "0";
  // await AsyncStorage.setItem(badgeCountKey, JSON.stringify(parseInt(lectureBadgeCount) + 1));

  const messages: NotificationMessage[] = [];

  const timeFormat = t("common:timeFormat");
  const dateFormat = t("common:dateFormat");

  added.forEach((entry) => {
    const { lecture, startDate: startDateRaw, startTime, endTime } = entry;
    const startDate = moment(startDateRaw, INTERNAL_DATE_FORMAT).format(
      dateFormat,
    );

    const newMessage: NotificationMessage = {
      title: t("calendarScreen:lectureAddedNotificationTitle", {
        lectureName: lecture,
        lectureStartDate: startDate,
        interpolation: { escapeValue: false },
      }),
      body: t("calendarScreen:lectureAddedNotificationBody", {
        lectureName: lecture,
        lectureStartTime: moment(startTime, INTERNAL_TIME_FORMAT).format(
          timeFormat,
        ),
        lectureEndTime: moment(endTime, INTERNAL_TIME_FORMAT).format(
          timeFormat,
        ),
        interpolation: { escapeValue: false },
      }),
    };

    messages.push(newMessage);
  });

  removed.forEach((lecture) => {
    const startDate = moment(lecture.startDate, INTERNAL_DATE_FORMAT).format(
      dateFormat,
    );

    if (startDate < moment().format(dateFormat)) {
      return;
    }

    const newMessage: NotificationMessage = {
      title: t("calendarScreen:lectureRemovedNotificationTitle"),
      body: t("calendarScreen:lectureRemovedNotificationBody", {
        lectureName: lecture.lecture,
        lectureStartDate: startDate,
        lectureStartTime: moment(
          lecture.startTime,
          INTERNAL_TIME_FORMAT,
        ).format(timeFormat),
        lectureEndTime: moment(lecture.endTime, INTERNAL_TIME_FORMAT).format(
          timeFormat,
        ),
        interpolation: { escapeValue: false },
      }),
    };
    messages.push(newMessage);
  });

  updated.forEach(({ oldEvent, newEvent, changes }) => {
    const startDate = moment(newEvent.startDate, INTERNAL_DATE_FORMAT).format(
      dateFormat,
    );

    const newMessage: NotificationMessage = {
      title: t("calendarScreen:lectureUpdatedNotificationTitle"),
      body: t("calendarScreen:lectureUpdatedNotificationBody", {
        lectureName: newEvent.lecture,
        lectureStartDate: startDate,
        lectureStartTime: moment(
          newEvent.startTime,
          INTERNAL_TIME_FORMAT,
        ).format(timeFormat),
        lectureEndTime: moment(newEvent.endTime, INTERNAL_TIME_FORMAT).format(
          timeFormat,
        ),
        interpolation: { escapeValue: false },
      }),
      data: {
        screen: "calendar.LectureInformationScreen",
        params: {
          oldLecture: oldEvent,
          newLecture: newEvent,
          keyChanges: Object.keys(changes) as (keyof LectureType)[],
          trigger: ActionTriggers.Notification,
        },
      },
    };
    messages.push(newMessage);
  });

  // send notifications
  messages.forEach(async (message) => {
    const messageToSend: NotificationMessage = {
      ...message,
    };
    sendPushNotification(messageToSend);
    await sleep(2000); // wait 2 seconds until we send the next message
  });

  // app badge count
  const currBadgeCount = await getBadgeCountAsync();
  await setBadgeCountAsync(currBadgeCount + messages.length);

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

TaskManager.defineTask(NotificationServices.Dualis, async () => {
  console.log("Call task at " + new Date().toISOString());
  return BackgroundFetch.BackgroundFetchResult.NewData;
});
