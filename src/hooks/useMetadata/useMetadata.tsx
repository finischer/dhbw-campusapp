import { useState, createContext, useContext, useEffect, useRef } from "react";
import { Platform } from "react-native";
import {
  color,
  interpolateColor,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { darkModeColors, lightModeColors } from "../../constants/colors";
import { IColors } from "../../constants/colors/colors.types";
import { IMetadataContext, IThemeTypes } from "./useMetadata.types";

const MetaDataContext = createContext<IMetadataContext | undefined>(undefined);

const MetaDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<IThemeTypes>("light");
  const colors = theme === "light" ? lightModeColors : darkModeColors;
  const isAndroid = Platform.OS === "android";
  const isIOS = Platform.OS === "ios";

  const changeTheme = (newTheme: IThemeTypes) => {
    setTheme(newTheme);
  };

  return (
    <MetaDataContext.Provider
      value={{ theme, changeTheme, colors, isAndroid, isIOS }}
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
