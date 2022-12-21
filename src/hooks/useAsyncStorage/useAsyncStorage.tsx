import React from "react";
import { AsyncStorageEntries } from "./useAsyncStorage.types";

// TODO: Implement entries for localStorage
// Entries:
// - Email (Secured)
// - Password (Secured)
// - Cookies (Secured)
// - Arguments (Secured)
// - iCal Calender Link (Secured)
// - Language
// - Theme (dark or light)
// - Initial Homescreen (can be choosed by the user)
// - Cafeteria
// - Course

const useAsyncStorage = () => {
  const storeDataInAsyncStorage = (key: AsyncStorageEntries, value: any) => {
    const stringValue = JSON.stringify(value);
    // TODO: Put in local storage
  };
  const getDataFromAsyncStorage = (key: AsyncStorageEntries) => {
    const value = ""; // TODO: get from localStorage
    return JSON.parse(value);
  };

  const updateDataInAsyncStorage = (
    key: AsyncStorageEntries,
    newValue: any
  ) => {
    // TODO
  };

  const deleteFromAsyncStorage = (key: AsyncStorageEntries) => {
    // TODO
  };
  const deleteAllFromAsyncStorage = () => {
    // TODO
  };

  return {
    storeDataInAsyncStorage,
    getDataFromAsyncStorage,
    updateDataInAsyncStorage,
    deleteFromAsyncStorage,
    deleteAllFromAsyncStorage,
  };
};

export default useAsyncStorage;
