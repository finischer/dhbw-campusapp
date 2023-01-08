import { StyleSheet } from "react-native";
import { SIZES, SPACING } from "../../../../constants/layout";
import typography from "../../../../constants/typography";

export const subjectRowStyles = StyleSheet.create({
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
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    marginTop: SPACING.sm,
    flexWrap: "wrap",
  },
  bottomText: {
    fontWeight: "400",
    paddingRight: SPACING.m,
    fontSize: typography.small * 1.1,
  },
  subjectStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusIconContainer: {
    left: -12,
  },
  statusIcon: {},
  detailsButtonContainer: {
    justifyContent: "center",
  },
});
