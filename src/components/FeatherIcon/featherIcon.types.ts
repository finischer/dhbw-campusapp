import { IColors } from "../../constants/colors/colors.types";
import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";

export type IFeatherIconProps = {
  name: FeatherIconName;
  size?: number;
  color?: string | undefined;
  activeOpacity?: number | undefined;
  onClick?: () => void | undefined;
};
