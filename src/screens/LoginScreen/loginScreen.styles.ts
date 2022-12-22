import { StyleSheet } from "react-native";

export const loginScreenStyles = StyleSheet.create({
  wrapperView: {
    flex: 1,
    justifyContent: "center",
  },
  contentView: {
    paddingHorizontal: 20,
    justifyContent: "space-evenly",
  },
  title: {},
  inputFields: {
    height: 150,
    justifyContent: "space-around",
  },
  passwordContainer: {
    flexDirection: "row",
  },
  loginButton: {
    marginTop: 30,
    minHeight: 50,
  },
  stayLoggedInContainer: {
    marginTop: 20,
  },
  stayLoggedInButtonText: {
    textDecorationLine: "none",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  errorContainer: {
    minHeight: 20,
  },
});
