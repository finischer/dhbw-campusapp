import { StyleSheet } from "react-native";
import { GLOBAL_PADDING_HORIZONTAL } from "../../constants/layout";

export const globalBodyStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: GLOBAL_PADDING_HORIZONTAL,
    paddingBottom: 0,
    flex: 1,
  },
});
