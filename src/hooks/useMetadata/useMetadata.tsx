import moment from "moment";
import { useState, createContext, useContext, useEffect } from "react";
import { Platform } from "react-native";
import { darkModeColors, lightModeColors } from "../../constants/colors";
import {
  ILanguageOptions,
  IMetadataContext,
  IThemeTypes,
} from "./useMetadata.types";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import useAsyncStorage from "../useAsyncStorage";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const MetaDataContext = createContext<IMetadataContext | undefined>(undefined);

const MetaDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } =
    useAsyncStorage();
  const { t } = useTranslation("common");

  const [theme, setTheme] = useState<IThemeTypes>("light");
  const [language, setLanguage] = useState<ILanguageOptions>("de");
  const colors = theme === "light" ? lightModeColors : darkModeColors;
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";
  const timeFormat = t("timeFormat");
  const dateFormat = t("dateFormat");

  useEffect(() => {
    const initializeMetadata = async () => {
      const theme: IThemeTypes = await getDataFromAsyncStorage("theme");

      if (theme) changeTheme(theme);

      const language: ILanguageOptions = await getDataFromAsyncStorage(
        "language"
      );

      if (language) changeLanguage(language);
    };

    initializeMetadata();
  }, []);

  const changeTheme = (newTheme: IThemeTypes) => {
    setTheme(newTheme);
    storeDataInAsyncStorage("theme", newTheme);
  };

  const changeLanguage = (newLanguage: ILanguageOptions) => {
    setLanguage(newLanguage);
    moment.locale(newLanguage);
    i18n.changeLanguage(newLanguage);
    storeDataInAsyncStorage("language", newLanguage);
  };

  return (
    <MetaDataContext.Provider
      value={{
        theme,
        language,
        timeFormat,
        dateFormat,
        colors,
        isAndroid,
        isIOS,
        changeLanguage,
        changeTheme,
      }}
    >
      {children}
    </MetaDataContext.Provider>
  );
};

const useMetadata = () => {
  const context = useContext(MetaDataContext);

  if (context === undefined) {
    throw Error("useMetadata must be used within MetadataProvider");
  }
  return context;
};

export { useMetadata, MetaDataProvider };
