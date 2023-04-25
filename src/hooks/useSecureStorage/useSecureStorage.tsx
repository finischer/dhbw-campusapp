import * as SecureStore from "expo-secure-store";
import { SecureStoreEntries } from "./useSecureStorage.types";

const useSecureStorage = () => {
  const saveValueInSecureStorage = async (
    key: SecureStoreEntries,
    value: any
  ) => {
    const stringValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, stringValue);
  };

  const getValueFromSecureStorage = async (key: SecureStoreEntries) => {
    const value = await SecureStore.getItemAsync(key);

    if (!value) return "";
    return JSON.parse(value);
  };

  const removeValueFromSecureStorage = async (key: SecureStoreEntries) => {
    await SecureStore.deleteItemAsync(key);
  };

  return {
    saveValueInSecureStorage,
    getValueFromSecureStorage,
    removeValueFromSecureStorage,
  };
};

export default useSecureStorage;
