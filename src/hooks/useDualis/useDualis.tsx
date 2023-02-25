import React, { useContext, useState } from "react";
import { _auth, _logout } from "../../api/dualis/dualisConnector";
import { DualisScraperController } from "../../api/html_scraper/dualis/DualisScraperController";
import { ISemesterOptionsTypes } from "../../api/html_scraper/dualis/types/ISemesterOptionsTypes";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import {
  DEMO_PASSWORD,
  DEMO_USERNAME,
  dummy_grades
} from "../../data/testData";
import { IDualisContext, IDualisUser } from "./useDualis.types";

const DualisContext = React.createContext<IDualisContext | undefined>(
  undefined
);

const DualisProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [useDummyData, setUseDummyData] = useState(false);
  const [args, setArgs] = useState<string | null | undefined>(null);
  const [cookies, setCookies] = useState<string | null | undefined>(null);
  const [user, setUser] = useState<IDualisUser>({
    username: "",
    password: "",
  });

  const [dualisScraperController, setDualisScraperController] =
    useState<DualisScraperController | null>(null);

  const login = async (username: string, password: string) => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setUseDummyData(true);
      return true;
    } // necessary for employees at apple/google to test the app before deployment

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
    setUseDummyData(false);
    if (!args || !cookies) return false;

    const res = await _logout(args, cookies);

    if (res.status !== 200) return false;

    setArgs(null);
    setCookies(null);
    setDualisScraperController(null);
    return true;
  };

  const getAllGrades = async () => {
    if (useDummyData) {
      return {
        msg: "Dummy data",
        status: 200,
        data: dummy_grades,
      };
    }

    if (!dualisScraperController) {
      const res: IResponseTypes = {
        msg: "Scrap grades failed. DualisScraperController is undefined",
        status: 401,
        data: undefined,
      };

      return res;
    }

    const res: IResponseTypes = await dualisScraperController.getAllGrades();

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
    throw Error("useDualis must be used within DualisProvider");
  }

  return context;
};

export { useDualis, DualisProvider };

