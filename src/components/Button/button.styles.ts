import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";

export const generalButtonStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const textVariantStyle = StyleSheet.create({
  container: {},
  text: {
    color: "green",
  },
});

export const containedVariantStyle = StyleSheet.create({
  container: {
    padding: 1,
    backgroundColor: "green",
  },
  text: {
    color: "white",
  },
});

export const outlinedVariantStyle = StyleSheet.create({
  container: {
    borderColor: "green",
    borderWidth: 1,
  },
  text: {
    color: "green",
  },
});
