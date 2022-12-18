import { CARD_WIDTH } from "./../MenuItem/menuItem.styles";
import { GLOBAL_PADDING_HORIZONTAL } from "./../../../../constants/layout/layout";
import { WINDOW_WIDTH } from "./../../../../constants/device/device";
import { StyleSheet } from "react-native";

export const menuListStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: GLOBAL_PADDING_HORIZONTAL,
    width: WINDOW_WIDTH,
  },
  noOfferTodayContainer: {
    height: 200,
    width: CARD_WIDTH,
    paddingHorizontal: GLOBAL_PADDING_HORIZONTAL,
    alignItems: "center",
    justifyContent: "center",
  },
  noOfferTodayText: {
    textAlign: "center",
  },
  dateContainer: {
    paddingVertical: 10,
  },
  dateText: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
