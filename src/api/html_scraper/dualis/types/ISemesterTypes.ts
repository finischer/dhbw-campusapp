import { ISubjectTypes } from "./ISubjectTypes";

export type ISemesterTypes = {
  semester: string;
  gpa: string;
  credits: string;
  subjects: ISubjectTypes[];
};
