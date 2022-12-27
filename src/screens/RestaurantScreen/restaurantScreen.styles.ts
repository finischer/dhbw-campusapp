import { SPACING } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";

export const restaurantScreenStyles = StyleSheet.create({
  restaurantNameContainer: {
    paddingVertical: SPACING.md,
    flex: 1,
    flexDirection: "row",
  },
  menuList: {
    paddingBottom: SPACING.m,
  },
});
