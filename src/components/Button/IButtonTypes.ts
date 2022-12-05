type IButtonVariants = "text" | "contained" | "outlined";
type IButtonSizes = "small" | "medium" | "large";

type IButtonTypes = {
  variant: IButtonVariants;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: () => void;
  children: React.ReactNode;
  size?: IButtonSizes;
};
