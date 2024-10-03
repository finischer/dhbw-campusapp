import React from "react";
import { StyleSheet, Text } from "react-native";
import { IColors } from "../../constants/colors/colors.types";
import typography from "../../constants/typography";
import useAlert from "../../hooks/useAlert";
import { useMetadata } from "../../hooks/useMetadata";
import { IRegularTextTypes, IRegularTextVariants } from "./regularText.types";

const _getTextColor = (variant: IRegularTextVariants, colors: IColors) => {
  if (variant === "light") return colors.lightText;
  if (variant === "dark") return colors.darkText;
  return;
};

const RegularText: React.FC<IRegularTextTypes> = ({
  variant = undefined,
  accentColor = false,
  weight = "normal",
  size = typography.body,
  children,
  style,
  underline = false,
  isLink = false,
  url = undefined,
  ...props
}) => {
  const { colors } = useMetadata();
  const { openLink } = useAlert();
  const textColor = variant ? _getTextColor(variant, colors) : colors.secondary;

  const localRegularTextStyles = StyleSheet.create({
    textContainer: {
      textDecorationLine: underline ? "underline" : "none",
      color: accentColor ? colors.accent : textColor,
      fontWeight: weight,
      fontSize: size,
    },
    linkStyle: {
      textDecorationLine: "underline",
    },
  });

  return (
    <Text
      style={[localRegularTextStyles.textContainer, style, isLink && localRegularTextStyles.linkStyle]}
      onPress={isLink ? () => openLink(url) : undefined}
      {...props}
    >
      {children}
    </Text>
  );
};

export default RegularText;
