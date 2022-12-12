import { TAB_BAR_HEIGHT } from "./../../../../infrastructure/navigation/Navigation/config";
import { WINDOW_HEIGHT } from "./../../../../constants/device/device";
import { StyleSheet } from "react-native";
export const subjectListStyles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  chipContainer: {
    marginRight: 5,
    marginBottom: 10,
  },
  subjectListTitleText: {
    fontWeight: "600",
    marginLeft: 3,
    marginTop: 10,
  },
  semesterTitleText: {
    fontWeight: "600",
    marginLeft: 3,
  },
  subjectListContainer: {
    // paddingBottom: 170,
    marginTop: 10,
  },
});
