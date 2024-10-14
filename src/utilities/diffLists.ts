import { LectureType, OrganizedLectures } from "../api/lectures/lectures.types";

type DiffResult = {
  added: LectureType[];
  removed: LectureType[];
  updated: { oldEvent: LectureType; newEvent: LectureType; changes: any }[];
};

function diffSchedules(localSchedule: OrganizedLectures[], remoteSchedule: OrganizedLectures[]): DiffResult {
  // flat events
  const localEvents = localSchedule.flatMap((day) => day.data);
  const remoteEvents = remoteSchedule.flatMap((day) => day.data);

  // maps with uid as key
  const localEventMap = new Map<string, LectureType>();
  const remoteEventMap = new Map<string, LectureType>();

  localEvents.forEach((event) => localEventMap.set(event.uid, event));
  remoteEvents.forEach((event) => remoteEventMap.set(event.uid, event));

  const added: LectureType[] = [];
  const removed: LectureType[] = [];
  const updated: { oldEvent: LectureType; newEvent: LectureType; changes: any }[] = [];

  // Added Events
  remoteEventMap.forEach((remoteEvent, uid) => {
    const localEvent = localEventMap.get(uid);
    if (!localEvent) {
      // Event ist neu
      added.push(remoteEvent);
    } else {
      // If event exists in both schedules, check for changes (updated events)
      const changes = diffEvents(localEvent, remoteEvent);
      if (Object.keys(changes).length > 0) {
        updated.push({ oldEvent: localEvent, newEvent: remoteEvent, changes });
      }
    }
  });

  // Removed events
  localEventMap.forEach((localEvent, uid) => {
    if (!remoteEventMap.has(uid)) {
      // Event wurde entfernt
      removed.push(localEvent);
    }
  });

  return { added, removed, updated };
}

function diffEvents(event1: LectureType, event2: LectureType): any {
  const changes: any = {};

  if (event1.lecture !== event2.lecture) {
    changes.lecture = { before: event1.lecture, after: event2.lecture };
  }
  if (event1.startDate !== event2.startDate) {
    changes.startDate = { before: event1.startDate, after: event2.startDate };
  }
  if (event1.startTime !== event2.startTime) {
    changes.startTime = { before: event1.startTime, after: event2.startTime };
  }
  if (event1.endDate !== event2.endDate) {
    changes.endDate = { before: event1.endDate, after: event2.endDate };
  }
  if (event1.endTime !== event2.endTime) {
    changes.endTime = { before: event1.endTime, after: event2.endTime };
  }

  return changes;
}

export { diffSchedules, diffEvents };
