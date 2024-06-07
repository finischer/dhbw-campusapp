import { IColors } from "../../constants/colors/colors.types";

export type IThemeTypes = "light" | "dark" | "system";

export type IMetadataContext = {
  theme: IThemeTypes;
  language: ILanguageOptions;
  dhbwLocation: DHBWLocation;
  timeFormat: string;
  dateFormat: string;
  changeTheme(newTheme: IThemeTypes): void;
  changeDhbwLocation(newDhbwLocation: DHBWLocation): void;
  changeLanguage(newLanguage: ILanguageOptions): void;
  initializeMetadata(): void;
  colors: IColors;
  isAndroid: boolean;
  isIOS: boolean;
};

export type ILanguageOptions = "de" | "en" | "es";

export type DHBWLocation = "mannheim" | "karlsruhe";
