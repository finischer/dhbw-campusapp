import { StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { ILectureRowItemProps } from "./lectureRowItem.types";
import RegularText from "../../../../components/RegularText";
import { lectureRowItemStyles } from "./lectureRow.styles";
import { useMetadata } from "../../../../hooks/useMetadata";
import moment from "moment";
import Animated, { Layout } from "react-native-reanimated";
import { enteringDelayedAnimation } from "../../../../constants/animations";
import { LectureType } from "../../../../api/lectures/lectures.types";
import { IRegularTextVariants } from "../../../../components/RegularText/regularText.types";

const LECTURE_TIME_FORMAT = "HH:mm";

// TODO: make a modal when click on a lecture to show the difference between the old and the new lecture information 

const LectureRowItem: React.FC<ILectureRowItemProps> = ({ alertScheduleChanges, localLecture, lecture, index }) => {
  const [lectureChanged, setLectureChanged] = useState(false);

  const textVariant: IRegularTextVariants = lectureChanged ? "dark" : undefined

  const { colors, timeFormat } = useMetadata();

  const localRowItemStyles = StyleSheet.create({
    container: {
      backgroundColor: lectureChanged ? colors.danger : colors.primaryDarker,
    },
  });

  useEffect(() => {
    checkForDifferences(localLecture)
  }, [])

  const checkForDifferences = (localLecture: LectureType | null) => {
    if (localLecture !== null) {
      for (const [key, value] of Object.entries(lecture)) {
        const _key = key as keyof LectureType;
        // check if value is different
        if (value !== localLecture[_key]) {
          alertScheduleChanges()
          setLectureChanged(true)
          break; // only break to see is there any difference. Remove break when we want to know all differences

          // TODO: send a push notification with the new information
        }
      }
    }
  }

  // IDEA: formatted lecture id in case we want to display the id on the screen in the future
  // const formatLectureId = (uid: string) => {
  //   if (uid === null) return uid;

  //   const regex = /(?<=-)\d+/;
  //   const result = uid.match(regex);

  //   if (result) {
  //     return result[0]
  //   }

  //   return uid
  // }

  return (
    <Animated.View
      entering={enteringDelayedAnimation(index * 0.5)}
      layout={Layout}
      style={[lectureRowItemStyles.container, localRowItemStyles.container]}
    >

      {/* Time of lecture View */}
      <View style={lectureRowItemStyles.column1}>
        <RegularText variant={textVariant} style={lectureRowItemStyles.column1text}>
          {moment(lecture.startTime, LECTURE_TIME_FORMAT).format(timeFormat)}
        </RegularText>
        <RegularText
          variant={textVariant}
          style={[
            lectureRowItemStyles.column1text,
            lectureRowItemStyles.column1TimeDivider,
          ]}
        >
          -
        </RegularText>
        <RegularText variant={textVariant} style={lectureRowItemStyles.column1text}>
          {moment(lecture.endTime, LECTURE_TIME_FORMAT).format(timeFormat)}
        </RegularText>
      </View>

      {/* Name of lecture View */}
      <View style={lectureRowItemStyles.column2}>
        <RegularText variant={textVariant}>{lecture.lecture}</RegularText>
      </View>

      {/* Location of lecture View */}
      <View style={lectureRowItemStyles.column3}>
        <RegularText variant={textVariant} style={lectureRowItemStyles.column3text}>
          {lecture.location || "-"}
        </RegularText>
      </View>
    </Animated.View>
  );
};

export default LectureRowItem;
