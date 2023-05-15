import { View } from 'react-native'
import React from 'react'
import Modal from '../../components/Modal/Modal'
import { RouteProp, useRoute } from '@react-navigation/native';
import { ParamList } from '../../infrastructure/navigation/Navigation/navigation.types';
import RegularText from '../../components/RegularText/RegularText';
import { lectureInformationStyles } from './lectureInformationScreen.styles';
import { LectureType } from '../../api/lectures/lectures.types';
import { useMetadata } from '../../hooks/useMetadata';
import moment from 'moment';
import { LECTURE_TIME_FORMAT } from '../CalendarScreen/components/LectureRowItem/LectureRowItem';
import LectureInformation from './components/LectureInformation/LectureInformation';
import { useTranslation } from 'react-i18next';


const LectureInformationScreen = () => {
    const { t } = useTranslation();
    const { params: changes } = useRoute<RouteProp<ParamList, "LectureDetails">>();
    const oldLecture = changes.oldLecture;
    const newLecture = changes.newLecture;

    const modalTitle = t("calendarScreen:lectureInformationTitle")
    const beforeTitle = t("common:before")
    const currentTitle = t("common:current")

    return (
        <Modal title={modalTitle}>
            <View style={lectureInformationStyles.container}>
                {/* IDEA: extract before/after block to own component */}
                {/* Before View */}
                <LectureInformation title={beforeTitle} lecture={oldLecture} keyChanges={changes.keyChanges} />

                {/* After View */}
                <LectureInformation title={currentTitle} lecture={newLecture} keyChanges={changes.keyChanges} />


                {/* Design hint */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <RegularText style={{ opacity: 0.3 }}>{t("common:maintenanceHintDesign")}</RegularText>
                </View>
            </View>
        </Modal>
    )
}

export default LectureInformationScreen

