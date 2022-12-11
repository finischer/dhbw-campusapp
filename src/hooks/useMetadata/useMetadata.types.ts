import { IColors } from "../../constants/colors/colors.types";

export type IThemeTypes = "light" | "dark" | "system";

export type IMetadataContext = {
  theme: IThemeTypes;
  changeTheme(newTheme: IThemeTypes): void;
  colors: IColors;
  isAndroid: boolean;
  isIOS: boolean;
};
