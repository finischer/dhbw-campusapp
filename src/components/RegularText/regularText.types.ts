import { TextStyle } from "react-native";

export type IRegularTextVariants = "light" | "dark";

export type IRegularTextTypes = {
  variant?: IRegularTextVariants | null | undefined;
  style?: TextStyle;
  children: React.ReactNode;
};
