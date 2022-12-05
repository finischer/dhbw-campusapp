import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  generalButtonStyle,
  containedVariantStyle,
  outlinedVariantStyle,
  textVariantStyle,
} from "./button.styles";
import useMetadata from "../../hooks/useMetadata";

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
const ACTIVE_OPACITY = 0.7;

const Button: React.FC<IButtonTypes> = ({
  variant,
  leftIcon,
  rightIcon,
  onClick = () => null,
  children,
  size = "medium",
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

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={ACTIVE_OPACITY}>
      <View
        style={[
          variantButtonStyle?.container,
          generalButtonStyle.container,
          { height: getButtonSize() },
        ]}
      >
        {leftIcon}
        <Text style={[variantButtonStyle?.text, generalButtonStyle.text]}>
          {children}
        </Text>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
