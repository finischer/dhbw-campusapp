import { IconSources } from "../../../../components/Icon/icon.types";
import {
  FontAwesome5IconName,
  MaterialCommunityIconName,
} from "../../../../services/expo-vector-icons/expo-vector-icons.types";

export type MenuIconNames =
  | "fish"
  | "carrot"
  | "leaf"
  | "cow"
  | "sheep"
  | "pig"
  | "chicken"
  | "deer"
  | "shellfish";

export type IMenuIconProps = {
  name: MenuIconNames;
};

export type IconToSourceTypes = {
  [key: string]: {
    iconSource: IconSources;
    iconName: MaterialCommunityIconName | FontAwesome5IconName;
  };
};
