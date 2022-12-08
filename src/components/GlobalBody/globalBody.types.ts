import { ViewStyle, TextStyle, ImageStyle } from "react-native";

export type GlobalBodyTypes = {
  children: React.ReactNode;
  safeAreaView?: Boolean;
  style?: ViewStyle | TextStyle | ImageStyle | {};
};
