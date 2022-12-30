import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { OrganizedLectures } from "../../api/lectures/lectures.types";
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

const setHeaderSubtitle = (newValue: boolean) => {
  DeviceEventEmitter.emit("handleShowSubTitle-CalendarScreen", newValue);
};

const CalendarScreen = () => {
  const { t } = useTranslation("calendarScreen");
  const { course, getSchedule } = useLectures();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchString, setSearchString] = useState<string>("");

  const loaderText = t("loadingLectures");

  const fetchSchedule = async () => {
    const { data: lectures, requestTime }: IResponseTypes = await getSchedule();
    return { lectures, requestTime };
  };

  const { isLoading, isFetching, data } = useQuery(
    ["lectures-schedule", course?.courseId],
    fetchSchedule
  );

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y >= 22) {
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

    //Do not touch downloaded lectures
    const lectures: OrganizedLectures[] = [...rawLectures];
    searchString = searchString.toLowerCase();
    for (let i = 0; i < lectures.length; i++) {
      //Do not touch original data
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

  if (course === undefined) {
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

  if (data?.lectures === undefined) {
    return (
      <GlobalBody centered>
        <RegularText>Es ist ein Fehler aufgetreten</RegularText>
      </GlobalBody>
    );
  }

  return (
    <GlobalBody>
      <Schedule
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
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
        ListFooterComponent={<RequestTime />}
        ListEmptyComponent={<NoLecturesView />}
      />
    </GlobalBody>
  );
};

export default CalendarScreen;
