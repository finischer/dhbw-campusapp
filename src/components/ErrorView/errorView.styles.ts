import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";
export const errorViewStyles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  retryButton: {},
  buttonsContainer: {
    marginTop: SPACING.m,
    flexDirection: "row",
    alignItems: "center",
  },
});
