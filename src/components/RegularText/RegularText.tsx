import { View, Text } from "react-native";
import React from "react";
import { IRegularTextTypes, IRegularTextVariants } from "./regularText.types";
import useMetadata from "../../hooks/useMetadata";

const _getTextColor = (variant: IRegularTextVariants, colors: IColors) => {
  if (variant === "light") return colors.lightText;
  if (variant === "dark") return colors.darkText;
  return;
};

const RegularText: React.FC<IRegularTextTypes> = ({
  variant = null,
  children,
  style,
}) => {
  const { colors } = useMetadata();
  const textColor = variant ? _getTextColor(variant, colors) : colors.secondary;

  return <Text style={[{ color: textColor }, style]}>{children}</Text>;
};

export default RegularText;
