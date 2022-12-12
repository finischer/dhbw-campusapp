import { TextInputProps, TextStyle } from "react-native";

export type IRegularTextVariants = "light" | "dark";

export type IRegularTextTypes = Partial<TextInputProps> & {
  variant?: IRegularTextVariants | null | undefined;
  accentColor?: Boolean;
  weight?: TextStyle["fontWeight"];
  size?: TextStyle["fontSize"];
  style?: TextStyle | TextStyle[] | {};
  children: React.ReactNode;
};
