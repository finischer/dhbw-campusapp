import { StyleSheet, View } from "react-native";
import React from "react";
import { ISubjectTypes } from "../../../../api/html_scraper/dualis/types/ISubjectTypes";
import RegularText from "../../../../components/RegularText";
import TouchableOpacity from "../../../../components/TouchableOpacity";
import { useMetadata } from "../../../../hooks/useMetadata";
import { subjectRowStyles } from "./subjectRowItem.styles";
import typography from "../../../../constants/typography";
import StatusIcon from "./components/StatusIcon";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../../infrastructure/navigation/Navigation/navigation.types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import Animated, { FadeInLeft } from "react-native-reanimated";
import Icon from "../../../../components/Icon";

const SubjectRowItem = ({
  subject,
  index,
}: {
  subject: ISubjectTypes;
  index: number;
}) => {
  const { t } = useTranslation("dualisScreen");

  const { colors } = useMetadata();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const localSubjectRowItemStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryDarker,
    },
    subjectInfo: {
      color: colors.secondary,
      opacity: 0.5,
      fontSize: typography.small,
    },
  });

  const openSubjectDetails = () => {
    navigation.navigate("SubjectDetailsScreen", { ...subject });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={openSubjectDetails}>
      <Animated.View
        entering={FadeInLeft.delay(index * 30)}
        style={[
          subjectRowStyles.container,
          localSubjectRowItemStyles.container,
        ]}
      >
        {/* Content View */}
        <View style={subjectRowStyles.contentContainer}>
          {/* Header View */}
          <RegularText style={localSubjectRowItemStyles.subjectInfo}>
            {subject.subjectNr} · {subject.semester}
          </RegularText>

          {/* Title - Name of subject */}
          <View style={{ marginTop: 3 }}>
            <RegularText numberOfLines={1} style={subjectRowStyles.subjectName}>
              {subject.subjectName}
            </RegularText>
          </View>

          {/* Details View - Final grade, credits, status */}
          <View style={subjectRowStyles.bottomContainer}>
            {/* Final grade */}
            <RegularText style={subjectRowStyles.bottomText} numberOfLines={1}>
              {t("finalGrade")}: {subject.subjectGrade}
            </RegularText>

            {/* Credits */}
            <RegularText style={subjectRowStyles.bottomText} numberOfLines={1}>
              {t("credits")}: {subject.subjectCredits}
            </RegularText>

            {/* Status */}
            <View style={subjectRowStyles.subjectStatusContainer}>
              <RegularText
                style={subjectRowStyles.bottomText}
                numberOfLines={1}
              >
                {t("status")}:{" "}
              </RegularText>

              {/* Status Icon container */}
              <View style={subjectRowStyles.statusIconContainer}>
                <StatusIcon status={subject.subjectStatus} size={20} />
              </View>
            </View>
          </View>
        </View>

        {/* Details Button */}
        <View style={subjectRowStyles.detailsButtonContainer}>
          <Icon source="feather" name="chevron-right" size={24} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SubjectRowItem;
