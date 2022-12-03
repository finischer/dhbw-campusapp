import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";

export const headerConfig: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerMode: "screen",
  headerStyle: {
    backgroundColor: "green",
    shadowColor: "transparent",
  },
  headerTintColor: "green",
  headerTitleStyle: {
    //   fontFamily: Typography.Bold,
    alignSelf: "center",
  },
  headerBackTitle: "Zurück",
  headerTitleAlign: "center",
};
