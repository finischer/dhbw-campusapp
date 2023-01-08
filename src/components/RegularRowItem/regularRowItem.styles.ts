import { SIZES } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";
export const regularRowItemStyles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: SPACING.m,
    borderRadius: SIZES.borderRadius,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  leftContainer: {
    flexDirection: "row",
  },
  text: {},
  leftIconContainer: {
    paddingRight: SPACING.m,
  },
  rightIconContainer: {},
});
