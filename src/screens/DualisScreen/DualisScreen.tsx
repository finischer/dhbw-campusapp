import React from "react";
import { useQuery } from "react-query";
import { ISemesterTypes } from "../../api/html_scraper/dualis/types/ISemesterTypes";
import Button from "../../components/Button/Button";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import RegularText from "../../components/RegularText";
import { useDualis } from "../../hooks/useDualis";
import SubjectList from "./components/SubjectList/SubjectList";

const DualisScreen = () => {
  const { getAllGrades } = useDualis();

  const fetchGrades = async () => {
    const { data: grades } = await getAllGrades();
    return grades;
  };

  const {
    isLoading,
    data,
    isFetching,
    refetch: handleFetchGrades,
  } = useQuery("dualis-grades", fetchGrades);

  const subjects = data?.flatMap(
    (semester: ISemesterTypes) => semester.subjects
  );

  if (isLoading || isFetching) {
    return (
      <GlobalBody style={{ alignItems: "center", justifyContent: "center" }}>
        <Loader text="Noten werden geladen ..." />
      </GlobalBody>
    );
  }

  return (
    <GlobalBody>
      <Button variant="outlined" onClick={handleFetchGrades}>
        Aktualisieren
      </Button>
      {!subjects ? (
        <RegularText>Noten konnte nicht abgerufen werden</RegularText>
      ) : (
        <SubjectList subjects={subjects} />
      )}
    </GlobalBody>
  );
};

export default DualisScreen;
