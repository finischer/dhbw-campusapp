import { View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import RegularText from "../../components/RegularText";
import GlobalBody from "../../components/GlobalBody";
import { subjectDetailsScreenStyle } from "./subjectDetailsScreen.styles";
import ExamList from "./ExamList";
import CloseButton from "../../components/CloseButton";
import { IExamTypes } from "../../api/html_scraper/dualis/types/IExamTypes";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import { useMetadata } from "../../hooks/useMetadata";

const SubjectDetailsScreen = () => {
  const { t } = useTranslation("dualisScreen");
  const { theme } = useMetadata();
  const { params: subject }: any = useRoute();
  const [statusBarStyle, setStatusBarStyle] = useState<
    "light-content" | "dark-content"
  >("light-content");
  const isFocused = useIsFocused();

  const examList: IExamTypes[] = subject.exams.filter(
    (exam: IExamTypes) => exam.examName && exam
  ); // Exams without names are filtered out

  if (!subject) return <RegularText>{t("noDetailsRetrieved")}</RegularText>;

  useEffect(() => {
    if (isFocused && theme === "light") {
      setTimeout(() => {
        setStatusBarStyle("dark-content");
      }, 300);
    }
  }, [isFocused, theme]);

  return (
    <>
      {isFocused && <StatusBar barStyle={statusBarStyle} />}
      <GlobalBody style={subjectDetailsScreenStyle.wrapperContainer}>
        {/* Header View */}
        <SafeAreaView style={subjectDetailsScreenStyle.headerContainer}>
          <RegularText style={subjectDetailsScreenStyle.subjectNameText}>
            {subject.subjectName}
          </RegularText>
          <RegularText style={subjectDetailsScreenStyle.semesterNameText}>
            {subject.semester}
          </RegularText>
        </SafeAreaView>

        {/* Exams View */}
        <View style={subjectDetailsScreenStyle.examsContainer}>
          <RegularText style={subjectDetailsScreenStyle.examsTitleText}>
            {t("finalModuleRequirements")}
          </RegularText>

          <View style={subjectDetailsScreenStyle.examsList}>
            {examList.length === 0 ? (
              <RegularText style={subjectDetailsScreenStyle.emptyExamsListText}>
                {t("noExaminationServices")}
              </RegularText>
            ) : (
              <ExamList exams={examList} />
            )}
          </View>
        </View>

        {/* Close Button */}
        <View style={subjectDetailsScreenStyle.closeButtonContainer}>
          <CloseButton />
        </View>
      </GlobalBody>
    </>
  );
};

export default SubjectDetailsScreen;
