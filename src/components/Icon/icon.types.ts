import {
  FeatherIconName,
  FontAwesomeIconName,
  FontAwesome5IconName,
  IoniconsIconName,
} from "./../../services/expo-vector-icons/expo-vector-icons.types";

export type IconSources = "fa5" | "fa" | "feather" | "ionicons";

type ConditionalProps =
  | {
      source: "fa5";
      name: FontAwesome5IconName;
    }
  | {
      source: "fa";
      name: FontAwesomeIconName;
    }
  | {
      source: "feather";
      name: FeatherIconName;
    }
  | {
      source: "ionicons";
      name: IoniconsIconName;
    };

export type IIconProps = {
  source: IconSources;
  size?: number;
  color?: string | undefined;
  activeOpacity?: number | undefined;
  onClick?: () => void | undefined;
  clickable?: boolean;
} & ConditionalProps;
