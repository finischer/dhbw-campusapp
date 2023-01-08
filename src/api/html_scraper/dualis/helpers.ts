import { BASE_URL } from "../../dualis/dualisConstants";

export const _generateSemesterUrl = (args: string, semesterId: string) => {
  const semesterUrl: string =
    BASE_URL +
    "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=" +
    args +
    "-N" +
    semesterId;

  return semesterUrl;
};

export const _generateCourseResultsUrl = (args: string) => {
  const courseResultsUrl: string =
    BASE_URL +
    "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=" +
    args;

  return courseResultsUrl;
};

export const _getExamUrlOfSubject = (selector: any) => {
  const examUrl: string = selector
    .find("script")
    .text()
    .substring(367, 483)
    .trim();
  return examUrl;
};
