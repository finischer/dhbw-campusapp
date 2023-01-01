import { SIZES, SPACING } from "./../../../../constants/layout/layout";
import { StyleSheet } from "react-native";
import typography from "../../../../constants/typography";

export const lectureRowItemStyles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.borderRadius,
    paddingVertical: SPACING.md,
    paddingRight: SPACING.md,
  },
  column1: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: SPACING.m,
  },
  column2: {
    flex: 3,
    flexDirection: "row",
    paddingHorizontal: SPACING.m,
  },
  column3: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  column3text: {
    textAlign: "center",
  },
  column1text: {
    fontSize: typography.small,
  },
  column1TimeDivider: {
    textAlign: "center",
  },
});
