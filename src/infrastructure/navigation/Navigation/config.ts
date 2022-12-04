import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import typography from "../../../constants/typography";
import useMetadata from "../../../hooks/useMetadata";
import { INavigationIcons } from "./navigation.types";

export const TAB_BAR_HEIGHT = 97;
export const HEADER_HEIGHT = 93;

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
  };
};

// Until now only FeatherIcons allowed
export const TAB_BAR_ICON_NAMES: INavigationIcons = {
  dualis: "home",
  cafeteria: "coffee",
  calendar: "calendar",
  more: "more-horizontal",
};
