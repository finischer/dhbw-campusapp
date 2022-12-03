import {
  CardStyleInterpolators,
  StackNavigationOptions,
} from "@react-navigation/stack";
import typography from "../../../constants/typography";

export const headerConfig: StackNavigationOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerMode: "screen",
  headerStyle: {
    backgroundColor: "red",
    shadowColor: "transparent",
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: typography.Bold,
    alignSelf: "center",
  },
  headerBackTitle: "Zurück",
  headerTitleAlign: "center",
};
