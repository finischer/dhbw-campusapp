import { IColors } from "./colors.types";

const Colors = {
  red700: "#700310",
  red600: "#D1001A",
  red500: "#E2001A",
  gray800: "#11191f",
  gray700: "#1A262E",
  gray600: "#293743",
  gray500: "#5D686E",
  gray400: "#D5DADD",
  green600: "#43b643",
  green500: "#60b643",
  white: "#eff1f2",
  yellow500: "#FFD95A",
  yellow600: "#FFC107",
};

const darkModeColors: IColors = {
  primary: Colors.gray700,
  primaryDarker: Colors.gray800,
  secondary: Colors.gray400,
  secondaryDarker: Colors.gray500,
  accent: Colors.red600,
  accentDark: Colors.red700,
  container: Colors.gray600,
  success: Colors.green600,
  lightText: Colors.white,
  darkText: Colors.gray700,
  error: Colors.red600,
  danger: Colors.yellow500,
};

const lightModeColors: IColors = {
  primary: Colors.white,
  primaryDarker: Colors.gray400,
  secondary: Colors.gray600,
  secondaryDarker: Colors.gray500,
  accent: Colors.red500,
  accentDark: Colors.red600,
  container: Colors.gray400,
  success: Colors.green500,
  lightText: Colors.white,
  darkText: Colors.gray700,
  error: Colors.red600,
  danger: Colors.yellow600,
};

export { darkModeColors, lightModeColors };
