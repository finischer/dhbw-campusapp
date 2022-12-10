import { TextInputProps } from "react-native";

export type IInputProps = Partial<TextInputProps> & {
  label: string;
  rightIcon?: React.ReactNode;
};
