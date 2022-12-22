import {
  FontAwesome5IconName,
  FontAwesomeIconName,
  IoniconsIconName,
} from "./../../services/expo-vector-icons/expo-vector-icons.types";
import { IconSources } from "./../Icon/icon.types";
import { FeatherIconName } from "../../services/expo-vector-icons/expo-vector-icons.types";

export type IconNames =
  | FeatherIconName
  | FontAwesome5IconName
  | FontAwesomeIconName
  | IoniconsIconName
  | undefined;

type ConditonalLeftIcons =
  | {
      leftIconSource?: "fa";
      leftIcon?: FontAwesomeIconName;
    }
  | {
      leftIconSource?: "fa5";
      leftIcon?: FontAwesome5IconName;
    }
  | {
      leftIconSource?: "feather";
      leftIcon?: FeatherIconName;
    }
  | {
      leftIconSource?: "ionicons";
      leftIcon?: IoniconsIconName;
    }
  | {
      leftIconSource?: undefined;
      leftIcon?: undefined;
    };

type ConditonalRightIcons =
  | {
      rightIconSource?: "fa";
      rightIcon?: FontAwesomeIconName;
    }
  | {
      rightIconSource?: "fa5";
      rightIcon?: FontAwesome5IconName;
    }
  | {
      rightIconSource?: "feather";
      rightIcon?: FeatherIconName;
    }
  | {
      rightIconSource?: "ionicons";
      rightIcon?: IoniconsIconName;
    }
  | {
      rightIconSource?: undefined;
      rightIcon?: undefined;
    };

export type IRegularRowItemProps = {
  onClick?(): void | undefined | Promise<void>;
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  marginTop?: number;
  marginBottom?: number;
} & ConditonalLeftIcons &
  ConditonalRightIcons;
