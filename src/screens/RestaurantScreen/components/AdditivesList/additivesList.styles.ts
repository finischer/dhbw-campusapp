import { StyleSheet } from "react-native";

const SUB_LINE_HEIGHT = 10;

export const additivesListStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 30,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  togglerContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  labelText: {},
  subText: {
    fontSize: 10,
    lineHeight: SUB_LINE_HEIGHT,
  },
});
