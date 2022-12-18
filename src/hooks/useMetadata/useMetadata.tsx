import moment from "moment";
import { useState, createContext, useContext, useEffect, useRef } from "react";
import { Platform } from "react-native";
import {
  color,
  interpolateColor,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { darkModeColors, lightModeColors } from "../../constants/colors";
import {
  ILanguageOptions,
  IMetadataContext,
  IThemeTypes,
} from "./useMetadata.types";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import de from "../../constants/translations/de";
import en from "../../constants/translations/en";
import i18next from "i18next";

const translationResources = {
  de,
  en,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: translationResources,
  fallbackLng: "en",
});

const MetaDataContext = createContext<IMetadataContext | undefined>(undefined);

const MetaDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation("common");

  const [theme, setTheme] = useState<IThemeTypes>("light");
  const [language, setLanguage] = useState<ILanguageOptions>("de");
  const colors = theme === "light" ? lightModeColors : darkModeColors;
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";
  const timeFormat = t("timeFormat");
  const dateFormat = t("dateFormat");

  const changeTheme = (newTheme: IThemeTypes) => {
    setTheme(newTheme);
  };

  const changeLanguage = (newLanguage: ILanguageOptions) => {
    setLanguage(newLanguage);
    moment.locale(language);
    i18n.changeLanguage(language);
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
