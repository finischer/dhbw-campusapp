import axios from "axios";
import qs from "qs";
import { BASE_URL, LOGIN_ENDPOINT } from "./dualisConstants";

// Description:
// These functions are used to log in and log out of Dualis

const _auth = async (username: string, password: string) => {
  const url = BASE_URL + LOGIN_ENDPOINT;

  const loginPayload = {
    usrname: username,
    pass: password,
    APPNAME: "CampusNet",
    PRGNAME: "LOGINCHECK",
    ARGUMENTS: "clino,usrname,pass,menuno,menu_type,browser,platform",
    clino: "000000000000001",
    menuno: "000324",
    menu_type: "classic",
    browser: "",
    platform: "",
  };

  const res = await axios.post(url, qs.stringify(loginPayload), {
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });

  if (res.status !== 200) {
    return { msg: "Anmeldung fehlgeschlagen", status: res.status };
  }

  const args = res.headers.refresh?.substring(84, 111);
  const cookies = res.headers["set-cookie"];

  return { status: 200, args, cookies };
};

const _logout = async (args: string, cookies: string) => {
  const url = BASE_URL + LOGIN_ENDPOINT + args;
  const res = await axios.get(url, {
    withCredentials: true,
    headers: {
      Cookie: cookies,
    },
  });

  return { msg: "ok", status: res.status };
};

export { _auth, _logout };
