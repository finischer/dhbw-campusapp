import { useTranslation } from "react-i18next";
import { Alert, AlertButton, AlertType, ButtonProps } from "react-native";
import { useMetadata } from "../useMetadata";
import { IAlertButton } from "./useAlert.types";
import Dialog from "react-native-dialog";

const useAlert = () => {
  const { t } = useTranslation();
  const { theme } = useMetadata();
  const interfaceStyle = theme === "system" ? "unspecified" : theme;

  const alert = (title: string, message: string) => {
    Alert.alert(title, message, [], {
      userInterfaceStyle: interfaceStyle,
      cancelable: true,
    });
  };

  const prompt = (
    title: string,
    message: string | undefined = undefined,
    buttonText: string = "Ok",
    handleOnPress: ((text: string) => void) | undefined = undefined,
    type: AlertType | undefined = undefined,
    defaultValue: string | undefined = undefined,
    keyboardType: string | undefined = undefined
  ) => {
    const cancelText = t("common:cancel");
    Alert.prompt(
      title,
      message,
      [
        {
          text: cancelText,
          style: "cancel",
        },
        {
          text: buttonText,
          style: "default",
          onPress: handleOnPress,
        },
      ],
      type,
      defaultValue,
      keyboardType,
      // @ts-ignore
      {
        userInterfaceStyle: interfaceStyle,
        cancelable: true,
      }
    );
  };

  return { alert, prompt };
};

export default useAlert;
