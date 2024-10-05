import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageEntries } from "./useAsyncStorage.types";

const useAsyncStorage = () => {
  const storeDataInAsyncStorage = async (key: AsyncStorageEntries, value: any) => {
    let stringValue;

    if (typeof value !== "string") {
      stringValue = JSON.stringify(value);
    } else {
      stringValue = value;
    }

    await AsyncStorage.setItem(key, stringValue);
  };
  const getDataFromAsyncStorage = async (key: AsyncStorageEntries) => {
    const value = (await AsyncStorage.getItem(key)) ?? "";

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  };

  const deleteFromAsyncStorage = async (key: AsyncStorageEntries) => {
    await AsyncStorage.removeItem(key);
  };
  const deleteAllFromAsyncStorage = async () => {
    // Only use it when User wants to clear the async storage
    await AsyncStorage.clear();
  };

  return {
    storeDataInAsyncStorage,
    getDataFromAsyncStorage,
    deleteFromAsyncStorage,
    deleteAllFromAsyncStorage,
  };
};

export default useAsyncStorage;
