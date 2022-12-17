import { GLOBAL_PADDING_HORIZONTAL } from "./../../../../constants/layout/layout";
import { WINDOW_WIDTH } from "./../../../../constants/device/device";
import { StyleSheet } from "react-native";
export const menuItemStyles = StyleSheet.create({
  container: {
    marginBottom: 5,
    minHeight: 100,
    padding: 15,
    borderRadius: 10,
    width: WINDOW_WIDTH * 0.8,
  },
  menuNameText: {
    fontWeight: "bold",
  },
  menuDescriptionText: {
    marginTop: 5,
  },
  bottomContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  priceText: {
    fontWeight: "700",
  },
});
