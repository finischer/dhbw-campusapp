import { SectionList } from "react-native";
import React from "react";
import { IScheduleProps } from "./schedule.types";
import LectureRowItem from "../LectureRowItem";
import DateHeader from "../DateHeader";

const Schedule: React.FC<IScheduleProps> = ({ lectures, ...props }) => {
  return (
    <SectionList
      stickySectionHeadersEnabled
      sections={lectures}
      keyExtractor={(item: any, index: number) => item + index}
      renderItem={({ item }) => <LectureRowItem lecture={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <DateHeader title={title} />
      )}
      {...props}
    />
  );
};

export default Schedule;
