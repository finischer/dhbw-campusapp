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
