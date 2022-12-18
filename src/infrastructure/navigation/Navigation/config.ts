import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { WINDOW_HEIGHT } from "../../../constants/device/device";
import typography from "../../../constants/typography";
import { useMetadata } from "../../../hooks/useMetadata";
import { INavigationIcons } from "./navigation.types";

export const TAB_BAR_HEIGHT = WINDOW_HEIGHT * 0.1;
export const HEADER_HEIGHT = WINDOW_HEIGHT * 0.1;

export const headerConfig = (): StackNavigationOptions => {
  const { colors } = useMetadata();

  return {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerMode: "screen",
    headerStyle: {
      height: HEADER_HEIGHT,
      backgroundColor: colors.accent,
      shadowColor: "transparent",
    },
    headerTintColor: colors.lightText,
    headerTitleStyle: {
      fontFamily: typography.Bold,
      alignSelf: "center",
    },
    headerBackTitle: "Zurück",
    headerTitleAlign: "center",
    headerRightContainerStyle: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
    },
  };
};

// Until now only FeatherIcons allowed
export const TAB_BAR_ICON_NAMES: INavigationIcons = {
  dualis: "home",
  cafeteria: "coffee",
  calendar: "calendar",
  more: "more-horizontal",
};
