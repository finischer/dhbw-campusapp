import { GLOBAL_PADDING_HORIZONTAL } from "./../../../../constants/layout/layout";
import { WINDOW_WIDTH } from "./../../../../constants/device/device";
import { StyleSheet } from "react-native";

export const CARD_WIDTH = WINDOW_WIDTH - GLOBAL_PADDING_HORIZONTAL * 2;

export const menuItemStyles = StyleSheet.create({
  container: {
    marginBottom: 5,
    minHeight: 100,
    padding: 15,
    borderRadius: 5,
    width: CARD_WIDTH,
  },
  menuNameText: {
    fontWeight: "bold",
  },
  menuDescriptionText: {
    marginTop: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    alignItems: "flex-end",
  },
  iconsContainer: {
    // backgroundColor: "red",
    flexDirection: "row",
  },
  iconContainer: {},
  priceText: {
    fontWeight: "700",
  },
});
