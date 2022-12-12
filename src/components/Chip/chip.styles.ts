import { StyleSheet } from "react-native";
import typography from "../../constants/typography";
export const chipStyles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: typography.small * 1.1,
  },
});
