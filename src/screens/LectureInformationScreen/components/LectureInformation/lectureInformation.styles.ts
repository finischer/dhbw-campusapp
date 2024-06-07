import { StyleSheet } from "react-native";
import { SIZES, SPACING } from "../../../../constants/layout";

export const lectureInformationStyles = StyleSheet.create({
  container: {
    // gap: SPACING.s,
    padding: SPACING.m,
    borderRadius: SIZES.borderRadius,
  },
  smallTitle: {
    fontSize: SIZES.sm,
    fontWeight: "bold",
    opacity: 0.7,
  },
  infoContainer: {},
  infoContainerWrapper: {
    gap: SPACING.sm,
    marginTop: SPACING.m,
  },
});
