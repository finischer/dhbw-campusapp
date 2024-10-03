import { WINDOW_HEIGHT } from "../../../constants/device/device";
import { INavigationIcons } from "./navigation.types";

export const TAB_BAR_HEIGHT = WINDOW_HEIGHT * 0.1;
export const HEADER_HEIGHT = WINDOW_HEIGHT * 0.11;

// Until now only FeatherIcons allowed
export const TAB_BAR_ICON_NAMES: INavigationIcons = {
  dualis: "home",
  cafeteria: "coffee",
  calendar: "calendar",
  more: "more-horizontal",
};
