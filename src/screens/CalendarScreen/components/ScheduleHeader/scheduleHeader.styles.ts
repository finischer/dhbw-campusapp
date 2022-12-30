import { StyleSheet } from "react-native";
import { SPACING } from "../../../../constants/layout";

export const listHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  headerIconContainer: {
    marginLeft: SPACING.s,
  },
  searchbarContainer: {
    marginBottom: SPACING.m,
    marginTop: SPACING.md,
  },
});
