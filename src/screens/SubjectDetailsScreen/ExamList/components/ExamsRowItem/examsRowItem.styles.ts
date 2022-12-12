import { StyleSheet } from "react-native";
import typography from "../../../../../constants/typography";

export const examsRowStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 7,
    flexDirection: "row",
    borderRadius: 5,
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
    marginTop: 10,
  },
  bottomText: {
    fontWeight: "400",
    paddingRight: 10,
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
