import { LayoutAnimation } from "react-native";
import { FadeInLeft } from "react-native-reanimated";

export const toggleAnimation = {
  duration: 300,
  update: {
    duration: 300,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

export const enteringDelayedAnimation = (index: number) =>
  FadeInLeft.delay(30 * index);
