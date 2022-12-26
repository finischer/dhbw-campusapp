import { SIZES } from "./../../../../../constants/layout/layout";
import { StyleSheet } from "react-native";
import { SPACING } from "../../../../../constants/layout";
import typography from "../../../../../constants/typography";

export const examsRowStyles = StyleSheet.create({
  container: {
    padding: SPACING.m,
    marginBottom: SPACING.sm,
    flexDirection: "row",
    borderRadius: SIZES.borderRadius,
    justifyContent: "space-between",
  },
  contentContainer: {
    maxWidth: "90%",
  },
  subjectName: {
    fontSize: typography.body,
    fontWeight: "600",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: SPACING.sm,
  },
  bottomText: {
    fontWeight: "400",
    fontSize: typography.small * 1.1,
    width: 150,
  },
  subjectStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIconContainer: {
    position: "absolute",
    right: -15,
  },
  detailsButtonContainer: {
    justifyContent: "center",
  },
});
