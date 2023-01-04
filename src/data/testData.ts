import { ISemesterTypes } from "./../api/html_scraper/dualis/types/ISemesterTypes";

export const DEMO_USERNAME = "fake@mail.com";
export const DEMO_PASSWORD = "fakeMail123";

export const dummy_grades: ISemesterTypes[] = [
  {
    credits: "10,0",
    gpa: "1,1",
    semester: "SoSe 2022",
    semesterId: "543-534-232",
    subjects: [
      {
        subjectNr: "W3WI_103",
        subjectName: "BWL",
        semester: "SoSe 2022",
        subjectCredits: "5,0",
        subjectGrade: "1,2",
        subjectStatus: "bestanden",
        examsPath: "path/to/exams/bwl",
        exams: [
          {
            examName: "Personalwirtschaft",
            examDate: "12.12.2022",
            examRating: "1,3",
            externallyApproved: "",
          },
          {
            examName: "Einführung in die BWL",
            examDate: "01.01.2023",
            examRating: "1,1",
            externallyApproved: "",
          },
        ],
      },
      {
        subjectNr: "W3WI_104",
        subjectName: "Informatik",
        semester: "SoSe 2022",
        subjectCredits: "10,0",
        subjectGrade: "1,0",
        subjectStatus: "bestanden",
        examsPath: "path/to/exams/informatik",
        exams: [
          {
            examName: "Mobile App Programmierung",
            examDate: "09.01.2007",
            examRating: "1,0",
            externallyApproved: "",
          },
          {
            examName: "Datenbanken",
            examDate: "09.11.2007",
            examRating: "1,0",
            externallyApproved: "",
          },
        ],
      },
    ],
  },
  {
    semester: "WiSe 2021",
    gpa: "1,1",
    semesterId: "123-123-123",
    credits: "5,0",
    subjects: [
      {
        subjectNr: "W3WI_105",
        subjectName: "Bilanzierung",
        semester: "WiSe 2021",
        subjectCredits: "5,0",
        subjectGrade: "1,1",
        subjectStatus: "b",
        examsPath: "path/to/exams/bilanzierung",
        exams: [
          {
            examName: "Steueroptimierung",
            examDate: "15.09.2022",
            examRating: "1,2",
            externallyApproved: "",
          },
          {
            examName: "Risikomanagement",
            examDate: "18.09.2022",
            examRating: "1,1",
            externallyApproved: "",
          },
        ],
      },
    ],
  },
];
