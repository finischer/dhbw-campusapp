import { IColors } from "../../constants/colors/colors.types";

export type IThemeTypes = "light" | "dark" | "system";

export type IMetadataContext = {
  theme: IThemeTypes;
  language: ILanguageOptions;
  timeFormat: string;
  dateFormat: string;
  changeTheme(newTheme: IThemeTypes): void;
  changeLanguage(newLanguage: ILanguageOptions): void;
  colors: IColors;
  isAndroid: boolean;
  isIOS: boolean;
};

export type ILanguageOptions = "de" | "en";
