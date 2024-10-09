import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, SectionList } from "react-native";
import { DialogButtonProps } from "react-native-dialog/lib/Button";
import { LectureType } from "../../../../api/lectures/lectures.types";
import Alert from "../../../../components/Alert/Alert";
import { IAlertFunctions } from "../../../../components/Alert/alert.types";
import DateHeader from "../DateHeader";
import LectureRowItem from "../LectureRowItem";
import { scheduleStyles } from "./schedule.styles";
import { IScheduleProps } from "./schedule.types";
import { useMetadata } from "../../../../hooks/useMetadata";

const Schedule: React.FC<IScheduleProps> = ({
  lectures,
  localLectures,
  handleOnRefresh = undefined,
  ...props
}) => {
  const { t } = useTranslation("calendarScreen");
  const { colors } = useMetadata();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const alertRef = useRef<IAlertFunctions | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const alertButtons: DialogButtonProps[] = [
    {
      label: "Ok",
      onPress: () => alertRef.current?.closeAlert(),
    },
  ];

  useEffect(() => {
    if (showAlert) {
      // TODO: Display Button which says to not show this message again
      alertRef.current?.openAlert();
    }
  }, [showAlert]);

  // FOR TESTING ONLY: Replace localLectures by dummyLectures
  const getLocalLectureById = (uid: string) => {
    for (let i = 0; i < localLectures.length; i++) {
      const data = localLectures[i].data;

      for (let j = 0; j < data.length; j++) {
        if (data[j].uid === uid) {
          return data[j];
        }
      }
    }

    return null;
  };

  const alertScheduleChanges = () => {
    setShowAlert(true);
  };

  const refreshSchedule = useCallback(async () => {
    if (handleOnRefresh !== undefined) {
      setRefreshing(true);
      await handleOnRefresh().then(() => setRefreshing(false));
    }
  }, []);

  return (
    <>
      <Alert
        ref={alertRef}
        title={t("alertScheduleChangesTitle")}
        description={t("alertScheduleChangesMessage")}
        buttons={alertButtons}
      />
      <SectionList
        contentContainerStyle={scheduleStyles.container}
        stickySectionHeadersEnabled
        sections={lectures}
        keyExtractor={(item: LectureType) => item.uid}
        renderItem={({ item, index }) => (
          <LectureRowItem
            alertScheduleChanges={alertScheduleChanges}
            localLecture={getLocalLectureById(item.uid)}
            lecture={item}
            index={index}
          />
        )}
        refreshControl={
          <RefreshControl
            tintColor={colors.accent}
            refreshing={refreshing}
            onRefresh={refreshSchedule}
          />
        }
        renderSectionHeader={({ section: { title, index } }) => (
          <DateHeader
            title={title}
            index={index}
          />
        )}
        {...props}
      />
    </>
  );
};

export default Schedule;
