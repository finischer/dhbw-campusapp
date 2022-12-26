import React from "react";
import { useQuery } from "react-query";
import { OrganizedLectures } from "../../api/lectures/lectures.types";
import { IResponseTypes } from "../../api/types/IResponseTypes";
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import RegularText from "../../components/RegularText";
import RequestTime from "../../components/RequestTime";
import { useLectures } from "../../hooks/useLectures";
import Schedule from "./components/Schedule";

const CalendarScreen = () => {
  const { courseId, changeCourseByCourseId, getSchedule } = useLectures();

  const fetchSchedule = async () => {
    const { data: lectures, requestTime }: IResponseTypes = await getSchedule();
    return { lectures, requestTime };
  };

  const { isLoading, isFetching, data } = useQuery(
    ["lectures-schedule", courseId],
    fetchSchedule
  );

  if (courseId === undefined) {
    return (
      <GlobalBody centered>
        <RegularText style={{ textAlign: "center" }}>
          Du musst zuerst einen Kurs auswählen, um den Vorlesungsplan zu sehen
        </RegularText>

        <Button
          variant="outlined"
          onClick={() => changeCourseByCourseId(8119001)}
        >
          Kurs auswählen
        </Button>
      </GlobalBody>
    );
  }

  if (isLoading || isFetching) {
    return (
      <GlobalBody centered>
        <Loader text="Vorlesungen werden geladen ..." />
      </GlobalBody>
    );
  }

  if (data === undefined) {
    return (
      <GlobalBody centered>
        <RegularText>Data is undefined</RegularText>
      </GlobalBody>
    );
  }

  return (
    <GlobalBody>
      <Schedule
        lectures={data.lectures as OrganizedLectures[]}
        // ListHeaderComponent={() => (
        //   <View>
        //     <RegularText>Vorlesungsplan</RegularText>
        //   </View>
        // )}
        ListFooterComponent={() => <RequestTime />}
      />
    </GlobalBody>
  );
};

export default CalendarScreen;
