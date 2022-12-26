import { StyleSheet } from "react-native";
import { SIZES, SPACING } from "../../../../constants/layout";
import typography from "../../../../constants/typography";

export const dateHeaderStyles = StyleSheet.create({
  container: {
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.s,
    marginBottom: SPACING.sm,
  },
  text: {
    fontSize: typography.body,
  },
});
