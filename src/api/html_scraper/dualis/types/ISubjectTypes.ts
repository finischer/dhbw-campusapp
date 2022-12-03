import { IExamTypes } from "./IExamTypes";

export type ISubjectTypes = {
  subjectNr: string;
  subjectName: string;
  subjectGrade: string;
  subjectCredits: string;
  subjectStatus: string;
  examsPath: string;
  exams: IExamTypes[];
};

export const subjectKeys = [
  "subjectNr",
  "subjectName",
  "subjectGrade",
  "subjectCredits",
  "subjectStatus",
];
