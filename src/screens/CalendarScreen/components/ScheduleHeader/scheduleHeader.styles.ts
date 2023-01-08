import { StyleSheet } from "react-native";
import { SPACING } from "../../../../constants/layout";

export const listHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  searchbarContainer: {
    marginBottom: SPACING.m,
    marginTop: SPACING.md,
  },
});
