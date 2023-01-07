import { IResponseTypes } from "../../api/types/IResponseTypes";
import { ICourse } from "../../api/lectures/lectures.types";

export type ILecturesContext = {
  course: ICourse | undefined;
  icalUrl: string | undefined;
  getSchedule(): Promise<IResponseTypes>;
  changeCourse(newCourse: ICourse): void;
  changeCourseByUrl(newIcalUrl: string): void;
  getCourses(): Promise<IResponseTypes>;
  getCourseById(courseId: string): void;
};
