import moment from "moment";

export type IObjectResponse = {
  [key: string]: any;
};

export type IResponseTypes = {
  msg: string;
  status: number;
  // data: Array<any> | IObjectResponse | undefined;
  data: any;
  requestTime?: moment.Moment;
};
