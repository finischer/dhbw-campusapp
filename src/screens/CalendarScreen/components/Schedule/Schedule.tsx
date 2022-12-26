import { SectionList } from "react-native";
import React from "react";
import { IScheduleProps } from "./schedule.types";
import LectureRowItem from "../LectureRowItem";
import DateHeader from "../DateHeader";
import { scheduleStyles } from "./schedule.styles";

const Schedule: React.FC<IScheduleProps> = ({ lectures, ...props }) => {
  return (
    <SectionList
      contentContainerStyle={scheduleStyles.container}
      stickySectionHeadersEnabled
      sections={lectures}
      keyExtractor={(item: any, index: number) => item + index}
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
