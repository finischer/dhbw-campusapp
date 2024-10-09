import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
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
import ImportCalendarDialog from "../../components/ImportCalendarDialog";
import { IImportCalendarDialogFunctions } from "../../components/ImportCalendarDialog/importCalendarDialog.types";
import Icon from "../../components/Icon";
import { useMetadata } from "../../hooks/useMetadata";

type CalendarScreenRouteProp = RouteProp<RootStackParamList, "CalendarScreen">;

const setHeaderSubtitle = (newValue: boolean) => {
  DeviceEventEmitter.emit("handleShowSubTitle-CalendarScreen", newValue);
};

const CalendarScreen = () => {
  const { t } = useTranslation("calendarScreen");
  const { colors } = useMetadata();
  const { icalUrl, course, getSchedule } = useLectures();
  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const importCalendarRef = useRef<IImportCalendarDialogFunctions | null>(null);

  const [searchString, setSearchString] = useState<string>("");
  const { storeDataInAsyncStorage, getDataFromAsyncStorage } = useAsyncStorage();

  const loaderText = t("loadingLectures");

  const fetchSchedule = async () => {
    console.log("Fetch schedule");
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

  const handleImportCalendar = () => {
    return importCalendarRef.current?.openDialog();
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

  const CalendarImportButton = () => (
    <Button
      variant="contained"
      onClick={handleImportCalendar}
      style={{ marginTop: SPACING.xl }}
      leftIcon={
        <Icon
          source="feather"
          name="download"
          clickable
          onClick={handleImportCalendar}
          color={colors.lightText}
        />
      }
    >
      {t("importCalendar")}
    </Button>
  );

  const NoLecturesView = () => (
    <View style={calendarScreenStyles.noLecturesContainer}>
      <RegularText>{t("noEventsScheduled")}</RegularText>
    </View>
  );

  const route = useRoute<CalendarScreenRouteProp>();

  // Funktion zum Refetchen der Vorlesungen
  const refetchLecturesIfNeeded = useCallback(() => {
    if (route.params?.refetchData) {
      // Refetch lectures
      refetchLectures();
    }
  }, [route.params, refetchLectures]);

  useFocusEffect(
    useCallback(() => {
      refetchLecturesIfNeeded();
    }, [refetchLecturesIfNeeded])
  );

  if (!icalUrl) {
    return (
      <GlobalBody centered>
        <ImportCalendarDialog ref={importCalendarRef} />
        <RegularText style={{ textAlign: "center" }}>{t("onFirstUseSelectCourseText")}</RegularText>
        <CalendarImportButton />
      </GlobalBody>
    );
  }

  if (isLoading) {
    return (
      <GlobalBody centered>
        <ImportCalendarDialog ref={importCalendarRef} />
        <Loader text={loaderText} />
      </GlobalBody>
    );
  }

  if (data?.lectures === undefined || isError) {
    return (
      <>
        <ImportCalendarDialog ref={importCalendarRef} />
        <ErrorView
          centered
          CustomButton={CalendarImportButton}
          onRetry={refetchLectures}
          error={error instanceof Error ? error : undefined}
        >
          {t("common:errorOccured")}
        </ErrorView>
      </>
    );
  }

  return (
    <GlobalBody>
      <ImportCalendarDialog ref={importCalendarRef} />
      <Schedule
        handleOnRefresh={refetchLectures}
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
