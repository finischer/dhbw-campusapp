import moment from "moment";
import { useState, createContext, useContext } from "react";
import { Platform } from "react-native";
import { darkModeColors, lightModeColors } from "../../constants/colors";
import {
  ILanguageOptions,
  IMetadataContext,
  IThemeTypes,
} from "./useMetadata.types";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const MetaDataContext = createContext<IMetadataContext | undefined>(undefined);

const MetaDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation("common");

  const [theme, setTheme] = useState<IThemeTypes>("light");
  const [language, setLanguage] = useState<ILanguageOptions>("en");
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
    moment.locale(newLanguage);
    i18n.changeLanguage(newLanguage);
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
