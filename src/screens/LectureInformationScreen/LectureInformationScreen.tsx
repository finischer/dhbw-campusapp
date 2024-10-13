import { CommonActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import Modal from "../../components/Modal/Modal";
import {
  ActionTriggers,
  NavigationProps,
  ParamList,
} from "../../infrastructure/navigation/Navigation/navigation.types";
import LectureInformation from "./components/LectureInformation";
import { lectureInformationStyles } from "./lectureInformationScreen.styles";

const LectureInformationScreen = () => {
  const { t } = useTranslation();
  const { params: changes } = useRoute<RouteProp<ParamList, "LectureDetails">>();
  const navigation = useNavigation<NavigationProps>();

  const oldLecture = changes.oldLecture;
  const newLecture = changes.newLecture;

  const modalTitle = t("calendarScreen:lectureInformationTitle");
  const beforeTitle = t("common:before");
  const currentTitle = t("common:current");

  const handleOnCloseClick = () => {
    if (changes.trigger === ActionTriggers.Notification) {
      // navigate to calendar screen when notification is clicked
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "CalendarScreen" }],
        })
      );
      return;
    }

    navigation.pop();
  };

  return (
    <Modal
      title={modalTitle}
      onClose={handleOnCloseClick}
      handleCloseManually
    >
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
