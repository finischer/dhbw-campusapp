export type LectureType = {
  uid: string;
  lecture: string;
  startDate: Date | string;
  startTime: number | string;
  endDate: Date | string;
  endTime: number | string;
  location: string;
};

export type OrganizedLectures = {
  title: string;
  data: LectureType[];
};
