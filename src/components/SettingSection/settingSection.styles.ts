import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";

export const settingSectionStyles = StyleSheet.create({
  sectionView: {
    paddingVertical: SPACING.md,
  },
  sectionTitleView: {},
  sectionTitleText: {
    textTransform: "uppercase",
    opacity: 0.6,
  },
});
