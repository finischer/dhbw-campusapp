import { IColors } from "./colors.types";

const Colors = {
  red600: "#D1001A",
  red500: "#E2001A",
  gray700: "#1A262E",
  gray600: "#293743",
  gray500: "#5D686E",
  gray400: "#D5DADD",
  green600: "#43b643",
  green500: "#60b643",
  white: "#eff1f2",
};

const darkModeColors: IColors = {
  primary: Colors.gray700,
  secondary: Colors.gray400,
  accent: Colors.red600,
  container: Colors.gray600,
  success: Colors.green600,
  lightText: Colors.white,
  darkText: Colors.gray700,
  error: Colors.red600,
};

const lightModeColors: IColors = {
  primary: Colors.white,
  secondary: Colors.gray600,
  accent: Colors.red500,
  container: Colors.gray400,
  success: Colors.green500,
  lightText: Colors.white,
  darkText: Colors.gray700,
  error: Colors.red600,
};

export { darkModeColors, lightModeColors };
