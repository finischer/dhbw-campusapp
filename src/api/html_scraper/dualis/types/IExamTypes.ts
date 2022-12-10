// TODO: Add examId
export type IExamTypes = {
  examName: string;
  examDate: string;
  examRating: string;
  externallyApproved: string | null;
};

export const examKeys = [
  "examName",
  "examDate",
  "examRating",
  "externallyApproved",
];
