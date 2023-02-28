import { StyleSheet } from "react-native";
import typography from "../../constants/typography";
import { WINDOW_WIDTH } from "./../../constants/device/device";
import { GLOBAL_PADDING_HORIZONTAL } from "./../../constants/layout/layout";
export const navHeaderStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: WINDOW_WIDTH * 0.5 - GLOBAL_PADDING_HORIZONTAL,
    textAlign: "center",
  },
  titleText: { textAlign: "center" },
  subTitleText: {
    fontSize: typography.small,
  },
});
