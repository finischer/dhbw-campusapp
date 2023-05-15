import { LectureType } from "./../../../../api/lectures/lectures.types";

export type ILectureRowItemProps = {
  localLecture: LectureType | null;
  lecture: LectureType;
  index: number;
  alertScheduleChanges: () => void;
};
