import { SIZES, SPACING } from "./../../constants/layout/layout";
import { StyleSheet } from "react-native";

export const campusplanScreenStyles = StyleSheet.create({
  infoContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    maxHeight: 320,
    borderRadius: SIZES.borderRadius,
  },
});
