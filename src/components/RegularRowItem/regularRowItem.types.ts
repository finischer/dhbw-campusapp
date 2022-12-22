import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";

export type IRegularRowItemProps = {
  onClick?(): void | undefined | Promise<void>;
  leftIcon?: FeatherIconName | undefined;
  rightIcon?: FeatherIconName | undefined;
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  marginTop?: number;
  marginBottom?: number;
};
