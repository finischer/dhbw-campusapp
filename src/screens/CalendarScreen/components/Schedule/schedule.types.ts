import { SectionListProps } from "react-native";
import {
  LectureType,
  OrganizedLectures,
} from "./../../../../api/lectures/lectures.types";
export type IScheduleProps = Partial<SectionListProps<LectureType>> & {
  lectures: OrganizedLectures[];
};
