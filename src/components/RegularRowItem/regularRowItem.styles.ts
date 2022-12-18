import { StyleSheet } from "react-native";
export const regularRowItemStyles = StyleSheet.create({
  container: {
    height: 50,
    paddingLeft: 20,
    paddingRight: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  leftContainer: {
    flexDirection: "row",
  },
  text: {},
  leftIconContainer: {
    paddingRight: 10,
  },
  rightIconContainer: {},
});
