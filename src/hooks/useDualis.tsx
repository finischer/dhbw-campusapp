import { useState } from "react";
import { _auth, _logout } from "../api/dualis/dualisConnector";
import { DualisScraperController } from "../api/html_scraper/dualis/DualisScraperController";
import { ISemesterOptionsTypes } from "../api/html_scraper/dualis/types/ISemesterOptionsTypes";
import { ISemesterTypes } from "../api/html_scraper/dualis/types/ISemesterTypes";
import { IErrorTypes } from "../api/types/IErrorTypes";

const useDualis = () => {
  const [args, setArgs] = useState<string | null | undefined>(null);
  const [cookies, setCookies] = useState<string | null | undefined>(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [dualisScraperController, setDualisScraperController] =
    useState<DualisScraperController | null>(null);

  const login = async (username: string, password: string) => {
    const res = await _auth(username, password);

    if (res.status === 200) {
      let newCookies = null;

      if (res.cookies && res.args) {
        newCookies = res.cookies[0].split(";")[0];
        setArgs(res.args);
        setCookies(newCookies);
        const newDualisScraperController = new DualisScraperController(
          res.args,
          newCookies
        );
        setDualisScraperController(newDualisScraperController);
        return true;
      }
    }

    return false;
  };

  const logout = async () => {
    if (!args || !cookies) return false;

    const res = await _logout(args, cookies);

    if (res.status !== 200) return false;

    setArgs(null);
    setCookies(null);
    setDualisScraperController(null);
    return true;
  };

  const getAllGrades = async () => {
    if (!dualisScraperController) return;
    const res: ISemesterTypes[] | IErrorTypes =
      await dualisScraperController.getAllGrades();

    return res;
  };

  const getSemesterInformation = async () => {
    if (!dualisScraperController) return;

    const semesterInformation: ISemesterOptionsTypes =
      await dualisScraperController.getSemesterInformation();

    return semesterInformation;
  };

  return {
    login,
    logout,
    getAllGrades,
    getSemesterInformation,
    args,
    cookies,
  };
};

export default useDualis;
