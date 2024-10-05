import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeviceEventEmitter, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { useQuery } from "react-query";
import { OrganizedLectures } from "../../api/lectures/lectures.types";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import Button from "../../components/Button/Button";
import ErrorView from "../../components/ErrorView";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import RegularText from "../../components/RegularText";
import RequestTime from "../../components/RequestTime";
import { SPACING } from "../../constants/layout";
import useAsyncStorage from "../../hooks/useAsyncStorage/useAsyncStorage";
import { useLectures } from "../../hooks/useLectures";
import { RootStackParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import { calendarScreenStyles } from "./calendarScreen.styles";
import Schedule from "./components/Schedule";
import ScheduleHeader from "./components/ScheduleHeader/ScheduleHeader";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const setHeaderSubtitle = (newValue: boolean) => {
  DeviceEventEmitter.emit("handleShowSubTitle-CalendarScreen", newValue);
};

const CalendarScreen = () => {
  const { t } = useTranslation("calendarScreen");
  const { icalUrl, course, getSchedule } = useLectures();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchString, setSearchString] = useState<string>("");
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } = useAsyncStorage();

  const loaderText = t("loadingLectures");

  const fetchSchedule = async () => {
    const { data: lectures, requestTime }: IResponseTypes = await getSchedule();
    const localLectures = await getDataFromAsyncStorage("lectures"); // save the old state of lectures

    // only if lectures exist -> don't save null or undefined in localStorage
    if (lectures) {
      storeDataInAsyncStorage("lectures", lectures); // store the new lectures in localStorage
    }
    return { lectures, localLectures, requestTime };
  };

  const {
    isLoading,
    isFetching,
    isError,
    error,
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

  const filterLectures = (searchString: string, rawLectures: OrganizedLectures[]) => {
    if (searchString.length === 0 || !rawLectures) {
      return rawLectures;
    }

    // do not touch downloaded lectures
    const lectures: OrganizedLectures[] = [...rawLectures];
    searchString = searchString.toLowerCase();
    for (let i = 0; i < lectures.length; i++) {
      // do not touch original data
      let lecture = Object.assign({}, lectures[i]);
      lecture.data = lecture.data.filter((date) => date.lecture.toLowerCase().includes(searchString));
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
        <RegularText style={{ textAlign: "center" }}>{t("onFirstUseSelectCourseText")}</RegularText>

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
      <ErrorView
        centered
        onRetry={refetchLectures}
        error={error instanceof Error ? error : undefined}
      >
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
        lectures={filterLectures(searchString, data?.lectures as OrganizedLectures[])}
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
