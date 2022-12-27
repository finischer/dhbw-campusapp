import { SPACING } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";

export const calendarScreenStyles = StyleSheet.create({
  listHeaderContainer: {
    flexDirection: "row",
    paddingVertical: SPACING.md,
  },
  headerIconContainer: {
    marginLeft: SPACING.s,
  },
  noLecturesContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.xxl,
  },
});
