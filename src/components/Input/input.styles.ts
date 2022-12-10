import { StyleSheet } from "react-native";
import typography from "../../constants/typography";

export const inputStyles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    paddingTop: 18,
  },
  inputField: {
    height: 26,
    fontSize: typography.body,
    borderBottomWidth: 1,
  },
  rightIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 5,
  },
});
