import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";

export type ICloseButtonProps = {
  onClick?(): void;
  iconName: FeatherIconName;
};
