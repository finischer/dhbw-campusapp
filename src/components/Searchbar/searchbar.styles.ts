import { SPACING } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";

export const searchbarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: SPACING.s,
  },
  searchInputContainer: {
    marginLeft: SPACING.s,
    flex: 1,
    paddingRight: SPACING.xl,
  },
  clearIconContainerWrapper: {
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    right: 0,
    width: 40,
    height: 40,
  },
  clearIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: 20,
    borderRadius: 100,
  },
});
