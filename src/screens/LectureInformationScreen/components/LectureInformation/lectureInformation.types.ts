import { LectureType } from "../../../../api/lectures/lectures.types";

export interface ILectureInformationProps {
  title: string;
  lecture: LectureType | null;
  keyChanges: (keyof LectureType)[];
}
