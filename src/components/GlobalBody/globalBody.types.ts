import { View, SafeAreaView } from "react-native";

export type GlobalBodyTypes = {
  children: React.ReactNode;
  safeAreaView?: Boolean;
  style?: View | SafeAreaView | {};
};
