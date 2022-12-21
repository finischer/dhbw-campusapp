import { StyleSheet } from "react-native";
import typography from "../../constants/typography";

export const restaurantScreenStyles = StyleSheet.create({
  restaurantNameContainer: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  restaurantNameText: {
    fontWeight: "bold",
    fontSize: typography.h3,
  },
  menuList: {
    paddingBottom: 10,
  },
});
