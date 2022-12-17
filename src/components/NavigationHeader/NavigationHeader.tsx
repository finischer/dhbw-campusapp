import { View } from "react-native";
import React from "react";
import { INavigationHeaderProps } from "./NavigationHeader.types";
import RegularText from "../RegularText";
import typography from "../../constants/typography";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { WINDOW_WIDTH } from "../../constants/device/device";
import { GLOBAL_PADDING_HORIZONTAL } from "../../constants/layout";

const NavigationHeader = ({
  title,
  subTitle = "",
  showSubTitle = false,
}: INavigationHeaderProps) => {
  return (
    <Animated.View
      style={{
        alignItems: "center",
        width: 300,
      }}
      layout={Layout}
    >
      <RegularText variant="light" weight="bold">
        {title}
      </RegularText>
      {showSubTitle && (
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
