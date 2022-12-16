export type IObjectResponse = {
  [key: string]: any;
};

export type IResponseTypes = {
  msg: string;
  status: number;
  data: Array<any> | IObjectResponse | undefined;
};
