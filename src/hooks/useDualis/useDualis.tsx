import React, { useContext, useState } from "react";
import { resolveModuleName } from "typescript";
import { _auth, _logout } from "../../api/dualis/dualisConnector";
import { DualisScraperController } from "../../api/html_scraper/dualis/DualisScraperController";
import { ISemesterOptionsTypes } from "../../api/html_scraper/dualis/types/ISemesterOptionsTypes";
import { ISemesterTypes } from "../../api/html_scraper/dualis/types/ISemesterTypes";
import { IErrorTypes } from "../../api/types/IErrorTypes";
import { IDualisContext, IDualisUser } from "./useDualis.types";

const DualisContext = React.createContext<IDualisContext | undefined>(
  undefined
);

export const DualisProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [args, setArgs] = useState<string | null | undefined>(null);
  const [cookies, setCookies] = useState<string | null | undefined>(null);
  const [user, setUser] = useState<IDualisUser>({
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

  return (
    <DualisContext.Provider
      value={{
        args,
        cookies,
        user,
        login,
        logout,
        getAllGrades,
        getSemesterInformation,
      }}
    >
      {children}
    </DualisContext.Provider>
  );
};

const useDualis = () => {
  const context = useContext(DualisContext);

  if (context === undefined) {
    throw Error("useCount must be used within DualisProvider");
  }

  return context;
};

export default useDualis;
