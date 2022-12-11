import { View, Text } from "react-native";
import React from "react";
import { IRegularTextTypes, IRegularTextVariants } from "./regularText.types";
import { useMetadata } from "../../hooks/useMetadata";
import typography from "../../constants/typography";
import { IColors } from "../../constants/colors/colors.types";

const _getTextColor = (variant: IRegularTextVariants, colors: IColors) => {
  if (variant === "light") return colors.lightText;
  if (variant === "dark") return colors.darkText;
  return;
};

const RegularText: React.FC<IRegularTextTypes> = ({
  variant = null,
  accentColor = false,
  weight = "normal",
  size = typography.body,
  children,
  style,
}) => {
  const { colors } = useMetadata();
  const textColor = variant ? _getTextColor(variant, colors) : colors.secondary;

  return (
    <Text
      style={[
        {
          color: accentColor ? colors.accent : textColor,
          fontWeight: weight,
          fontSize: size,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default RegularText;
