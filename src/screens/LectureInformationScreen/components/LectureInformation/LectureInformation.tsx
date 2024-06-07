import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import RegularText from "../../../../components/RegularText/RegularText";
import { LectureType } from "../../../../api/lectures/lectures.types";
import moment from "moment";
import { LECTURE_TIME_FORMAT } from "../../../CalendarScreen/components/LectureRowItem/LectureRowItem";
import { ILectureInformationProps } from "./lectureInformation.types";
import { useMetadata } from "../../../../hooks/useMetadata";
import { useTranslation } from "react-i18next";
import { lectureInformationStyles } from "./lectureInformation.styles";

const TIME_KEYS: (keyof LectureType)[] = ["startTime", "endTime"];

const LectureInformation: React.FC<ILectureInformationProps> = ({ lecture, title, keyChanges }) => {
  const { colors, timeFormat } = useMetadata();
  const { t } = useTranslation("common");

  const formattedInfo = (lecture: LectureType | null, key: keyof LectureType) => {
    if (!lecture) return "-";

    let value = lecture[key] || "-";
    // Check for time columns to show time in correct format
    if (TIME_KEYS.includes(key)) {
      value = moment(value, LECTURE_TIME_FORMAT).format(timeFormat);
    }

    // Check if this info was changed
    if (keyChanges.includes(key)) {
      // Highlight text
      return (
        <RegularText
          variant="dark"
          style={{ backgroundColor: colors.danger }}
        >
          {value.toString()}
        </RegularText>
      );
    }

    return value.toString();
  };

  const SmallTitle = ({ children }: { children: ReactNode }) => {
    return <RegularText style={lectureInformationStyles.smallTitle}>{children}</RegularText>;
  };

  const InfoBlock = ({ contentKey }: { contentKey: keyof LectureType }) => {
    return (
      <View style={lectureInformationStyles.infoContainer}>
        <SmallTitle>{t(contentKey)}</SmallTitle>
        <RegularText>{formattedInfo(lecture, contentKey)} </RegularText>
      </View>
    );
  };

  return (
    <View
      style={{
        ...lectureInformationStyles.container,
        backgroundColor: colors.primaryDarker,
      }}
    >
      <RegularText weight="bold">{title}</RegularText>

      <View style={lectureInformationStyles.infoContainerWrapper}>
        <InfoBlock contentKey="lecture" />
        <InfoBlock contentKey="startDate" />
        <InfoBlock contentKey="startTime" />
        <InfoBlock contentKey="endDate" />
        <InfoBlock contentKey="endTime" />
        <InfoBlock contentKey="location" />
      </View>
    </View>
  );
};

export default LectureInformation;
