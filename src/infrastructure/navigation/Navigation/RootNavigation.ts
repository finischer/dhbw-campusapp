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

// Assuming you have a navigationRef already set up
export function navigateToNestedScreen(screenPath: string, params: any) {
  const screens = screenPath.split(".");
  if (screens.length === 0) {
    console.error("Invalid screen path");
    return;
  }

  // Start with the innermost screen and its params
  let navigationParams = params;

  // Build the navigation params from the innermost screen upwards
  for (let i = screens.length - 1; i > 0; i--) {
    navigationParams = {
      screen: screens[i],
      params: navigationParams,
    };
  }
  // Now, navigationParams is the params object for the top-level screen
  // Navigate to the top-level screen with the built navigationParams
  // @ts-ignore

  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(screens[0], navigationParams);
  } else {
    console.log("Try again!");
    setTimeout(() => navigateToNestedScreen(screenPath, params), 100);
  }
}
