import { View, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { GlobalBodyTypes } from "./globalBody.types";
import { globalBodyStyles } from "./globalBody.styles";
import { useMetadata } from "../../hooks/useMetadata";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const GlobalBody: React.FC<GlobalBodyTypes> = ({
  children,
  safeAreaView = false,
  style = {},
  centered = false,
}) => {
  const { colors } = useMetadata();

  const localGlobalBodyStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      justifyContent: centered ? "center" : undefined,
      alignItems: centered ? "center" : undefined,
    },
  });

  if (safeAreaView) {
    return (
      <SafeAreaView
        style={[
          globalBodyStyles.container,
          localGlobalBodyStyles.container,
          style,
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
      </SafeAreaView>
    );
  }

  return (
    <View
      style={[
        globalBodyStyles.container,
        localGlobalBodyStyles.container,
        style,
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
    </View>
  );
};

export default GlobalBody;
