import { StyleSheet } from "react-native";
import { CARD_WIDTH } from "../MenuItem/menuItem.styles";

export const menuListStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },
  noOfferTodayContainer: {
    height: 200,
    width: CARD_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    paddingVertical: 10,
  },
  dateText: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
