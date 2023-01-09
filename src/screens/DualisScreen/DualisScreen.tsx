import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { ISemesterTypes } from "../../api/html_scraper/dualis/types/ISemesterTypes";
import GlobalBody from "../../components/GlobalBody";
import Loader from "../../components/Loader/Loader";
import { useDualis } from "../../hooks/useDualis";
import SubjectList from "./components/SubjectList/SubjectList";
import ErrorView from "../../components/ErrorView";

const DualisScreen = () => {
  const { getAllGrades, cookies } = useDualis();
  const { t } = useTranslation("dualisScreen");

  const fetchGrades = async () => {
    const { data: grades, requestTime } = await getAllGrades();
    return { grades, requestTime };
  };

  const {
    isLoading,
    data,
    refetch: handleFetchGrades,
  } = useQuery(["dualis-grades", cookies], fetchGrades);

  const subjects = data?.grades?.flatMap(
    (semester: ISemesterTypes) => semester.subjects
  );

  if (isLoading) {
    return (
      <GlobalBody centered>
        <Loader text={t("loaderText")} />
      </GlobalBody>
    );
  }

  return (
    <GlobalBody>
      {!subjects ? (
        <ErrorView centered onRetry={handleFetchGrades}>
          {t("noGradesError")}
        </ErrorView>
      ) : (
        <SubjectList
          subjects={subjects}
          requestTime={data?.requestTime}
          onRefresh={handleFetchGrades}
        />
      )}
    </GlobalBody>
  );
};

export default DualisScreen;
