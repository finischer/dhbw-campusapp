import { ISubjectTypes } from "./ISubjectTypes";

export type ISemesterTypes = {
  semesterId: string;
  semester: string;
  gpa: string;
  credits: string;
  subjects: ISubjectTypes[];
};
