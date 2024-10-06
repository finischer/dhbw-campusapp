import { CardStyleInterpolators, StackNavigationOptions } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { useMetadata } from "../useMetadata";
import typography from "../../constants/typography";
import { SPACING } from "../../constants/layout";
import Icon from "../../components/Icon";
import { HEADER_HEIGHT } from "../../infrastructure/navigation/Navigation/config";

export const useHeaderConfig = (): StackNavigationOptions => {
  const { colors, isAndroid } = useMetadata();
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
    headerTitleContainerStyle: {
      // backgroundColor: "green",
      marginBottom: isAndroid ? SPACING.m : undefined,
    },
    headerBackTitle,
    headerTitleAlign: "center",
    headerBackImage: () => (
      <Icon
        source="feather"
        name="chevron-left"
        clickable={false}
        color={colors.lightText}
      />
    ),
  };
};
