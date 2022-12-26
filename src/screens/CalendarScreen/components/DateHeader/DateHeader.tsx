import { StyleSheet, View } from "react-native";
import React from "react";
import { IDateHeaderProps } from "./dateHeader.types";
import RegularText from "../../../../components/RegularText";
import { dateHeaderStyles } from "./dateHeader.styles";
import { useMetadata } from "../../../../hooks/useMetadata";
import moment from "moment";
import { useTranslation } from "react-i18next";

const TITLE_DATE_FORMAT = "DD.MM.YYYY";

const DateHeader: React.FC<IDateHeaderProps> = ({ title }) => {
  const { t } = useTranslation();
  const { colors, dateFormat } = useMetadata();

  const dayName = moment(title, TITLE_DATE_FORMAT).format("dddd").toLowerCase();

  const localDateHeaderStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.accent,
    },
  });

  return (
    <View style={[dateHeaderStyles.container, localDateHeaderStyles.container]}>
      <RegularText variant="light" style={dateHeaderStyles.text}>
        {t(`common:${dayName}`)},{" "}
        {moment(title, TITLE_DATE_FORMAT).format(dateFormat)}
      </RegularText>
    </View>
  );
};

export default DateHeader;
