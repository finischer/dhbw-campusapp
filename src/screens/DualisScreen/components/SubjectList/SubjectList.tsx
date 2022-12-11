import { FlatList } from "react-native";
import React from "react";
import { ISubjectTypes } from "../../../../api/html_scraper/dualis/types/ISubjectTypes";
import SubjectRowItem from "../SubjectRowItem";
import ItemSeparator from "../ItemSeparator";
import { IRenderItemProps } from "./subjectList.types";

const SubjectList = ({ subjects }: { subjects: ISubjectTypes[] }) => {
  return (
    <FlatList
      data={subjects}
      renderItem={({ item, index }: IRenderItemProps) => (
        <SubjectRowItem key={index} subject={item} />
      )}
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  );
};

export default SubjectList;
