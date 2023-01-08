import { Ref } from "react";
import { TextInputProps } from "react-native";

export type IInputProps = Partial<TextInputProps> & {
  label: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  floatingLabel?: boolean;
  noBorder?: boolean;
};
