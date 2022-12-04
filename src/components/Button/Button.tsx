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

const Button: React.FC<IButtonTypes> = ({
  variant,
  leftIcon,
  rightIcon,
  onClick = () => null,
  children,
}) => {
  const { colors } = useMetadata();
  const variantButtonStyle = getButtonStyle(variant, colors);

  return (
    <TouchableOpacity onPress={onClick} activeOpacity={0.3}>
      <View
        style={[variantButtonStyle?.container, generalButtonStyle.container]}
      >
        {leftIcon}
        <Text style={variantButtonStyle?.text}>{children}</Text>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
