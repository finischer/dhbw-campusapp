import { StyleSheet } from "react-native";
import { SPACING } from "../../../../constants/layout";
export const subjectListStyles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACING.sm,
  },
  chipContainer: {
    marginRight: SPACING.s,
    marginBottom: SPACING.sm,
  },
  subjectListTitleText: {
    fontWeight: "600",
    marginLeft: 3,
    marginVertical: SPACING.sm,
  },
  semesterTitleText: {
    fontWeight: "600",
    marginLeft: SPACING.s,
  },
  subjectListContainer: {
    paddingBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  requestTimeContainer: {
    alignItems: "center",
    paddingVertical: SPACING.m,
  },
  requestTimeText: {
    opacity: 0.3,
  },
});
