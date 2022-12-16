import { IResponseTypes } from "./../../types/IResponseTypes";
import axios from "axios";
import {
  _generateCourseResultsUrl,
  _generateSemesterUrl,
  _getExamUrlOfSubject,
} from "./helpers";
import cheerio from "cheerio-without-node-native";
import { ISemesterOptionsTypes } from "./types/ISemesterOptionsTypes";
import { ISubjectTypes, subjectKeys } from "./types/ISubjectTypes";
import { ISemesterTypes } from "./types/ISemesterTypes";
import { BASE_URL } from "../../dualis/dualisConstants";
import { examKeys, IExamTypes } from "./types/IExamTypes";
import { IAxiosConfig } from "../../../services/axios/axios.types";

export class DualisScraperController {
  args: string;
  cookies: string;
  axiosConfig: IAxiosConfig;

  constructor(args: string, cookies: string) {
    this.args = args;
    this.cookies = cookies;
    this.axiosConfig = {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    };
  }

  async getAllGrades() {
    // url to semester overview
    const url = _generateCourseResultsUrl(this.args);
    const res = await axios.get(url, this.axiosConfig);

    if (res.status !== 200) {
      return {
        msg: "Error: scrap grades failed",
        status: res.status,
        data: undefined,
      };
    }

    // get all semesters
    const semesterOptions: ISemesterOptionsTypes =
      await this.getSemesterInformation();

    const semesterList: ISemesterTypes[] = [];
    for (const [semesterName, semesterId] of Object.entries(semesterOptions)) {
      const semesterUrl = _generateSemesterUrl(this.args, semesterId);
      // const semesterHtml = await axios.get(
      //   semesterUrl,
      //   this.axiosConfig
      // );
      const subjects: ISubjectTypes[] = await this.getAllSubjectsFromSemester(
        semesterUrl,
        semesterName
      );

      const subjectsWithExams = await Promise.all(
        subjects.map(async (subject: ISubjectTypes) => {
          const examsOfSubject = await this.getExamsOfSubject(
            subject.examsPath
          );

          const newSubject: ISubjectTypes = {
            ...subject,
            exams: examsOfSubject,
          };

          return newSubject;
        })
      );

      const newSemester: ISemesterTypes = {
        semesterId,
        credits: "",
        gpa: "",
        semester: semesterName,
        subjects: subjectsWithExams,
      };
      semesterList.push(newSemester);
    }

    const response: IResponseTypes = {
      msg: "successful",
      status: 200,
      data: semesterList,
    };

    return response;
  }

  async getSemesterInformation() {
    // url to semester overview
    const url = _generateCourseResultsUrl(this.args);
    const res = await axios.get(url, this.axiosConfig);

    // if (res.status !== 200) {
    //   return { msg: "Error: scrap semesters failed", status: res.status };
    // }

    // load semester overview default page
    const $load = cheerio.load(res.data);

    const semesterOptions: ISemesterOptionsTypes = {};

    // scrap all semester from dropdown menu (semester and id of semester)
    $load("option").each((_: number, op: any) => {
      const key = $load(op).text();
      const value = $load(op).val();
      semesterOptions[key] = value;
    });

    return semesterOptions;
  }

  async getAllSubjectsFromSemester(semesterUrl: string, semesterName: string) {
    const semesterHtml = await axios.get(semesterUrl, this.axiosConfig);
    const $ = cheerio.load(semesterHtml.data);
    const $subjects = $(".nb > tbody > tr");

    const subjectList: ISubjectTypes[] = [];

    const indexOfLastTableRowElement = $subjects.length - 1; // last row is semester-gpa and overall rating of subjects

    // loop through table of subjects
    $subjects.each((parentIdx: number, parentElem: any) => {
      if (parentIdx < indexOfLastTableRowElement) {
        let keyIdx = 0;
        // create default object of subject
        const subjectObj: ISubjectTypes = {
          subjectNr: "",
          subjectName: "",
          subjectGrade: "",
          subjectCredits: "",
          subjectStatus: "",
          semester: semesterName,
          examsPath: "",
          exams: [],
        };

        // iterate over td -> information of subject
        $(parentElem)
          .children()
          .each(async (childIdx: number, childElem: any) => {
            // only first 5 columns are relevant
            if (childIdx < 5) {
              const tdValue = $(childElem).text().trim();

              if (tdValue) {
                const key = subjectKeys[keyIdx] as keyof typeof subjectObj;
                subjectObj[key] = tdValue;
                keyIdx++;
              }
            }

            // 6th column contains the url to all exams of this subject
            if (childIdx === 5) {
              const examsUrl = _getExamUrlOfSubject($(childElem));
              subjectObj["examsPath"] = examsUrl;
            }
          });
        subjectList.push(subjectObj);
      }
    });

    return subjectList;
  }

  async getExamsOfSubject(examsUrl: string) {
    const examUrl = BASE_URL + examsUrl;
    const res = await axios.get(examUrl, this.axiosConfig);
    const $ = cheerio.load(res.data);

    const allExams: IExamTypes[] = [];

    const $tableRows = $("table").first().find("tr");

    const lastRow = $tableRows.length - 1; // last row shows overall rating of all exams

    // iterate over all exams
    $tableRows.each((rowIdx: number, rowElem: any) => {
      // infos for exam starts at 5 row
      if (rowIdx >= 4 && rowIdx < lastRow) {
        let keyIdx = 0;

        const examObj: IExamTypes = {
          examName: "",
          examDate: "",
          examRating: "",
          externallyApproved: null,
        };

        // iterate over table columns of row, where information are stored
        $(rowElem)
          .find("td")
          .each((colIdx: number, colElem: any) => {
            // information for exam starts at column 2 and need only the next 4 columns
            if (colIdx >= 1 && keyIdx < examKeys.length) {
              const key = examKeys[keyIdx] as keyof typeof examObj;
              const value = $(colElem).text().trim(); // get information of exam
              examObj[key] = value; // store information in exam object
              keyIdx++;
            }
          });
        allExams.push(examObj); // push exam object to list
      }
    });

    return allExams; // return all exams
  }
}
