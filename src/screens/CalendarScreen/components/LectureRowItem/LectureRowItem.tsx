import { StyleSheet, View } from "react-native";
import React from "react";
import { ILectureRowItemProps } from "./lectureRowItem.types";
import RegularText from "../../../../components/RegularText";
import { lectureRowItemStyles } from "./lectureRow.styles";
import { useMetadata } from "../../../../hooks/useMetadata";
import moment from "moment";

const LECTURE_TIME_FORMAT = "HH:mm";

const LectureRowItem: React.FC<ILectureRowItemProps> = ({ lecture }) => {
  const { colors, timeFormat } = useMetadata();

  const localRowItemStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.primaryDarker,
    },
  });

  return (
    <View
      style={[lectureRowItemStyles.container, localRowItemStyles.container]}
    >
      {/* Time of lecture View */}
      <View style={lectureRowItemStyles.column1}>
        <RegularText style={lectureRowItemStyles.column1text}>
          {moment(lecture.startTime, LECTURE_TIME_FORMAT).format(timeFormat)}
        </RegularText>
        <RegularText
          style={[
            lectureRowItemStyles.column1text,
            lectureRowItemStyles.column1TimeDivider,
          ]}
        >
          -
        </RegularText>
        <RegularText style={lectureRowItemStyles.column1text}>
          {moment(lecture.endTime, LECTURE_TIME_FORMAT).format(timeFormat)}
        </RegularText>
      </View>

      {/* Name of lecture View */}
      <View style={lectureRowItemStyles.column2}>
        <RegularText numberOfLines={3}>{lecture.lecture}</RegularText>
      </View>

      {/* Location of lecture View */}
      <View style={lectureRowItemStyles.column3}>
        <RegularText>{lecture.location}</RegularText>
      </View>
    </View>
  );
};

export default LectureRowItem;
