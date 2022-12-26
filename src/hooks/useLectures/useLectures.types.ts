import { IResponseTypes } from "../../api/types/IResponseTypes";

export type ILecturesContext = {
  courseId: string | undefined;
  getSchedule(): Promise<IResponseTypes>;
  changeCourseByCourseId(newCourseId: string): void;
  changeCourseByUrl(newIcalUrl: string): void;
  getCourses(): Promise<IResponseTypes>; // TODO: set return type
};
