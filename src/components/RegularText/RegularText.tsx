import { Text, StyleSheet, Linking } from "react-native";
import React from "react";
import { IRegularTextTypes, IRegularTextVariants } from "./regularText.types";
import { useMetadata } from "../../hooks/useMetadata";
import useAlert from "../../hooks/useAlert";
import typography from "../../constants/typography";
import { IColors } from "../../constants/colors/colors.types";
import { useTranslation } from "react-i18next";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { darkModeColors, lightModeColors } from "../../constants/colors";

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
  const { colors, theme } = useMetadata();
  const { openLink } = useAlert();
  const { t } = useTranslation();
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
      style={[
        localRegularTextStyles.textContainer,
        style,
        isLink && localRegularTextStyles.linkStyle,
      ]}
      onPress={isLink ? () => openLink(url) : undefined}
      {...props}
    >
      {children}
    </Text>
  );
};

export default RegularText;
