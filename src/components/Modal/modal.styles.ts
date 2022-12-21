import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  wrapperContainer: {
    position: "relative",
    flex: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  titleText: {
    fontWeight: "700",
    textAlign: "center",
  },
  subTitleText: {
    opacity: 0.5,
    marginTop: 5,
    textAlign: "center",
  },
  bodyContainer: {
    marginTop: 10,
    flex: 6,
  },
  closeButtonContainer: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 40,
  },
});
