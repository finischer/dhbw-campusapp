import { WINDOW_WIDTH } from "./../../constants/device/device";
import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";
export const errorViewStyles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  errorText: {
    opacity: 0.3,
  },
  retryButton: {},
  buttonsContainer: {
    marginTop: SPACING.m,
    maxWidth: WINDOW_WIDTH * 0.7,
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
});
