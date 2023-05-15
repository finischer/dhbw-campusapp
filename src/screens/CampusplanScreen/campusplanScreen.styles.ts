import { SIZES, SPACING } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";

export const campusplanScreenStyles = StyleSheet.create({
  infoContainer: {
    flex: 1.5,
    marginTop: SPACING.xl,
    gap: SPACING.xl,
  },
  image: {
    flex: 1,
    height: 300,
    width: "100%",
    borderRadius: SIZES.borderRadius,
    marginTop: SPACING.l,
  },
  infoSection: {
    gap: SPACING.m,
  },
  openingHoursSection: {
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
});
