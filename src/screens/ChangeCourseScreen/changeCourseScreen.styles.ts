import { SPACING } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";

export const changeCourseScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbarContainer: {
    marginBottom: SPACING.sm,
  },
  noCoursesFoundContainer: {
    alignSelf: "center",
    marginTop: SPACING.xxl,
    paddingHorizontal: SPACING.xxl,
  },
  noCoursesFoundText: {
    textAlign: "center",
  },
});
