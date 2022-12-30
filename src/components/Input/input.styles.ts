import { StyleSheet } from "react-native";
import typography from "../../constants/typography";

export const inputStyles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flex: 1,
  },
  inputField: {
    height: 26,
    fontSize: typography.body,
  },
  rightIconContainer: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  leftIconContainer: {},
});
