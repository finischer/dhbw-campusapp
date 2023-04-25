import { useTranslation } from "react-i18next";
import { Alert, AlertButton, AlertType } from "react-native";
import { useMetadata } from "../useMetadata";
import * as WebBrowser from 'expo-web-browser';

const useAlert = () => {
  const { t } = useTranslation();
  const { theme, colors } = useMetadata();
  const interfaceStyle = theme === "system" ? "unspecified" : theme;

  const alert = (title: string, message: string, buttons: AlertButton[] = []) => {
    Alert.alert(title, message, buttons, {
      userInterfaceStyle: interfaceStyle,
      cancelable: true,
    });
  };

  const openLink = async (url: string | undefined) => {
    if (url) {
      await WebBrowser.openBrowserAsync(url, {
        controlsColor: colors.lightText,
        secondaryToolbarColor: colors.lightText,
        enableBarCollapsing: true,
        toolbarColor: colors.accent
      });
    }
  };

  const prompt = (
    title: string,
    message: string | undefined = undefined,
    buttonText: string = "Ok",
    handleOnPress: ((text: string) => void) | undefined,
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
          text: buttonText,
          style: "default",
          // @ts-ignore
          onPress: handleOnPress,
        },
        {
          text: cancelText,
          style: "destructive",
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

  return { alert, prompt, openLink };
};

export default useAlert;
