import { ISemesterOptionsTypes } from "../../api/html_scraper/dualis/types/ISemesterOptionsTypes";
import { IResponseTypes } from "../../api/types/IResponseTypes";

export type IDualisUser = {
  username: string;
  password: string;
};

export type IDualisContext = {
  login(username: string, password: string): Promise<boolean>;
  logout(): void;
  getAllGrades(): Promise<IResponseTypes>;
  getSemesterInformation(): Promise<ISemesterOptionsTypes | undefined>;
  args: string | null | undefined;
  cookies: string | null | undefined;
};
