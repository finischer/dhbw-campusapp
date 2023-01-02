import { View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { GlobalBodyTypes } from "./globalBody.types";
import { globalBodyStyles } from "./globalBody.styles";
import { useMetadata } from "../../hooks/useMetadata";
import Animated, {
  FadeIn,
  FadeOut,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { GLOBAL_PADDING_HORIZONTAL } from "../../constants/layout";
import { darkModeColors, lightModeColors } from "../../constants/colors";

const GlobalBody: React.FC<GlobalBodyTypes> = ({
  children,
  style = {},
  centered = false,
  noPadding = false,
}) => {
  const { theme } = useMetadata();

  const localGlobalBodyStyles = StyleSheet.create({
    container: {
      justifyContent: centered ? "center" : undefined,
      alignItems: centered ? "center" : undefined,
      paddingHorizontal: noPadding ? 0 : GLOBAL_PADDING_HORIZONTAL,
      paddingVertical: noPadding ? 0 : 10,
      paddingBottom: 0,
    },
  });

  const progess = useDerivedValue(() => {
    return withTiming(theme === "dark" ? 1 : 0);
  });

  const rStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progess.value,
      [0, 1],
      [lightModeColors.primary, darkModeColors.primary]
    );

    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[
        globalBodyStyles.container,
        localGlobalBodyStyles.container,
        style,
        rStyles,
      ]}
    >
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[
          globalBodyStyles.container,
          localGlobalBodyStyles.container,
          style,
          { paddingHorizontal: 0, paddingVertical: 0 },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};

export default GlobalBody;
