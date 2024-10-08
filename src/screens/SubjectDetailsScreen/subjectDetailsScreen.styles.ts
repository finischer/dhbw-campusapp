import { StyleSheet } from "react-native";
import typography from "../../constants/typography";
export const subjectDetailsScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  subjectNameText: {
    fontWeight: "bold",
    fontSize: typography.h3,
    textAlign: "center",
  },
  semesterNameText: {
    opacity: 0.5,
    marginTop: 5,
  },
  examsContainer: {
    flex: 6,
  },
  emptyExamsListText: {
    marginTop: 10,
    textAlign: "center",
  },
  examsTitleText: {
    fontWeight: "700",
  },
  examsList: {
    marginTop: 10,
    flex: 1,
  },
});
