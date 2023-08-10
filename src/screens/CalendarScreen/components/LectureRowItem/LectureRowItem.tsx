import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";
import { LectureType } from "../../../../api/lectures/lectures.types";
import RegularText from "../../../../components/RegularText";
import { IRegularTextVariants } from "../../../../components/RegularText/regularText.types";
import TouchableOpacity from "../../../../components/TouchableOpacity/TouchableOpacity";
import { enteringDelayedAnimation } from "../../../../constants/animations";
import { useMetadata } from "../../../../hooks/useMetadata";
import { RootStackParamList } from "../../../../infrastructure/navigation/Navigation/navigation.types";
import { lectureRowItemStyles } from "./lectureRow.styles";
import { ILectureRowItemProps } from "./lectureRowItem.types";

export const LECTURE_TIME_FORMAT = "HH:mm";

// TODO: make a modal when click on a lecture to show the difference between the old and the new lecture information 

const LectureRowItem: React.FC<ILectureRowItemProps> = ({ alertScheduleChanges, localLecture, lecture, index }) => {
  const [lectureChanged, setLectureChanged] = useState(false);
  const [keyChanges, setKeyChanges] = useState<Array<keyof LectureType>>([]) // keys where the values has changed -> to identify what has been changed
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
          setKeyChanges(oldState => [...oldState, _key])
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


  const showLecturesChanges = () => {
    navigation.navigate("LectureInformationScreen", { oldLecture: localLecture, newLecture: lecture, keyChanges });
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
