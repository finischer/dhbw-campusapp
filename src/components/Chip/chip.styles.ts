import { StyleSheet } from "react-native";
import typography from "../../constants/typography";
export const chipStyles = StyleSheet.create({
  container: {
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    fontSize: typography.small * 1.1,
  },
});
