import i18next from "i18next";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { darkModeColors, lightModeColors } from "../../constants/colors";
import useAsyncStorage from "../useAsyncStorage";
import {
  DHBWLocation,
  ILanguageOptions,
  IMetadataContext,
  IThemeTypes
} from "./useMetadata.types";

const MetaDataContext = createContext<IMetadataContext | undefined>(undefined);

const MetaDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } =
    useAsyncStorage();
  const { t } = useTranslation("common");

  const [theme, setTheme] = useState<IThemeTypes>("light");
  const [language, setLanguage] = useState<ILanguageOptions>("de");
  const [dhbwLocation, setDhbwLocation] = useState<DHBWLocation>("mannheim");
  const colors = theme === "light" ? lightModeColors : darkModeColors;
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";
  const timeFormat = t("timeFormat");
  const dateFormat = t("dateFormat");

  useEffect(() => {
    initializeMetadata();
  }, []);

  const initializeMetadata = async () => {
    const theme: IThemeTypes = await getDataFromAsyncStorage("theme");

    if (theme) changeTheme(theme);

    const language: ILanguageOptions = await getDataFromAsyncStorage(
      "language"
    );

    if (language) changeLanguage(language);

    const dhbwLocation: DHBWLocation = await getDataFromAsyncStorage("dhbwLocation");

    if (dhbwLocation) changeDhbwLocation(dhbwLocation);


  };

  const changeTheme = (newTheme: IThemeTypes) => {
    setTheme(newTheme);
    storeDataInAsyncStorage("theme", newTheme);
  };

  const changeLanguage = async (newLanguage: ILanguageOptions) => {
    if (language !== newLanguage) {
      i18next.changeLanguage(newLanguage, (err, t) => {
        if (err)
          return console.error("Error while loading new language: ", err);
        setLanguage(newLanguage);
        storeDataInAsyncStorage("language", newLanguage);
      });
    }
  };

  const changeDhbwLocation = (newDhbwLocation: DHBWLocation) => {
    setDhbwLocation(newDhbwLocation)
    storeDataInAsyncStorage("dhbwLocation", dhbwLocation);
  }

  return (
    <MetaDataContext.Provider
      value={{
        theme,
        language,
        dhbwLocation,
        timeFormat,
        dateFormat,
        colors,
        isAndroid,
        isIOS,
        changeLanguage,
        changeTheme,
        changeDhbwLocation,
        initializeMetadata,
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

