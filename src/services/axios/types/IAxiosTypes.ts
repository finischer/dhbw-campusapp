type IHeaderTypes = {
  Authorization: string;
};

export type IAxiosConfig = {
  withCredentials?: boolean;
  headers: IHeaderTypes;
};
