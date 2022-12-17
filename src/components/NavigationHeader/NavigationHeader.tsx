import { View } from "react-native";
import React from "react";
import { INavigationHeaderProps } from "./NavigationHeader.types";
import RegularText from "../RegularText";
import typography from "../../constants/typography";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

const NavigationHeader = ({ title, subTitle = "" }: INavigationHeaderProps) => {
  return (
    <Animated.View
      style={{
        alignItems: "center",
      }}
      layout={Layout}
    >
      <RegularText variant="light" weight="bold">
        {title}
      </RegularText>
      {subTitle && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
        >
          <RegularText variant="light" style={{ fontSize: typography.small }}>
            {subTitle}
          </RegularText>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default NavigationHeader;
