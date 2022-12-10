import React from "react";
import { FlatList, View } from "react-native";
import { useQuery } from "react-query";
import { ISemesterTypes } from "../../api/html_scraper/dualis/types/ISemesterTypes";
import { ISubjectTypes } from "../../api/html_scraper/dualis/types/ISubjectTypes";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import RegularText from "../../components/RegularText";
import useDualis from "../../hooks/useDualis";
import { IDualisScreenProps } from "./dualisScreen.types";

const DualisScreen = ({ setAccessGranted }: IDualisScreenProps) => {
  const { getAllGrades } = useDualis();

  const fetchGrades = async () => {
    return await getAllGrades();
  };

  const { isLoading, isFetching, isError, data } = useQuery(
    "dualis-grades",
    fetchGrades
  );

  const Subject = ({ subject }: { subject: ISemesterTypes }) => (
    // TODO: change key to unique ID
    <>
      {subject.subjects.map((subject: ISubjectTypes) => (
        <View key={subject.subjectNr + subject.subjectName}>
          <RegularText>
            {subject.subjectName} - {subject.subjectGrade}
          </RegularText>
        </View>
      ))}
    </>
  );

  if (isLoading) {
    return (
      <GlobalBody style={{ alignItems: "center", justifyContent: "center" }}>
        <Loader text="Noten werden geladen ..." />
      </GlobalBody>
    );
  }

  return (
    <GlobalBody>
      <RegularText>DualisScreen</RegularText>
      <FlatList
        data={data}
        renderItem={({ item }) => <Subject subject={item} />}
        keyExtractor={(item) => item.semester}
      />
    </GlobalBody>
  );
};

export default DualisScreen;
