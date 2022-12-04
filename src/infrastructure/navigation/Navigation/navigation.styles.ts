import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";
import useMetadata from "../../../hooks/useMetadata";
import { IColors } from "../../../constants/colors/colors.types";

export const tabBarStyle = (colors: IColors) => {
  return {
    backgroundColor: colors.primary,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  };
};
