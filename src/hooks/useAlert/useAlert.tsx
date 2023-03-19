import { useTranslation } from "react-i18next";
import { Alert, AlertType, Linking } from "react-native";
import { useMetadata } from "../useMetadata";

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

  const openLink = async (url: string | undefined) => {
    if (url) {
      const canOpenUrl = await Linking.canOpenURL(url);
      if (canOpenUrl) {
        await Linking.openURL(url);
      } else {
        alert(t("common:errorOccured"), t("common:alertUrlError"));
      }
    }
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
