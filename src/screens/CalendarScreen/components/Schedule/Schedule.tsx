import { SectionList } from "react-native";
import React from "react";
import { IScheduleProps } from "./schedule.types";
import LectureRowItem from "../LectureRowItem";
import DateHeader from "../DateHeader";
import { scheduleStyles } from "./schedule.styles";
import { LectureType } from "../../../../api/lectures/lectures.types";

const Schedule: React.FC<IScheduleProps> = ({ lectures, ...props }) => {
  return (
    <SectionList
      contentContainerStyle={scheduleStyles.container}
      stickySectionHeadersEnabled
      sections={lectures}
      keyExtractor={(item: LectureType) => item.uid}
      renderItem={({ item, index }) => (
        <LectureRowItem lecture={item} index={index} />
      )}
      renderSectionHeader={({ section: { title, index } }) => (
        <DateHeader title={title} index={index} />
      )}
      {...props}
    />
  );
};

export default Schedule;
