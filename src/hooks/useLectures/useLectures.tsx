import { createContext, useContext, useState } from "react";
import { LecturesController } from "../../api/lectures/lecturesController";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import { ILecturesContext } from "./useLectures.types";

const LecturesContext = createContext<ILecturesContext | undefined>(undefined);

const LecturesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ical url for own calendar imports
  const [icalUrl, setIcalUrl] = useState<string | undefined>(undefined);

  // only course IDs from DHBW Mannheim Interface
  const [courseId, setCourseId] = useState<number | undefined>(undefined);
  const lecturesController = new LecturesController(icalUrl, courseId);

  const changeCourseByCourseId = (newCourseId: number) => {
    setCourseId(newCourseId);
    lecturesController.changeCalendarByCourseId(newCourseId);
  };

  const changeCourseByUrl = (newIcalUrl: string) => {
    setIcalUrl(newIcalUrl);
    lecturesController.changeCalendarByIcalUrl(newIcalUrl);
  };

  const getSchedule = async () => {
    const schedule = await lecturesController.getSchedule();

    return schedule;
  };

  return (
    <LecturesContext.Provider
      value={{
        courseId,
        changeCourseByCourseId,
        changeCourseByUrl,
        getSchedule,
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
