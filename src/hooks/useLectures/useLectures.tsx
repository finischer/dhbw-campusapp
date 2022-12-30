import { createContext, useContext, useEffect, useState } from "react";
import { ICourse } from "../../api/lectures/lectures.types";
import { LecturesController } from "../../api/lectures/lecturesController";
import useAsyncStorage from "../useAsyncStorage";
import { ILecturesContext } from "./useLectures.types";

const LecturesContext = createContext<ILecturesContext | undefined>(undefined);

const LecturesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getDataFromAsyncStorage, storeDataInAsyncStorage } =
    useAsyncStorage();

  // ical url for own calendar imports
  const [icalUrl, setIcalUrl] = useState<string | undefined>(undefined);

  // only course IDs from DHBW Mannheim Interface
  const [course, setCourse] = useState<ICourse | undefined>(undefined);
  const lecturesController = new LecturesController(icalUrl, course?.courseId);

  useEffect(() => {
    const initializeCourseAndIcalUrl = async () => {
      const course = await getDataFromAsyncStorage("course");
      if (course) setCourse(course);

      const icalUrl = await getDataFromAsyncStorage("icalUrl");
      if (icalUrl) setIcalUrl(icalUrl);
    };

    initializeCourseAndIcalUrl();
  }, []);

  const changeCourse = (newCourse: ICourse) => {
    setCourse(newCourse);
    lecturesController.changeCalendarByCourseId(newCourse.courseId);

    // store course in async storage
    storeDataInAsyncStorage("course", newCourse);
  };

  const changeCourseByUrl = (newIcalUrl: string) => {
    setIcalUrl(newIcalUrl);
    lecturesController.changeCalendarByIcalUrl(newIcalUrl);

    storeDataInAsyncStorage("icalUrl", newIcalUrl);
  };

  const getSchedule = async () => {
    const schedule = await lecturesController.getSchedule();
    return schedule;
  };

  const getCourses = async () => {
    const courses = await lecturesController.getCourses();
    return courses;
  };

  const getCourseById = async (courseId: string) => {
    const { data: course } = await lecturesController.getCourseById(courseId);
    return course;
  };

  return (
    <LecturesContext.Provider
      value={{
        course,
        changeCourse,
        getCourseById,
        changeCourseByUrl,
        getSchedule,
        getCourses,
      }}
    >
      {children}
    </LecturesContext.Provider>
  );
};

const useLectures = () => {
  const context = useContext(LecturesContext);

  if (context === undefined) {
    throw Error("useLectures must be used within LecturesProvider");
  }
  return context;
};

export { useLectures, LecturesProvider };
