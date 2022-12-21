import {
  CardStyleInterpolators,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { WINDOW_HEIGHT } from "../../../constants/device/device";
import typography from "../../../constants/typography";
import { useMetadata } from "../../../hooks/useMetadata";
import { INavigationIcons } from "./navigation.types";
import FeatherIcon from "../../../components/FeatherIcon";
import { useTranslation } from "react-i18next";

export const TAB_BAR_HEIGHT = WINDOW_HEIGHT * 0.1;
export const HEADER_HEIGHT = WINDOW_HEIGHT * 0.1;

export const headerConfig = (): StackNavigationOptions => {
  const { colors } = useMetadata();
  const { t } = useTranslation("common");
  const headerBackTitle = t("back");

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
    headerBackTitle,
    headerTitleAlign: "center",
    headerBackImage: () => (
      <FeatherIcon
        name="chevron-left"
        clickable={false}
        color={colors.lightText}
      />
    ),
  };
};

// Until now only FeatherIcons allowed
export const TAB_BAR_ICON_NAMES: INavigationIcons = {
  dualis: "home",
  cafeteria: "coffee",
  calendar: "calendar",
  more: "more-horizontal",
};
