import {
  GLOBAL_PADDING_HORIZONTAL,
  SIZES,
  SPACING,
} from "./../../../../constants/layout/layout";
import { WINDOW_WIDTH } from "./../../../../constants/device/device";
import { StyleSheet } from "react-native";

export const CARD_WIDTH = WINDOW_WIDTH - GLOBAL_PADDING_HORIZONTAL * 2;

export const menuItemStyles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sm,
    minHeight: 100,
    padding: SPACING.md,
    borderRadius: SIZES.borderRadius,
    width: CARD_WIDTH,
  },
  menuNameText: {
    fontWeight: "bold",
  },
  menuDescriptionText: {
    marginTop: SPACING.s,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.md,
    alignItems: "flex-end",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconContainer: {},
  priceText: {
    fontWeight: "700",
  },
});
