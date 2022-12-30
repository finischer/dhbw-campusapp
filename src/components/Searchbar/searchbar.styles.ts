import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";
export const searchbarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  searchInputContainer: {
    width: "100%",
    marginLeft: SPACING.s,
  },
  clearIconContainer: {
    position: "absolute",
    right: 0,
  },
});
