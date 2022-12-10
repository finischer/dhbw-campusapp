import { ISemesterOptionsTypes } from "../../api/html_scraper/dualis/types/ISemesterOptionsTypes";
import { ISemesterTypes } from "../../api/html_scraper/dualis/types/ISemesterTypes";
import { IErrorTypes } from "../../api/types/IErrorTypes";

export type IDualisUser = {
  username: string;
  password: string;
};

export type IDualisContext = {
  login(username: string, password: string): Promise<boolean>;
  logout(): void;
  getAllGrades(): Promise<ISemesterTypes[] | IErrorTypes | undefined>;
  getSemesterInformation(): Promise<ISemesterOptionsTypes | undefined>;
  args: string | null | undefined;
  cookies: string | null | undefined;
  user: IDualisUser;
};
