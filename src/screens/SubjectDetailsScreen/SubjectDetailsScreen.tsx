import { View } from "react-native";
import React, { useRef } from "react";
import { useRoute } from "@react-navigation/native";
import RegularText from "../../components/RegularText";
import { subjectDetailsScreenStyle } from "./subjectDetailsScreen.styles";
import ExamList from "./ExamList";
import { IExamTypes } from "../../api/html_scraper/dualis/types/IExamTypes";
import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";
import { IModalFunctions } from "../../components/Modal/modal.types";

const SubjectDetailsScreen = () => {
  const { t } = useTranslation("dualisScreen");
  const { params: subject }: any = useRoute();
  const modalRef = useRef<IModalFunctions | null>(null);

  const examList: IExamTypes[] = subject.exams.filter(
    (exam: IExamTypes) => exam.examName && exam
  ); // Exams without names are filtered out

  if (!subject) return <RegularText>{t("noDetailsRetrieved")}</RegularText>;

  return (
    <Modal
      ref={modalRef}
      title={subject.subjectName}
      subTitle={subject.semester}
    >
      <View style={subjectDetailsScreenStyle.container}>
        <RegularText style={subjectDetailsScreenStyle.examsTitleText}>
          {t("finalModuleRequirements")}
        </RegularText>

        <View style={subjectDetailsScreenStyle.examsList}>
          {examList.length === 0 ? (
            <RegularText style={subjectDetailsScreenStyle.emptyExamsListText}>
              {t("noExaminationServices")}
            </RegularText>
          ) : (
            <ExamList
              exams={examList}
              onScrollBeginDrag={() => modalRef.current?.disappearCloseButton()}
              onScrollEndDrag={() => modalRef.current?.appearCloseButton()}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SubjectDetailsScreen;
