import React from "react";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import RegularText from "../RegularText";
import { navHeaderStyles } from "./NavigationHeader.styles";
import { INavigationHeaderProps } from "./NavigationHeader.types";

// TODO: add generic subtitle-layout animation

const NavigationHeader = ({
  title,
  subTitle = "",
  showSubTitle = false,
}: INavigationHeaderProps) => {
  return (
    <Animated.View style={navHeaderStyles.container} layout={Layout}>
      <RegularText style={navHeaderStyles.titleText} variant="light" weight="bold">
        {title}
      </RegularText>
      {showSubTitle && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
        >
          <RegularText numberOfLines={1} variant="light" style={navHeaderStyles.subTitleText}>
            {subTitle}
          </RegularText>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default NavigationHeader;
