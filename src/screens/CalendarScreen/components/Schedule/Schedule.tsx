import { SectionList } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { IScheduleProps } from "./schedule.types";
import LectureRowItem from "../LectureRowItem";
import DateHeader from "../DateHeader";
import { scheduleStyles } from "./schedule.styles";
import { LectureType } from "../../../../api/lectures/lectures.types";
import { dummyLectures } from "../../testData";
import useAlert from "../../../../hooks/useAlert";

const Schedule: React.FC<IScheduleProps> = ({ lectures, localLectures, ...props }) => {
  const { alert } = useAlert()
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (showAlert) {
      // TODO: Display Button which says to not show this message again
      alert(
        "Es gibt Änderungen im Vorlesungsplan!",
        "Die gelbmarkierten Vorlesungen haben sich geändert. Klicke auf die jeweilige Vorlesung, um Details zu erfahren"
      )
    }
  }, [showAlert])

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
  );
};

export default Schedule;
