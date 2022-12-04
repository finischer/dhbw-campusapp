type IButtonVariants = "text" | "contained" | "outlined";

type IButtonTypes = {
  variant: IButtonVariants;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: () => void;
  children: React.ReactNode;
};
