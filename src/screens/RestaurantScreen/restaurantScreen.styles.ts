import { GLOBAL_PADDING_HORIZONTAL } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";
import typography from "../../constants/typography";
export const restaurantScreenStyles = StyleSheet.create({
  restaurantNameContainer: {
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
  },
  restaurantNameText: {
    fontWeight: "bold",
    fontSize: typography.h2,
  },
  menuList: {
    paddingBottom: 10,
  },
});
