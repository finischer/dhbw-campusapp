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
  loginButton: {
    marginTop: 50,
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
