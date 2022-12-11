import { View, Text } from "react-native";
import React from "react";
import {
  generalButtonStyle,
  containedVariantStyle,
  outlinedVariantStyle,
  textVariantStyle,
} from "./button.styles";
import { useMetadata } from "../../hooks/useMetadata";
import { IButtonTypes, IButtonVariants } from "./IButtonTypes";
import TouchableOpacity from "../TouchableOpacity";
import { IColors } from "../../constants/colors/colors.types";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const getButtonStyle = (variant: IButtonVariants, colors: IColors) => {
  switch (variant) {
    case "text":
      return {
        ...textVariantStyle,
        text: {
          color: colors.accent,
        },
      };
    case "contained":
      return {
        ...containedVariantStyle,
        container: {
          ...containedVariantStyle.container,
          backgroundColor: colors.accent,
        },
        text: { color: colors.lightText },
      };

    case "outlined":
      return {
        ...outlinedVariantStyle,
        container: {
          ...outlinedVariantStyle.container,
          borderColor: colors.accent,
        },
        text: { color: colors.accent },
      };
    default:
      return null;
  }
};

const SMALL_SIZE = 42;
const MEDIUM_SIZE = 48;
const LARGE_SIZE = 60;

const Button: React.FC<IButtonTypes> = ({
  variant,
  leftIcon,
  rightIcon,
  onClick = () => null,
  children,
  size = "medium",
  disabled = false,
  style = {},
}) => {
  const { colors } = useMetadata();
  const variantButtonStyle = getButtonStyle(variant, colors);

  const getButtonSize = () => {
    switch (size) {
      case "small":
        return SMALL_SIZE;
      case "medium":
        return MEDIUM_SIZE;
      case "large":
        return LARGE_SIZE;
      default:
        return 48;
    }
  };

  const progress = useDerivedValue(() => {
    return withTiming(disabled ? 0 : 1);
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    1;
    const opacity = interpolate(progress.value, [1, 0], [1, 0.3]);

    return {
      opacity,
    };
  });

  return (
    <TouchableOpacity onPress={onClick} disabled={disabled}>
      <Animated.View
        style={[
          variantButtonStyle?.container,
          generalButtonStyle.container,
          { height: getButtonSize() },
          style,
          animatedButtonStyle,
        ]}
      >
        {leftIcon}
        <Text style={[variantButtonStyle?.text, generalButtonStyle.text]}>
          {children}
        </Text>
        {rightIcon}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Button;
