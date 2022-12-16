import { StyleSheet } from "react-native";
export const menuItemStyles = StyleSheet.create({
  container: {
    marginBottom: 5,
    minHeight: 100,
    padding: 15,
    borderRadius: 10,
  },
  menuNameText: {
    fontWeight: "bold",
  },
  menuDescriptionText: {
    marginTop: 5,
  },
  bottomContainer: {
    marginTop: 15,
    alignItems: "flex-end",
  },
  priceText: {
    fontWeight: "700",
  },
});
