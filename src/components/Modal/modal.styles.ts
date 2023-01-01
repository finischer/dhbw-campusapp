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
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    zIndex: 999,
    elevation: 6,
  },
});
