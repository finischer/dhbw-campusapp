import { ViewStyle } from "react-native";

export type IButtonVariants = "text" | "contained" | "outlined";
type IButtonSizes = "small" | "medium" | "large";

export type IButtonTypes = {
  variant: IButtonVariants;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: any;
  children: React.ReactNode;
  disabled?: boolean;
  size?: IButtonSizes;
  style?: ViewStyle;
};
