import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";
export const moreScreenStyles = StyleSheet.create({
  switchContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },

  themeSwitchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 150,
  },
  appInfoView: {
    marginTop: SPACING.md,
    gap: SPACING.m,
  },
});
