import { View, Text } from 'react-native'
import React from 'react'
import RegularText from '../../../../components/RegularText/RegularText'
import { LectureType } from '../../../../api/lectures/lectures.types';
import moment from 'moment';
import { LECTURE_TIME_FORMAT } from '../../../CalendarScreen/components/LectureRowItem/LectureRowItem';
import { ILectureInformationProps } from './lectureInformation.types';
import { useMetadata } from '../../../../hooks/useMetadata';

const TIME_KEYS: (keyof LectureType)[] = ["startTime", "endTime"];

const LectureInformation: React.FC<ILectureInformationProps> = ({ lecture, title, keyChanges }) => {
  const { colors, timeFormat } = useMetadata();
  const formattedInfo = (lecture: LectureType | null, key: keyof LectureType) => {
    if (!lecture) return "-"

    let value = lecture[key]

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
      <RegularText>Vorlesung: {formattedInfo(lecture, "lecture")}</RegularText>
      <RegularText>Startdatum: {formattedInfo(lecture, "startDate")}</RegularText>
      <RegularText>Startzeit: {formattedInfo(lecture, "startTime")}</RegularText>
      <RegularText>Enddatum: {formattedInfo(lecture, "endDate")}</RegularText>
      <RegularText>Endzeit: {formattedInfo(lecture, "endTime")}</RegularText>
    </View>
  )
}

export default LectureInformation