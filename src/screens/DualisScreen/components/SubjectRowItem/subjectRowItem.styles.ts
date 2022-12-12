import { StyleSheet } from "react-native";
import typography from "../../../../constants/typography";

export const subjectRowStyles = StyleSheet.create({
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
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    marginTop: 10,
    flexWrap: "wrap",
  },
  bottomText: {
    fontWeight: "400",
    paddingRight: 10,
    fontSize: typography.small * 1.1,
  },
  subjectStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusIconContainer: {
    left: -10,
  },
  statusIcon: {},
  detailsButtonContainer: {
    justifyContent: "center",
  },
});
