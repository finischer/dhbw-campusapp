import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";
export const notificationSettingsScreenStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    gap: SPACING.m,
  },
  settingRowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.l,
  },
  settingRowTextView: {},
  betaText: {
    opacity: 0.3,
    textAlign: "center",
    marginTop: SPACING.l,
  },
});
