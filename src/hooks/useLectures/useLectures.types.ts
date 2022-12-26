import { IResponseTypes } from "../../api/types/IResponseTypes";

export type ILecturesContext = {
  courseId: number | undefined;
  getSchedule(): Promise<IResponseTypes>;
  changeCourseByCourseId(newCourseId: number): void;
  changeCourseByUrl(newIcalUrl: string): void;
};
