type IButtonTypes = {
  variant: "text" | "contained" | "outlined";
  leftIcon?: any;
  rightIcon?: any;
  onClick?: () => void;
  children: React.ReactNode;
};
