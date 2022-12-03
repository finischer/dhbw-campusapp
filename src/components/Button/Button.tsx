import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  generalButtonStyle,
  containedVariantStyle,
  outlinedVariantStyle,
  textVariantStyle,
} from "./buttonStyles";

const getButtonStyle = (variant: string) => {
  if (variant === "text") return textVariantStyle;
  if (variant === "contained") return containedVariantStyle;
  if (variant === "outlined") return outlinedVariantStyle;

  return null;
};

const Button: React.FC<IButtonTypes> = ({
  variant,
  leftIcon,
  rightIcon,
  onClick = () => null,
  children,
}) => {
  const variantButtonStyle = getButtonStyle(variant);

  return (
    <TouchableOpacity onPress={onClick}>
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
