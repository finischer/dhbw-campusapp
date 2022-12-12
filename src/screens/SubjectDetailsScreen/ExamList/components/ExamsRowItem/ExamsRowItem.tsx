import { View, StyleSheet } from "react-native";
import React from "react";
import { IExamTypes } from "../../../../../api/html_scraper/dualis/types/IExamTypes";
import RegularText from "../../../../../components/RegularText";
import TouchableOpacity from "../../../../../components/TouchableOpacity";
import typography from "../../../../../constants/typography";
import { useMetadata } from "../../../../../hooks/useMetadata";
import { examsRowStyles } from "./examsRowItem.styles";
import { useTranslation } from "react-i18next";

const ExamsRowItem = ({ exam }: { exam: IExamTypes }) => {
  const { t } = useTranslation("dualisScreen");
  const { colors } = useMetadata();

  const localExamsRowItemStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryDarker,
    },
    subjectInfo: {
      color: colors.secondary,
      opacity: 0.5,
      fontSize: typography.small,
    },
  });

  return (
    <View style={[examsRowStyles.container, localExamsRowItemStyles.container]}>
      {/* Content View */}
      <View style={examsRowStyles.contentContainer}>
        {/* Header View */}

        {exam.examDate && (
          <RegularText style={localExamsRowItemStyles.subjectInfo}>
            {exam.examDate}
          </RegularText>
        )}

        {/* Title - Name of subject */}
        <View style={{ marginTop: 3 }}>
          <RegularText numberOfLines={3} style={examsRowStyles.subjectName}>
            {exam.examName}
          </RegularText>
        </View>

        {/* Details View - Final grade, credits, status */}
        <View style={examsRowStyles.bottomContainer}>
          {/* Final grade */}
          <RegularText style={examsRowStyles.bottomText} numberOfLines={1}>
            {t("examRating")}: {exam.examRating || "-"}
          </RegularText>

          {/* Status */}
          <View style={examsRowStyles.subjectStatusContainer}>
            <RegularText style={examsRowStyles.bottomText} numberOfLines={1}>
              {t("examExternallyApproved")}: {exam.externallyApproved || "-"}
            </RegularText>
            {/* Status Icon container */}
            {/* <View style={examsRowStyles.statusIconContainer}>
                  <StatusIcon status={subject.subjectStatus} size={20} />
                </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExamsRowItem;
