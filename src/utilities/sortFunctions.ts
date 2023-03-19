import _ from "lodash";
import { Type } from "typescript";

type ObjectType = {
  [key: string]: any;
};

export const sortArrayByKey = (
  arr: Array<ObjectType>,
  key: string,
  descending = false
) => {
  return arr.sort((a, b) => {
    const keyA = a[key];
    const keyB = b[key];
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
};
