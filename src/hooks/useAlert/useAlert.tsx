import { Alert } from "react-native";
import { useMetadata } from "../useMetadata";

const useAlert = () => {
  const { theme } = useMetadata();
  const interfaceStyle = theme === "system" ? "unspecified" : theme;

  const alert = (title: string, message: string) => {
    Alert.alert(title, message, [], {
      userInterfaceStyle: interfaceStyle,
    });
  };

  return { alert };
};

export default useAlert;
