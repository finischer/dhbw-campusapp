import * as SecureStore from "expo-secure-store";

const useSecureStorage = () => {
  const saveValueInSecureStorage = async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  };

  const getValueFromSecureStorage = async (key: string) => {
    const value = await SecureStore.getItemAsync(key);

    if (!value) return undefined;
    return JSON.parse(value);
  };

  const removeValueFromSecureStorage = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  };

  return {
    saveValueInSecureStorage,
    getValueFromSecureStorage,
    removeValueFromSecureStorage,
  };
};

export default useSecureStorage;
