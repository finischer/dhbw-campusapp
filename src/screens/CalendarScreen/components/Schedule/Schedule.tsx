import React, { useEffect, useRef, useState } from "react";
import { SectionList } from "react-native";
import { LectureType } from "../../../../api/lectures/lectures.types";
import useAlert from "../../../../hooks/useAlert";
import { dummyLectures } from "../../testData";
import DateHeader from "../DateHeader";
import LectureRowItem from "../LectureRowItem";
import { scheduleStyles } from "./schedule.styles";
import { IScheduleProps } from "./schedule.types";
import { useTranslation } from "react-i18next";
import Alert from "../../../../components/Alert/Alert";
import { IAlertFunctions } from "../../../../components/Alert/alert.types";
import { DialogButtonProps } from "react-native-dialog/lib/Button";

const Schedule: React.FC<IScheduleProps> = ({ lectures, localLectures, ...props }) => {
  const { t } = useTranslation("calendarScreen");

  const { alert } = useAlert()
  const alertRef = useRef<IAlertFunctions | null>(null)
  const [showAlert, setShowAlert] = useState(false)
  const alertButtons: DialogButtonProps[] = [{
    label: "Ok",
    onPress: () => alertRef.current?.closeAlert()
  }]

  useEffect(() => {
    if (showAlert) {
      // TODO: Display Button which says to not show this message again
      alertRef.current?.openAlert()
    }
  }, [showAlert])

  // FOR TESTING ONLY: Replace localLectures by dummyLectures
  const getLocalLectureById = (uid: string) => {
    for (let i = 0; i < dummyLectures.length; i++) {
      const data = dummyLectures[i].data

      for (let j = 0; j < data.length; j++) {
        if (data[j].uid === uid) {
          return data[j]
        }
      }
    }

    return null
  }

  const alertScheduleChanges = () => {
    setShowAlert(true)
  }

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
        renderSectionHeader={({ section: { title, index } }) => (
          <DateHeader title={title} index={index} />
        )}
        {...props}
      />
    </>
  );
};

export default Schedule;
