import { TextStyle } from "react-native";

export type IRegularTextVariants = "light" | "dark";

export type IRegularTextTypes = {
  variant?: IRegularTextVariants | null | undefined;
  accentColor?: Boolean;
  weight?: TextStyle["fontWeight"];
  size?: TextStyle["fontSize"];
  style?: TextStyle;
  children: React.ReactNode;
};
