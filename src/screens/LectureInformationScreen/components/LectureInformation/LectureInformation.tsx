import { View, Text } from 'react-native'
import React from 'react'
import RegularText from '../../../../components/RegularText/RegularText'
import { LectureType } from '../../../../api/lectures/lectures.types';
import moment from 'moment';
import { LECTURE_TIME_FORMAT } from '../../../CalendarScreen/components/LectureRowItem/LectureRowItem';
import { ILectureInformationProps } from './lectureInformation.types';
import { useMetadata } from '../../../../hooks/useMetadata';
import { useTranslation } from 'react-i18next';

const TIME_KEYS: (keyof LectureType)[] = ["startTime", "endTime"];

const LectureInformation: React.FC<ILectureInformationProps> = ({ lecture, title, keyChanges }) => {
  const { colors, timeFormat } = useMetadata();
  const { t } = useTranslation("common")

  const formattedInfo = (lecture: LectureType | null, key: keyof LectureType) => {
    if (!lecture) return "-"

    let value = lecture[key] || "-"
    // Check for time columns to show time in correct format
    if (TIME_KEYS.includes(key)) {
      value = moment(value, LECTURE_TIME_FORMAT).format(timeFormat)
    }

    // Check if this info was changed
    if (keyChanges.includes(key)) {
      // Highlight text
      return <RegularText variant="dark" style={{ backgroundColor: colors.danger }}>{value.toString()}</RegularText>
    }

    return value.toString()
  }

  return (
    <View>
      <RegularText weight='bold'>{title}</RegularText>
      <RegularText>{t("lecture")}: {formattedInfo(lecture, "lecture")}</RegularText>
      <RegularText>{t("startDate")}: {formattedInfo(lecture, "startDate")}</RegularText>
      <RegularText>{t("startTime")}: {formattedInfo(lecture, "startTime")}</RegularText>
      <RegularText>{t("endDate")}: {formattedInfo(lecture, "endDate")}</RegularText>
      <RegularText>{t("endTime")}: {formattedInfo(lecture, "endTime")}</RegularText>
      <RegularText>{t("location")}: {formattedInfo(lecture, "location")}</RegularText>
    </View>
  )
}

export default LectureInformation