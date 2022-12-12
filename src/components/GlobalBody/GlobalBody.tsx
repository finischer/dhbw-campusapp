import { View, SafeAreaView } from "react-native";
import React from "react";
import { GlobalBodyTypes } from "./globalBody.types";
import { globalBodyStyles } from "./globalBody.styles";
import { useMetadata } from "../../hooks/useMetadata";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const GlobalBody: React.FC<GlobalBodyTypes> = ({
  children,
  safeAreaView = false,
  style = {},
}) => {
  const { colors } = useMetadata();

  const localGlobalBodyStyles = { backgroundColor: colors.primary };

  if (safeAreaView) {
    return (
      <SafeAreaView
        style={[globalBodyStyles.container, localGlobalBodyStyles, style]}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={[globalBodyStyles.container, localGlobalBodyStyles, style]}>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={[
          globalBodyStyles.container,
          localGlobalBodyStyles,
          style,
          { paddingHorizontal: 0, paddingVertical: 0 },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default GlobalBody;
