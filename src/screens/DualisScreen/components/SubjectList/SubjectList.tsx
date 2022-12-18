import { View, FlatList } from "react-native";
import React, { useState } from "react";
import { ISubjectTypes } from "../../../../api/html_scraper/dualis/types/ISubjectTypes";
import SubjectRowItem from "../SubjectRowItem";
import { ISubjectListRenderItemProps } from "./subjectList.types";
import Chip from "../../../../components/Chip";
import { subjectListStyles } from "./subjectList.styles";
import RegularText from "../../../../components/RegularText";
import { useTranslation } from "react-i18next";
import Animated, { Layout } from "react-native-reanimated";

const SubjectList = ({ subjects }: { subjects: ISubjectTypes[] }) => {
  const { t } = useTranslation("dualisScreen");
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);

  const filteredSubjects = subjects
    .map((subject: ISubjectTypes) => {
      if (selectedSemesters.includes(subject.semester)) {
        return subject;
      }
    })
    .filter((subject: ISubjectTypes | undefined) => subject !== undefined);

  // If no filter is selected, all subjects should be displayed
  const showSubjectList =
    filteredSubjects.length === 0 ? subjects : filteredSubjects;

  // List all semesters (unique semesters)
  const allSemesters = Array.from(
    new Set(subjects.map((subject) => subject.semester))
  );

  // Create all filter elements
  const filterElements = allSemesters.map((semester: string) => {
    const isSemesterSelected = selectedSemesters.includes(semester);

    return (
      <View key={semester} style={subjectListStyles.chipContainer}>
        <Chip
          label={semester}
          onClick={() => toggleFilter(semester)}
          selected={isSemesterSelected}
        />
      </View>
    );
  });

  const toggleFilter = (semester: string) => {
    if (selectedSemesters.includes(semester)) {
      const newSelectedSemesters = selectedSemesters.filter(
        (s) => s != semester
      );
      setSelectedSemesters(newSelectedSemesters);
      return;
    }

    setSelectedSemesters((oldSelectedSemesters) => [
      ...oldSelectedSemesters,
      semester,
    ]);
  };

  return (
    <Animated.View layout={Layout} style={{ flex: 1 }}>
      <RegularText style={subjectListStyles.semesterTitleText}>
        {t("semester")}
      </RegularText>
      <View style={subjectListStyles.filterContainer}>{filterElements}</View>
      <RegularText style={subjectListStyles.subjectListTitleText}>
        {t("subjects")}
      </RegularText>
      <FlatList
        data={showSubjectList as ISubjectTypes[]}
        renderItem={({ item, index }: ISubjectListRenderItemProps) => (
          <SubjectRowItem key={index} subject={item} />
        )}
        contentContainerStyle={subjectListStyles.subjectListContainer}
        alwaysBounceVertical
      />
    </Animated.View>
  );
};

export default SubjectList;
