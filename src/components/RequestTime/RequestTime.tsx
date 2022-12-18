import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { IRequestTimeProps } from "./requestTime.types";
import { requestTimeStyles } from "./requestTime.styles";
import RegularText from "../RegularText";
import { useMetadata } from "../../hooks/useMetadata";
import { useTranslation } from "react-i18next";

const RequestTime = ({ requestTime = moment() }: IRequestTimeProps) => {
  const { t } = useTranslation("common");
  const { timeFormat } = useMetadata();

  return (
    <View style={requestTimeStyles.container}>
      <RegularText style={requestTimeStyles.text}>
        {t("lastUpdated")}: {requestTime.format(timeFormat)}
      </RegularText>
    </View>
  );
};

export default RequestTime;
