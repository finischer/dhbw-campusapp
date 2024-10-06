import { FlatList } from "react-native";
import React from "react";
import { IExamListProps, IExamListRenderItemProps } from "./examList.types";
import ExamsRowItem from "./components/ExamsRowItem/ExamsRowItem";

const ExamList: React.FC<IExamListProps> = ({ exams, ...props }) => {
  return (
    <FlatList
      {...props}
      data={exams}
      renderItem={({ item, index }: IExamListRenderItemProps) => (
        <ExamsRowItem
          key={index}
          exam={item}
          index={index}
        />
      )}
      contentContainerStyle={{ paddingBottom: 50 }} // important! - prevends that last item goes behind the navigation bar
    />
  );
};

export default ExamList;
