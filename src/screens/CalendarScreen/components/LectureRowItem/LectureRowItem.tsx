import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { LectureType } from "../../../../api/lectures/lectures.types";
import RegularText from "../../../../components/RegularText";
import { IRegularTextVariants } from "../../../../components/RegularText/regularText.types";
import { enteringDelayedAnimation } from "../../../../constants/animations";
import { useMetadata } from "../../../../hooks/useMetadata";
import { lectureRowItemStyles } from "./lectureRow.styles";
import { ILectureRowItemProps } from "./lectureRowItem.types";
import TouchableOpacity from "../../../../components/TouchableOpacity/TouchableOpacity";
import useAlert from "../../../../hooks/useAlert/useAlert";
import Modal from "../../../../components/Modal/Modal";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../infrastructure/navigation/Navigation/navigation.types";

const LECTURE_TIME_FORMAT = "HH:mm";

// TODO: make a modal when click on a lecture to show the difference between the old and the new lecture information 

const LectureRowItem: React.FC<ILectureRowItemProps> = ({ alertScheduleChanges, localLecture, lecture, index }) => {
  const [lectureChanged, setLectureChanged] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { colors, timeFormat } = useMetadata();
  const textVariant: IRegularTextVariants = lectureChanged ? "dark" : undefined

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
          alertScheduleChanges() // show alert which says that there are changes in the schedule
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

  const createLectureInfoString = (lecture: LectureType | null) => {
    if (!lecture) return "Lecture Error"

    const str = `
      Titel: ${lecture.lecture}
      Start: ${lecture.startTime} ${lecture.startDate}
      Ende: ${lecture.endTime} ${lecture.endDate}
      Raum: ${lecture.location}
    `

    return str;

  }

  const showLecturesChanges = () => {
    navigation.navigate("LectureInformationScreen", { oldLecture: localLecture, newLecture: lecture });
  }

  return (
    <TouchableOpacity onPress={lectureChanged ? showLecturesChanges : undefined} activeOpacity={lectureChanged ? undefined : 1} >
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
    </TouchableOpacity>
  );
};

export default LectureRowItem;
