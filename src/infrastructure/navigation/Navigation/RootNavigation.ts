import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./navigation.types";

export const navigationRef = createNavigationContainerRef();

export function navigate<RouteName extends keyof RootStackParamList>(
  name: string,
  params?: RootStackParamList[RouteName]
) {
  console.log("is navigation ref ready? ", navigationRef.isReady());
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  } else {
    console.log("Try again!");
    setTimeout(() => navigate(name, params), 100);
  }
}
