import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageEntries } from "./useAsyncStorage.types";

const useAsyncStorage = () => {
  const storeDataInAsyncStorage = async (
    key: AsyncStorageEntries,
    value: any
  ) => {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  };
  const getDataFromAsyncStorage = async (key: AsyncStorageEntries) => {
    const value = await AsyncStorage.getItem(key);
    return !value ? "" : JSON.parse(value);
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
