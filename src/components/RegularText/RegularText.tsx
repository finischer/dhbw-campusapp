import { Text, StyleSheet, Linking } from "react-native";
import React from "react";
import { IRegularTextTypes, IRegularTextVariants } from "./regularText.types";
import { useMetadata } from "../../hooks/useMetadata";
import useAlert from "../../hooks/useAlert";
import typography from "../../constants/typography";
import { IColors } from "../../constants/colors/colors.types";
import { useTranslation } from "react-i18next";

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
  underline = false,
  isLink = false,
  url = undefined,
  ...props
}) => {
  const { colors } = useMetadata();
  const { alert } = useAlert();
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
      color: colors.accent,
      textDecorationLine: "underline",
    },
  });

  const openLink = async () => {
    if (url) {
      const canOpenUrl = await Linking.canOpenURL(url);
      if (canOpenUrl) {
        await Linking.openURL(url);
      } else {
        alert(t("common:errorOccured"), t("common:alertUrlError"));
      }
    }
  };

  return (
    <Text
      style={[
        localRegularTextStyles.textContainer,
        style,
        isLink && localRegularTextStyles.linkStyle,
      ]}
      onPress={isLink ? openLink : undefined}
      {...props}
    >
      {children}
    </Text>
  );
};

export default RegularText;
