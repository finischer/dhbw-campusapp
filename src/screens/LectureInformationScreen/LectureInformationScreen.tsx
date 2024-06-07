import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import Modal from "../../components/Modal/Modal";
import RegularText from "../../components/RegularText/RegularText";
import { ParamList } from "../../infrastructure/navigation/Navigation/navigation.types";
import LectureInformation from "./components/LectureInformation";
import { lectureInformationStyles } from "./lectureInformationScreen.styles";

const LectureInformationScreen = () => {
  const { t } = useTranslation();
  const { params: changes } = useRoute<RouteProp<ParamList, "LectureDetails">>();
  const oldLecture = changes.oldLecture;
  const newLecture = changes.newLecture;

  const modalTitle = t("calendarScreen:lectureInformationTitle");
  const beforeTitle = t("common:before");
  const currentTitle = t("common:current");

  return (
    <Modal title={modalTitle}>
      <ScrollView>
        <View style={lectureInformationStyles.container}>
          {/* Before View */}
          <LectureInformation
            title={beforeTitle}
            lecture={oldLecture}
            keyChanges={changes.keyChanges}
          />

          {/* After View */}
          <LectureInformation
            title={currentTitle}
            lecture={newLecture}
            keyChanges={changes.keyChanges}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default LectureInformationScreen;
