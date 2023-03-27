import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  wrapperContainer: {
    position: "relative",
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
    flex: 1,
  },
  closeButtonContainer: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    zIndex: 999,
    elevation: 6,
  },
});
