import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type GlobalBodyTypes = {
  children: React.ReactNode;
  style?: ViewStyle | TextStyle | ImageStyle | {};
  noPadding?: boolean;
  centered?: boolean;
};
