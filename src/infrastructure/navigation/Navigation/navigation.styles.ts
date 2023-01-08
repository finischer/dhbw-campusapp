import { IColors } from "../../../constants/colors/colors.types";
import { TAB_BAR_HEIGHT } from "./config";

export const tabBarStyle = (colors: IColors) => {
  return {
    backgroundColor: colors.primary,
    height: TAB_BAR_HEIGHT,
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
