import { StyleSheet } from "react-native";
import { SPACING } from "../../constants/layout";

export const generalButtonStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: SPACING.md,
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
    fontWeight: "500",
  },
});

export const containedVariantStyle = StyleSheet.create({
  container: {
    padding: 1,
  },
  text: {},
});

export const outlinedVariantStyle = StyleSheet.create({
  container: {
    borderWidth: 1,
  },
  text: {},
});
