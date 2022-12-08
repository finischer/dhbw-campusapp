import { GestureResponderEvent } from "react-native";

export type IButtonVariants = "text" | "contained" | "outlined";
type IButtonSizes = "small" | "medium" | "large";

export type IButtonTypes = {
  variant: IButtonVariants;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: any;
  children: React.ReactNode;
  size?: IButtonSizes;
};
