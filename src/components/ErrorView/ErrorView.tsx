import React from "react";
import { View } from "react-native";
import GlobalBody from "../GlobalBody";
import RegularText from "../RegularText";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import { IErrorViewProps } from "./errorView.types";
import { errorViewStyles } from "./errorView.styles";

const ErrorView: React.FC<IErrorViewProps> = ({
  children,
  centered = false,
  onRetry = undefined,
  showSecondaryButton = false,
  onClickSecondaryButton = undefined,
  secondaryButtonText = undefined,
}) => {
  const { t } = useTranslation("common");

  const styleCentered = centered ? "center" : undefined;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: styleCentered,
        alignItems: styleCentered,
      }}
    >
      <RegularText style={errorViewStyles.text}>{children}</RegularText>
      <View style={errorViewStyles.buttonsContainer}>
        {onRetry && (
          <Button variant="outlined" onClick={onRetry}>
            {t("refreshButtonText")}
          </Button>
        )}
        {showSecondaryButton && (
          <Button variant="text" onClick={onClickSecondaryButton}>
            {secondaryButtonText}
          </Button>
        )}
      </View>
    </View>
  );
};

export default ErrorView;
