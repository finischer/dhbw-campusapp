import { BASE_URL } from "../../dualis/dualisConstants";
import { IExamTypes } from "./types/IExamTypes";
import { ISubjectTypes } from "./types/ISubjectTypes";

export const _generateSemesterUrl = (args: string, semesterId: string) => {
  const semesterUrl =
    BASE_URL +
    "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=" +
    args +
    "-N" +
    semesterId;

  return semesterUrl;
};

export const _generateCourseResultsUrl = (args: string) => {
  const courseResultsUrl =
    BASE_URL +
    "/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=COURSERESULTS&ARGUMENTS=" +
    args;

  return courseResultsUrl;
};

export const _getExamUrlOfSubject = (selector: any) => {
  const examUrl = selector.find("script").text().substring(367, 483).trim();
  return examUrl;
};

export const getConfig = (cookies: string) => {
  const config = {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${cookies}`,
    },
  };

  return config;
};
