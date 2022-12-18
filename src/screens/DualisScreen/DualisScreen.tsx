import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("dualisScreen");

  const fetchGrades = async () => {
    const { data: grades, requestTime } = await getAllGrades();
    return { grades, requestTime };
  };

  const {
    isLoading,
    data,
    isFetching,
    refetch: handleFetchGrades,
  } = useQuery("dualis-grades", fetchGrades);

  const subjects = data?.grades?.flatMap(
    (semester: ISemesterTypes) => semester.subjects
  );

  if (isLoading || isFetching) {
    return (
      <GlobalBody style={{ alignItems: "center", justifyContent: "center" }}>
        <Loader text={t("loaderText")} />
      </GlobalBody>
    );
  }

  return (
    <GlobalBody>
      {!subjects ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <RegularText>{t("noGradesError")}</RegularText>
          <Button
            variant="outlined"
            style={{ marginTop: 20 }}
            onClick={handleFetchGrades}
          >
            {t("refreshButtonText")}
          </Button>
        </View>
      ) : (
        <SubjectList subjects={subjects} requestTime={data?.requestTime} />
      )}
    </GlobalBody>
  );
};

export default DualisScreen;
