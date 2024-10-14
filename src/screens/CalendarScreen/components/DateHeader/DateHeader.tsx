import { StyleSheet } from "react-native";
import React from "react";
import { IDateHeaderProps } from "./dateHeader.types";
import RegularText from "../../../../components/RegularText";
import { dateHeaderStyles } from "./dateHeader.styles";
import { useMetadata } from "../../../../hooks/useMetadata";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Animated from "react-native-reanimated";
import { enteringDelayedAnimation } from "../../../../constants/animations";
import { INTERNAL_DATE_FORMAT } from "../../../../constants/common";

const DateHeader: React.FC<IDateHeaderProps> = ({ title, index }) => {
  const { t } = useTranslation();
  const { colors, dateFormat } = useMetadata();

  const dayName = moment(title, INTERNAL_DATE_FORMAT).format("dddd").toLowerCase();

  const localDateHeaderStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.accent,
    },
  });

  return (
    <Animated.View
      entering={enteringDelayedAnimation(index)}
      style={[dateHeaderStyles.container, localDateHeaderStyles.container]}
    >
      <RegularText
        variant="light"
        style={dateHeaderStyles.text}
      >
        {t(`common:${dayName}`)}, {moment(title, INTERNAL_DATE_FORMAT).format(dateFormat)}
      </RegularText>
    </Animated.View>
  );
};

export default DateHeader;
