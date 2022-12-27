import React from "react";
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
import typography from "../../constants/typography";
import {
  DeviceEventEmitter,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import Icon from "../../components/Icon";
import { calendarScreenStyles } from "./calendarScreen.styles";
import TouchableOpacity from "../../components/TouchableOpacity";

const setHeaderSubtitle = (newValue: boolean) => {
  DeviceEventEmitter.emit("handleShowSubTitle-CalendarScreen", newValue);
};

const CalendarScreen = () => {
  const { t } = useTranslation("calendarScreen");
  const { course, changeCourse, getSchedule, getCourseById } = useLectures();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
    if (e.nativeEvent.contentOffset.y >= 38) {
      setHeaderSubtitle(true);
    } else {
      setHeaderSubtitle(false);
    }
  };

  const ListHeader = () => (
    <TouchableOpacity onPress={() => navigation.navigate("ChangeCourseScreen")}>
      <View style={calendarScreenStyles.listHeaderContainer}>
        <RegularText size={typography.h2} weight="bold">
          {course?.courseName}
        </RegularText>
        <View style={calendarScreenStyles.headerIconContainer}>
          <Icon source="feather" clickable={false} name="edit" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );

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

  return (
    <GlobalBody>
      <Schedule
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        lectures={data?.lectures as OrganizedLectures[]}
        ListHeaderComponent={() => <ListHeader />}
        ListFooterComponent={() => <RequestTime />}
        ListEmptyComponent={() => <NoLecturesView />}
      />
    </GlobalBody>
  );
};

export default CalendarScreen;
