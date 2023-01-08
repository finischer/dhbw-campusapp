import { GLOBAL_PADDING_HORIZONTAL } from "./../../constants/layout/layout";
import { WINDOW_WIDTH } from "./../../constants/device/device";
import { StyleSheet } from "react-native";
export const navHeaderStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: WINDOW_WIDTH * 0.5 - GLOBAL_PADDING_HORIZONTAL,
  },
  subTitleText: {},
});
