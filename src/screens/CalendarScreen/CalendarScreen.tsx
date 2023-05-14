import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { LectureType, OrganizedLectures } from "../../api/lectures/lectures.types";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import RegularText from "../../components/RegularText";
import RequestTime from "../../components/RequestTime";
import { SPACING } from "../../constants/layout";
import { useLectures } from "../../hooks/useLectures";
import Schedule from "./components/Schedule";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import {
  DeviceEventEmitter,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { calendarScreenStyles } from "./calendarScreen.styles";
import ScheduleHeader from "./components/ScheduleHeader/ScheduleHeader";
import ErrorView from "../../components/ErrorView";
import { moreScreenFunctions } from "../../utilities/MoreScreenFunctions";
import useAsyncStorage from "../../hooks/useAsyncStorage/useAsyncStorage";

const setHeaderSubtitle = (newValue: boolean) => {
  DeviceEventEmitter.emit("handleShowSubTitle-CalendarScreen", newValue);
};

// function compareLectures(lectures1: OrganizedLectures[], lectures2: OrganizedLectures[]) {
//   // Initialize an empty array to store the differences
//   const differences = [];

//   // Loop through each lecture in the first array
//   for (const lecture1 of lectures1) {
//     // Find the corresponding lecture in the second array by comparing uids
//     const lecture2 = lectures2.find((l) => l.data.some((d) => d.uid === lecture1.data[0].uid));

//     // If no corresponding lecture is found, add the entire lecture1 object to the differences array
//     if (!lecture2) {
//       differences.push(lecture1);
//       continue;
//     }

//     // Otherwise, loop through each data object in the lecture1 data array
//     for (const data1 of lecture1.data) {
//       // Find the corresponding data object in the lecture2 data array by comparing uids
//       const data2 = lecture2.data.find((d) => d.uid === data1.uid);

//       // If no corresponding data object is found, add the entire lecture1 object to the differences array
//       if (!data2) {
//         differences.push(lecture1);
//         break;
//       }

//       // Otherwise, check if the two data objects are equal
//       if (!isEqual(data1, data2)) {
//         differences.push(lecture1);
//         break;
//       }
//     }
//   }

//   console.log("Differences: ", JSON.stringify(differences, null, 4))
//   // Return the differences array
//   return differences;
// }

// // Helper function to compare two objects for equality
// function isEqual(obj1: LectureType, obj2: LectureType) {
//   return JSON.stringify(obj1) === JSON.stringify(obj2);
// }

const CalendarScreen = () => {
  const { t } = useTranslation("calendarScreen");
  const { icalUrl, course, getSchedule } = useLectures();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchString, setSearchString] = useState<string>("");
  const { importCalendar } = moreScreenFunctions();
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } = useAsyncStorage()

  const loaderText = t("loadingLectures");

  const fetchSchedule = async () => {
    const { data: lectures, requestTime }: IResponseTypes = await getSchedule();
    const localLectures = await getDataFromAsyncStorage("lectures"); // save the old state of lectures
    storeDataInAsyncStorage("lectures", lectures) // store the new lectures in localStorage
    return { lectures, localLectures, requestTime };
  };

  const {
    isLoading,
    isFetching,
    isError,
    data,
    refetch: refetchLectures,
  } = useQuery(["lectures-schedule", course?.courseId, icalUrl], fetchSchedule);

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y >= 22 && course !== undefined) {
      setHeaderSubtitle(true);
    } else {
      setHeaderSubtitle(false);
    }
  };

  const searchForAppointment = (text: string) => {
    setSearchString(text);
  };

  const filterLectures = (
    searchString: string,
    rawLectures: OrganizedLectures[]
  ) => {
    if (searchString.length === 0 || !rawLectures) {
      return rawLectures;
    }

    // do not touch downloaded lectures
    const lectures: OrganizedLectures[] = [...rawLectures];
    searchString = searchString.toLowerCase();
    for (let i = 0; i < lectures.length; i++) {
      // do not touch original data
      let lecture = Object.assign({}, lectures[i]);
      lecture.data = lecture.data.filter((date) =>
        date.lecture.toLowerCase().includes(searchString)
      );
      lectures[i] = lecture;
    }
    return lectures.filter((lecture) => lecture.data.length !== 0);
  };

  const NoLecturesView = () => (
    <View style={calendarScreenStyles.noLecturesContainer}>
      <RegularText>{t("noEventsScheduled")}</RegularText>
    </View>
  );

  if (course === undefined && icalUrl === undefined) {
    return (
      <GlobalBody centered>
        <RegularText style={{ textAlign: "center" }}>
          {t("onFirstUseSelectCourseText")}
        </RegularText>

        <Button
          variant="outlined"
          onClick={() => navigation.navigate("ChangeCourseScreen")}
          style={{ marginTop: SPACING.xl }}
        >
          {t("selectCourse")}
        </Button>
      </GlobalBody>
    );
  }

  if (isLoading || isFetching) {
    return (
      <GlobalBody centered>
        <Loader text={loaderText} />
      </GlobalBody>
    );
  }

  if (data?.lectures === undefined || isError) {
    return (
      <ErrorView centered onRetry={refetchLectures}>
        {t("common:errorOccured")}
      </ErrorView>
    );
  }

  return (
    <GlobalBody>
      <Schedule
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        localLectures={data.localLectures}
        lectures={filterLectures(
          searchString,
          data?.lectures as OrganizedLectures[]
        )}
        ListHeaderComponent={
          <ScheduleHeader
            searchString={searchString}
            onSearch={searchForAppointment}
          />
        }
        ListFooterComponent={<RequestTime requestTime={data.requestTime} />}
        ListEmptyComponent={<NoLecturesView />}
      />
    </GlobalBody>
  );
};

export default CalendarScreen;
