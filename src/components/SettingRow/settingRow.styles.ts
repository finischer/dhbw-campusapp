import { StyleSheet } from "react-native";
import { SIZES, SPACING } from "../../constants/layout";

export const settingRowStyles = StyleSheet.create({
  settingRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.l,
    borderRadius: SIZES.borderRadius,
  },
  settingRowLeftView: {
    flex: 1,
  },
  settingRowRightView: {
    paddingLeft: SPACING.l,
  },
  settingRowTextTitle: {
    paddingBottom: SPACING.s,
  },
  settingRowTextSubtitle: {},
});
