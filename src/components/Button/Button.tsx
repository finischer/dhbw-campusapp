import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  generalButtonStyle,
  containedVariantStyle,
  outlinedVariantStyle,
  textVariantStyle,
} from "./button.styles";
import useMetadata from "../../hooks/useMetadata";
import { IColors } from "../../constants/colors/colors.types";

const getButtonStyle = (variant: string, colors: IColors) => {
  if (variant === "text")
    return {
      ...textVariantStyle,
      text: {
        color: colors.accent,
      },
    };
  if (variant === "contained")
    return {
      ...containedVariantStyle,
      container: {
        ...containedVariantStyle.container,
        backgroundColor: colors.accent,
      },
      text: { color: colors.lightText },
    };
  if (variant === "outlined")
    return {
      ...outlinedVariantStyle,
      container: {
        ...outlinedVariantStyle.container,
        borderColor: colors.accent,
      },
      text: { color: colors.accent },
    };

  return null;
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
